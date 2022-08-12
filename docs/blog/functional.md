# 函数式编程

## 函数式编程含义

- 函数式编程是一种强调以函数使用为主的软件开发风格 ，也是一种范式。

- 某些函数式编程语言Haskell、lisp、Scheme等。

## js中函数式编程

- 数学中的函数

  f(x) = y;

- js中的函数

  ```js
     let factor = 3;
     let totalNum = num=>factor*num;
     console.log( totalNum(3) );
  ```

- 数学中的函数表达式相同的输入，输出是不变的，这就是函数编程的一个特性。将上面的js修改为符合函数式编程的规范如下。

  ```js
     let totalNum = (num,factor)=>factor*num;
     console.log( totalNum(3,3) );
  ```

- js是多范式编程语言，但是函数作为一等公民，函数式编程具有天然优势。

## 函数式编程中涉及到的概念

### 纯函数

- 函数式编程基于纯函数

  -  纯函数是对给定的输入返还相同输出的函数；例如

    ```js
    let double = value=>value*2;
    ```

- 纯函数意义

  - 纯函数可以产生可测试的代码

    - 不依赖外部环境计算，不会产生副作用，提高函数的复用性。

      ```js
      test('double(2) 等于 4', () => {
        expect(double(2)).toBe(4);
      })
      ```

  - 可读性更强 ，js函数不管是否是纯函数  都会有一个语义化的名称，更便于阅读。

  - 可以组装成复杂任务的可能性。符合模块化概念及单一职责原则。


## 高阶函数

- 高阶函数定义

  - 高阶函数：将函数作为参数或返回函数的函数称为高阶函数(Higher-Order Function)。

- 高阶函数的抽象

  - 一般高阶函数用于抽象通用问题，简而言之，高阶函数就是定义抽象。

    - 命令式循环(注重“如何”做，注重过程)；

      ```js
      let arr = [1,2,3];
      for(let i=0;i<arr.length;i++){
          console.log(arr[i]);
      }
      ```

    - 通过高阶函数抽象过程,声明式编程（注重做“什么”，注重结果）;

      ```js
      const forEach = function(arr,fn){
          for(let i=0;i<arr.length;i++){
              fn(arr[i]);
          }
      }
      let arr = [1,2,3];
      forEach(arr,(item)=>{
          console.log(item);
      })
      ```

      上面通过高阶函数 “forEach”来抽象循环"如何"做的逻辑,直接关注 做"什么"

    

- 高阶函数的缓存特性
  - 利用js函数的闭包

    - once 高阶函数

    ```js
    const once = (fn)=>{
        let done = false;
        return function(){
            if(!done){
                fn.apply(this,fn);
            }else{
                console.log("this fn is already execute");
            }
            done = true;
        }
    }
    
    function test(){
        console.log("test...");
    }
    let myfn =  once(test);
    myfn();
    myfn();
    ```



## 柯里化

- 什么是柯里化？

  - 柯里化是把一个多参数函数转化成一个嵌套的一元函数的过程；

    - 如下二元函数

      ```js
      let fn = (x,y)=>x+y;
      ```

    - 柯里化函数

      ```js
      const curry = function(fn){
          return function(x){
              return function(y){
                  return fn(x,y);
              }
          }
      }
      let myfn = curry(fn);
      console.log( myfn(1)(2) );
      ```

- 多参数函数柯里化

  ```js
  // 多参数柯里化；
      const curry = function(fn){
          return function curriedFn(...args){
              if(args.length<fn.length){
                  return function(){
                      return curriedFn(...args.concat([...arguments]));
                  }
              }
             return fn(...args);
          }
      }
      const fn = (x,y,z,a)=>x+y+z+a;
      const myfn = curry(fn);
      // console.log(myfn(1)(2));
      console.log(myfn(1)(2)(3)(1));
  ```

- 柯里化意义

  - 让纯函数更”纯“，每次接受一个参数，松散解耦
  - 某些语言及特定环境下只能接受一个参数

## 组合（composition）和管道（pipe）

### 组合（composition）

- 组合函数：无需创建新的函数，通过基础函数解决眼前问题。

  - compose组合

    可以封装组合函数来实现函数执行

    - 两个个函数组合（缓存两个函数，返回新的函数，执行的时候按创建时的从右往左顺序执行）

    ```js
    function afn(a){
        return a*2;
    }
    function bfn(b){
        return b*3;
    }
    const compose = (a,b)=>c=>a(b(c));
    let myfn =  compose(afn,bfn);
    console.log( myfn(2));
    ```

    - 多函数组合

      ```js
      const compose = (...fns)=>val=>fns.reverse().reduce((acc,fn)=>fn(acc),val);
      ```

      - 获取所有的单词

        ```js
        const wordNum = str=>str.match(/[\w\-]+/g);
        let str = "Mamba Out，Mamba Never Out";
        console.log(wordNum(str));
        ```

      - 统计长度

        ```js
        const countFn = arr=>arr.length;
        ```

      - 判断奇偶

        ```js
        const oddOrEven = num=>num%2===0?"偶数":"奇数";
        ```

      - 组合函数使用:找到单词统计长度最后判断奇偶数

      ```js
	  let str = "Mamba Out，Mamba Never Out";
      const myfn = compose(oddOrEven,countFn,wordNum);
      console.log(myfn(str));
      ```

### 管道（pipe）

  compose 执行是从右到左，pipe是从左至右的执行。函数如下：

```  js
const pipe = (...fns)=>val=>fns.reduce((acc,fn)=>fn(acc),val);
```

​    管道、组合 取舍 ：管道及组合最大区别在于执行顺序的不同，数据流向不同，达到目的是类似的。所以无优  劣之分，保持团队风格统一就好了。

  组合及管道的意义 把很多小函数组合起来完成更复杂的逻辑。



## js函数式编程库

- lodash.js 、ramda.js 、Underscore.js

- Redux 整体是通过函数式 编程思维实现的 ,在源码的src目录下就可以看到compose的文件,dispatch的执行顺序便是通过这个文件的函数组合，推荐阅读Redux源码，具体compose使用在[applyMiddleware](https://github.com/reduxjs/redux/blob/master/src/applyMiddleware.ts)文件里

- koa中间件执行顺序也就是洋葱模型也是用了函数组合compose的特性实现，具体是使用了koa-compose这个库，代码在这里 [git仓库](https://github.com/koajs/compose/blob/master/index.js)，koa的代码都很短，但很精华，推荐阅读。
