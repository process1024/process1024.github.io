# javascript

## 类型和语法

### 数据类型

JavaScript 现在有八种数据类型，包括 7 个基础类型和 1 个引用类型。

基础类型：

1. 空值（null）
2. 未定义（undefined）
3. 布尔值（ boolean）
4. 数字（number）
5. 字符串（string）
6. 符号（symbol，ES6 新增）
7. 任意精度的整数（bigint，ES11 新增）

引用类型：

1. Object：对象是属性的集合，每个属性都由“键值对”组成。JavaScript中的对象可以包含各种数据类型，包括其他对象、函数等。

2. Array：数组是一种特殊的对象，用于存储多个值，可以通过索引访问。

3. Function：函数在JavaScript中也是一种对象，可以被调用执行。

### 存储

原始数据类型：直接存储在栈（stack）中，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。

引用数据类型：同时存储在栈（stack）和堆（heap）中，占据空间大、大小不固定。引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

### 类型判断

一般我们可以用 typeof 运算符来查看值的类型，它返回的是类型的字符串值，值包括上述的八种，除了 null。

``` javascript
  typeof null === "object"; // true
```

这是历史遗留问题，因为第一版的 JavaScript 是用 32 位比特来存储值的，且是通过值的第 1 位或 3 位来识别类型的。而 null 表示为全 0，所以被错误地判断为 object。

1. 1：整型（int）
2. 000：引用类型（object）
3. 010：双精度浮点型（double）
4. 100：字符串（string）
5. 110：布尔型（boolean）

`JavaScript中的变量是没有类型的，只有值才有。--《你不知道的JavaScript（中卷）》`

js 还有很多内置对象，内置对象是对象的子类型，有 Function,Arguments,Math,Date,RegExp,Error。typeof 输出都是 object，除了 Function。
function 虽然本质也是对象，但是与普通对象相比，内部有一个[Call]方法，表示这个对象是可以调用的，typeof 操作符在判断 object 的时候，如果内部有[[Call]]方法就会返回 Function，这是一个特殊处理。

判断对象的子类型可以使用 instanceof，内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

``` javascript
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// expected output: true

console.log(auto instanceof Object);
// expected output: true
```

typeof 只能判断基本数据类型，instanceof 可以判断对象的子类型，要更精确的判断数据类型，可以使用 Object.prototype.toString.call 方法，这方法会返回 "[object XXX]" 的字符串。

call 调用，是因为很多对象的 toString 方法被重写了。

总结类型判断：

1. 利用 typeof 判断
   - typeof 可以判断除 null 以外的基础类型，引用类型除了 Function，其他都返回 'object'
2. 利用 instanceof 判断引用类型
   - 类似于 [] instanceof Array
3. 利用 toString 判断引用类型
   - 类似于 Object.prototype.toString.call({}) === '[object Object]'

## 作用域和闭包

作用域是根据名称查找变量的一套规则，作用域分为`全局作用域`和`局部作用域`、ES6的`块级作用域`

全局作用域：任何地方都能访问到的就是全局作用域

1. 函数最外部定义的变量拥有全局作用域
2. 未定义直接赋值的变量会自动声明为拥有全局作用域

```javascript
function a {
   b = 1
}
a()
console.log(b) //1 
```

1. 浏览器下window的属性拥有全局作用域

局部作用域：在固定的代码片段内可访问到，一般是指函数里声明的，所以局部作用域也叫函数作用域。

局部变量只作用于函数内，在函数开始执行时创建，函数执行完后局部变量会自动销毁。

块级作用域：只在变量声明的代码块内有效（let、const）

作用域链：执行函数时先从函数内部寻找局部变量， 没找到就往上个作用域寻找，直到全局作用域为止，这个作用域之间行程的引用关系就是作用域链

闭包：在一个函数内返回一个新的函数，新的函数引用了外部函数的变量，这时候这个变量会存在堆里，在这个函数执行完后不会被销毁。这就形成了闭包。
闭包的目的是将变量放在局部作用域，保留这个引用，实现变量的隐藏。

下面是简单的例子，foo执行返回的函数保留了foo的局部变量，形成闭包
``` javascript
function foo() {
   var a = 1
   return function() {
      a++
      console.log(a)
   }
}
var boo = foo()
```

闭包缺点和解决方法：带有闭包的函数只要存在就会一直保留隐藏的局部变量，根据`垃圾回收`的机制，被一个作用域引用的变量不会被回收，所以这个隐藏的局部变量将会一直存在，就造成了内存泄漏。解决方法就是销毁这个作用域，手动将这个函数对闭包变量的引用进行释放。接上面代码的例子：

```javascript
boo = null
```

## 原型链

每个函数都有 prototype 属性，这个属性就是原型，也是一个对象。创建的时候只有constructor一个属性，该属性指向构造函数本身。

每个对象都有`__proto__`属性，指向了创建该对象的构造函数的原型，也就是函数的prototype。这个属性指向了 [[prototype]]，但是 [[prototype]] 是内部属性，我们并不能访问到，所以使用 `__proto__` 来访问。

为了实现继承的方式，通过 `__proto__` 将对象和原型联系起来组成原型链，得以让对象可以访问到不属于自己的属性。

![图片](./images/prototype.png)

## 闭包

### 定义

闭包的定义很简单：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。

function A() {
  let a = 1
  function B() {
      console.log(a)
  }
  return B
}
你是否会疑惑，为什么函数 A 已经弹出调用栈了，为什么函数 B 还能引用到函数 A 中的变量。因为函数 A 中的变量这时候是存储在堆上的。现在的 JS 引擎可以通过逃逸分析辨别出哪些变量需要存储在堆上，哪些需要存储在栈上。

经典面试题，循环中使用闭包解决 var 定义函数的问题

for ( var i=1; i<=5; i++) {
	setTimeout( function timer() {
		console.log( i );
	}, i*1000 );
}
首先因为 setTimeout 是个异步函数，所有会先把循环全部执行完毕，这时候 i 就是 6 了，所以会输出一堆 6。

解决办法两种，第一种使用闭包

for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}
第二种就是使用 setTimeout  的第三个参数

for ( var i=1; i<=5; i++) {
	setTimeout( function timer(j) {
		console.log( j );
	}, i*1000, i);
}
第三种就是使用 let 定义 i 了

for ( let i=1; i<=5; i++) {
	setTimeout( function timer() {
		console.log( i );
	}, i*1000 );
}
因为对于 let 来说，他会创建一个块级作用域，相当于

{ // 形成块级作用域
  let i = 0
  {
    let ii = i
    setTimeout( function timer() {
        console.log( ii );
    }, i*1000 );
  }
  i++
  {
    let ii = i
  }
  i++
  {
    let ii = i
  }
  ...
}

## this

`this` 是很多人会混淆的概念，但是其实他一点都不难，你只需要记住几个规则就可以了。

```js
function foo() {
  console.log(this.a)
}
var a = 1
foo()

var obj = {
  a: 2,
  foo: foo
}
obj.foo()

// 以上两者情况 `this` 只依赖于调用函数前的对象，优先级是第二个情况大于第一个情况

// 以下情况是优先级最高的，`this` 只会绑定在 `c` 上，不会被任何方式修改 `this` 指向
var c = new foo()
c.a = 3
console.log(c.a)

// 还有种就是利用 call，apply，bind 改变 this，这个优先级仅次于 new
```

以上几种情况明白了，很多代码中的 `this` 应该就没什么问题了，下面让我们看看箭头函数中的 `this`

```js
function a() {
    return () => {
        return () => {
        	console.log(this)
        }
    }
}
console.log(a()()())
```

箭头函数其实是没有 `this` 的，这个函数中的 `this` 只取决于他外面的第一个不是箭头函数的函数的 `this`。在这个例子中，因为调用 `a` 符合前面代码中的第一个情况，所以 `this` 是 `window`。并且 `this` 一旦绑定了上下文，就不会被任何代码改变。

## 事件队列

JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。那么，为什么 JavaScript 不能有多个线程呢？这样能提高效率啊。

JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，为了避免复杂性，从一诞生，JavaScript 就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准。允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

### Event Loop

1. 主线程运行的时候会生成堆（heap）和栈（stack）；
2. js从上到下解析方法，将其中的同步任务按照执行顺序排列到执行栈中；
3. 当程序调用外部的API时，比如ajax、setTimeout等，会将此类异步任务挂起，继续执行执行栈中的任务，等异步任务返回结果后，再按照执行顺序排列到事件队列中；
4. 主线程先将执行栈中的同步任务清空，然后检查事件队列中是否有任务，如果有，就将第一个事件对应的回调推到执行栈中执行，若在执行过程中遇到异步任务，则继续将这个异步任务排列到事件队列中。
5. 主线程每次将执行栈清空后，就去事件队列中检查是否有任务，如果有，就每次取出一个推到执行栈中执行，这个过程是循环往复的... ...，这个过程被称为“Event Loop 事件循环”。

### **任务队列的本质**

- 所有同步任务都在主线程上执行，形成一个**执行栈**（execution context stack）。
- 主线程之外，还存在一个”**任务队列**”（task queue）。只要异步任务有了运行结果，就在”任务队列”之中放置一个事件。
- 一旦”执行栈”中的所有同步任务执行完毕，系统就会读取”任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
- 主线程不断重复上面的第三步。

### 异步任务

- setTimeOut、setInterval
- DOM 事件
- Promise

### JavaScript 实现异步编程的方法？

- 回调函数
- 事件监听
- 发布/订阅
- Promises 对象
- Async 函数[ES7]

### 关于 setTimeOut、setImmediate、process.nextTick()的比较

#### setTimeout()

将事件插入到了事件队列，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。
当主线程时间执行过长，无法保证回调会在事件指定的时间执行。
浏览器端每次 setTimeout 会有 4ms 的延迟，当连续执行多个 setTimeout，有可能会阻塞进程，造成性能问题。

#### setImmediate()

事件插入到事件队列尾部，主线程和事件队列的函数执行完成之后立即执行。和 setTimeout(fn,0)的效果差不多。
服务端 node 提供的方法。浏览器端最新的 api 也有类似实现:window.setImmediate,但支持的浏览器很少。

#### process.nextTick()

插入到事件队列尾部，但在下次事件队列之前会执行。也就是说，它指定的任务总是发生在所有异步任务之前，当前主线程的末尾。
大致流程：当前”执行栈”的尾部–>下一次 Event Loop（主线程读取”任务队列”）之前–>触发 process 指定的回调函数。
服务器端 node 提供的办法。用此方法可以用于处于异步延迟的问题。
可以理解为：此次不行，预约下次优先执行。

### 浏览器的 Tasks、microtasks、 queues 和 schedules

#### Promise

Promise 本身是同步的立即执行函数， 当在 executor 中执行 resolve 或者 reject 的时候, 此时是异步操作， 会先执行 then/catch 等，当主栈完成后，才会去调用 resolve/reject 中存放的方法执行，打印 p 的时候，是打印的返回结果，一个 Promise 实例。

#### async await

Async/Await 就是一个自执行的 generate 函数。利用 generate 函数的特性把异步的代码写成“同步”的形式。

async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。