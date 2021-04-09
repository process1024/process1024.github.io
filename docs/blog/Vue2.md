# vue 面试题大全含源码级回答（vue2 篇）

## 1.vue 响应式原理

回答这个问题，首先要搞清楚什么叫响应式。通常 vue 中所说的响应式是指数据响应式，数据变化可以被检测并对这种变化做出响应的机制。而在 Vue 这种 MVVM 框架中，最重要的核心就是实现数据层和视图层的连接，通过数据驱动应用，数据变化，视图更新。Vue 中的方案是数据劫持+发布订阅模式。

vue 在初始化的时候会对数据进行劫持，包括 props，data，methods，computed，watcher，并根据数据类型来做不同处理.

如果是对象则采用 Object.defineProperty()的方式定义数据拦截:

```javascript
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(v) {
      val = v;
      notify();
    },
  });
}
```

如果是数组，则覆盖数组的 7 个变更方法实现变更通知:

```javascript
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto)[
  ("push", "pop", "shift", "unshift", "splice", "sort", "reverse")
].forEach(function (method) {
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args);
    notify();
    return result;
  });
});
```

这是数据劫持的部分，接下来说下视图更新的机制：

1. 由于 Vue 执行一个组件的 render 函数是由 Watcher 去代理执行的，Watcher 在执行前会把 Watcher 自身先赋值给 Dep.target 这个全局变量，等待响应式属性去收集它。
2. 在组件执行 render 函数时访问了响应式属性，响应式属性就会精确的收集到当前全局存在的 Dep.target 作为自身的依赖。
3. 在响应式属性发生更新时通知 Watcher 去重新调用`vm._update(vm._render())`进行组件的视图更新，视图更新的时候会通过 diff 算法对比新老 vnode 差异，通过 patch 即时更新 DOM。

## 2.v-if 和 v-for 哪个优先级高

答案是 v-for 解析的优先级高，可以在源码的 compiler/codegen/index.js 里的 genElement 函数找到答案

```javscript
function genElement (el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    let code
    if (el.component) {
      code = genComponent(el.component, el, state)
    } else {
      let data
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData(el, state)
      }

      const children = el.inlineTemplate ? null : genChildren(el, state, true)
      code = `_c('${el.tag}'${
        data ? `,${data}` : '' // data
      }${
        children ? `,${children}` : '' // children
      })`
    }
    // module transforms
    for (let i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code)
    }
    return code
  }
}
```

vue 中的内置指令都有相应的解析函数，执行顺序是通过简单的 if else-if 语法来确定的。在 genFor 的函数里，最后会 return 一个自运行函数，再次调用 genElement。

虽然 v-for 和 v-if 可以放一起，但我们要避免这种写法，在官网中也有明确指出，这会造成性能浪费。

## 3.key 的作用

作用：用来判断虚拟 DOM 的某个节点是否为相同节点，用于优化 patch 性能，patch 就是计算 diff 的函数。

先看下 patch 函数：

> 只提取了本次要分析的关键代码

```javascript
function patch(oldVnode, vnode) {
  if (isUndef(vnode)) {
    if (isDef(oldVnode)) invokeDestroyHook(oldVnode);
    return;
  }

  let isInitialPatch = false;
  const insertedVnodeQueue = [];

  if (isUndef(oldVnode)) {
    // empty mount (likely as component), create new root element
    isInitialPatch = true;
    createElm(vnode, insertedVnodeQueue);
  } else {
    const isRealElement = isDef(oldVnode.nodeType);
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
      // patch existing root node
      patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
    } else {
      // some code
    }
  }
  return vnode;
}
```

patch 函数接收 oldVnode 和 vnode，也就是要比较的新旧节点对象。

首先会用 isUndef 函数判断传入的两个 vnode 是否为空对象再做相应处理。当两个都为节点对象时，再用 sameVnode 来判断是否为同一节点，再判断本次操作是新增、修改、还是移除。

```javascript
function sameVnode(a, b) {
  return (
    a.key === b.key && // key值
    a.tag === b.tag && // 标签名
    a.isComment === b.isComment && // 是否为注释节点
    isDef(a.data) === isDef(b.data) && // 是否都定义了data，data包含一些具体信息，例如onclick , style
    sameInputType(a, b) // 当标签是<input>的时候，type必须相同
  );
}
```

sameVnode 通过判断 key、标签名、是否为注释、data 等是否相等，来判断是否需要进行比较。

值得比较则执行 patchVnode，不值得比较则用 Vnode 替换 oldVnode,再渲染真实 dom。

patchVnode 会对 oldVnode 和 vnode 进行对比，然后进行 DOM 更新。这个会在 diff 算法里再进行说明。

v-for 通常都是生成一样的标签，所以 key 会是 patch 判断是否相同节点的唯一标识，如果不设置 key，它的值就是 undefined，则可能永远认为这是两个相同节点，就会去做 pathVnode pdateChildren 的更新操作，这造成了大量的 dom 更新操作，所以设置唯一的 key 是必要的。

## 4.双向绑定原理

vue 中双向绑定是一个指令 v-model，可以绑定一个动态值到视图，同时视图中变化能改变该值。v-model 是语法糖，默认情况下相当于:value 和@input。

通常在表单元素可以直接使用 v-model，这是 vue 解析的时候对这些表单元素进行了处理，根据控件类型自动选取正确的方法来更新元素。

> v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：
>
> - text 和 textarea 元素使用 value property 和 input 事件；
> - checkbox 和 radio 使用 checked property 和 change 事件；
> - select 字段将 value 作为 prop 并将 change 作为事件。

如果是自定义组件的话要使用它需要在组件内绑定 props value 并在数据更新数据的时候用$emit('input')，也可以在组件里定义 modal 属性来自定义绑定的属性名和事件名称。

```
model: {
    prop: 'checked',
    event: 'change'
}
```

## 5.nextTick 原理

先看下官方文档的说明：

> Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。

nextTick 就是将回调函数放到队列里去，保证在异步更新 DOM 的 watcher 后面，从而获取到更新后的 DOM。

结合 src/core/util/next-tick 源码再进行分析。

首先是定义执行任务队列方法

```
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```

按照推入 callbacks 队列的顺序执行回调函数。

然后定义 timerFunc 函数，根据当前环境支持什么方法来确定调用哪个异步方法

判断的顺序是: `Promise > MutationObserver > setImmediate > setTimeout`

最后是定义 nextTick 方法：

```javasscript
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

其实 nextTick 就是一个把回调函数推入任务队列的方法。

了解到这里也差不多了，再深入的话可以说 vue 中数据变化，触发 watcher，watcher 进入队列的流程，可以看我的另一篇文章[vue 中的 nextTick 完整解析](https://juejin.cn/post/6934539800527503368)。

## 6.data 为什么是函数

如果组件里 data 直接写了一个对象的话，那么在模板中多次声明这个组件，组件中的 data 会指向同一个引用。

此时对 data 进行修改，会导致其他组件里的 data 也被修改。使用函数每次都重新声明一个对象，这样每个组件的 data 都有自己的引用，就不会出现相互污染的情况了。

## 7.组件通信方式

1. props 和`$on`、`$emit`

适合父子组件的通信，通过 props 传递响应式数据，父组件通过`$on`监听事件、子组件通过`$emit`发送事件。

on 和 emit 是在组件实例初始化的时候通过`initEvents`初始化事件，在组件实例 vm.\_events 赋值一个空的事件对象，通过这个对象实现事件的发布订阅。下面是事件注册的几个关键函数：

```
// 组件初始化event对象，收集要监听的事件和对应的回调函数
function initEvents (vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}
...
// 注册组件监听的事件
function updateComponentListeners (
  vm: Component,
  listeners: Object,
  oldListeners: ?Object
) {
  target = vm
  updateListeners(listeners, oldListeners || {}, add, remove, createOnceHandler, vm)
  target = undefined
}
```

2. `ref`、`$parent`、`$children`，还有`$root`

- ref: 在普通 DOM 元素上声明就是 DOM 元素的引用，组件就是指向组件实例。
- $parent:访问组件的父组件实例
- $children:访问所有的子组件集合(数组)
- $root: 指向 root 实例

3. Event Bus

通常是创建一个`空的Vue实例作为事件总线(事件中心)`，实现任何组件在这个实例上的事件触发与监听。原理就是一个发布订阅的模式，跟` $on``$emit `一样，在实例化一个组件的事件通过 initEvents 初始化一个空的 event 对象，再通过实例化后的这个 bus(vue 实例)手动的`$on`、`$emit`添加监听和触发的事件，代码在`src/core/instance/events`:

```
Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    const vm: Component = this
    // 传入的事件如果是数组，就循环监听每个事件
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn)
      }
    } else {
    // 如果已经有这个事件，就push新的回调函数进去，没有则先赋值空数组再push
      (vm._events[event] || (vm._events[event] = [])).push(fn)
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true
      }
    }
    return vm
  }
  ...
  Vue.prototype.$emit = function (event: string): Component {
    const vm: Component = this
    ...
    let cbs = vm._events[event]
    // 循环调用要触发的事件的回调函数数组
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      const args = toArray(arguments, 1)
      const info = `event handler for "${event}"`
      for (let i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info)
      }
    }
    return vm
  }
```

4. $attrs、$listeners

- `$attrs`: 包含了父作用域`没被props声明`绑定的数据，组件可以通过`v-bind="$attrs"`继续传给子组件
- `$listernes`: 包含了父作用域中的`v-on`(不含 .native 修饰器的) 监听事件，可以通过`v-on="$listeners"`传入内部组件

5. provide、inject

父组件通过 provide 注入一个依赖，其所有的子孙组件可以通过 inject 来接收。要注意的是官网有这一段话：

> 提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。

所以 Vue 不会对 provide 中的变量进行响应式处理。要想 inject 接受的变量是响应式的，provide 提供的变量本身就需要是响应式的。实际上在很多高级组件中都可以看到组件会将 this 通过 provide 传递给子孙组件，包括 element-ui、ant-design-vue 等。

6. vuex 状态管理实现通信
   vuex 是专为 vue 设计的状态管理模式。每个组件实例都有共同的 store 实例，并且 store.state 是响应式的，改变 state 唯一的办法就是通过在这个 store 实例上 commit 一个 mutation，方便跟踪每一个状态的变化，实现原理在下面的 vuex 原理里有讲。

## 8.computed、watch、method 有什么区别

computed：有缓存，有对应的 watcher，watcher 有个 lazy 为 true 的属性，表示只有在模板里去读取它的值后才会计算，并且这 watcher 在初始化的时候会赋值 dirty 为 true，watcher 只有 dirty 为 true 的时候才会重新求值，重新求值后会将 dirty 置为 false，false 会直接返回 watcher 的 value，只有下次 watcher 的响应式依赖有更新的时候，会将 watcher 的 dirty 再置为 false，这时候才会重新求值，这样就实现了 computed 的缓存。

watch：watcher 的对象每次更新都会执行函数。watch 更适用于数据变化时的异步操作。如果需要在某个数据变化时做一些事情，使用 watch。

method: 将方法在模板里使用，每次视图有更新都会重新执行函数，性能消耗较大。

## 9.生命周期

官网对生命周期的说明：

> 每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

生命周期就是每个 Vue 实例完成初始化、运行、销毁的一系列动作的钩子。

基本上可以说 8 个阶段创建前/后，载入前/后，更新前/后，销毁前/后。

- 创建前/后： 在 beforeCreate 阶段，vue 实例的挂载元素 el 还没有。
- 载入前/后：在 beforeMount 阶段，vue 实例的$el 和 data 都初始化了，但还是挂载之前为虚拟的 dom 节点，data.message 还未替换。在 mounted 阶段，vue 实例挂载完成，data.message 成功渲染。
- 更新前/后：当 data 变化时，会触发 beforeUpdate 和 updated 方法。
- 销毁前/后：在执行 destroy 方法后，对 data 的改变不会再触发周期函数，说明此时 vue 实例已经解除了事件监听以及和 dom 的绑定，但是 dom 结构依然存在

结合源码再理解，在源码中生命周期钩子是用 callHook 函数调用的。看下 callHook 函数：

```
function callHook (vm: Component, hook: string) {
  pushTarget()
  const handlers = vm.$options[hook]
  const info = `${hook} hook`
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook)
  }
  popTarget()
}
```

接收一个 vm 组件实例的参数和 hook，取组件实例的$options 传入的 hook 属性值，有的话会循环调用这个钩子的回调函数。在调用生命钩子的回调函数之前会临时 pushTarget 一个 null 值，也就是将 Dep.target 置为空来禁止在执行生命钩子的时候进行依赖收集。

vm.$emit('hook:' + hook)则是用来给父组件监听该组件的回调事件。

接下来看每个生命钩子具体调用的时机。

### 1. beforeCreate、created：

```javascript
Vue.prototype._init = function (options?: Object) {
    ...
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
    ...
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
 }
```

在执行 beforeCreate 之前调用了 `initLifecycle、initEvents、initRender`函数，所以 beforeCreate 是在初始化生命周期、事件、渲染函数之后的生命周期。

在执行 created 之前调用了 initInjections、initState、initProvide，这时候 created 初始化了 data、props、watcher、provide、inject 等，所以这时候就可以访问到 data、props 等属性。

### 2. beforeMount、mounted

在上面的代码片段可以看到 created 之后会进行 DOM 的挂载，执行的函数是 vm.$mount(vm.$options.el)，接下来分析下$mount 方法。

vm.$mount就是Vue.prototype.$mount 原型方法继承而来的。这个方法在`src/platforms/web/entry-runtime-with-compiler.js`下声明的，主要进行模板的解析，优先判断是否有 render 函数这个属性，没有再进行 tamplare 模板解析，最终都是用 render 函数进行渲染。

在解析完 render 函数后会调用 callHook(vm, 'beforeMount')，而后执行 vm.\_render()，再 callHook(vm, 'mounted')方法，这时候标记着 el 被新创建的 vm.$el 替换，并被挂载到实例上

### 3. beforeUpdate、updated

这两个钩子函数是在数据更新的时候进行回调的函数。在`src/core/instance/lifecycle.js`找到 beforeUpdate 调用的代码：

```
...
new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
...
```

\_isMounted 为 ture 的话（DOM 已经被挂载）会调用 callHook(vm, 'beforeUpdate')方法，然后会对虚拟 DOM 进行重新渲染。然后在/src/core/observer/scheduler.js 下的 flushSchedulerQueue()函数中渲染 DOM，flushSchedulerQueue 会刷新 watcher 队列并执行，执行完所有 watcher 的 run 方法之后（run 方法就是 watcher 进行 dom diff 并更新 DOM 的方法），再调用 callHook(vm, 'updated')，代码如下：

```
/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
 ...

 for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before()
    }
    watcher.run()
  }
  ...
  callUpdatedHooks(updatedQueue)
 ...
}

function callUpdatedHooks (queue) {
  let i = queue.length
  while (i--) {
    const watcher = queue[i]
    const vm = watcher.vm
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated')
    }
  }
}
```

### 4. beforeDestroy、destroyed

这两个钩子是 vue 实例销毁的钩子，定义在 Vue.prototype.$destroy 中：

```
Vue.prototype.$destroy = function () {
    const vm: Component = this
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy')
    vm._isBeingDestroyed = true
    // remove self from parent
    const parent = vm.$parent
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm)
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown()
    }
    let i = vm._watchers.length
    while (i--) {
      vm._watchers[i].teardown()
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--
    }
    // call the last hook...
    vm._isDestroyed = true
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null)
    // fire destroyed hook
    callHook(vm, 'destroyed')
    // turn off all instance listeners.
    vm.$off()
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null
    }
    if (vm.$vnode) {
      vm.$vnode.parent = null
    }
  }
}
```

在销毁之前执行 callHook(vm, 'beforeDestroy')，然后销毁的时候做了几件事：

- 如果有父元素，将父元素的$children 中把该组件实例移除。
- 移除 watchers，并在依赖订阅者中移除自己。
- 删除数据引用

### 5. activated、deactivated

剩下的还有`activated、deactivated、errorCaptured`三个钩子函数。

activated、deactivated 这两个钩子函数分别是在 keep-alive 组件激活和停用之后的回调。

errorCaptured 捕获到当子孙组件错误时会被调用，在源码中可以经常看到 try catch 中 catch 会调用 handleError 函数，handleError 会向组件所有的父级组件抛出异常，

```
function handleError (err: Error, vm: any, info: string) {
  pushTarget()
  try {
    if (vm) {
      let cur = vm
      while ((cur = cur.$parent)) {
        const hooks = cur.$options.errorCaptured
        if (hooks) {
          for (let i = 0; i < hooks.length; i++) {
            try {
              const capture = hooks[i].call(cur, err, vm, info) === false
              if (capture) return
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook')
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info)
  } finally {
    popTarget()
  }
}
```

分析完源码再一下官网图示，会更清楚：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efe0499e41d24b8e9912d2e0cdd7423f~tplv-k3u1fbpfcp-watermark.image)

## 10.keep-alive 原理

keep-alive 是 Vue.js 的一个内置组件。它能够将不活动的组件实例保存在内存中，而不是直接将其销毁，它是一个抽象组件，不会被渲染到真实 DOM 中，也不会出现在父组件链中。

include 与 exclude 两个属性，允许组件有条件地进行缓存，max 属性确定最多缓存多少组件实例。

keep-alive 是一个组件，跟其他组件一样有生命周期和 render 函数，keep-alive 包裹的分析 keep-alive 就是分析一个组件。

源码再`src/core/components/keep-alive`，created 声明了要缓存的组件对象，和存储的组件 keys，keep-alive 销毁的时候会用 pruneCacheEntry 将缓存的所有组件实例销毁，也就是调用组件实例的 destroy 方法。在挂载完成后监听 include 和 exclude，动态地销毁已经不满足 include 的组件和满足 exclude 的组件实例:

```
created () {
    this.cache = Object.create(null) // 存储需要缓存的组件
    this.keys = [] // 存储每个需要缓存的组件的key，即对应this.cache对象中的键值
},

// 销毁keep-alive组件的时候，对缓存中的每个组件执行销毁
destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
},
mounted () {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
},
```

接下来是 render 函数：

```
render () {
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot)
    // 如果vnode存在就取vnode的选项
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      //获取第一个有效组件的name
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode// 说明不用缓存，直接返回这个组件进行渲染
      }

      // 匹配到了，开始缓存操作
      const { cache, keys } = this // keep-alive组件的缓存组件和缓存组件对应的key
      // 获取第一个有效组件的key
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) {
        // 这个组件的实例用缓存中的组件实例替换
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        // 更新当前key在keys中的位置
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        // 如果缓存中的组件个数超过传入的max，销毁缓存中的LRU组件
        // LRU: least recently used 最近最少用，缓存淘汰策略
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      vnode.data.keepAlive = true
    }
    // 若第一个有效的组件存在，但其componentOptions不存在，就返回这个组件进行渲染
    // 或若也不存在有效的第一个组件，但keep-alive组件的默认插槽存在，就返回默认插槽的第一个组件进行渲染
    return vnode || (slot && slot[0])
}
```

代码做了详细的注释，这里再分析下 render 做了什么。

通过 this.$slots.default 拿到插槽组件，也就是 keep-alive 包裹的组件，getFirstComponentChild 获取第一个子组件，获取该组件的 name（存在组件名则直接使用组件名，否则会使用 tag）。接下来会将这个 name 通过 include 与 exclude 属性进行匹配，匹配不成功（说明不需要进行缓存）则不进行任何操作直接返回 vnode`（vnode节点描述对象，vue通过vnode创建真实的DOM）`。

匹配到了就开始缓存，根据 key 在 this.cache 中查找，如果存在则说明之前已经缓存过了，直接将缓存的 vnode 的 componentInstance（组件实例）覆盖到目前的 vnode 上面。否则将 vnode 存储在 cache 中。并且通过 remove(keys, key)，将当前的 key 从 keys 中删除再重新 keys.push(key)，这样就改变了当前 key 在 keys 中的位置。这个是为了实现 max 的功能，并且遵循缓存淘汰策略。

如果没匹配到，说明没缓存过，这时候需要进行缓存，并且判断当前缓存的个数是否超过 max 指定的个数，如果超过，则销毁 keys 里的最后一个组件，并从 keys 中移除，这个就是 LRU（`Least Recently Used ：最近最少使用 `）缓存淘汰算法。

最后返回 vnode 或者默认插槽的第一个组件进行 DOM 渲染。

## 12.虚拟 dom 和 diff 算法

虚拟 DOM 是对 DOM 的描述，用对象属性来描述节点，本质上是 JavaScript 对象。它有几个意义：

1. 具备跨平台的优势
   由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器、小程序、Node、原生应用、服务端渲染等等。

2. 提升渲染性能
   频繁变动 DOM 会造成浏览器的回流或者重回，而通过将大量的 DOM 操作搬运到 Javascript 中，运用 patching 算法来计算出真正需要更新的节点，可以减少真实 DOM 的操作次数，从而提高性能。

3. 代码可维护性更高
   通过虚拟 DOM 的抽象能力，可以用声明式写 UI 的方式，大大提高了我们的工作效率。

在 vue 中 template 最终会转成 render 函数，而 render 函数最终是执行的 createElement，生成 vnode，vnode 正是 vue 中用来表示虚拟 DOM 的类，看下 vnode：

```javascript
class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor(
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child(): Component | void {
    return this.componentInstance;
  }
}
```

看下其中关键的几个属性：

- tag: 当前节点的标签名

- data: 表示节点上的 class，attribute，style 以及绑定的事件

- children: 当前节点的子节点，是一个数组

- text: 当前节点的文本

- elm: 当前虚拟节点对应的真实 dom 节点

- key: 节点的 key 属性，被当作节点的标志，用以优化

- componentOptions: 组件的 option 选项

- componentInstance: 当前节点对应的组件的实例

- parent: 当前节点的父节点

- isStatic: 是否为静态节点

children 和 parent 是指当前的 vnode 的子节点和父节点，这样一个个 vnode 就形成了 DOM 树。

diff 算法发生在`视图更新`的时候，也就是数据更新的时候，`diff算法会将新旧虚拟DOM作对比，将变化的地方转换为DOM`。

当某个数据被修改的时候，依赖对应的 watcher 会通知更新，执行渲染函数会生成新的 vnode，vnode 再去与旧的 vnode 进行对比更新，这就是 vue 中的虚拟 dom diff 算法触发的流程。

看下组件更新的\_update 方法：

```
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const restoreActiveInstance = setActiveInstance(vm)
    vm._vnode = vnode
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
  }
  ...
```

vm.$el = vm.\_patch（），这个就是最终渲染的 DOM 元素，patch 就是 vue 中 diff 算法的函数，在 key 的作用章节有提过。patch 将新旧虚拟 DOM 节点比较后，最终返回真实的 DOM 节点。

### patch

看下 patch 代码（部分）：

```
function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    /*vnode不存在则直接调用销毁钩子*/
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true
      createElm(vnode, insertedVnodeQueue, parentElm, refElm)
    } else {
      /*标记旧的VNode是否有nodeType*/
      /*Github:https://github.com/answershuto*/
      const isRealElement = isDef(oldVnode.nodeType)
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        /*是同一个节点的时候直接修改现有的节点*/
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
   ...
   return vnode.elm
```

首先是判断是否有新的 vnode，没有代表是要销毁旧的 vnode，调用销毁组件的钩子。

然后判断是否有旧的 vnode，没有代表是新增，也就是新建 root 节点。

接下来判断旧的 vnode 是否是真实的元素，而不是组件，如果是组件并且用 someVnode 判断新旧节点是否是相同的节点（sameVnode 在 key 的作用章节有做解析），是进行 patchVnode，这时候进行真正的新老节点的 diff。`只有相同的节点才会进行diff算法！！！`

### patchVnode

```
function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    // 两个vnode相同，说明不需要diff，直接返回
    if (oldVnode === vnode) {
      return
    }

    // 如果传入了ownerArray和index，可以进行重用vnode，updateChildren里用来替换位置
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode)
    }

    const elm = vnode.elm = oldVnode.elm

    // 如果oldVnode的isAsyncPlaceholder属性为true时，跳过检查异步组件，return
    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
      } else {
        vnode.isAsyncPlaceholder = true
      }
      return
    }
    /*
      如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），
      并且新的VNode是clone或者是标记了once（标记v-once属性，只渲染一次），
      那么只需要替换elm以及componentInstance即可。
    */
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance
      return
    }

    let i
    const data = vnode.data
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode)
    }

    const oldCh = oldVnode.children
    const ch = vnode.children
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
    }
    /*如果这个VNode节点没有text文本时*/
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
      // 两个vnode都定义了子节点，并且不相同，就对子节点进行diff
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
      } else if (isDef(ch)) {
      // 如果只有新的vnode定义了子节点，则进行添加子节点的操作
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(ch)
        }
        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) {
      // 如果只有旧的vnode定义了子节点，则进行删除子节点的操作
        removeVnodes(oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text)
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
    }
  }
```

通过代码可知，patchVnode 分为多种情况，分析下子节点的 diff 过程 `(oldCh 为 oldVnode的子节点，ch 为 Vnode的子节点)`

1. oldCh、ch 都定义了调用 updateChildren 再进行 diff
2. 若 oldCh 不存在，ch 存在，首先清空 oldVnode 的文本节点，同时调用 addVnodes 方法将 ch 添加到 elm 真实 dom 节点当中
3. 若 oldCh 存在，ch 不存在，则删除 elm 真实节点下的 oldCh 子节点
4. 若 oldVnode 有文本节点，而 vnode 没有，那么就清空这个文本节点

`updateChildren`是子节点 diff 的函数，也是最重要的环节。

### updateChildren

```
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    // 声明oldCh和newCh的头尾索引和头尾的vnode，
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm

    const canMove = !removeOnly

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh)
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
        // 判断两边的头是不是相同节点
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
        // 判断尾部是不是相同节点
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
        // 判断旧节点头部是不是与新节点的尾部相同，相同则把头部往右移
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
        // 判断旧节点尾部是不是与新节点的头部相同，相同则把头部往左移
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
       /*
          生成一个key与旧VNode的key对应的哈希表
        */
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else {
          vnodeToMove = oldCh[idxInOld]
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            oldCh[idxInOld] = undefined
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
    // oldCh或者newCh遍历完，说明剩下的节点不是新增就是删除
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx)
    }
  }
```

首先给 startIndex 和 endIndex 来作为遍历的索引，在遍历的时候会先判断头尾节点是否相同，没有找到相同节点后再按照通用方式遍历查找；查找结束再按情况处理剩下的节点；借助 key 通常可以非常精确找到相同节点。

当 oldCh 或者 newCh 遍历完后(遍历完的条件就是 oldCh 或者 newCh 的 startIndex >= endIndex )，说明剩下的节点为新增或者删除，这时候停止 oldCh 和 newCh 的 diff。

## 13.Vuex 原理

vuex 是什么，先看下官方的原话：

> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

这段话可以得出几个结论：`Vuex是为vue.js服务的`，而像 redux 与 react 是解耦的，然后 vuex 是状态管理模式，所有的状态以一种可预测的方式发生变化。

设计思想：

Vuex 的设计思想，借鉴了 Flux、Redux，将数据存放到全局的 store，再将 store 挂载到每个 vue 实例组件中，利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。

原理可以从使用方式开始分析。

```
Vue.use(Vuex); // 1. vue的插件机制，安装vuex
let store = new Vuex.Store({ // 2.实例化store，调用install方法
 	state,
 	getters,
 	modules,
 	mutations,
 	actions,
 	plugins
});
new Vue({ // 3.注入store, 挂载vue实例
	store,
	render: h=>h(app)
}).$mount('#app');
```

Vue.use 是 vue 中的插件机制，内部会调用插件的 install 方法，vuex 的 install 方法：

```
export function install (_Vue) {
  if (Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  /*保存Vue，同时用于检测是否重复安装*/
  Vue = _Vue
  /*将vuexInit混淆进Vue的beforeCreate(Vue2.0)或_init方法(Vue1.0)*/
  applyMixin(Vue)
}
```

vuex 是个全局的状态管理，全局有且只能有一个 store 实例，所以在 install 的时候会判断是否已经安装过了，这个就是单例模式，确保一个类只有一个实例。在第一次 install 的时候会 applyMixin，applyMixin 是`/src/mixin`导入的方法:

```
function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```

先是判断下 vue 的版本，这边分析 vue2 的逻辑。利用 Vue.mixin 混入的机制，在组件实例的 beforeCreate 调用 vuexInit 方法，首先判断 options 是否有 store，没有代表是 root 节点，这时候要进行 store 初始化，没有的话就取父组件的$store 赋值，这样就实现了全局共用唯一的 store 实例。

store 实现的源码在`src/store.js`，其中最核心的是响应式的实现，通过 resetStoreVM(this, state)调用，看下这个方法：

```
function resetStoreVM (store, state, hot) {
  const oldVm = store._vm

  // bind store public getters
  store.getters = {}
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null)
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  const silent = Vue.config.silent
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  Vue.config.silent = silent

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store)
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.$$state = null
      })
    }
    Vue.nextTick(() => oldVm.$destroy())
  }
}
```

resetStoreVM 首先会遍历 wrappedGetters，使用 Object.defineProperty 方法对 store.getters 的每一个 getter 定义 get 方法，这样访问 this.$store.getter.test 就等同于访问 store.\_vm.test。

state 是通过 new 一个 Vue 对象来实现数据的“响应式化”，运用 Vue 的 data 属性来实现数据与视图的同步更新，computed 实现 getters 的计算属性。最终访问 store.state 也就是访问 store.\_vm.state。
