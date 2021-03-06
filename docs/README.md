---
# 主题列表：juejin, github, smartblue, cyanosis, channing-cyan, fancy, hydrogen, condensed-night-purple, greenwillow, v-green, vue-pro, healer-readable, mk-cute, jzman, geek-black, awesome-green, qklhk-chocolate
# 贡献主题：https://github.com/xitu/juejin-markdown-themes
theme: condensed-night-purple
highlight:
---

# 前言

nextTick 是 Vue 中经常见并且实用的一个方法，这里做一个完全的解析。

首先看下 nextTick api 在官网中的描述。

> Vue.nextTick( [callback, context] ),在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

DOM 更新循环结束是什么意思，什么时候 DOM 更新循环结束？nextTick 怎么在 DOM 更新结束后执行延迟回调的？首先说下 Vue 中的异步更新队列。

## Vue 异步更新队列

Vue 异步更新队列，也就是异步渲染。在官网有这样一段原话

> 可能你还没有注意到，Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。<br>例如，当你设置 vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况我们不需要关心这个过程，但是如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。

这里涉及到的知识点，一个是事件循环（Event loop），一个是 Vue 中更新 Dom 的机制。

### 事件循环

事件循环（Event Loop），每轮也就是一个'tick'。简单概括浏览器中的事件循环

1. 宏队列 macrotask 一次只从队列中取一个任务执行，执行完后就去执行微任务队列中的任务
2. 微任务队列中所有的任务都会被依次取出来执行，直到 microtask queue 为空
3. UI render，但是 UI render 不一定会执行，这个是由浏览器自行判断决定的，但只要执行 UI render，它的节点是在执行完所有的 microtask 之后，下一个 macrotask 之前，紧跟着执行 UI render。(一轮事件循环结束)
4. 执行下一个宏任务
5. ...

在 Vue 中更新 DOM 是通过触发 setter，setter 再触发 watcher 对象的 update 方法，但 update 并不是立马更新，而是调用 queueWatcher 方法将当前触发的 watcher 对象放到 queueWatcher 的观察者队列中，在下一次 tick 的时候执行。源码在[这里](https://github.com/vuejs/vue/blob/dev/src/core/observer/scheduler.js#L187)。

总结下 Vue 异步渲染的步骤

依赖数据修改 -- 触发 setter -- watcher 对象的 update 方法 -- queueWatcher -- 将更新视图的方法放进 nextTick 回调里。

Vue 更新 DOM 正式调用了 nextTick 从而实践异步渲染，所以用户调 nextTick 才能获取更新后的 DOM。那为什么多次修改数据，用户 nextTick 还是能拿到更新后的 DOM 呢？这是因为同一个 watcher 被多次触发，只会被推入到队列中一次。看下源码中的 queueWatcher:

```javascript
export function queueWatcher(watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true

      if (process.env.NODE_ENV !== "production" && !config.async) {
        flushSchedulerQueue()
        return
      }
      nextTick(flushSchedulerQueue)
    }
  }
}
```

通过 has 这个对象判断这次触发的 watcher 是否已经在队列中了，由此实现多次修改响应式数据，视图只更新一次。

先看下官网提供的这段代码。

```javascript
var vm = new Vue({
  el: "#example",
  data: {
    message: "123",
  },
})
vm.message = "new message" // 更改数据
vm.$el.textContent === "new message" // false
Vue.nextTick(function () {
  vm.$el.textContent === "new message" // true
})
```

这段代码就跟上面分析的一样。

再看下这段代码

```javascript
var vm = new Vue({
  el: "#example",
  data: {
    message: "123",
  },
})
Vue.nextTick(function () {
  vm.$el.textContent === "new message" // false
})
vm.message = "new message" // 更改数据
vm.$el.textContent === "new message" // false
```

因为 message 的赋值操作放在了 nextTick 方法后面，所以 nextTick 回调函数的会异步更新队列的前面，而更新 DOM 则在后面，所以此时拿到的 DOM 不是更新后的。

## nextTick 源码实现

首先看下用法： Vue.nextTick 用于延迟执行一段代码，它接受 2 个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回 promise 对象。

在[next-tick 源码](https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js)里主要做了两个事情。

第一是根据当前的执行环境判断执行的回调是微任务还是宏任务，具体如下顺序：

`Promise > MutationObserver > setImmediate > setTimeout`

第二是执行任务队列方法。

看下 nextTick 函数做了什么，首先声明一个\_resolve，如果没有回调函数则返回一个 promise，所以在使用 this.$nextTick 时可以使用 await 等待其异步执行。在传入回调函数的情况下，将回调函数放入 callbacks 队列里，并且在每次事件循环首次使用 nextTick 的时候，执行 timer 函数，也就是上面判断的异步方法，在本轮的事件循环里，每次再调用 nextTick 函数则只将回调函数放入 callbacks 队列里。最终通过 flushCallbacks 方法执行任务队列的所有方法。

下面是源码加注释：

```javascript
import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

export let isUsingMicroTask = false
// 任务队列
const callbacks = []
// 每一轮任务队列的是否开启微(宏)任务的标识
let pending = false
// 执行任务队列方法
function flushCallbacks () {
  pending = false
  // 之所以要slice复制一份出来是因为有的cb执行过程中又会往callbacks中加入内容
  // 比如$nextTick的回调函数里又有$nextTick
  // 这些是应该放入到下一个轮次的nextTick去执行的,
  // 所以拷贝一份当前的,遍历执行完当前的即可,避免无休止的执行下去
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// timerFunc会把flushCallbacks给塞到事件循环的队尾，等待被调用。
// 根据当前环境支持什么方法则确定调用哪个
let timerFunc=

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

// 在使用nextTick 时将待执行待函数放入到执行的队尾
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  // 将回调函数push至队列中
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
  // 执行异步延迟函数 timerFunc(以pending做标识，只在每轮事件循环的首次调用执行)
  if (!pending) {
    pending = true
    timerFunc()
  }
  // 当 nextTick 没有传入函数参数的时候，返回一个 Promise 化的调用
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

## 总结

重点在于 Vue 更新 DOM 也是调用了 nextTick 方法，实现异步渲染，后面用户调用 nextTick 自然就排在 nextTick 的任务队列后面，也就能拿到更新后的 DOM 了。
