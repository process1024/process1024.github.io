React Hooks 是 React 16.8 引入的核心特性，允许在函数组件中使用状态（state）、生命周期方法等类组件特性，同时简化代码逻辑和提升代码复用性。以下是 Hooks 的核心概念与常用 API 总结：

---

### **1. 核心优势**

- **简化代码**：无需类组件写法，函数组件直接管理状态和副作用。
- **逻辑复用**：通过自定义 Hook 封装通用逻辑（如数据请求、表单处理）。
- **更清晰的组件结构**：按功能拆分代码（而非生命周期），提高可维护性。

---

### **2. 常用内置 Hooks**

#### **基础 Hooks**

- **`useState`**：管理组件状态。

  jsx

  复制

  ```
  const [count, setCount] = useState(0); // 初始值为0
  ```

  - `count`：当前状态值。
  - `setCount(newValue)`：更新状态（支持直接值或函数式更新）。

- **`useEffect`**：处理副作用（数据请求、DOM 操作、订阅等）。

  jsx

  复制

  ```
  useEffect(() => {
    // 副作用逻辑（组件挂载/更新时执行）
    fetchData();
    const timer = setInterval(doSomething, 1000);

    return () => {
      // 清理逻辑（组件卸载/重新执行副作用前执行）
      clearInterval(timer);
    };
  }, [dependency]); // 依赖数组：依赖变化时重新执行
  ```

  - 无依赖数组：每次渲染后执行。
  - 空依赖数组  `[]`：仅在组件挂载时执行一次。
  - 包含依赖：依赖变化时重新执行。

- **`useContext`**：访问 React Context 的值。

  jsx

  复制

  ```
  const theme = useContext(ThemeContext); // 获取最近的 ThemeContext 值
  ```

#### **进阶 Hooks**

- **`useReducer`**：复杂状态管理（类似 Redux）。

  jsx

  复制

  ```
  const [state, dispatch] = useReducer(reducer, initialState);
  ```

  - `reducer(state, action)`：处理状态更新逻辑。
  - `dispatch(action)`：触发状态更新。

- **`useCallback`**：缓存函数，避免子组件因函数引用变化导致无效渲染。

  jsx

  复制

  ```
  const memoizedFn = useCallback(() => {
    doSomething(a, b);
  }, [a, b]); // 依赖变化时重新创建函数
  ```

- **`useMemo`**：缓存计算结果，优化性能。

  jsx

  复制

  ```
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```

- **`useRef`**：保存 DOM 引用或可变值（不会触发重新渲染）。

  jsx

  复制

  ```
  const inputRef = useRef(null);
  <input ref={inputRef} />
  // 访问：inputRef.current.focus()
  ```

- **`useLayoutEffect`**：类似  `useEffect`，但同步执行（在 DOM 更新后、浏览器绘制前）。

  - 适用于需要同步读取 DOM 布局的场景（如测量元素尺寸）。

---

### **3. 自定义 Hook**

- **定义规则**：函数名以  `use`  开头，内部可调用其他 Hooks。

- **示例**：封装数据请求逻辑。

  jsx

  复制

  ```
  function useFetchData(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("请求失败:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [url]);

    return { data, loading };
  }

  // 使用
  const { data, loading } = useFetchData("https://api.example.com/data");
  ```

---

### **4. Hooks 规则**

1.  **顶层调用**：只能在函数组件或自定义 Hook 的顶层调用（不可在循环、条件、嵌套函数中使用）。
1.  **顺序稳定**：Hooks 的调用顺序必须保持一致（React 依赖调用顺序追踪状态）。

---

### **5. 常见场景示例**

#### **表单处理**

jsx

复制

```
function Form() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("提交名称:", name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

#### **组合使用 useEffect 和 useRef**

jsx

复制

```
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  return <div>计时: {seconds} 秒</div>;
}
```

---

### **6. 总结**

React Hooks 通过函数式编程范式，解决了类组件的冗杂代码和逻辑复用难题，同时提供了更灵活的代码组织方式。掌握常用 Hooks 及其组合使用，能显著提升 React 开发效率和代码质量。对于复杂场景，合理使用  `useMemo`  和  `useCallback`  可优化性能，而自定义 Hook 则能实现逻辑的高度复用。
