# Node

## 特点

- 非阻塞式的异步 I/O
  - Node.js 中采用了非阻塞型 I/O 机制，因此在执行了访问文件的代码之后，Nodejs 不会阻塞在那里等待文件获取完成，而是把这件事交给底层操作系统，使用回调函数的方式来处理异步的 IO，立即转而执行其它的代码
- 事件轮询
  - Nodejs 接收到的事件会放到事件队列中，而不是立即执行它，当 NodeJS 当前代码执行完后他会检查事件队列中是否有事件，如果有，他会取出来依次执行
- 单线程
  - Node.js 不为每个客户连接创建一个新的线程，而仅仅使用一个线程。当有用户连接了，就触发一个内部事件，通过非阻塞 I/O、事件驱动机制，让 Node.js 程序宏观上也是并行的
  - 优点：不会死锁、不用像多线程那样处处在意同步问题、没有线程切换带来的性能上的开销
  - 缺点：多核 CPU 需单独开子线程、错误会使得整个应用退出、大量计算会占用 CPU 从而无法调用异步 I/O
- 擅长 I/O 密集型
  - 主要体现在 Node 利用事件轮询的方式处理事件，而不是单开一个线程来为每一个请求服务
- 不擅长 CPU 密集型业务
  - 由于 Node 单线程，如果长时间运行计算将导致 CPU 不能释放，使得后续 I/O 无法发起。（解决办法是分解大型运算为多个小任务，不阻塞 I/O 发起）

## 全局对象 global

与在浏览器端不同，浏览器端将全局访问的对象挂到 window 上，而 nodejs 则将全局访问的对象挂到 global 对象上

## 全局变量

### __filename

__filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。

### __dirname

__dirname 表示当前执行脚本所在的目录。

### process

用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要 和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。

1. exit
当进程准备退出时触发。
2. beforeExit
3. 当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出，但是 ‘beforeExit’ 的监听器可以异步调用，这样 node 就会继续执行。
4. uncaughtException
当一个异常冒泡回到事件循环，触发这个事件。如果给异常添加了监视器，默认的操作（打印堆栈跟踪信息并退出）就不会发生。
5. Signal 事件
当进程接收到信号时就触发。信号列表详见标准的 POSIX 信号名，如 SIGINT、SIGUSR1 等。

```javascript
// 输出到终端
process.stdout.write("Hello World!" + "\n");

// 通过参数读取
process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
});

// 获取执行路径
console.log(process.execPath);

// 平台信息
console.log(process.platform);
```

### Buffer

关于 buffer 介绍在 -javascript- 章节有讲解，可以看前面的章节。

## 事件循环模型

事件循环使 Node.js 可以通过将操作转移到系统内核中来执行非阻塞 I/O 操作（尽管 JavaScript 是单线程的）。

由于大多数现代内核都是多线程的，因此它们可以处理在后台执行的多个操作。 当这些操作之一完成时，内核会告诉 Node.js，以便可以将适当的回调添加到轮询队列中以最终执行。

Node.js 启动时，它将初始化事件循环，处理提供的输入脚本，这些脚本可能会进行异步 API 调用，调度计时器或调用 process.nextTick， 然后开始处理事件循环。

```javascript
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

每个阶段都有一个要执行的回调 FIFO 队列。 尽管每个阶段都有其自己的特殊方式，但是通常，当事件循环进入给定阶段时，它将执行该阶段特定的任何操作，然后在该阶段的队列中执行回调，直到队列耗尽或执行回调的最大数量为止。 当队列已为空或达到回调限制时，事件循环将移至下一个阶段。

1. timers：此阶段执行由 setTimeout 和 setInterval 设置的回调。
2. pending callbacks：执行推迟到下一个循环迭代的 I/O 回调。
idle, prepare, ：仅在内部使用。
3. poll：取出新完成的 I/O 事件；执行与 I/O 相关的回调（除了关闭回调，计时器调度的回调和 setImmediate 之外，几乎所有这些回调） 适当时，node 将在此处阻塞。
4. check：在这里调用 setImmediate 回调。
5. close callbacks：一些关闭回调，例如 socket.on('close', ...)。
在每次事件循环运行之间，Node.js 会检查它是否正在等待任何异步 I/O 或 timers，如果没有，则将其干净地关闭。

### 各阶段详细解析

#### timers 计时器阶段

计时器可以在回调后面指定时间阈值，但这不是我们希望其执行的确切时间。 计时器回调将在经过指定的时间后尽早运行。 但是，操作系统调度或其他回调的运行可能会延迟它们，即执行的实际时间不确定。

```javascript
const fs = require('fs');

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
```

当事件循环进入 poll 阶段时，它有一个空队列（fs.readFile 尚未完成），因此它将等待直到达到最快的计时器 timer 阈值为止。

等待 95 ms 过去时，fs.readFile 完成读取文件，并将需要 10ms 完成的其回调添加到轮询 (poll) 队列并执行。

回调完成后，队列中不再有回调，此时事件循环已达到最早计时器 (timer) 的阈值 (100ms)，然后返回到计时器 (timer) 阶段以执行计时器的回调。

#### pending callbacks 阶段

此阶段执行某些系统操作的回调，例如 TCP 错误，平时无需关注。

#### 轮询 poll 阶段

轮询阶段具有两个主要功能：

1. 计算应该阻塞并 I/O 轮询的时间
2. 处理轮询队列 (poll queue) 中的事件

当事件循环进入轮询 (poll) 阶段并且没有任何计时器调度 (timers scheduled) 时，将发生以下两种情况之一：

1. 如果轮询队列 (poll queue) 不为空，则事件循环将遍历其回调队列，使其同步执行，直到队列用尽或达到与系统相关的硬性限制为止。
2. 如果轮询队列为空，则会发生以下两种情况之一：
2.1 如果已通过 setImmediate 调度了脚本，则事件循环将结束轮询 poll 阶段，并继续执行 check 阶段以执行那些调度的脚本。
2.2 如果脚本并没有 setImmediate 设置回调，则事件循环将等待 poll 队列中的回调，然后立即执行它们。
一旦轮询队列 (poll queue) 为空，事件循环将检查哪些计时器 timer 已经到时间。 如果一个或多个计时器 timer 准备就绪，则事件循环将返回到计时器阶段，以执行这些计时器的回调。

#### 检查阶段 check

此阶段允许在轮询 poll 阶段完成后立即执行回调。 如果轮询 poll 阶段处于空闲，并且脚本已使用 setImmediate 进入 check 队列，则事件循环可能会进入 check 阶段，而不是在 poll 阶段等待。

setImmediate 实际上是一个特殊的计时器，它在事件循环的单独阶段运行。 它使用 libuv API，该 API 计划在轮询阶段完成后执行回调。

通常，在执行代码时，事件循环最终将到达轮询 poll 阶段，在该阶段它将等待传入的连接，请求等。但是，如果已使用 setImmediate 设置回调并且轮询阶段变为空闲，则它将将结束并进入 check 阶段，而不是等待轮询事件。

> 注意：setImmediate为实验性方法，可能不会被批准成为标准，目前只有最新版本的 Internet Explorer 和 Node.js 0.10+ 实现了该方法

#### setImmediate 和 setTimeout 的区别

setImmediate 和 setTimeout 相似，但是根据调用时间的不同，它们的行为也不同。

- setImmediate 设计为在当前轮询 poll 阶段完成后执行脚本。
- setTimeout 计划在以毫秒为单位的最小阈值过去之后运行脚本。
Tips: 计时器的执行顺序将根据调用它们的上下文而有所不同。 如果两者都是主模块中调用的，则时序将受到进程性能的限制.

Tips: 计时器的执行顺序将根据调用它们的上下文而有所不同。 如果两者都是主模块中调用的，则时序将受到进程性能的限制.

两者的执行顺序是不固定的, 可能timeout在前, 也可能immediate在前

```javascript
   setTimeout(() => {
   console.log('timeout');
   }, 0);
   setImmediate(() => {
   console.log('immediate');
   });

// 在同一个I/O回调里执行
// setImmediate总是先执行

   const fs = require('fs');
   fs.readFile(__filename, () => {
  setTimeout(() => {
      console.log('timeout');
  }, 0);
  setImmediate(() => {
      console.log('immediate');
  });
   });
```

问题：那为什么在外部 (比如主代码部分 mainline) 这两者的执行顺序不确定呢？

解答：在 `主代码` 部分执行 setTimeout 设置定时器 (此时还没有写入队列)，与 setImmediate 写入 check 队列。

mainline 执行完开始事件循环，第一阶段是 timers，这时候 timers 队列可能为空，也可能有回调；

如果没有那么执行 check 队列的回调，下一轮循环在检查并执行 timers 队列的回调；

如果有就先执行 timers 的回调，再执行 check 阶段的回调。因此这是 timers 的不确定性导致的。

#### process.nextTick

process.nextTick 从技术上讲不是事件循环的一部分。 相反，无论事件循环的当前阶段如何，都将在当前操作完成之后处理 nextTickQueue

process.nextTick 和 setImmediate 的区别

1. process.nextTick 在同一阶段立即触发
2. setImmediate fires on the following iteration or 'tick' of the event loop (在事件循环接下来的阶段迭代中执行 - check 阶段)。

## 模块机制

### CommonJS

Node.js 应用由模块组成，采用 CommonJS 模块规范。

每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

如果想在多个文件分享变量，必须定义为 global 对象的属性。

CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。

CommonJS 模块的特点：

- 所有代码都运行在模块作用域，不会污染全局作用域
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存
- 模块加载的顺序，按照其在代码中出现的顺序
