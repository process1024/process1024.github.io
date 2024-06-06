# 数据结构

## 栈

栈是一个线性结构，特点是只能在某一端添加或删除数据，遵循先进后出的原则

## 实现

每种数据结构都可以用很多种方式来实现，其实可以把栈看成是数组的一个子集，所以这里使用数组来实现

```js
class Stack {
  constructor() {
    this.stack = []
  }
  push(item) {
    this.stack.push(item)
  }
  pop() {
    this.stack.pop()
  }
  peek() {
    return this.stack[this.getCount() - 1]
  }
  getCount() {
    return this.stack.length
  }
  isEmpty() {
    return this.getCount() === 0
  }
}
```

## 队列

队列一个线性结构，特点是在某一端添加数据，在另一端删除数据，遵循先进先出的原则。

## 链表


链表是一个线性结构，同时也是一个天然的递归结构。链表结构可以充分利用计算机内存空间，实现灵活的内存动态管理。但是链表失去了数组随机读取的优点，同时链表由于增加了结点的指针域，空间开销比较大。

### 单向链表

```javascript
class LinkedList {
  // 初始链表长度为 0
  length = 0

  // 初始 head 为 null，head 指向链表的第一个节点
  head = null

  // 内部类（链表里的节点 Node）
  Node = class {
    data
    next = null

    constructor(data) {
      this.data = data
    }
  }

  // ------------ 链表的常见操作 ------------ //

  // append() 往链表尾部追加数据
  append(data) {
    // 1、创建新节点
    const newNode = new this.Node(data)

    // 2、追加新节点
    if (this.length === 0) {
      // 链表长度为 0 时，即只有 head 的时候
      this.head = newNode
    } else {
      // 链表长度大于 0 时，在最后面添加新节点
      let currentNode = this.head

      // 当 currentNode.next 不为空时，
      // 循序依次找最后一个节点，即节点的 next 为 null 时
      while (currentNode.next !== null) {
        currentNode = currentNode.next
      }

      // 最后一个节点的 next 指向新节点
      currentNode.next = newNode
    }

    // 3、追加完新节点后，链表长度 + 1
    this.length++
  }

  // insert() 在指定位置（position）插入节点
  insert(position, data) {
    // position 新插入节点的位置
    // position = 0 表示新插入后是第一个节点
    // position = 1 表示新插入后是第二个节点，以此类推

    // 1、对 position 进行越界判断，不能小于 0 或大于链表长度
    if (position < 0 || position > this.length) return false

    // 2、创建新节点
    const newNode = new this.Node(data)

    // 3、插入节点
    if (position === 0) {
      // position = 0 的情况
      // 让新节点的 next 指向 原来的第一个节点，即 head
      newNode.next = this.head

      // head 赋值为 newNode
      this.head = newNode
    } else {
      // 0 < position <= length 的情况

      // 初始化一些变量
      let currentNode = this.head // 当前节点初始化为 head
      let previousNode = null // head 的 上一节点为 null
      let index = 0 // head 的 index 为 0

      // 在 0 ~ position 之间遍历，不断地更新 currentNode 和 previousNode
      // 直到找到要插入的位置
      while (index++ < position) {
        previousNode = currentNode
        currentNode = currentNode.next
      }

      // 在当前节点和当前节点的上一节点之间插入新节点，即它们的改变指向
      newNode.next = currentNode
      previousNode.next = newNode
    }

    // 更新链表长度
    this.length++
    return newNode
  }

  // getData() 获取指定位置的 data
  getData(position) {
    // 1、position 越界判断
    if (position < 0 || position >= this.length) return null

    // 2、获取指定 position 节点的 data
    let currentNode = this.head
    let index = 0

    while (index++ < position) {
      currentNode = currentNode.next
    }

    // 3、返回 data
    return currentNode.data
  }

  // indexOf() 返回指定 data 的 index，如果没有，返回 -1。
  indexOf(data) {
    let currentNode = this.head
    let index = 0

    while (currentNode) {
      if (currentNode.data === data) {
        return index
      }
      currentNode = currentNode.next
      index++
    }

    return -1
  }

  // update() 修改指定位置节点的 data
  update(position, data) {
    // 涉及到 position 都要进行越界判断
    // 1、position 越界判断
    if (position < 0 || position >= this.length) return false

    // 2、痛过循环遍历，找到指定 position 的节点
    let currentNode = this.head
    let index = 0
    while (index++ < position) {
      currentNode = currentNode.next
    }

    // 3、修改节点 data
    currentNode.data = data

    return currentNode
  }

  // removeAt() 删除指定位置的节点
  removeAt(position) {
    // 1、position 越界判断
    if (position < 0 || position >= this.length) return null

    // 2、删除指定 position 节点
    let currentNode = this.head
    if (position === 0) {
      // position = 0 的情况
      this.head = this.head.next
    } else {
      // position > 0 的情况
      // 通过循环遍历，找到指定 position 的节点，赋值到 currentNode

      let previousNode = null
      let index = 0

      while (index++ < position) {
        previousNode = currentNode
        currentNode = currentNode.next
      }

      // 巧妙之处，让上一节点的 next 指向到当前的节点的 next，相当于删除了当前节点。
      previousNode.next = currentNode.next
    }

    // 3、更新链表长度 -1
    this.length--

    return currentNode
  }

  // remove() 删除指定 data 的节点
  remove(data) {
    this.removeAt(this.indexOf(data))
  }

  // isEmpty() 判断链表是否为空
  isEmpty() {
    return this.length === 0
  }

  // size() 获取链表的长度
  size() {
    return this.length
  }

  // toString() 链表数据以字符串形式返回
  toString() {
    let currentNode = this.head
    let result = ""

    // 遍历所有的节点，拼接为字符串，直到节点为 null
    while (currentNode) {
      result += currentNode.data + " "
      currentNode = currentNode.next
    }

    return result
  }
}
```

### 双向链表

```javascript
class DoublyLinkedList extends LinkedList {
  constructor() {
    super()
    this.tail = null
  }

  // ------------ 链表的常见操作 ------------ //
  // append(element) 往双向链表尾部追加一个新的元素
  // 重写 append()
  append(element) {
    // 1、创建双向链表节点
    const newNode = new DoublyNode(element)

    // 2、追加元素
    if (this.head === null) {
      this.head = newNode
      this.tail = newNode
    } else {
      // ！！跟单向链表不同，不用通过循环找到最后一个节点
      // 巧妙之处
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }

    this.length++
  }

  // insert(position, data) 插入元素
  // 重写 insert()
  insert(position, element) {
    // 1、position 越界判断
    if (position < 0 || position > this.length) return false

    // 2、创建新的双向链表节点
    const newNode = new DoublyNode(element)

    // 3、判断多种插入情况
    if (position === 0) {
      // 在第 0 个位置插入

      if (this.head === null) {
        this.head = newNode
        this.tail = newNode
      } else {
        //== 巧妙之处：相处腾出 this.head 空间，留个 newNode 来赋值 ==//
        newNode.next = this.head
        this.head.perv = newNode
        this.head = newNode
      }
    } else if (position === this.length) {
      // 在最后一个位置插入

      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    } else {
      // 在 0 ~ this.length 位置中间插入

      let targetIndex = 0
      let currentNode = this.head
      let previousNode = null

      // 找到要插入位置的节点
      while (targetIndex++ < position) {
        previousNode = currentNode
        currentNode = currentNode.next
      }

      // 交换节点信息
      previousNode.next = newNode
      newNode.prev = previousNode

      newNode.next = currentNode
      currentNode.prev = newNode
    }

    this.length++

    return true
  }

  // getData() 继承单向链表
  getData(position) {
    return super.getData(position)
  }

  // indexOf() 继承单向链表
  indexOf(data) {
    return super.indexOf(data)
  }

  // removeAt() 删除指定位置的节点
  // 重写 removeAt()
  removeAt(position) {
    // 1、position 越界判断
    if (position < 0 || position > this.length - 1) return null

    // 2、根据不同情况删除元素
    let currentNode = this.head
    if (position === 0) {
      // 删除第一个节点的情况

      if (this.length === 1) {
        // 链表内只有一个节点的情况
        this.head = null
        this.tail = null
      } else {
        // 链表内有多个节点的情况
        this.head = this.head.next
        this.head.prev = null
      }
    } else if (position === this.length - 1) {
      // 删除最后一个节点的情况

      currentNode = this.tail
      this.tail.prev.next = null
      this.tail = this.tail.prev
    } else {
      // 删除 0 ~ this.length - 1 里面节点的情况

      let targetIndex = 0
      let previousNode = null
      while (targetIndex++ < position) {
        previousNode = currentNode
        currentNode = currentNode.next
      }

      previousNode.next = currentNode.next
      currentNode.next.perv = previousNode
    }

    this.length--
    return currentNode.data
  }

  // update(position, data) 修改指定位置的节点
  // 重写 update()
  update(position, data) {
    // 1、删除 position 位置的节点
    const result = this.removeAt(position)

    // 2、在 position 位置插入元素
    this.insert(position, data)
    return result
  }

  // remove(data) 删除指定 data 所在的节点（继承单向链表）
  remove(data) {
    return super.remove(data)
  }

  // isEmpty() 判断链表是否为空
  isEmpty() {
    return super.isEmpty()
  }

  // size() 获取链表的长度
  size() {
    return super.size()
  }

  // forwardToString() 链表数据从前往后以字符串形式返回
  forwardToString() {
    let currentNode = this.head
    let result = ""

    // 遍历所有的节点，拼接为字符串，直到节点为 null
    while (currentNode) {
      result += currentNode.data + "--"
      currentNode = currentNode.next
    }

    return result
  }

  // backwardString() 链表数据从后往前以字符串形式返回
  backwardString() {
    let currentNode = this.tail
    let result = ""

    // 遍历所有的节点，拼接为字符串，直到节点为 null
    while (currentNode) {
      result += currentNode.data + "--"
      currentNode = currentNode.prev
    }

    return result
  }
}
```

## 树

### 二叉树

树拥有很多种结构，二叉树是树中最常用的结构，同时也是一个天然的递归结构。

二叉树拥有一个根节点，每个节点至多拥有两个子节点，分别为：左节点和右节点。树的最底部节点称之为叶节点，当一颗树的叶数量数量为满时，该树可以称之为满二叉树。

### 二分搜索树

二分搜索树也是二叉树，拥有二叉树的特性。但是区别在于二分搜索树每个节点的值都比他的左子树的值大，比右子树的值小。

这种存储方式很适合于数据搜索。如下图所示，当需要查找 6 的时候，因为需要查找的值比根节点的值大，所以只需要在根节点的右子树上寻找，大大提高了搜索效率。

## 堆

堆通常是一个可以被看做一棵树的数组对象。

堆的实现通过构造二叉堆，实为二叉树的一种。这种数据结构具有以下性质。

任意节点小于（或大于）它的所有子节点
堆总是一棵完全树。即除了最底层，其他层的节点都被元素填满，且最底层从左到右填入。
将根节点最大的堆叫做最大堆或大根堆，根节点最小的堆叫做最小堆或小根堆。

优先队列也完全可以用堆来实现，操作是一模一样的。
