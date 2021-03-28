# javascript

## 类型和语法

### 数据类型

JavaScript 现在有八种数据类型，包括7个基础类型和1个引用类型。

基础类型：

1. 空值（null）
2. 未定义（undefined）
3. 布尔值（ boolean）
4. 数字（number）
5. 字符串（string）
7. 符号（symbol，ES6新增）
8. 对象（bigint，ES11新增）

引用类型：

1. 对象(object)

### 类型判断

一般我们可以用 typeof 运算符来查看值的类型，它返回的是类型的字符串值，值包括上述的八种，除了null。

```
  typeof null === "object"; // true
```

这是历史遗留问题，因为第一版的 JavaScript 是用 32 位比特来存储值的，且是通过值的第 1 位或 3 位来识别类型的。而 null 表示为全 0，所以被错误地判断为 object。

1. 1：整型（int）
2. 000：引用类型（object）
3. 010：双精度浮点型（double）
4. 100：字符串（string）
5. 110：布尔型（boolean）

`JavaScript中的变量是没有类型的，只有值才有。--《你不知道的JavaScript（中卷）》`

js还有很多内置对象，内置对象是对象的子类型，有Function,Arguments,Math,Date,RegExp,Error。typeof输出都是object，除了Function。
function虽然本质也是对象，但是与普通对象相比，内部有一个[Call]方法，表示这个对象是可以调用的，typeof操作符在判断object的时候，如果内部有[[Call]]方法就会返回Function，这是一个特殊处理。

判断对象的子类型可以使用instanceof，内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

```
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

typeof 只能判断基本数据类型，instanceof可以判断对象的子类型，要更精确的判断数据类型，可以使用 Object.prototype.toString.call 方法，这方法会返回 "[object XXX]" 的字符串。

call 调用，是因为很多对象的 toString 方法被重写了。

总结类型判断：
1. 利用 typeof 判断
    - typeof 可以判断除 null 以外的基础类型，引用类型除了 Function，其他都返回 'object'
2. 利用 instanceof 判断引用类型
    - 类似于 [] instanceof Array
3. 利用 toString 判断引用类型
    - 类似于 Object.prototype.toString.call({}) === '[object Object]'

## 作用域和闭包

## this 和原型链

## ES6
