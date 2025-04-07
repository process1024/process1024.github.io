React Fiber 是 React 16 引入的核心架构重写，旨在提升应用性能与响应能力，支持更复杂的交互和异步渲染。以下是其核心要点：

---

### **1. 核心目标**

- **可中断的更新**：将渲染任务拆分为小单元（Fiber 节点），允许中断与恢复，避免长时间阻塞主线程。
- **优先级调度**：区分任务优先级（如用户交互 > 动画 > 数据加载），优先处理高优先级更新。
- **支持并发模式**：为后续功能（如并发渲染、Suspense）奠定基础。

---

### **2. 关键机制**

- **Fiber 节点**：

  - 每个组件对应一个 Fiber 节点，存储组件状态、DOM 节点、副作用等信息。
  - 通过链表结构（`child`、`sibling`、`return`  指针）实现非递归遍历，支持暂停与恢复。

- **双阶段渲染**：

  - **协调阶段（Reconciliation）** ：异步可中断，Diff 算法生成副作用列表。
  - **提交阶段（Commit）** ：同步不可中断，批量处理 DOM 更新与生命周期（如  `componentDidMount`）。

- **副作用管理**：在协调阶段收集所有变更（如 DOM 更新、状态变化），提交阶段统一执行。

---

### **3. 生命周期调整**

- 废弃不安全生命周期（如  `componentWillMount`），引入新 API（如  `getDerivedStateFromProps`）。
- 副作用推荐放入  `useEffect`（函数组件）或  `componentDidMount/Update`（类组件）。

---

### **4. 性能提升**

- **时间切片（Time Slicing）** ：利用浏览器空闲时段（如  `requestIdleCallback`）分片处理任务，保持 UI 流畅。
- **增量渲染**：逐步渲染更新，优先响应用户交互，减少卡顿。

---

### **5. 应用场景**

- **复杂界面**：如大型表单、实时图表，避免更新导致的帧率下降。
- **异步加载**：结合  `Suspense`  实现数据/代码分割的无缝加载体验。
- **动画优化**：确保动画优先级高于数据更新，保持流畅性。

---

### **6. 示例代码（优先级控制）**

jsx

复制

```
// 使用 useTransition 实现低优先级更新（React 18+）
import { useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      // 低优先级状态更新（如数据加载）
      setResource(fetchData());
    });
  };

  return (
    <button onClick={handleClick}>
      {isPending ? '加载中...' : '加载数据'}
    </button>
  );
}
```

---

### **总结**

React Fiber 通过可中断架构与智能调度机制，使 React 应用更高效、响应更快，并为未来特性（如并发模式）提供了基础。其核心在于平衡计算资源分配，确保关键交互始终优先，从而提升用户体验。
