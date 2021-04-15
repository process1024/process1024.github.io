---
theme: cyanosis
---

# 前言

接上篇的面试文章，[vue2面试题大全含源码级回答](https://juejin.cn/post/6948587166679171102)
，这篇讲讲vue3常见的面试题及回答。

> 水平有限，有讲的不对的，希望各位大佬指出来，或者有其他的面试题想了解的，欢迎提出来，我研究后同步在本文。

> 个人整理的前端进阶知识网站，欢迎关注:    
> 仓库地址：https://github.com/chen-junyi/article   
> 网站地址: https://chen-junyi.github.io/article/ 、国内访问https://junyi-chen.gitee.io/article/

## 1. vue3与vue2有哪些不同

大的改动：
- proxy代替Object.definPrototety响应式系统
- ts代替flow类型检查
- 重构了目录结构，将代码主要分成三个独立的模块，更利于长期维护
- 重写vdom，优化编译性能
- 支持tree shaking
- 增加了composition api(setup)，让代码更易于维护

小的改动:
- 异步组件需要 defineAsyncComponent 方法来创建
- v-model 用法
- `v-if优先级高于v-for`
- destroyed 生命周期选项被重命名为 unmounted
- beforeDestroy 生命周期选项被重命名为 beforeUnmount
- render函数默认参数createElement移除改为全局引入
- 组件事件现在需要在 emits 选项中声明

新特性：
- 组合式 API
- Teleport
- framents（组件支持多个根节点）
- createRenderer（跨平台的自定义渲染器）

没有列举完，推荐看官网的[v3迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)

## 2. vue3在哪些方面提升了性能

### 1. 响应式系统提升

vue2在初始化的时候，通过Object.defineProperty对data的每个属性进行访问和修改的拦截，getter进行依赖收集、setter派发更新。在属性值是对象的时候还需要递归调用defineproperty。看下大致实现的代码：

```
function observe(target) {
  if (target && typeof target === "Object") {
    Object.keys(target).forEach((key) => {
      defineReactive(target, key, target[key])
    })
  }
}
function defineReactive(obj, key, val) {
  const dep = new Dep();
  observe(val) // 如果属性值是对象就遍历它的属性
  Object.defineProperty(obj, key, {
    get() {
      return val
    },
    set(v) {
      val = v
      dep.notify();
    }
  })
}
```

而如果属性是数组，还需要覆盖数组的七个方法(会改变原数组的七个方法)进行变更的通知：
```
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsToPatch.forEach(function (method) {
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    ob.dep.notify()
    return result
  })
})
```

从这几段代码可以看出Object.defineProperty的几个缺点：
- 初始化时需要遍历对象所有key，层级多的情况下，性能有一定影响
- 动态新增、删除对象属性无法拦截，只能用set/delete api代替
- 不支持新的Map、Set等数据结构
- 无法监控到数组下标的变化(监听的性能代价太大)

所以在vue3中用了proxy全面代替Object.defineProperty的响应式系统。proxy是比较新的浏览器特性，拦截的是整个对象而不是对象的属性，可以拦截多种方法，包括属性的访问、赋值、删除等操作，不需要初始化的时候遍历所有属性，并且是懒执行的特性，也就是在访问到的时候才会触发，当访问到对象属性的时候才会递归代理这个对象属性，所以性能比vue2有明显的优势。

总结下proxy的优势：
- 可以监听多种操作方法，包括动态新增的属性和删除属性、has、apply等操作
- 可以监听数组的索引和 length 等属性
- 懒执行，不需要初始化的时候递归遍历
- 浏览器新标准，性能更好，并且有持续优化的可能

看下大致实现拦截对象的方法。

```typescript
export function reactive(target: object) {
  if (target && (target as Target)[ReactiveFlags.IS_READONLY]) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers
  )
}
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>
) {
  const proxy = new Proxy(
    target,
    baseHandlers
  )
  proxyMap.set(target, proxy) // 用weakMap收集
  return proxy
}
```

### 2. 编译优化（虚拟dom优化）

编译优化主要是通过重写虚拟dom。优化的点包括`编译模板的静态标记`、`静态提升`、`事件缓存`

- 静态标记（PatchFlag）

根据尤大直播所说，更新的性能提升1.3~2倍，ssr提升2~3倍。
在对更新的节点进行对比的时候，只会去对比带有静态标记的节点。并且 PatchFlag 枚举定义了十几种类型，用以更精确的定位需要对比节点的类型。

看这段代码
```
<div id="app">
    <p>前端好好玩</p>
    <div>{{message}}</div>
</div>
```
vue2编译后的渲染函数：
```
function render() {
  with(this) {
    return _c('div', {
      attrs: {
        "id": "app"
      }
    }, [_c('p', [_v("前端好好玩")]), _c('div', [_v(
      _s(message))])])
  }
}
```

这个render函数会返回vnode，后面更新的时候vue2会调`patch`函数比旧vnode进行diff算法更新（在我的上篇文章有解析过），这时候对比是整个vnode，包括里面的静态节点`<p>前端好好玩</p>`，这样就会有一定的性能损耗。

vue3编译后的渲染函数:
```
import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("div", { id: "app" }, [
    _createVNode("p", null, "前端好好玩"),
    _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
  ]))
}
```

只有`_createVNode`这个函数带有第四个参数的才是非静态节点，也就是需要后续diff的节点。第四个参数是这个节点具体包含需要被diff的类型，比如是`text`节点，只有{{}}这种模板变量的绑定，后续只需要对比这个text即可，看下源码中定义了哪些枚举的元素类型:

```
  TEXT = 1,// 动态的文本节点
  CLASS = 1 << 1,  // 2，动态Class的节点
  STYLE = 1 << 2,  // 4，表示动态样式
  PROPS = 1 << 3,  // 8，动态属性
  FULL_PROPS = 1 << 4,  // 16 动态键名
  HYDRATE_EVENTS = 1 << 5,  // 32 带有事件监听器的节点
  STABLE_FRAGMENT = 1 << 6,   // 64 一个不会改变子节点顺序的
  KEYED_FRAGMENT = 1 << 7, // 128 带有 key 属性
  UNKEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key
  NEED_PATCH = 1 << 9,   // 512
  DYNAMIC_SLOTS = 1 << 10,  // 动态插槽
  HOISTED = -1,  // 静态提升的标记，不会被diff，下面的静态提升会提到
  BAIL = -2 //
```

> `//`位运算，有符号右移运算符，不了解的可以看我掘金的第一篇文章https://juejin.cn/post/6885185633028538376

- 静态提升

静态提升的意思就是把函数里的某些变量放到外面来，这样再次执行这个函数的时候就不会重新声明。vue3在编译阶段做了这个优化。还是上面那段代码，分别看下vue2和vue3编译后的不同

vue2:
```
function render() {
  with(this) {
    return _c('div', {
      attrs: {
        "id": "app"
      }
    }, [_c('p', [_v("前端好好玩")]), _c('div', [_v(_s(message))])])
  }
}
```

vue3:
```
import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"

const _hoisted_1 = { id: "app" }
const _hoisted_2 = /*#__PURE__*/_createVNode("p", null, "前端好好玩", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", _hoisted_1, [
    _hoisted_2,
    _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
  ]))
}
```
可以看到vue3将不变的节点声明放到了外面去执行，后面再渲染的时候直接去_hoited变量就行，而vue2每次render都需要执行_c生成新的节点。这里还有一个点，_hoisted_2的_createVNode第四个参数-1，标记这个节点永远不需要diff。

- 事件缓存

默认情况下事件被认为是动态变量，所以每次更新视图的时候都会追踪它的变化。但是正常情况下，我们的 @click 事件在视图渲染前和渲染后，都是同一个事件，基本上不需要去追踪它的变化，所以 Vue 3.0 对此作出了相应的优化叫事件监听缓存

```
<div id="app">
    <p @click="handleClick">前端好好玩</p>
</div>
```

vue3编译后：

```
import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

const _hoisted_1 = { id: "app" }

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", _hoisted_1, [
    _createVNode("p", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.handleClick && _ctx.handleClick(...args)))
    }, "前端好好玩")
  ]))
}
```

可以看到onClick有一个_cache判断缓存赋值的操作，从而变成静态节点

### 3. 源码体积的优化

vue3通过重构全局api和内部api，支持了tree shaking，任何一个函数，如ref、reavtived、computed等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小

## 3. 介绍下composition api

Composition API是vue3最重要的特性之一，为的是更好的`逻辑复用和代码组织`，解决options api在大型项目中，options api不好拆分和重用的问题。

Composition api声明在`setup`函数内，setup是在创建组件之前执行，这也意味着这时候组件实例尚未被创建，因此在 setup 选项中没有 this。

setup接受`props`和`context`两个参数，props是父组件传递的参数，并且原本就是响应式的，context则是一个普通的对象，包含`attrs`、`slots` 、`emit`三个属性。setup的返回值可以在模板和其他选项中访问到，也可以返回渲染函数。

vue2是将data选项的数据进行处理后成为响应式数据，而在vue3中要通过`reactive`和`ref`函数来进行数据定义后才是响应式数据。这样做的一个好处就是模板绑定的数据不一定是需要响应式的，vue3通过用户自行决定需要响应式的数据来处理，而vue2中要在模板中使用变量只能通过在data里声明，这样就造成了一定的性能浪费。

因为setup是在组件创建之前执行，需要访问组件实例或者 生命周期则要通过引入vue提供的函数，`getCurrentInstance`、`onMounted`等等，这就是函数式编程的方式，也更利于代码逻辑的拆分，再也不需要mixin来混入各种选项了。

利用这个特性，可以将一些复用的代码抽离出来作为一个函数，只要在使用的地方直接进行调用，非常灵活，看下官方提供的例子：

```
import { toRefs, reactive, onUnmounted, onMounted } from 'vue';
function useMouse(){
    const state = reactive({x:0,y:0});
    const update = e=>{
        state.x = e.pageX;
        state.y = e.pageY;
    }
    onMounted(()=>{
        window.addEventListener('mousemove',update);
    })
    onUnmounted(()=>{
        window.removeEventListener('mousemove',update);
    })

    return toRefs(state);
}
```

组件使用：
```
import useMousePosition from './mouse'
export default {
    setup() {
        const { x, y } = useMousePosition()
        return { x, y }
    }
}
```

从源码看下setup函数的实现和调用逻辑：
创建组件的时候会调`mountComponent`，在mountComponent调用`setupComponent`，再`setupStatefulComponent`函数处理。
```
function setupComponent(
  instance: ComponentInternalInstance,
  isSSR = false
) {
  isInSSRComponentSetup = isSSR

  const { props, children, shapeFlag } = instance.vnode
  const isStateful = shapeFlag & ShapeFlags.STATEFUL_COMPONENT
  initProps(instance, props, isStateful, isSSR)
  initSlots(instance, children)

  const setupResult = isStateful
    ? setupStatefulComponent(instance, isSSR)
    : undefined
  isInSSRComponentSetup = false
  return setupResult // 最终返回setup处理后的结果
}
function setupStatefulComponent(
  instance: ComponentInternalInstance,
  isSSR: boolean
) {
  const Component = instance.type as ComponentOptions

  if (__DEV__) {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config)
    }
    if (Component.components) {
      const names = Object.keys(Component.components)
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config)
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives)
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i])
      }
    }
  }
  // 0. create render proxy property access cache
  instance.accessCache = Object.create(null)
  // 1. create public instance / render proxy
  // also mark it raw so it's never observed
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers)
  if (__DEV__) {
    exposePropsOnRenderContext(instance)
  }
  // 2. call setup()
  const { setup } = Component
  // 如果有setup选项就进去setup的处理
  if (setup) {
    const setupContext = (instance.setupContext =
      setup.length > 1 ? createSetupContext(instance) : null)

    currentInstance = instance
    pauseTracking()
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      ErrorCodes.SETUP_FUNCTION,
      [__DEV__ ? shallowReadonly(instance.props) : instance.props, setupContext]
    )
    // 暂停依赖收集
    resetTracking()
    currentInstance = null
    
  } else {
    finishComponentSetup(instance, isSSR)
  }
}
```
判断有setup选项就通过`callWithErrorHandling`开始执行setup，这个函数执行setup选项并做了错误处理机制。
```
function callWithErrorHandling(
  fn: Function, // 这个fn就是setup选项
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
) {
  let res
  try {
    res = args ? fn(...args) : fn()
  } catch (err) {
    handleError(err, instance, type)
  }
  return res
}
```

执行完后在调`handleSetupResult`对setup的返回值进行判断是否合法，最终`finishComponentSetup`完成setup处理，看finishComponentSetup函数：
```
function finishComponentSetup(
  instance: ComponentInternalInstance,
  isSSR: boolean
) {
  const Component = instance.type as ComponentOptions

  // template / render function normalization
  if (__NODE_JS__ && isSSR) {
    if (Component.render) {
      instance.render = Component.render as InternalRenderFunction
    }
  } else if (!instance.render) {
    // could be set from setup()
    if (compile && Component.template && !Component.render) {
      if (__DEV__) {
        startMeasure(instance, `compile`)
      }
      Component.render = compile(Component.template, {
        isCustomElement: instance.appContext.config.isCustomElement,
        delimiters: Component.delimiters
      })
      if (__DEV__) {
        endMeasure(instance, `compile`)
      }
    }

    instance.render = (Component.render || NOOP) as InternalRenderFunction

    if (instance.render._rc) {
      instance.withProxy = new Proxy(
        instance.ctx,
        RuntimeCompiledPublicInstanceProxyHandlers
      )
    }
  }

  // support for 2.x options
  if (__FEATURE_OPTIONS_API__) {
    currentInstance = instance
    applyOptions(instance, Component)
    currentInstance = null
  }
  ...
}
```
这个函数是将绑定render函数到当前实例 instance，然后再调`applyOptions`函数对setup之外的`data`、`computed`、`watch`之类选项进行处理和生命周期钩子的调用。所以可以得出结论，setup里是访问不到data这些选项和其他生命周期。

## 4. vue3的响应式实现

在前面有说过，vue3的响应式是通过proxy实现的，在源码的`/packages/reactivity`目录下。

整个响应式系统的流程如下：

1、通过state = `reactive`(target) 来定义响应式数据(代理get、set、deleteProperty、has、ownKeys等操作)

2、通过 `effect` 声明依赖响应式数据的函数cb ( 例如视图渲染函数render函数)，并执行cb函数，执行过程中，会触发响应式数据 `getter`

3、在响应式数据 `getter`中进行 `track`依赖收集：存储响应式数据与更新函数 `cb` 的映射关系，存储于`targetMap`

4、当变更响应式数据时，触发`trigger`，根据`targetMap`找到关联的`cb`并执行

通过源码来看下这几个关键函数的实现：

### reactive

`/packages/reactivity/reactive`:

```
function reactive(target: object) {
  // 如果尝试观察只读代理，则返回只读版本
  if (target && (target as Target)[ReactiveFlags.IS_READONLY]) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  )
}
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>
) {
  // 如果不是对象，直接返回即可
  if (!isObject(target)) {
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  // 代理的目标本身就是代理的proxy，直接返回自身
  if (
    target[ReactiveFlags.RAW] &&
    !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
  ) {
    return target
  }
  // 代理的目标已经被代理过了，直接返回代理对象
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  // 只能代理可以代理的白名单类型对象.
  const targetType = getTargetType(target)
  if (targetType === TargetType.INVALID) {
    return target
  }
  // 判断代理的对象类型，来根据不同的类型做不同的代理处理
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  )
  // 保存在proxyMap，防止目标对象被重复代理
  proxyMap.set(target, proxy)
  return proxy
}
```

通过reactive调用`createReactiveObject`生成响应式对象，对传入的target有做不同情况的处理，proxy的handler用传入的`baseHandlers`，这里默认传入的是`mutableHandlers`，这个方法从`reactivity/baseHandlers`导入：
```typescript
mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
}
const get = /*#__PURE__*/ createGetter()
const set = /*#__PURE__*/ createSetter()
function createGetter(isReadonly = false, shallow = false) {
  return function get(target: Target, key: string | symbol, receiver: object) {
    
    ...
    
    // 对数组做特殊的读取值处理
    const targetIsArray = isArray(target)

    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver)
    }

    const res = Reflect.get(target, key, receiver)
    
    // track 依赖收集
    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }
   
    ...
    
    // 如果读取的值是对象，递归调用reactive，使之成为响应式对象
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}
function createSetter(shallow = false) {
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    let oldValue = (target as any)[key]
 
    ...
    
    // 判断是新增还是删除属性
    const hadKey =
      isArray(target) && isIntegerKey(key)
        ? Number(key) < target.length
        : hasOwn(target, key)
    const result = Reflect.set(target, key, value, receiver)
    // don't trigger if target is something up in the prototype chain of original
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        // trigger更新函数
        trigger(target, TriggerOpTypes.ADD, key, value)
      } else if (hasChanged(value, oldValue)) {
        trigger(target, TriggerOpTypes.SET, key, value, oldValue)
      }
    }
    return result
  }
}
```
mutableHandlers对get、set、deleteProperty等属性操作做了处理，这边只分析get 和set。在get的时候会进行`track`依赖收集，如果get的属性值是对象还会进行递归响应式处理，set则会`trigger`进行更新。

### track
```typescript
function track(target: object, type: TrackOpTypes, key: unknown) {
  if (!shouldTrack || activeEffect === undefined) {
    return
  }
  // 获取target对应依赖表
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  // 获取key对应的响应函数集合
  let dep = depsMap.get(key)
  if (!dep) {
    // 动态创建依赖关系
    depsMap.set(key, (dep = new Set()))
  }
  // activeEffect临时变量，getter触发依赖收集的回调函数，可能是render或者effect生成的副作用函数
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
    if (__DEV__ && activeEffect.options.onTrack) {
      activeEffect.options.onTrack({
        effect: activeEffect,
        target,
        type,
        key
      })
    }
  }
}
```

track依赖收集的时候，先判断`targetMap`是否存在访问的这个对象，targetMap是一个weakMap的结构，格式为`{target：{ key: [fn1,fn2]}}`，target为weakMap的key，value是一个map类型，key为访问到的target的属性，值为这个属性对应的`回调函数集合`。最后面有一个`activeEffect`的判断，这个判断依赖收集的`副作用函数`，这个副作用函数可能是`ffect`临时生成，也有可能是在`render渲染函数`临时生成的副作用函数。

### trigger
```typescript
function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown,
  oldTarget?: Map<unknown, unknown> | Set<unknown>
) {
  // 获取触发更新的target对应的属性映射集合
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    // never been tracked
    return
  }

  const effects = new Set<ReactiveEffect>()
  const add = (effectsToAdd: Set<ReactiveEffect> | undefined) => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => {
        if (effect !== activeEffect || effect.allowRecurse) {
          effects.add(effect)
        }
      })
    }
  }

  if (type === TriggerOpTypes.CLEAR) {
    // collection being cleared
    // trigger all effects for target
    depsMap.forEach(add)
  } else if (key === 'length' && isArray(target)) {
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= (newValue as number)) {
        add(dep)
      }
    })
  } else {
    // schedule runs for SET | ADD | DELETE
    if (key !== void 0) {
      add(depsMap.get(key))
    }

    // also run for iteration key on ADD | DELETE | Map.SET
    // 根据触发的操作类型做不同的回调函数处理
    switch (type) {
      case TriggerOpTypes.ADD:
        if (!isArray(target)) {
          add(depsMap.get(ITERATE_KEY))
          if (isMap(target)) {
            add(depsMap.get(MAP_KEY_ITERATE_KEY))
          }
        } else if (isIntegerKey(key)) {
          // new index added to array -> length changes
          add(depsMap.get('length'))
        }
        break
      case TriggerOpTypes.DELETE:
        if (!isArray(target)) {
          add(depsMap.get(ITERATE_KEY))
          if (isMap(target)) {
            add(depsMap.get(MAP_KEY_ITERATE_KEY))
          }
        }
        break
      case TriggerOpTypes.SET:
        if (isMap(target)) {
          add(depsMap.get(ITERATE_KEY))
        }
        break
    }
  }

  const run = (effect: ReactiveEffect) => {
    if (__DEV__ && effect.options.onTrigger) {
      effect.options.onTrigger({
        effect,
        target,
        key,
        type,
        newValue,
        oldValue,
        oldTarget
      })
    }
    if (effect.options.scheduler) {
      effect.options.scheduler(effect)
    } else {
      effect()
    }
  }
  // 执行所有的回调函数集合
  effects.forEach(run)
}
```

trigger触发更新，根据`targetsMap`找到target对应的属性依赖集合，再根据key找到回调函数集合，然后还要根据操作类型做处理后，执行所有的回调函数集合。

### effect
```typescript
// effect栈，保存所有的effect副作用函数
const effectStack: ReactiveEffect[] = []
function effect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions = EMPTY_OBJ
): ReactiveEffect<T> {
  if (isEffect(fn)) {
    fn = fn.raw
  }
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) {
    effect()
  }
  return effect
}
function createReactiveEffect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions
): ReactiveEffect<T> {
  const effect = function reactiveEffect(): unknown {
    if (!effect.active) {
      return options.scheduler ? undefined : fn()
    }
    // effectStack是否存在当前执行的副作用函数
    if (!effectStack.includes(effect)) {
      cleanup(effect)
      try {
        enableTracking()
        effectStack.push(effect)
        activeEffect = effect
        return fn()
      } finally {
        effectStack.pop()
        resetTracking()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  } as ReactiveEffect
  effect.id = uid++
  effect.allowRecurse = !!options.allowRecurse
  effect._isEffect = true
  effect.active = true
  effect.raw = fn
  effect.deps = []
  effect.options = options
  return effect
}
```

`effectStack`栈结构的数组，effect的时候，将副作用函数放入`effectStack`中，再将`activeEffect`临时赋值为当前执行的`effect`函数，用于`track`的时候将effect函数放入响应式数据的key的回调函数集合，effect执行完再将`activeEffect`赋值回原来`effectStack`的末位函数。

## 5. vue3的hook与react的hook有什么不同

毫无疑问，vue3的hook是借鉴了react的hook思想，vue3中自定义hook的写法与react看起来很类似，但实际使用是有些许不同，而内部实现原理更是完全不一样。

首先说下react hook的两个限制：
1. `只在最顶层使用 Hook`，`不要在循环，条件或嵌套函数中调用 Hook`
2. `只在 React 函数中调用 Hook`，`不要在普通的 JavaScript 函数中调用 Hook`

这在[react官网](https://zh-hans.reactjs.org/docs/hooks-rules.html#explanation)也有专门介绍。

只能在最顶层使用Hook，这是因为react的hook是依靠调用的顺序来确认state对应的hook，每次重新渲染都会再调用hook，所以需要确保hook的调用顺序是不会变的。

再说下vue与react使用的不同之处：
1. setup只执行一遍，而react每次渲染都会重新执行hook
2. Hook需要更新值时Vue可以直接赋值，而react则需要调用hook的赋值函数
3. 调用顺序无要求，也可以放在条件语句里

实现原理的不同：

vue中的hook是`响应式对象`，在render的时候读取到就会被`依赖收集`。

react中的hook本质是一个函数，每次重新渲染都需要再次调用，在声明的时候按照调用顺序通过{ value1, setValue1} -> { value2, setValue2 }的`链表`结构存储，所以需要严格限制 Hook 的执行顺序和禁止条件调用。

## 6. vue3的dom diff与react的dom diff不同

在前面的vue3性能提升的优化点有说过了vdom编译优化通过`静态节点、静态提升和事件缓存`，而在react是没有做这个实现的。

react是通过把vdom树以链表的结构，利用浏览器的空闲时间来做diff，也就是`时间切片`的概念，如果超过了16ms，有动画或者用户交互的任务，就把主进程控制权还给浏览器，等空闲了继续diff。用的是`requestIdleCallback`这个浏览器的api实现。
