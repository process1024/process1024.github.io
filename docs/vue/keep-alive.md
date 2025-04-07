# keep-alive

Vue 中的  `keep-alive`  是一个抽象组件，用于缓存不活动的组件实例，避免重复渲染，从而提升性能。它的核心原理可以拆解为以下几点：

---

## **1. 缓存机制**

- **缓存池结构**：`keep-alive`  内部维护一个  `cache`  对象（或数组）和  `keys`  队列，用于存储缓存的组件实例及对应的 VNode（虚拟节点）。

  - **键（Key）生成**：根据组件的  `name`  和  `key`（或自动生成的唯一标识）作为缓存的键。
  - **LRU 策略**：当缓存数量超过  `max`  限制时，按“最近最少使用”（LRU）淘汰最旧的缓存。

- **缓存流程**：

  1.  组件首次渲染时，实例被创建并存入  `cache`。
  1.  组件切换为不活动状态时，实例不会被销毁，而是保留在  `cache`  中。
  1.  组件再次激活时，直接从  `cache`  中复用实例，跳过创建和挂载过程。

---

## **2. 生命周期处理**

- **组件失活时**：

  - 触发  `deactivated`  钩子（替代  `destroyed`）。
  - 组件实例从 DOM 中移除，但保留在内存中。

- **组件激活时**：

  - 触发  `activated`  钩子（类似  `mounted`）。
  - 组件实例重新插入 DOM，并恢复之前的状态（如数据、DOM 结构）。

---

## **3. 渲染逻辑**

`keep-alive`  通过自定义  `render`  函数实现动态渲染：

1.  **匹配缓存规则**：

    - 根据  `include`  和  `exclude`  配置过滤需要缓存的组件。

1.  **获取 VNode**：

    - 通过  `$slots.default`  获取默认插槽的子组件 VNode。

1.  **命中缓存**：

    - 若子组件已缓存，直接返回缓存的 VNode。
    - 若未缓存，将当前 VNode 存入  `cache`，并记录键。

1.  **渲染优化**：

    - 缓存的 VNode 会被标记为  `keepAlive: true`，在 Vue 的 patch 过程中跳过重新创建实例。

---

## **4. 代码简析**

以 Vue 2.x 源码为例，核心逻辑如下：

javascript

复制

```
// 简化版 render 函数
render() {
  const slot = this.$slots.default;
  const vnode = getFirstComponentChild(slot); // 获取第一个子组件 VNode

  // 判断是否需要缓存
  const name = getComponentName(vnode.componentOptions);
  if (
    (name && (this.exclude && matches(this.exclude, name))) ||
    (this.include && !matches(this.include, name))
  ) {
    return vnode; // 不缓存，直接返回
  }

  const key = vnode.key == null
    ? vnode.componentOptions.Ctor.cid + (vnode.componentOptions.tag ? `::${vnode.componentOptions.tag}` : '')
    : vnode.key;

  if (this.cache[key]) {
    // 命中缓存，复用组件实例
    vnode.componentInstance = this.cache[key].componentInstance;
    // 调整 LRU 队列顺序
    remove(this.keys, key);
    this.keys.push(key);
  } else {
    // 未命中，存入缓存
    this.cache[key] = vnode;
    this.keys.push(key);
    // 超出 max 限制时删除最旧缓存
    if (this.max && this.keys.length > parseInt(this.max)) {
      pruneCacheEntry(this.cache, this.keys[0], this.keys);
    }
  }

  vnode.data.keepAlive = true; // 标记为 keep-alive 组件
  return vnode;
}
```

---

## **5. 注意事项**

1.  **状态保留**：缓存的组件会保留所有响应式数据和 DOM 状态（如滚动位置）。

1.  **生命周期**：`activated`  和  `deactivated`  必须与  `keep-alive`  配合使用。

1.  **动态组件**：通常与  `<component :is="...">`  结合使用，例如：

    html

    复制

    ```
    <keep-alive :include="['Home']" :max="5">
      <component :is="currentComponent"></component>
    </keep-alive>
    ```

    运行 HTML

1.  **性能权衡**：过度缓存可能占用内存，需合理配置  `include`/`exclude`  和  `max`。

---

## **6. 应用场景**

- **页面切换保留状态**：如 Tab 切换、表单填写中途跳转。
- **复杂组件复用**：如大型表格、树形组件避免重复渲染。
- **优化首次加载**：预缓存高频使用的组件。

---

## **总结**

`keep-alive`  通过缓存组件实例、复用 VNode 和自定义渲染逻辑，实现了组件状态的高效保留。其核心设计结合了 LRU 缓存策略和 Vue 的响应式系统，既保证了性能优化，又提供了灵活的配置选项（如  `include`、`exclude`  和  `max`）。理解其原理有助于在项目中合理使用，避免滥用导致内存泄漏。
