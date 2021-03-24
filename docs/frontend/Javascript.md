# javascript

## 类型和语法

### 内置类型

JavaScript 有七种内置类型：

- 空值（null）
- 未定义（undefined）
- 布尔值（ boolean）
- 数字（number）
- 字符串（string）
- 符号（symbol，ES6 中新增）
- 对象（object）

一般我们可以用 typeof 运算符来查看值的类型，它返回的是类型的字符串值。其中 null 比较特殊：

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

typeof 只能判断基本数据类型，要更精确的判断数据类型，可以使用 Object.prototype.toString.call 方法，这方法会返回 "[object XXX]" 的字符串。

## 作用域和闭包

## this 和原型链

## ES6
