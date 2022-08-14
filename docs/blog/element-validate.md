# element-ui表单校验源码解析

相信很多人都有用过element-ui，其中form表单是其中非常重要的一个组件，这里从源码角度来分析下element from表单如何收集子组件的值并进行校验。

## form组件

从官方文档API文档看，form表单校验有两个关键的api，一个是rules配置字段校验规则，一个是validate，首先来看[validate](https://element.eleme.cn/#/zh-CN/component/form)方法的官方介绍，这个方法接收一个回调函数，在表单校验完后会执行传入的回调函数，在不传回调函数时则会返回一个promise，在表单校验后会改变promise的状态。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e714015fa16d4de09dbdd5d2bf421c0b~tplv-k3u1fbpfcp-watermark.image)

从validate函数入手，源码在[packages/form](https://github.com/ElemeFE/element/blob/dev/packages/form/src/form.vue)。

从这个函数可以看到，最终是通过this.fields这个数组进行的表单校验，fields存放了form的子组件form-item的所有实例，validate执行的时候便是调用所有form-item各自的validate方法，看下form组件validate方法的源码，对这个函数的源码我在下图做了详细的注释解析。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f76929efadc43579181e71b5335817f~tplv-k3u1fbpfcp-watermark.image)

所以这里的重点就是如何收集子组件form-item的实例，在form组件的created可以里发现这里用了this.$on订阅了el.form.addField和el.form.removeField两个自定义事件，分别对应fields数组的添加和移除。所以这里可以到form的子组件，form-item继续往下分析。

## form-item组件
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bcc81d071544f6bb24f223126c53056~tplv-k3u1fbpfcp-watermark.image)

在form-item的mounted和beforeDestory生命周期里发现了这里分别dispatch了这个form表单的添加和移除事件，在添加事件时将form-item的实例作为参数传给form组件，让form组件收集需要验证的这个form-item实例。在destoryed时则向form组件发布移除该form-item组件实例。而在这个form-item组件里并没有找到dispatch这个方法，所以可能是在mixin里混合进来的，在minxins/emitter里发现了dispatch的方法。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5b94b599bdd43e5a379207cdf868545~tplv-k3u1fbpfcp-watermark.image)

## mixins/emitter解析
接下来分析下这个emitter这个文件。dispath派发函数，作用是触发父组件监听的自定义事件；broadcast广播函数，则是递归查询到匹配的子组件，触发子组件监听的自定义事件。
在下图中我对代码做了详细的注释解析。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd7316b4043647c982023e30f8567c41~tplv-k3u1fbpfcp-watermark.image)

## 总结收集原理

其实在这里就讲完了form组件校验规则收集的原理。总结就是在form组件里监听添加和移除field的自定义事件，在form-item里通过emitter的dispatch函数将自身实例作为参数发布到出去，在form收到后进行收集和移除。接下来分析在form组件配置的rules如何让子组件form-item获取到各自的检验字段和规则。

## form-item数据校验

刚在上面有说到form表单validate最终是调用所有form-item组件的validate，所以这里分析form-item的validate方法。在element-ui里表单校验使用的是async-validator库，ant-design也是使用了这个库，这个库在[github](https://github.com/yiminghe/async-validator)有着6k多的star，这是一个用于表单异步校验的库。用法也很简单，就是声明一个校验器，传入descriptor描述对象，再调用validate方法，传入校验的数据，这也是element-ui和ant-design表单组件提供的validate api方法，在各自的form-item组件内部也是调用这个方法。


## PS

自己整理的，纯手写，有错误的地方欢迎大家指出来~~

