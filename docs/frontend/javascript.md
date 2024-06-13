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

### 浏览器的 Tasks、micro tasks、 queues 和 schedules

#### Promise

Promise 本身是同步的立即执行函数， 当在 executor 中执行 resolve 或者 reject 的时候, 此时是异步操作， 会先执行 then/catch 等，当主栈完成后，才会去调用 resolve/reject 中存放的方法执行，打印 p 的时候，是打印的返回结果，一个 Promise 实例。

#### async await

Async/Await 就是一个自执行的 generate 函数。利用 generate 函数的特性把异步的代码写成“同步”的形式。

async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。

## 垃圾回收

### 如何判断回收内容

如何确定哪些内存需要回收，哪些内存不需要回收，这是垃圾回收期需要解决的最基本问题。我们可以这样假定，**一个对象为活对象当且仅当它被一个根对象或另一个活对象指向**。根对象永远是活对象，它是被浏览器或 V8 所引用的对象。被局部变量所指向的对象也属于根对象，因为它们所在的作用域对象被视为根对象。全局对象（Node 中为 global，浏览器中为 window）自然是根对象。浏览器中的 DOM 元素也属于根对象。

### V8 回收策略

新生代的对象为存活时间较短的对象，老生代中的对象为存活时间较长或常驻内存的对象。分别对新生代和老生代使用 不同的垃圾回收算法来提升垃圾回收的效率。对象起初都会被分配到新生代，当新生代中的对象满足某些条件（后面会有介绍）时，会被移动到老生代（晋升）。

### 新生代算法

在新生代空间中，内存空间分为两部分，分别为 From 空间和 To 空间。在这两个空间中，必定有一个空间是使用的，另一个空间是空闲的。新分配的对象会被放入 From 空间中，当 From 空间被占满时，新生代 GC 就会启动了。算法会检查 From 空间中存活的对象并复制到 To 空间中，如果有失活的对象就会销毁。当复制完成后将 From 空间和 To 空间互换，这样 GC 就结束了。

### 老生代算法

老生代中的对象一般存活时间较长且数量也多，使用了两个算法，分别是标记清除算法和标记压缩算法。

在讲算法前，先来说下什么情况下对象会出现在老生代空间中：

1. 新生代中的对象是否已经经历过一次 Scavenge 算法，如果经历过的话，会将对象从新生代空间移到老生代空间中。
2. To 空间的对象占比大小超过 25 %。在这种情况下，为了不影响到内存分配，会将对象从新生代空间移到老生代空间中。

## 内存泄露和优化

### 什么是内存泄露？

内存泄露是指程序中已分配的堆内存由于某种原因未释放或者无法释放，造成系统内存的浪费，导致程序运行速度减慢甚至系统奔溃等后果。

### 常见的内存泄露的场景

- 缓存
- 作用域未释放（闭包）
- 没有必要的全局变量
- 无效的 DOM 引用
- 定时器未清除
- 事件监听为空白

### 内存泄露优化

1. 在业务不需要的用到的内部函数，可以重构到函数外，实现解除闭包。
2. 避免创建过多的生命周期较长的对象，或者将对象分解成多个子对象。
3. 避免过多使用闭包。
4. 注意清除定时器和事件监听器。
5. nodejs 中使用 stream 或 buffer 来操作大文件，不会受 nodejs 内存限制。
6. 即时清除无用的 DOM 引用。

## 二进制

在 JavaScript 中处理文件或原始文件数据有几种方式，例如：File、Blob、FileReader、ArrayBuffer、base64 等

### ArrayBuffer

#### 介绍

ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。ArrayBuffer 的内容不能直接操作，只能通过 DataView 对象或 TypedArray 对象来访问。这些对象用于读取和写入缓冲区内容。

ArrayBuffer 本身就是一个黑盒，不能直接读写所存储的数据，需要借助以下视图对象来读写：

- TypedArray：用来生成内存的视图，通过9个构造函数，可以生成9种数据格式的视图。
- DataViews：用来生成内存的视图，可以自定义格式和字节序。

1. ArrayBuffer 可以通过以下方式生成：

```javascript
new ArrayBuffer(bytelength)
```

ArrayBuffer()构造函数可以分配指定字节数量的缓冲区，其参数和返回值如下：

- 参数：它接受一个参数，即 bytelength，表示要创建数组缓冲区的大小（以字节为单位）；
- 返回值：返回一个新的指定大小的ArrayBuffer对象，内容初始化为0。

2. ArrayBuffer.prototype.byteLength
ArrayBuffer 实例上有一个 byteLength 属性，它是一个只读属性，表示 ArrayBuffer 的 byte 的大小，在 ArrayBuffer 构造完成时生成，不可改变。来看例子：

```javascript
const buffer = new ArrayBuffer(16); 
console.log(buffer.byteLength);  // 16
```

1. ArrayBuffer.prototype.slice()
ArrayBuffer 实例上还有一个 slice 方法，该方法可以用来截取 ArrayBuffer 实例，它返回一个新的 ArrayBuffer ，它的内容是这个 ArrayBuffer 的字节副本，从 begin（包括），到 end（不包括）。来看例子：

```javascript
const buffer = new ArrayBuffer(16); 
console.log(buffer.slice(0, 8));  // 16
```

这里会从 buffer 对象上将前8个字节生成一个新的ArrayBuffer对象。这个方法实际上有两步操作，首先会分配一段指定长度的内存，然后拷贝原来ArrayBuffer对象的置顶部分。

4. ArrayBuffer.isView()
ArrayBuffer 上有一个 isView()方法，它的返回值是一个布尔值，如果参数是 ArrayBuffer 的视图实例则返回 true，例如类型数组对象或 DataView 对象；否则返回 false。简单来说，这个方法就是用来判断参数是否是 TypedArray 实例或者 DataView 实例：

```javascript
const buffer = new ArrayBuffer(16);
ArrayBuffer.isView(buffer)   // false
```

```javascript
const view = new Uint32Array(buffer);
ArrayBuffer.isView(view)     // true
```

#### TypedArray

TypedArray是一组构造函数，一共包含九种类型，每一种都是一个构造函数。
TypedArray的构造函数接受三个参数，第一个ArrayBuffer（其实还可以是数组、视图这里不细说）对象，第二个视图开始的字节号（默认0），第三个视图结束的字节号（默认直到本段内存区域结束）。

#### DataView

DataView 就是一种更灵活的视图，DataView视图支持除Uint8ClampedArray以外的八种类型。DataView比使用TypedArray更方便，只需要简单的创建一次就能进行各种转换。

### Blob

Blob 对象表示一个不可变、原始数据的类文件对象。

```javascript
// 构造函数
const blob = new Blob(array, options)
```

array 是一个由ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成的数组，DOMStrings会被编码为UTF-8。

options 是一个可选，它可能会指定如下两个属性：

type，默认值为 ""，内容的MIME类型。
endings，默认值为"transparent"，用于指定包含行结束符\n的字符串如何被写入。 它是以下两个值中的一个： "native"，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 "transparent"，代表会保持blob中保存的结束符不变

```javascript
const blob1 = new Blob(['hello randy'], { type: "text/plain" });
```

### File

ile 描述文件信息的一个对象，可以让 JavaScript 访问文件信息。File 继承于 Blob。

```javascript
const file = new File(array, name[, options])
```

array 是一个由ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成，DOMStrings会被编码为UTF-8。

name 表示文件名称，或者文件路径。

options 是一个可选，它可能会指定如下两个属性：

type，默认值为 ""，内容的MIME类型。
lastModified: 数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。默认值为 Date.now()。

### Base64

Base64是一种编码格式，在前端经常会碰到，格式是 data:[<mediatype>][;base64],<data> 。

js内置了两个方法进行字符串的Base64的编码和解码。

```javascript
const str1 = "hello randy";

// 编码
const b1 = window.btoa(str1);
console.log(b1); // aGVsbG8gcmFuZHk=

// 解码
const str2 = window.atob(b1);
console.log(str2); // hello randy
```

- 优点

1. 可以将二进制数据（比如图片）转化为可打印字符，方便传输数据。
2. 对数据进行简单的加密，肉眼是安全的。
3. 如果是在html或者css处理图片，可以减少http请求。

- 缺点

1. 内容编码后体积变大， 至少大1/3。因为是三字节变成四个字节，当只有一个字节的时候，也至少会变成三个字节。
2. 编码和解码需要额外工作量。
