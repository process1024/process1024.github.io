(self.webpackChunkvuepress_starter=self.webpackChunkvuepress_starter||[]).push([[780],{8256:(n,s,a)=>{"use strict";a.r(s),a.d(s,{data:()=>p});const p={key:"v-6ca1b8e7",path:"/vue/NextTick.html",title:"nextTick",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"Vue 异步更新队列",slug:"vue-异步更新队列",children:[{level:3,title:"事件循环",slug:"事件循环",children:[]}]},{level:2,title:"nextTick 源码实现",slug:"nexttick-源码实现",children:[]},{level:2,title:"总结",slug:"总结",children:[]}],filePathRelative:"vue/NextTick.md",git:{updatedTime:1616037992e3,contributors:[]}}},1885:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>d});var p=a(6252);const t=(0,p.uE)('<h1 id="nexttick"><a class="header-anchor" href="#nexttick">#</a> nextTick</h1><p>nextTick 是 Vue 中经常见并且实用的一个方法，这里做一个完全的解析。</p><p>首先看下 nextTick api 在官网中的描述。</p><blockquote><p>Vue.nextTick( [callback, context] ),在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。</p></blockquote><p>DOM 更新循环结束是什么意思，什么时候 DOM 更新循环结束？nextTick 怎么在 DOM 更新结束后执行延迟回调的？首先说下 Vue 中的异步更新队列。</p><h2 id="vue-异步更新队列"><a class="header-anchor" href="#vue-异步更新队列">#</a> Vue 异步更新队列</h2><p>Vue 异步更新队列，也就是异步渲染。在官网有这样一段原话</p><blockquote><p>可能你还没有注意到，Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。<br>例如，当你设置 vm.someData = &#39;new value&#39;，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况我们不需要关心这个过程，但是如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。</p></blockquote><p>这里涉及到的知识点，一个是事件循环（Event loop），一个是 Vue 中更新 Dom 的机制。</p><h3 id="事件循环"><a class="header-anchor" href="#事件循环">#</a> 事件循环</h3><p>事件循环（Event Loop），每轮也就是一个&#39;tick&#39;。简单概括浏览器中的事件循环</p><ol><li>宏队列 macrotask 一次只从队列中取一个任务执行，执行完后就去执行微任务队列中的任务</li><li>微任务队列中所有的任务都会被依次取出来执行，直到 microtask queue 为空</li><li>UI render，但是 UI render 不一定会执行，这个是由浏览器自行判断决定的，但只要执行 UI render，它的节点是在执行完所有的 microtask 之后，下一个 macrotask 之前，紧跟着执行 UI render。(一轮事件循环结束)</li><li>执行下一个宏任务</li><li>...</li></ol>',12),e=(0,p.Uk)("在 Vue 中更新 DOM 是通过触发 setter，setter 再触发 watcher 对象的 update 方法，但 update 并不是立马更新，而是调用 queueWatcher 方法将当前触发的 watcher 对象放到 queueWatcher 的观察者队列中，在下一次 tick 的时候执行。源码在"),o={href:"https://github.com/vuejs/vue/blob/dev/src/core/observer/scheduler.js#L187",target:"_blank",rel:"noopener noreferrer"},c=(0,p.Uk)("这里"),l=(0,p.Uk)("。"),u=(0,p.uE)('<p>总结下 Vue 异步渲染的步骤</p><p>依赖数据修改 -- 触发 setter -- watcher 对象的 update 方法 -- queueWatcher -- 将更新视图的方法放进 nextTick 回调里。</p><p>Vue 更新 DOM 正式调用了 nextTick 从而实践异步渲染，所以用户调 nextTick 才能获取更新后的 DOM。那为什么多次修改数据，用户 nextTick 还是能拿到更新后的 DOM 呢？这是因为同一个 watcher 被多次触发，只会被推入到队列中一次。看下源码中的 queueWatcher:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">queueWatcher</span><span class="token punctuation">(</span><span class="token parameter">watcher<span class="token operator">:</span> Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> id <span class="token operator">=</span> watcher<span class="token punctuation">.</span>id\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>has<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    has<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>flushing<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>watcher<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n      <span class="token comment">// if already flushing, splice the watcher based on its id</span>\n      <span class="token comment">// if already past its id, it will be run next immediately.</span>\n      <span class="token keyword">let</span> i <span class="token operator">=</span> queue<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>\n      <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> index <span class="token operator">&amp;&amp;</span> queue<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>id <span class="token operator">&gt;</span> watcher<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        i<span class="token operator">--</span>\n      <span class="token punctuation">}</span>\n      queue<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> watcher<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment">// queue the flush</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>waiting<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      waiting <span class="token operator">=</span> <span class="token boolean">true</span>\n\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&quot;production&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>config<span class="token punctuation">.</span>async<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">flushSchedulerQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token keyword">return</span>\n      <span class="token punctuation">}</span>\n      <span class="token function">nextTick</span><span class="token punctuation">(</span>flushSchedulerQueue<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>通过 has 这个对象判断这次触发的 watcher 是否已经在队列中了，由此实现多次修改响应式数据，视图只更新一次。</p><p>先看下官网提供的这段代码。</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  el<span class="token operator">:</span> <span class="token string">&quot;#example&quot;</span><span class="token punctuation">,</span>\n  data<span class="token operator">:</span> <span class="token punctuation">{</span>\n    message<span class="token operator">:</span> <span class="token string">&quot;123&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\nvm<span class="token punctuation">.</span>message <span class="token operator">=</span> <span class="token string">&quot;new message&quot;</span> <span class="token comment">// 更改数据</span>\nvm<span class="token punctuation">.</span>$el<span class="token punctuation">.</span>textContent <span class="token operator">===</span> <span class="token string">&quot;new message&quot;</span> <span class="token comment">// false</span>\nVue<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  vm<span class="token punctuation">.</span>$el<span class="token punctuation">.</span>textContent <span class="token operator">===</span> <span class="token string">&quot;new message&quot;</span> <span class="token comment">// true</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这段代码就跟上面分析的一样。</p><p>再看下这段代码</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  el<span class="token operator">:</span> <span class="token string">&quot;#example&quot;</span><span class="token punctuation">,</span>\n  data<span class="token operator">:</span> <span class="token punctuation">{</span>\n    message<span class="token operator">:</span> <span class="token string">&quot;123&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\nVue<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  vm<span class="token punctuation">.</span>$el<span class="token punctuation">.</span>textContent <span class="token operator">===</span> <span class="token string">&quot;new message&quot;</span> <span class="token comment">// false</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\nvm<span class="token punctuation">.</span>message <span class="token operator">=</span> <span class="token string">&quot;new message&quot;</span> <span class="token comment">// 更改数据</span>\nvm<span class="token punctuation">.</span>$el<span class="token punctuation">.</span>textContent <span class="token operator">===</span> <span class="token string">&quot;new message&quot;</span> <span class="token comment">// false</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>因为 message 的赋值操作放在了 nextTick 方法后面，所以 nextTick 回调函数的会异步更新队列的前面，而更新 DOM 则在后面，所以此时拿到的 DOM 不是更新后的。</p><h2 id="nexttick-源码实现"><a class="header-anchor" href="#nexttick-源码实现">#</a> nextTick 源码实现</h2><p>首先看下用法： Vue.nextTick 用于延迟执行一段代码，它接受 2 个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回 promise 对象。</p>',13),r=(0,p.Uk)("在"),i={href:"https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js",target:"_blank",rel:"noopener noreferrer"},k=(0,p.Uk)("next-tick 源码"),b=(0,p.Uk)("里主要做了两个事情。"),m=(0,p.uE)('<p>第一是根据当前的执行环境判断执行的回调是微任务还是宏任务，具体如下顺序：</p><p><code>Promise &gt; MutationObserver &gt; setImmediate &gt; setTimeout</code></p><p>第二是执行任务队列方法。</p><p>看下 nextTick 函数做了什么，首先声明一个_resolve，如果没有回调函数则返回一个 promise，所以在使用 this.$nextTick 时可以使用 await 等待其异步执行。在传入回调函数的情况下，将回调函数放入 callbacks 队列里，并且在每次事件循环首次使用 nextTick 的时候，执行 timer 函数，也就是上面判断的异步方法，在本轮的事件循环里，每次再调用 nextTick 函数则只将回调函数放入 callbacks 队列里。最终通过 flushCallbacks 方法执行任务队列的所有方法。</p><p>下面是源码加注释：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> noop <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;shared/util&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> handleError <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./error&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> isIE<span class="token punctuation">,</span> isIOS<span class="token punctuation">,</span> isNative <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./env&#39;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">let</span> isUsingMicroTask <span class="token operator">=</span> <span class="token boolean">false</span>\n<span class="token comment">// 任务队列</span>\n<span class="token keyword">const</span> callbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n<span class="token comment">// 每一轮任务队列的是否开启微(宏)任务的标识</span>\n<span class="token keyword">let</span> pending <span class="token operator">=</span> <span class="token boolean">false</span>\n<span class="token comment">// 执行任务队列方法</span>\n<span class="token keyword">function</span> <span class="token function">flushCallbacks</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  pending <span class="token operator">=</span> <span class="token boolean">false</span>\n  <span class="token comment">// 之所以要slice复制一份出来是因为有的cb执行过程中又会往callbacks中加入内容</span>\n  <span class="token comment">// 比如$nextTick的回调函数里又有$nextTick</span>\n  <span class="token comment">// 这些是应该放入到下一个轮次的nextTick去执行的,</span>\n  <span class="token comment">// 所以拷贝一份当前的,遍历执行完当前的即可,避免无休止的执行下去</span>\n  <span class="token keyword">const</span> copies <span class="token operator">=</span> callbacks<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>\n  callbacks<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span>\n  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> copies<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    copies<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// timerFunc会把flushCallbacks给塞到事件循环的队尾，等待被调用。</span>\n<span class="token comment">// 根据当前环境支持什么方法则确定调用哪个</span>\n<span class="token keyword">let</span> timerFunc<span class="token operator">=</span>\n\n<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> Promise <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isNative</span><span class="token punctuation">(</span>Promise<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> p <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token function-variable function">timerFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>flushCallbacks<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  isUsingMicroTask <span class="token operator">=</span> <span class="token boolean">true</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isIE <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> MutationObserver <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>\n  <span class="token function">isNative</span><span class="token punctuation">(</span>MutationObserver<span class="token punctuation">)</span> <span class="token operator">||</span>\n  MutationObserver<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;[object MutationObserverConstructor]&#39;</span>\n<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> counter <span class="token operator">=</span> <span class="token number">1</span>\n  <span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>flushCallbacks<span class="token punctuation">)</span>\n  <span class="token keyword">const</span> textNode <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>textNode<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    characterData<span class="token operator">:</span> <span class="token boolean">true</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token function-variable function">timerFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    counter <span class="token operator">=</span> <span class="token punctuation">(</span>counter <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">2</span>\n    textNode<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  isUsingMicroTask <span class="token operator">=</span> <span class="token boolean">true</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> setImmediate <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isNative</span><span class="token punctuation">(</span>setImmediate<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">timerFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token function">setImmediate</span><span class="token punctuation">(</span>flushCallbacks<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">timerFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token function">setTimeout</span><span class="token punctuation">(</span>flushCallbacks<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// 在使用nextTick 时将待执行待函数放入到执行的队尾</span>\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">nextTick</span> <span class="token punctuation">(</span><span class="token parameter">cb<span class="token operator">?</span><span class="token operator">:</span> Function<span class="token punctuation">,</span> ctx<span class="token operator">?</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> _resolve\n  <span class="token comment">// 将回调函数push至队列中</span>\n  callbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>\n      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> ctx<span class="token punctuation">,</span> <span class="token string">&#39;nextTick&#39;</span><span class="token punctuation">)</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>_resolve<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token function">_resolve</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token comment">// 执行异步延迟函数 timerFunc(以pending做标识，只在每轮事件循环的首次调用执行)</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pending<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    pending <span class="token operator">=</span> <span class="token boolean">true</span>\n    <span class="token function">timerFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token comment">// 当 nextTick 没有传入函数参数的时候，返回一个 Promise 化的调用</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cb <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> Promise <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n      _resolve <span class="token operator">=</span> resolve\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br></div></div><h2 id="总结"><a class="header-anchor" href="#总结">#</a> 总结</h2><p>重点在于 Vue 更新 DOM 也是调用了 nextTick 方法，实现异步渲染，后面用户调用 nextTick 自然就排在 nextTick 的任务队列后面，也就能拿到更新后的 DOM 了。</p>',8),d={render:function(n,s){const a=(0,p.up)("OutboundLink");return(0,p.wg)(),(0,p.j4)(p.HY,null,[t,(0,p.Wm)("p",null,[e,(0,p.Wm)("a",o,[c,(0,p.Wm)(a)]),l]),u,(0,p.Wm)("p",null,[r,(0,p.Wm)("a",i,[k,(0,p.Wm)(a)]),b]),m],64)}}}}]);