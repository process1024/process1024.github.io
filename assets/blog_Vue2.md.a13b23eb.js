import{_ as s,c as n,o as a,d as e}from"./app.df587ff6.js";const D=JSON.parse('{"title":"vue \u9762\u8BD5\u9898\u5927\u5168\u542B\u6E90\u7801\u7EA7\u56DE\u7B54\uFF08vue2 \u7BC7\uFF09","description":"","frontmatter":{},"headers":[{"level":2,"title":"1.vue \u54CD\u5E94\u5F0F\u539F\u7406","slug":"_1-vue-\u54CD\u5E94\u5F0F\u539F\u7406"},{"level":2,"title":"2.v-if \u548C v-for \u54EA\u4E2A\u4F18\u5148\u7EA7\u9AD8","slug":"_2-v-if-\u548C-v-for-\u54EA\u4E2A\u4F18\u5148\u7EA7\u9AD8"},{"level":2,"title":"3.key \u7684\u4F5C\u7528","slug":"_3-key-\u7684\u4F5C\u7528"},{"level":2,"title":"4.\u53CC\u5411\u7ED1\u5B9A\u539F\u7406","slug":"_4-\u53CC\u5411\u7ED1\u5B9A\u539F\u7406"},{"level":2,"title":"5.nextTick \u539F\u7406","slug":"_5-nexttick-\u539F\u7406"},{"level":2,"title":"6.data \u4E3A\u4EC0\u4E48\u662F\u51FD\u6570","slug":"_6-data-\u4E3A\u4EC0\u4E48\u662F\u51FD\u6570"},{"level":2,"title":"7.\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F","slug":"_7-\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F"},{"level":2,"title":"8.computed\u3001watch\u3001method \u6709\u4EC0\u4E48\u533A\u522B","slug":"_8-computed\u3001watch\u3001method-\u6709\u4EC0\u4E48\u533A\u522B"},{"level":2,"title":"9.\u751F\u547D\u5468\u671F","slug":"_9-\u751F\u547D\u5468\u671F"},{"level":3,"title":"1. beforeCreate\u3001created\uFF1A","slug":"_1-beforecreate\u3001created\uFF1A"},{"level":3,"title":"2. beforeMount\u3001mounted","slug":"_2-beforemount\u3001mounted"},{"level":3,"title":"3. beforeUpdate\u3001updated","slug":"_3-beforeupdate\u3001updated"},{"level":3,"title":"4. beforeDestroy\u3001destroyed","slug":"_4-beforedestroy\u3001destroyed"},{"level":3,"title":"5. activated\u3001deactivated","slug":"_5-activated\u3001deactivated"},{"level":2,"title":"10.keep-alive \u539F\u7406","slug":"_10-keep-alive-\u539F\u7406"},{"level":2,"title":"12.\u865A\u62DF dom \u548C diff \u7B97\u6CD5","slug":"_12-\u865A\u62DF-dom-\u548C-diff-\u7B97\u6CD5"},{"level":3,"title":"patch","slug":"patch"},{"level":3,"title":"patchVnode","slug":"patchvnode"},{"level":3,"title":"updateChildren","slug":"updatechildren"},{"level":2,"title":"13.Vuex \u539F\u7406","slug":"_13-vuex-\u539F\u7406"}],"relativePath":"blog/Vue2.md","lastUpdated":1660463328000}'),l={name:"blog/Vue2.md"},p=e(`<h1 id="vue-\u9762\u8BD5\u9898\u5927\u5168\u542B\u6E90\u7801\u7EA7\u56DE\u7B54\uFF08vue2-\u7BC7\uFF09" tabindex="-1">vue \u9762\u8BD5\u9898\u5927\u5168\u542B\u6E90\u7801\u7EA7\u56DE\u7B54\uFF08vue2 \u7BC7\uFF09 <a class="header-anchor" href="#vue-\u9762\u8BD5\u9898\u5927\u5168\u542B\u6E90\u7801\u7EA7\u56DE\u7B54\uFF08vue2-\u7BC7\uFF09" aria-hidden="true">#</a></h1><h2 id="_1-vue-\u54CD\u5E94\u5F0F\u539F\u7406" tabindex="-1">1.vue \u54CD\u5E94\u5F0F\u539F\u7406 <a class="header-anchor" href="#_1-vue-\u54CD\u5E94\u5F0F\u539F\u7406" aria-hidden="true">#</a></h2><p>\u56DE\u7B54\u8FD9\u4E2A\u95EE\u9898\uFF0C\u9996\u5148\u8981\u641E\u6E05\u695A\u4EC0\u4E48\u53EB\u54CD\u5E94\u5F0F\u3002\u901A\u5E38 vue \u4E2D\u6240\u8BF4\u7684\u54CD\u5E94\u5F0F\u662F\u6307\u6570\u636E\u54CD\u5E94\u5F0F\uFF0C\u6570\u636E\u53D8\u5316\u53EF\u4EE5\u88AB\u68C0\u6D4B\u5E76\u5BF9\u8FD9\u79CD\u53D8\u5316\u505A\u51FA\u54CD\u5E94\u7684\u673A\u5236\u3002\u800C\u5728 Vue \u8FD9\u79CD MVVM \u6846\u67B6\u4E2D\uFF0C\u6700\u91CD\u8981\u7684\u6838\u5FC3\u5C31\u662F\u5B9E\u73B0\u6570\u636E\u5C42\u548C\u89C6\u56FE\u5C42\u7684\u8FDE\u63A5\uFF0C\u901A\u8FC7\u6570\u636E\u9A71\u52A8\u5E94\u7528\uFF0C\u6570\u636E\u53D8\u5316\uFF0C\u89C6\u56FE\u66F4\u65B0\u3002Vue \u4E2D\u7684\u65B9\u6848\u662F\u6570\u636E\u52AB\u6301+\u53D1\u5E03\u8BA2\u9605\u6A21\u5F0F\u3002</p><p>vue \u5728\u521D\u59CB\u5316\u7684\u65F6\u5019\u4F1A\u5BF9\u6570\u636E\u8FDB\u884C\u52AB\u6301\uFF0C\u5305\u62EC props\uFF0Cdata\uFF0Cmethods\uFF0Ccomputed\uFF0Cwatcher\uFF0C\u5E76\u6839\u636E\u6570\u636E\u7C7B\u578B\u6765\u505A\u4E0D\u540C\u5904\u7406.</p><p>\u5982\u679C\u662F\u5BF9\u8C61\u5219\u91C7\u7528 Object.defineProperty()\u7684\u65B9\u5F0F\u5B9A\u4E49\u6570\u636E\u62E6\u622A:</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function defineReactive(obj, key, val) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  Object.defineProperty(obj, key, {</span></span>
<span class="line"><span style="color:#A6ACCD;">    get() {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return val;</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    set(v) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      val = v;</span></span>
<span class="line"><span style="color:#A6ACCD;">      notify();</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">  });</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5982\u679C\u662F\u6570\u7EC4\uFF0C\u5219\u8986\u76D6\u6570\u7EC4\u7684 7 \u4E2A\u53D8\u66F4\u65B9\u6CD5\u5B9E\u73B0\u53D8\u66F4\u901A\u77E5:</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">const arrayProto = Array.prototype;</span></span>
<span class="line"><span style="color:#A6ACCD;">const arrayMethods = Object.create(arrayProto)[</span></span>
<span class="line"><span style="color:#A6ACCD;">  (&quot;push&quot;, &quot;pop&quot;, &quot;shift&quot;, &quot;unshift&quot;, &quot;splice&quot;, &quot;sort&quot;, &quot;reverse&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">].forEach(function (method) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const original = arrayProto[method];</span></span>
<span class="line"><span style="color:#A6ACCD;">  def(arrayMethods, method, function mutator(...args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const result = original.apply(this, args);</span></span>
<span class="line"><span style="color:#A6ACCD;">    notify();</span></span>
<span class="line"><span style="color:#A6ACCD;">    return result;</span></span>
<span class="line"><span style="color:#A6ACCD;">  });</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u8FD9\u662F\u6570\u636E\u52AB\u6301\u7684\u90E8\u5206\uFF0C\u63A5\u4E0B\u6765\u8BF4\u4E0B\u89C6\u56FE\u66F4\u65B0\u7684\u673A\u5236\uFF1A</p><ol><li>\u7531\u4E8E Vue \u6267\u884C\u4E00\u4E2A\u7EC4\u4EF6\u7684 render \u51FD\u6570\u662F\u7531 Watcher \u53BB\u4EE3\u7406\u6267\u884C\u7684\uFF0CWatcher \u5728\u6267\u884C\u524D\u4F1A\u628A Watcher \u81EA\u8EAB\u5148\u8D4B\u503C\u7ED9 Dep.target \u8FD9\u4E2A\u5168\u5C40\u53D8\u91CF\uFF0C\u7B49\u5F85\u54CD\u5E94\u5F0F\u5C5E\u6027\u53BB\u6536\u96C6\u5B83\u3002</li><li>\u5728\u7EC4\u4EF6\u6267\u884C render \u51FD\u6570\u65F6\u8BBF\u95EE\u4E86\u54CD\u5E94\u5F0F\u5C5E\u6027\uFF0C\u54CD\u5E94\u5F0F\u5C5E\u6027\u5C31\u4F1A\u7CBE\u786E\u7684\u6536\u96C6\u5230\u5F53\u524D\u5168\u5C40\u5B58\u5728\u7684 Dep.target \u4F5C\u4E3A\u81EA\u8EAB\u7684\u4F9D\u8D56\u3002</li><li>\u5728\u54CD\u5E94\u5F0F\u5C5E\u6027\u53D1\u751F\u66F4\u65B0\u65F6\u901A\u77E5 Watcher \u53BB\u91CD\u65B0\u8C03\u7528<code>vm._update(vm._render())</code>\u8FDB\u884C\u7EC4\u4EF6\u7684\u89C6\u56FE\u66F4\u65B0\uFF0C\u89C6\u56FE\u66F4\u65B0\u7684\u65F6\u5019\u4F1A\u901A\u8FC7 diff \u7B97\u6CD5\u5BF9\u6BD4\u65B0\u8001 vnode \u5DEE\u5F02\uFF0C\u901A\u8FC7 patch \u5373\u65F6\u66F4\u65B0 DOM\u3002</li></ol><h2 id="_2-v-if-\u548C-v-for-\u54EA\u4E2A\u4F18\u5148\u7EA7\u9AD8" tabindex="-1">2.v-if \u548C v-for \u54EA\u4E2A\u4F18\u5148\u7EA7\u9AD8 <a class="header-anchor" href="#_2-v-if-\u548C-v-for-\u54EA\u4E2A\u4F18\u5148\u7EA7\u9AD8" aria-hidden="true">#</a></h2><p>\u7B54\u6848\u662F v-for \u89E3\u6790\u7684\u4F18\u5148\u7EA7\u9AD8\uFF0C\u53EF\u4EE5\u5728\u6E90\u7801\u7684 compiler/codegen/index.js \u91CC\u7684 genElement \u51FD\u6570\u627E\u5230\u7B54\u6848</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function genElement (el: ASTElement, state: CodegenState): string {</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (el.parent) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    el.pre = el.pre || el.parent.pre</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  if (el.staticRoot &amp;&amp; !el.staticProcessed) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return genStatic(el, state)</span></span>
<span class="line"><span style="color:#A6ACCD;">  } else if (el.once &amp;&amp; !el.onceProcessed) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return genOnce(el, state)</span></span>
<span class="line"><span style="color:#A6ACCD;">  } else if (el.for &amp;&amp; !el.forProcessed) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return genFor(el, state)</span></span>
<span class="line"><span style="color:#A6ACCD;">  } else if (el.if &amp;&amp; !el.ifProcessed) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return genIf(el, state)</span></span>
<span class="line"><span style="color:#A6ACCD;">  } else if (el.tag === &#39;template&#39; &amp;&amp; !el.slotTarget &amp;&amp; !state.pre) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return genChildren(el, state) || &#39;void 0&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  } else if (el.tag === &#39;slot&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return genSlot(el, state)</span></span>
<span class="line"><span style="color:#A6ACCD;">  } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // component or element</span></span>
<span class="line"><span style="color:#A6ACCD;">    let code</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (el.component) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      code = genComponent(el.component, el, state)</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      let data</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (!el.plain || (el.pre &amp;&amp; state.maybeComponent(el))) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        data = genData(el, state)</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      const children = el.inlineTemplate ? null : genChildren(el, state, true)</span></span>
<span class="line"><span style="color:#A6ACCD;">      code = \`_c(&#39;\${el.tag}&#39;\${</span></span>
<span class="line"><span style="color:#A6ACCD;">        data ? \`,\${data}\` : &#39;&#39; // data</span></span>
<span class="line"><span style="color:#A6ACCD;">      }\${</span></span>
<span class="line"><span style="color:#A6ACCD;">        children ? \`,\${children}\` : &#39;&#39; // children</span></span>
<span class="line"><span style="color:#A6ACCD;">      })\`</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    // module transforms</span></span>
<span class="line"><span style="color:#A6ACCD;">    for (let i = 0; i &lt; state.transforms.length; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      code = state.transforms[i](el, code)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    return code</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>vue \u4E2D\u7684\u5185\u7F6E\u6307\u4EE4\u90FD\u6709\u76F8\u5E94\u7684\u89E3\u6790\u51FD\u6570\uFF0C\u6267\u884C\u987A\u5E8F\u662F\u901A\u8FC7\u7B80\u5355\u7684 if else-if \u8BED\u6CD5\u6765\u786E\u5B9A\u7684\u3002\u5728 genFor \u7684\u51FD\u6570\u91CC\uFF0C\u6700\u540E\u4F1A return \u4E00\u4E2A\u81EA\u8FD0\u884C\u51FD\u6570\uFF0C\u518D\u6B21\u8C03\u7528 genElement\u3002</p><p>\u867D\u7136 v-for \u548C v-if \u53EF\u4EE5\u653E\u4E00\u8D77\uFF0C\u4F46\u6211\u4EEC\u8981\u907F\u514D\u8FD9\u79CD\u5199\u6CD5\uFF0C\u5728\u5B98\u7F51\u4E2D\u4E5F\u6709\u660E\u786E\u6307\u51FA\uFF0C\u8FD9\u4F1A\u9020\u6210\u6027\u80FD\u6D6A\u8D39\u3002</p><h2 id="_3-key-\u7684\u4F5C\u7528" tabindex="-1">3.key \u7684\u4F5C\u7528 <a class="header-anchor" href="#_3-key-\u7684\u4F5C\u7528" aria-hidden="true">#</a></h2><p>\u4F5C\u7528\uFF1A\u7528\u6765\u5224\u65AD\u865A\u62DF DOM \u7684\u67D0\u4E2A\u8282\u70B9\u662F\u5426\u4E3A\u76F8\u540C\u8282\u70B9\uFF0C\u7528\u4E8E\u4F18\u5316 patch \u6027\u80FD\uFF0Cpatch \u5C31\u662F\u8BA1\u7B97 diff \u7684\u51FD\u6570\u3002</p><p>\u5148\u770B\u4E0B patch \u51FD\u6570\uFF1A</p><blockquote><p>\u53EA\u63D0\u53D6\u4E86\u672C\u6B21\u8981\u5206\u6790\u7684\u5173\u952E\u4EE3\u7801</p></blockquote><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function patch(oldVnode, vnode) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (isUndef(vnode)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isDef(oldVnode)) invokeDestroyHook(oldVnode);</span></span>
<span class="line"><span style="color:#A6ACCD;">    return;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  let isInitialPatch = false;</span></span>
<span class="line"><span style="color:#A6ACCD;">  const insertedVnodeQueue = [];</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  if (isUndef(oldVnode)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // empty mount (likely as component), create new root element</span></span>
<span class="line"><span style="color:#A6ACCD;">    isInitialPatch = true;</span></span>
<span class="line"><span style="color:#A6ACCD;">    createElm(vnode, insertedVnodeQueue);</span></span>
<span class="line"><span style="color:#A6ACCD;">  } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const isRealElement = isDef(oldVnode.nodeType);</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (!isRealElement &amp;&amp; sameVnode(oldVnode, vnode)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // patch existing root node</span></span>
<span class="line"><span style="color:#A6ACCD;">      patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // some code</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  return vnode;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>patch \u51FD\u6570\u63A5\u6536 oldVnode \u548C vnode\uFF0C\u4E5F\u5C31\u662F\u8981\u6BD4\u8F83\u7684\u65B0\u65E7\u8282\u70B9\u5BF9\u8C61\u3002</p><p>\u9996\u5148\u4F1A\u7528 isUndef \u51FD\u6570\u5224\u65AD\u4F20\u5165\u7684\u4E24\u4E2A vnode \u662F\u5426\u4E3A\u7A7A\u5BF9\u8C61\u518D\u505A\u76F8\u5E94\u5904\u7406\u3002\u5F53\u4E24\u4E2A\u90FD\u4E3A\u8282\u70B9\u5BF9\u8C61\u65F6\uFF0C\u518D\u7528 sameVnode \u6765\u5224\u65AD\u662F\u5426\u4E3A\u540C\u4E00\u8282\u70B9\uFF0C\u518D\u5224\u65AD\u672C\u6B21\u64CD\u4F5C\u662F\u65B0\u589E\u3001\u4FEE\u6539\u3001\u8FD8\u662F\u79FB\u9664\u3002</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function sameVnode(a, b) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return (</span></span>
<span class="line"><span style="color:#A6ACCD;">    a.key === b.key &amp;&amp; // key\u503C</span></span>
<span class="line"><span style="color:#A6ACCD;">    a.tag === b.tag &amp;&amp; // \u6807\u7B7E\u540D</span></span>
<span class="line"><span style="color:#A6ACCD;">    a.isComment === b.isComment &amp;&amp; // \u662F\u5426\u4E3A\u6CE8\u91CA\u8282\u70B9</span></span>
<span class="line"><span style="color:#A6ACCD;">    isDef(a.data) === isDef(b.data) &amp;&amp; // \u662F\u5426\u90FD\u5B9A\u4E49\u4E86data\uFF0Cdata\u5305\u542B\u4E00\u4E9B\u5177\u4F53\u4FE1\u606F\uFF0C\u4F8B\u5982onclick , style</span></span>
<span class="line"><span style="color:#A6ACCD;">    sameInputType(a, b) // \u5F53\u6807\u7B7E\u662F&lt;input&gt;\u7684\u65F6\u5019\uFF0Ctype\u5FC5\u987B\u76F8\u540C</span></span>
<span class="line"><span style="color:#A6ACCD;">  );</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>sameVnode \u901A\u8FC7\u5224\u65AD key\u3001\u6807\u7B7E\u540D\u3001\u662F\u5426\u4E3A\u6CE8\u91CA\u3001data \u7B49\u662F\u5426\u76F8\u7B49\uFF0C\u6765\u5224\u65AD\u662F\u5426\u9700\u8981\u8FDB\u884C\u6BD4\u8F83\u3002</p><p>\u503C\u5F97\u6BD4\u8F83\u5219\u6267\u884C patchVnode\uFF0C\u4E0D\u503C\u5F97\u6BD4\u8F83\u5219\u7528 Vnode \u66FF\u6362 oldVnode,\u518D\u6E32\u67D3\u771F\u5B9E dom\u3002</p><p>patchVnode \u4F1A\u5BF9 oldVnode \u548C vnode \u8FDB\u884C\u5BF9\u6BD4\uFF0C\u7136\u540E\u8FDB\u884C DOM \u66F4\u65B0\u3002\u8FD9\u4E2A\u4F1A\u5728 diff \u7B97\u6CD5\u91CC\u518D\u8FDB\u884C\u8BF4\u660E\u3002</p><p>v-for \u901A\u5E38\u90FD\u662F\u751F\u6210\u4E00\u6837\u7684\u6807\u7B7E\uFF0C\u6240\u4EE5 key \u4F1A\u662F patch \u5224\u65AD\u662F\u5426\u76F8\u540C\u8282\u70B9\u7684\u552F\u4E00\u6807\u8BC6\uFF0C\u5982\u679C\u4E0D\u8BBE\u7F6E key\uFF0C\u5B83\u7684\u503C\u5C31\u662F undefined\uFF0C\u5219\u53EF\u80FD\u6C38\u8FDC\u8BA4\u4E3A\u8FD9\u662F\u4E24\u4E2A\u76F8\u540C\u8282\u70B9\uFF0C\u5C31\u4F1A\u53BB\u505A pathVnode pdateChildren \u7684\u66F4\u65B0\u64CD\u4F5C\uFF0C\u8FD9\u9020\u6210\u4E86\u5927\u91CF\u7684 dom \u66F4\u65B0\u64CD\u4F5C\uFF0C\u6240\u4EE5\u8BBE\u7F6E\u552F\u4E00\u7684 key \u662F\u5FC5\u8981\u7684\u3002</p><h2 id="_4-\u53CC\u5411\u7ED1\u5B9A\u539F\u7406" tabindex="-1">4.\u53CC\u5411\u7ED1\u5B9A\u539F\u7406 <a class="header-anchor" href="#_4-\u53CC\u5411\u7ED1\u5B9A\u539F\u7406" aria-hidden="true">#</a></h2><p>vue \u4E2D\u53CC\u5411\u7ED1\u5B9A\u662F\u4E00\u4E2A\u6307\u4EE4 v-model\uFF0C\u53EF\u4EE5\u7ED1\u5B9A\u4E00\u4E2A\u52A8\u6001\u503C\u5230\u89C6\u56FE\uFF0C\u540C\u65F6\u89C6\u56FE\u4E2D\u53D8\u5316\u80FD\u6539\u53D8\u8BE5\u503C\u3002v-model \u662F\u8BED\u6CD5\u7CD6\uFF0C\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u76F8\u5F53\u4E8E:value \u548C@input\u3002</p><p>\u901A\u5E38\u5728\u8868\u5355\u5143\u7D20\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528 v-model\uFF0C\u8FD9\u662F vue \u89E3\u6790\u7684\u65F6\u5019\u5BF9\u8FD9\u4E9B\u8868\u5355\u5143\u7D20\u8FDB\u884C\u4E86\u5904\u7406\uFF0C\u6839\u636E\u63A7\u4EF6\u7C7B\u578B\u81EA\u52A8\u9009\u53D6\u6B63\u786E\u7684\u65B9\u6CD5\u6765\u66F4\u65B0\u5143\u7D20\u3002</p><blockquote><p>v-model \u5728\u5185\u90E8\u4E3A\u4E0D\u540C\u7684\u8F93\u5165\u5143\u7D20\u4F7F\u7528\u4E0D\u540C\u7684 property \u5E76\u629B\u51FA\u4E0D\u540C\u7684\u4E8B\u4EF6\uFF1A</p><ul><li>text \u548C textarea \u5143\u7D20\u4F7F\u7528 value property \u548C input \u4E8B\u4EF6\uFF1B</li><li>checkbox \u548C radio \u4F7F\u7528 checked property \u548C change \u4E8B\u4EF6\uFF1B</li><li>select \u5B57\u6BB5\u5C06 value \u4F5C\u4E3A prop \u5E76\u5C06 change \u4F5C\u4E3A\u4E8B\u4EF6\u3002</li></ul></blockquote><p>\u5982\u679C\u662F\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u7684\u8BDD\u8981\u4F7F\u7528\u5B83\u9700\u8981\u5728\u7EC4\u4EF6\u5185\u7ED1\u5B9A props value \u5E76\u5728\u6570\u636E\u66F4\u65B0\u6570\u636E\u7684\u65F6\u5019\u7528$emit(&#39;input&#39;)\uFF0C\u4E5F\u53EF\u4EE5\u5728\u7EC4\u4EF6\u91CC\u5B9A\u4E49 modal \u5C5E\u6027\u6765\u81EA\u5B9A\u4E49\u7ED1\u5B9A\u7684\u5C5E\u6027\u540D\u548C\u4E8B\u4EF6\u540D\u79F0\u3002</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">model: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    prop: &#39;checked&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    event: &#39;change&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="_5-nexttick-\u539F\u7406" tabindex="-1">5.nextTick \u539F\u7406 <a class="header-anchor" href="#_5-nexttick-\u539F\u7406" aria-hidden="true">#</a></h2><p>\u5148\u770B\u4E0B\u5B98\u65B9\u6587\u6863\u7684\u8BF4\u660E\uFF1A</p><blockquote><p>Vue \u5728\u66F4\u65B0 DOM \u65F6\u662F\u5F02\u6B65\u6267\u884C\u7684\u3002\u53EA\u8981\u4FA6\u542C\u5230\u6570\u636E\u53D8\u5316\uFF0CVue \u5C06\u5F00\u542F\u4E00\u4E2A\u961F\u5217\uFF0C\u5E76\u7F13\u51B2\u5728\u540C\u4E00\u4E8B\u4EF6\u5FAA\u73AF\u4E2D\u53D1\u751F\u7684\u6240\u6709\u6570\u636E\u53D8\u66F4\u3002\u5982\u679C\u540C\u4E00\u4E2A watcher \u88AB\u591A\u6B21\u89E6\u53D1\uFF0C\u53EA\u4F1A\u88AB\u63A8\u5165\u5230\u961F\u5217\u4E2D\u4E00\u6B21\u3002</p></blockquote><p>nextTick \u5C31\u662F\u5C06\u56DE\u8C03\u51FD\u6570\u653E\u5230\u961F\u5217\u91CC\u53BB\uFF0C\u4FDD\u8BC1\u5728\u5F02\u6B65\u66F4\u65B0 DOM \u7684 watcher \u540E\u9762\uFF0C\u4ECE\u800C\u83B7\u53D6\u5230\u66F4\u65B0\u540E\u7684 DOM\u3002</p><p>\u7ED3\u5408 src/core/util/next-tick \u6E90\u7801\u518D\u8FDB\u884C\u5206\u6790\u3002</p><p>\u9996\u5148\u662F\u5B9A\u4E49\u6267\u884C\u4EFB\u52A1\u961F\u5217\u65B9\u6CD5</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function flushCallbacks () {</span></span>
<span class="line"><span style="color:#A6ACCD;">  pending = false</span></span>
<span class="line"><span style="color:#A6ACCD;">  const copies = callbacks.slice(0)</span></span>
<span class="line"><span style="color:#A6ACCD;">  callbacks.length = 0</span></span>
<span class="line"><span style="color:#A6ACCD;">  for (let i = 0; i &lt; copies.length; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    copies[i]()</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u6309\u7167\u63A8\u5165 callbacks \u961F\u5217\u7684\u987A\u5E8F\u6267\u884C\u56DE\u8C03\u51FD\u6570\u3002</p><p>\u7136\u540E\u5B9A\u4E49 timerFunc \u51FD\u6570\uFF0C\u6839\u636E\u5F53\u524D\u73AF\u5883\u652F\u6301\u4EC0\u4E48\u65B9\u6CD5\u6765\u786E\u5B9A\u8C03\u7528\u54EA\u4E2A\u5F02\u6B65\u65B9\u6CD5</p><p>\u5224\u65AD\u7684\u987A\u5E8F\u662F: <code>Promise &gt; MutationObserver &gt; setImmediate &gt; setTimeout</code></p><p>\u6700\u540E\u662F\u5B9A\u4E49 nextTick \u65B9\u6CD5\uFF1A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">export function nextTick (cb?: Function, ctx?: Object) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  let _resolve</span></span>
<span class="line"><span style="color:#A6ACCD;">  callbacks.push(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (cb) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      try {</span></span>
<span class="line"><span style="color:#A6ACCD;">        cb.call(ctx)</span></span>
<span class="line"><span style="color:#A6ACCD;">      } catch (e) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        handleError(e, ctx, &#39;nextTick&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else if (_resolve) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      _resolve(ctx)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (!pending) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    pending = true</span></span>
<span class="line"><span style="color:#A6ACCD;">    timerFunc()</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (!cb &amp;&amp; typeof Promise !== &#39;undefined&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return new Promise(resolve =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      _resolve = resolve</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5176\u5B9E nextTick \u5C31\u662F\u4E00\u4E2A\u628A\u56DE\u8C03\u51FD\u6570\u63A8\u5165\u4EFB\u52A1\u961F\u5217\u7684\u65B9\u6CD5\u3002</p><p>\u4E86\u89E3\u5230\u8FD9\u91CC\u4E5F\u5DEE\u4E0D\u591A\u4E86\uFF0C\u518D\u6DF1\u5165\u7684\u8BDD\u53EF\u4EE5\u8BF4 vue \u4E2D\u6570\u636E\u53D8\u5316\uFF0C\u89E6\u53D1 watcher\uFF0Cwatcher \u8FDB\u5165\u961F\u5217\u7684\u6D41\u7A0B\uFF0C\u53EF\u4EE5\u770B\u6211\u7684\u53E6\u4E00\u7BC7\u6587\u7AE0<a href="https://juejin.cn/post/6934539800527503368" target="_blank" rel="noopener noreferrer">vue \u4E2D\u7684 nextTick \u5B8C\u6574\u89E3\u6790</a>\u3002</p><h2 id="_6-data-\u4E3A\u4EC0\u4E48\u662F\u51FD\u6570" tabindex="-1">6.data \u4E3A\u4EC0\u4E48\u662F\u51FD\u6570 <a class="header-anchor" href="#_6-data-\u4E3A\u4EC0\u4E48\u662F\u51FD\u6570" aria-hidden="true">#</a></h2><p>\u5982\u679C\u7EC4\u4EF6\u91CC data \u76F4\u63A5\u5199\u4E86\u4E00\u4E2A\u5BF9\u8C61\u7684\u8BDD\uFF0C\u90A3\u4E48\u5728\u6A21\u677F\u4E2D\u591A\u6B21\u58F0\u660E\u8FD9\u4E2A\u7EC4\u4EF6\uFF0C\u7EC4\u4EF6\u4E2D\u7684 data \u4F1A\u6307\u5411\u540C\u4E00\u4E2A\u5F15\u7528\u3002</p><p>\u6B64\u65F6\u5BF9 data \u8FDB\u884C\u4FEE\u6539\uFF0C\u4F1A\u5BFC\u81F4\u5176\u4ED6\u7EC4\u4EF6\u91CC\u7684 data \u4E5F\u88AB\u4FEE\u6539\u3002\u4F7F\u7528\u51FD\u6570\u6BCF\u6B21\u90FD\u91CD\u65B0\u58F0\u660E\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u8FD9\u6837\u6BCF\u4E2A\u7EC4\u4EF6\u7684 data \u90FD\u6709\u81EA\u5DF1\u7684\u5F15\u7528\uFF0C\u5C31\u4E0D\u4F1A\u51FA\u73B0\u76F8\u4E92\u6C61\u67D3\u7684\u60C5\u51B5\u4E86\u3002</p><h2 id="_7-\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F" tabindex="-1">7.\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F <a class="header-anchor" href="#_7-\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F" aria-hidden="true">#</a></h2><ol><li>props \u548C<code>$on</code>\u3001<code>$emit</code></li></ol><p>\u9002\u5408\u7236\u5B50\u7EC4\u4EF6\u7684\u901A\u4FE1\uFF0C\u901A\u8FC7 props \u4F20\u9012\u54CD\u5E94\u5F0F\u6570\u636E\uFF0C\u7236\u7EC4\u4EF6\u901A\u8FC7<code>$on</code>\u76D1\u542C\u4E8B\u4EF6\u3001\u5B50\u7EC4\u4EF6\u901A\u8FC7<code>$emit</code>\u53D1\u9001\u4E8B\u4EF6\u3002</p><p>on \u548C emit \u662F\u5728\u7EC4\u4EF6\u5B9E\u4F8B\u521D\u59CB\u5316\u7684\u65F6\u5019\u901A\u8FC7<code>initEvents</code>\u521D\u59CB\u5316\u4E8B\u4EF6\uFF0C\u5728\u7EC4\u4EF6\u5B9E\u4F8B vm._events \u8D4B\u503C\u4E00\u4E2A\u7A7A\u7684\u4E8B\u4EF6\u5BF9\u8C61\uFF0C\u901A\u8FC7\u8FD9\u4E2A\u5BF9\u8C61\u5B9E\u73B0\u4E8B\u4EF6\u7684\u53D1\u5E03\u8BA2\u9605\u3002\u4E0B\u9762\u662F\u4E8B\u4EF6\u6CE8\u518C\u7684\u51E0\u4E2A\u5173\u952E\u51FD\u6570\uFF1A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">// \u7EC4\u4EF6\u521D\u59CB\u5316event\u5BF9\u8C61\uFF0C\u6536\u96C6\u8981\u76D1\u542C\u7684\u4E8B\u4EF6\u548C\u5BF9\u5E94\u7684\u56DE\u8C03\u51FD\u6570</span></span>
<span class="line"><span style="color:#A6ACCD;">function initEvents (vm: Component) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  vm._events = Object.create(null)</span></span>
<span class="line"><span style="color:#A6ACCD;">  vm._hasHookEvent = false</span></span>
<span class="line"><span style="color:#A6ACCD;">  // init parent attached events</span></span>
<span class="line"><span style="color:#A6ACCD;">  const listeners = vm.$options._parentListeners</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (listeners) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    updateComponentListeners(vm, listeners)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">// \u6CE8\u518C\u7EC4\u4EF6\u76D1\u542C\u7684\u4E8B\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">function updateComponentListeners (</span></span>
<span class="line"><span style="color:#A6ACCD;">  vm: Component,</span></span>
<span class="line"><span style="color:#A6ACCD;">  listeners: Object,</span></span>
<span class="line"><span style="color:#A6ACCD;">  oldListeners: ?Object</span></span>
<span class="line"><span style="color:#A6ACCD;">) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  target = vm</span></span>
<span class="line"><span style="color:#A6ACCD;">  updateListeners(listeners, oldListeners || {}, add, remove, createOnceHandler, vm)</span></span>
<span class="line"><span style="color:#A6ACCD;">  target = undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ol start="2"><li><code>ref</code>\u3001<code>$parent</code>\u3001<code>$children</code>\uFF0C\u8FD8\u6709<code>$root</code></li></ol><ul><li>ref: \u5728\u666E\u901A DOM \u5143\u7D20\u4E0A\u58F0\u660E\u5C31\u662F DOM \u5143\u7D20\u7684\u5F15\u7528\uFF0C\u7EC4\u4EF6\u5C31\u662F\u6307\u5411\u7EC4\u4EF6\u5B9E\u4F8B\u3002</li><li>$parent:\u8BBF\u95EE\u7EC4\u4EF6\u7684\u7236\u7EC4\u4EF6\u5B9E\u4F8B</li><li>$children:\u8BBF\u95EE\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u96C6\u5408(\u6570\u7EC4)</li><li>$root: \u6307\u5411 root \u5B9E\u4F8B</li></ul><ol start="3"><li>Event Bus</li></ol><p>\u901A\u5E38\u662F\u521B\u5EFA\u4E00\u4E2A<code>\u7A7A\u7684Vue\u5B9E\u4F8B\u4F5C\u4E3A\u4E8B\u4EF6\u603B\u7EBF(\u4E8B\u4EF6\u4E2D\u5FC3)</code>\uFF0C\u5B9E\u73B0\u4EFB\u4F55\u7EC4\u4EF6\u5728\u8FD9\u4E2A\u5B9E\u4F8B\u4E0A\u7684\u4E8B\u4EF6\u89E6\u53D1\u4E0E\u76D1\u542C\u3002\u539F\u7406\u5C31\u662F\u4E00\u4E2A\u53D1\u5E03\u8BA2\u9605\u7684\u6A21\u5F0F\uFF0C\u8DDF<code>$on\`\`$emit</code>\u4E00\u6837\uFF0C\u5728\u5B9E\u4F8B\u5316\u4E00\u4E2A\u7EC4\u4EF6\u7684\u4E8B\u4EF6\u901A\u8FC7 initEvents \u521D\u59CB\u5316\u4E00\u4E2A\u7A7A\u7684 event \u5BF9\u8C61\uFF0C\u518D\u901A\u8FC7\u5B9E\u4F8B\u5316\u540E\u7684\u8FD9\u4E2A bus(vue \u5B9E\u4F8B)\u624B\u52A8\u7684<code>$on</code>\u3001<code>$emit</code>\u6DFB\u52A0\u76D1\u542C\u548C\u89E6\u53D1\u7684\u4E8B\u4EF6\uFF0C\u4EE3\u7801\u5728<code>src/core/instance/events</code>:</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">Vue.prototype.$on = function (event: string | Array&lt;string&gt;, fn: Function): Component {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const vm: Component = this</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u4F20\u5165\u7684\u4E8B\u4EF6\u5982\u679C\u662F\u6570\u7EC4\uFF0C\u5C31\u5FAA\u73AF\u76D1\u542C\u6BCF\u4E2A\u4E8B\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (Array.isArray(event)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      for (let i = 0, l = event.length; i &lt; l; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        vm.$on(event[i], fn)</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u5982\u679C\u5DF2\u7ECF\u6709\u8FD9\u4E2A\u4E8B\u4EF6\uFF0C\u5C31push\u65B0\u7684\u56DE\u8C03\u51FD\u6570\u8FDB\u53BB\uFF0C\u6CA1\u6709\u5219\u5148\u8D4B\u503C\u7A7A\u6570\u7EC4\u518Dpush</span></span>
<span class="line"><span style="color:#A6ACCD;">      (vm._events[event] || (vm._events[event] = [])).push(fn)</span></span>
<span class="line"><span style="color:#A6ACCD;">      // instead of a hash lookup</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (hookRE.test(event)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        vm._hasHookEvent = true</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    return vm</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  Vue.prototype.$emit = function (event: string): Component {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const vm: Component = this</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    let cbs = vm._events[event]</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u5FAA\u73AF\u8C03\u7528\u8981\u89E6\u53D1\u7684\u4E8B\u4EF6\u7684\u56DE\u8C03\u51FD\u6570\u6570\u7EC4</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (cbs) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      cbs = cbs.length &gt; 1 ? toArray(cbs) : cbs</span></span>
<span class="line"><span style="color:#A6ACCD;">      const args = toArray(arguments, 1)</span></span>
<span class="line"><span style="color:#A6ACCD;">      const info = \`event handler for &quot;\${event}&quot;\`</span></span>
<span class="line"><span style="color:#A6ACCD;">      for (let i = 0, l = cbs.length; i &lt; l; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        invokeWithErrorHandling(cbs[i], vm, args, vm, info)</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    return vm</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ol start="4"><li>$attrs\u3001$listeners</li></ol><ul><li><code>$attrs</code>: \u5305\u542B\u4E86\u7236\u4F5C\u7528\u57DF<code>\u6CA1\u88ABprops\u58F0\u660E</code>\u7ED1\u5B9A\u7684\u6570\u636E\uFF0C\u7EC4\u4EF6\u53EF\u4EE5\u901A\u8FC7<code>v-bind=&quot;$attrs&quot;</code>\u7EE7\u7EED\u4F20\u7ED9\u5B50\u7EC4\u4EF6</li><li><code>$listernes</code>: \u5305\u542B\u4E86\u7236\u4F5C\u7528\u57DF\u4E2D\u7684<code>v-on</code>(\u4E0D\u542B .native \u4FEE\u9970\u5668\u7684) \u76D1\u542C\u4E8B\u4EF6\uFF0C\u53EF\u4EE5\u901A\u8FC7<code>v-on=&quot;$listeners&quot;</code>\u4F20\u5165\u5185\u90E8\u7EC4\u4EF6</li></ul><ol start="5"><li>provide\u3001inject</li></ol><p>\u7236\u7EC4\u4EF6\u901A\u8FC7 provide \u6CE8\u5165\u4E00\u4E2A\u4F9D\u8D56\uFF0C\u5176\u6240\u6709\u7684\u5B50\u5B59\u7EC4\u4EF6\u53EF\u4EE5\u901A\u8FC7 inject \u6765\u63A5\u6536\u3002\u8981\u6CE8\u610F\u7684\u662F\u5B98\u7F51\u6709\u8FD9\u4E00\u6BB5\u8BDD\uFF1A</p><blockquote><p>\u63D0\u793A\uFF1Aprovide \u548C inject \u7ED1\u5B9A\u5E76\u4E0D\u662F\u53EF\u54CD\u5E94\u7684\u3002\u8FD9\u662F\u523B\u610F\u4E3A\u4E4B\u7684\u3002\u7136\u800C\uFF0C\u5982\u679C\u4F60\u4F20\u5165\u4E86\u4E00\u4E2A\u53EF\u76D1\u542C\u7684\u5BF9\u8C61\uFF0C\u90A3\u4E48\u5176\u5BF9\u8C61\u7684 property \u8FD8\u662F\u53EF\u54CD\u5E94\u7684\u3002</p></blockquote><p>\u6240\u4EE5 Vue \u4E0D\u4F1A\u5BF9 provide \u4E2D\u7684\u53D8\u91CF\u8FDB\u884C\u54CD\u5E94\u5F0F\u5904\u7406\u3002\u8981\u60F3 inject \u63A5\u53D7\u7684\u53D8\u91CF\u662F\u54CD\u5E94\u5F0F\u7684\uFF0Cprovide \u63D0\u4F9B\u7684\u53D8\u91CF\u672C\u8EAB\u5C31\u9700\u8981\u662F\u54CD\u5E94\u5F0F\u7684\u3002\u5B9E\u9645\u4E0A\u5728\u5F88\u591A\u9AD8\u7EA7\u7EC4\u4EF6\u4E2D\u90FD\u53EF\u4EE5\u770B\u5230\u7EC4\u4EF6\u4F1A\u5C06 this \u901A\u8FC7 provide \u4F20\u9012\u7ED9\u5B50\u5B59\u7EC4\u4EF6\uFF0C\u5305\u62EC element-ui\u3001ant-design-vue \u7B49\u3002</p><ol start="6"><li>vuex \u72B6\u6001\u7BA1\u7406\u5B9E\u73B0\u901A\u4FE1 vuex \u662F\u4E13\u4E3A vue \u8BBE\u8BA1\u7684\u72B6\u6001\u7BA1\u7406\u6A21\u5F0F\u3002\u6BCF\u4E2A\u7EC4\u4EF6\u5B9E\u4F8B\u90FD\u6709\u5171\u540C\u7684 store \u5B9E\u4F8B\uFF0C\u5E76\u4E14 store.state \u662F\u54CD\u5E94\u5F0F\u7684\uFF0C\u6539\u53D8 state \u552F\u4E00\u7684\u529E\u6CD5\u5C31\u662F\u901A\u8FC7\u5728\u8FD9\u4E2A store \u5B9E\u4F8B\u4E0A commit \u4E00\u4E2A mutation\uFF0C\u65B9\u4FBF\u8DDF\u8E2A\u6BCF\u4E00\u4E2A\u72B6\u6001\u7684\u53D8\u5316\uFF0C\u5B9E\u73B0\u539F\u7406\u5728\u4E0B\u9762\u7684 vuex \u539F\u7406\u91CC\u6709\u8BB2\u3002</li></ol><h2 id="_8-computed\u3001watch\u3001method-\u6709\u4EC0\u4E48\u533A\u522B" tabindex="-1">8.computed\u3001watch\u3001method \u6709\u4EC0\u4E48\u533A\u522B <a class="header-anchor" href="#_8-computed\u3001watch\u3001method-\u6709\u4EC0\u4E48\u533A\u522B" aria-hidden="true">#</a></h2><p>computed\uFF1A\u6709\u7F13\u5B58\uFF0C\u6709\u5BF9\u5E94\u7684 watcher\uFF0Cwatcher \u6709\u4E2A lazy \u4E3A true \u7684\u5C5E\u6027\uFF0C\u8868\u793A\u53EA\u6709\u5728\u6A21\u677F\u91CC\u53BB\u8BFB\u53D6\u5B83\u7684\u503C\u540E\u624D\u4F1A\u8BA1\u7B97\uFF0C\u5E76\u4E14\u8FD9 watcher \u5728\u521D\u59CB\u5316\u7684\u65F6\u5019\u4F1A\u8D4B\u503C dirty \u4E3A true\uFF0Cwatcher \u53EA\u6709 dirty \u4E3A true \u7684\u65F6\u5019\u624D\u4F1A\u91CD\u65B0\u6C42\u503C\uFF0C\u91CD\u65B0\u6C42\u503C\u540E\u4F1A\u5C06 dirty \u7F6E\u4E3A false\uFF0Cfalse \u4F1A\u76F4\u63A5\u8FD4\u56DE watcher \u7684 value\uFF0C\u53EA\u6709\u4E0B\u6B21 watcher \u7684\u54CD\u5E94\u5F0F\u4F9D\u8D56\u6709\u66F4\u65B0\u7684\u65F6\u5019\uFF0C\u4F1A\u5C06 watcher \u7684 dirty \u518D\u7F6E\u4E3A false\uFF0C\u8FD9\u65F6\u5019\u624D\u4F1A\u91CD\u65B0\u6C42\u503C\uFF0C\u8FD9\u6837\u5C31\u5B9E\u73B0\u4E86 computed \u7684\u7F13\u5B58\u3002</p><p>watch\uFF1Awatcher \u7684\u5BF9\u8C61\u6BCF\u6B21\u66F4\u65B0\u90FD\u4F1A\u6267\u884C\u51FD\u6570\u3002watch \u66F4\u9002\u7528\u4E8E\u6570\u636E\u53D8\u5316\u65F6\u7684\u5F02\u6B65\u64CD\u4F5C\u3002\u5982\u679C\u9700\u8981\u5728\u67D0\u4E2A\u6570\u636E\u53D8\u5316\u65F6\u505A\u4E00\u4E9B\u4E8B\u60C5\uFF0C\u4F7F\u7528 watch\u3002</p><p>method: \u5C06\u65B9\u6CD5\u5728\u6A21\u677F\u91CC\u4F7F\u7528\uFF0C\u6BCF\u6B21\u89C6\u56FE\u6709\u66F4\u65B0\u90FD\u4F1A\u91CD\u65B0\u6267\u884C\u51FD\u6570\uFF0C\u6027\u80FD\u6D88\u8017\u8F83\u5927\u3002</p><h2 id="_9-\u751F\u547D\u5468\u671F" tabindex="-1">9.\u751F\u547D\u5468\u671F <a class="header-anchor" href="#_9-\u751F\u547D\u5468\u671F" aria-hidden="true">#</a></h2><p>\u5B98\u7F51\u5BF9\u751F\u547D\u5468\u671F\u7684\u8BF4\u660E\uFF1A</p><blockquote><p>\u6BCF\u4E2A Vue \u5B9E\u4F8B\u5728\u88AB\u521B\u5EFA\u65F6\u90FD\u8981\u7ECF\u8FC7\u4E00\u7CFB\u5217\u7684\u521D\u59CB\u5316\u8FC7\u7A0B\u2014\u2014\u4F8B\u5982\uFF0C\u9700\u8981\u8BBE\u7F6E\u6570\u636E\u76D1\u542C\u3001\u7F16\u8BD1\u6A21\u677F\u3001\u5C06\u5B9E\u4F8B\u6302\u8F7D\u5230 DOM \u5E76\u5728\u6570\u636E\u53D8\u5316\u65F6\u66F4\u65B0 DOM \u7B49\u3002\u540C\u65F6\u5728\u8FD9\u4E2A\u8FC7\u7A0B\u4E2D\u4E5F\u4F1A\u8FD0\u884C\u4E00\u4E9B\u53EB\u505A\u751F\u547D\u5468\u671F\u94A9\u5B50\u7684\u51FD\u6570\uFF0C\u8FD9\u7ED9\u4E86\u7528\u6237\u5728\u4E0D\u540C\u9636\u6BB5\u6DFB\u52A0\u81EA\u5DF1\u7684\u4EE3\u7801\u7684\u673A\u4F1A\u3002</p></blockquote><p>\u751F\u547D\u5468\u671F\u5C31\u662F\u6BCF\u4E2A Vue \u5B9E\u4F8B\u5B8C\u6210\u521D\u59CB\u5316\u3001\u8FD0\u884C\u3001\u9500\u6BC1\u7684\u4E00\u7CFB\u5217\u52A8\u4F5C\u7684\u94A9\u5B50\u3002</p><p>\u57FA\u672C\u4E0A\u53EF\u4EE5\u8BF4 8 \u4E2A\u9636\u6BB5\u521B\u5EFA\u524D/\u540E\uFF0C\u8F7D\u5165\u524D/\u540E\uFF0C\u66F4\u65B0\u524D/\u540E\uFF0C\u9500\u6BC1\u524D/\u540E\u3002</p><ul><li>\u521B\u5EFA\u524D/\u540E\uFF1A \u5728 beforeCreate \u9636\u6BB5\uFF0Cvue \u5B9E\u4F8B\u7684\u6302\u8F7D\u5143\u7D20 el \u8FD8\u6CA1\u6709\u3002</li><li>\u8F7D\u5165\u524D/\u540E\uFF1A\u5728 beforeMount \u9636\u6BB5\uFF0Cvue \u5B9E\u4F8B\u7684$el \u548C data \u90FD\u521D\u59CB\u5316\u4E86\uFF0C\u4F46\u8FD8\u662F\u6302\u8F7D\u4E4B\u524D\u4E3A\u865A\u62DF\u7684 dom \u8282\u70B9\uFF0Cdata.message \u8FD8\u672A\u66FF\u6362\u3002\u5728 mounted \u9636\u6BB5\uFF0Cvue \u5B9E\u4F8B\u6302\u8F7D\u5B8C\u6210\uFF0Cdata.message \u6210\u529F\u6E32\u67D3\u3002</li><li>\u66F4\u65B0\u524D/\u540E\uFF1A\u5F53 data \u53D8\u5316\u65F6\uFF0C\u4F1A\u89E6\u53D1 beforeUpdate \u548C updated \u65B9\u6CD5\u3002</li><li>\u9500\u6BC1\u524D/\u540E\uFF1A\u5728\u6267\u884C destroy \u65B9\u6CD5\u540E\uFF0C\u5BF9 data \u7684\u6539\u53D8\u4E0D\u4F1A\u518D\u89E6\u53D1\u5468\u671F\u51FD\u6570\uFF0C\u8BF4\u660E\u6B64\u65F6 vue \u5B9E\u4F8B\u5DF2\u7ECF\u89E3\u9664\u4E86\u4E8B\u4EF6\u76D1\u542C\u4EE5\u53CA\u548C dom \u7684\u7ED1\u5B9A\uFF0C\u4F46\u662F dom \u7ED3\u6784\u4F9D\u7136\u5B58\u5728</li></ul><p>\u7ED3\u5408\u6E90\u7801\u518D\u7406\u89E3\uFF0C\u5728\u6E90\u7801\u4E2D\u751F\u547D\u5468\u671F\u94A9\u5B50\u662F\u7528 callHook \u51FD\u6570\u8C03\u7528\u7684\u3002\u770B\u4E0B callHook \u51FD\u6570\uFF1A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function callHook (vm: Component, hook: string) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  pushTarget()</span></span>
<span class="line"><span style="color:#A6ACCD;">  const handlers = vm.$options[hook]</span></span>
<span class="line"><span style="color:#A6ACCD;">  const info = \`\${hook} hook\`</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (handlers) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    for (let i = 0, j = handlers.length; i &lt; j; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      invokeWithErrorHandling(handlers[i], vm, null, vm, info)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (vm._hasHookEvent) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    vm.$emit(&#39;hook:&#39; + hook)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  popTarget()</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u63A5\u6536\u4E00\u4E2A vm \u7EC4\u4EF6\u5B9E\u4F8B\u7684\u53C2\u6570\u548C hook\uFF0C\u53D6\u7EC4\u4EF6\u5B9E\u4F8B\u7684$options \u4F20\u5165\u7684 hook \u5C5E\u6027\u503C\uFF0C\u6709\u7684\u8BDD\u4F1A\u5FAA\u73AF\u8C03\u7528\u8FD9\u4E2A\u94A9\u5B50\u7684\u56DE\u8C03\u51FD\u6570\u3002\u5728\u8C03\u7528\u751F\u547D\u94A9\u5B50\u7684\u56DE\u8C03\u51FD\u6570\u4E4B\u524D\u4F1A\u4E34\u65F6 pushTarget \u4E00\u4E2A null \u503C\uFF0C\u4E5F\u5C31\u662F\u5C06 Dep.target \u7F6E\u4E3A\u7A7A\u6765\u7981\u6B62\u5728\u6267\u884C\u751F\u547D\u94A9\u5B50\u7684\u65F6\u5019\u8FDB\u884C\u4F9D\u8D56\u6536\u96C6\u3002</p><p>vm.$emit(&#39;hook:&#39; + hook)\u5219\u662F\u7528\u6765\u7ED9\u7236\u7EC4\u4EF6\u76D1\u542C\u8BE5\u7EC4\u4EF6\u7684\u56DE\u8C03\u4E8B\u4EF6\u3002</p><p>\u63A5\u4E0B\u6765\u770B\u6BCF\u4E2A\u751F\u547D\u94A9\u5B50\u5177\u4F53\u8C03\u7528\u7684\u65F6\u673A\u3002</p><h3 id="_1-beforecreate\u3001created\uFF1A" tabindex="-1">1. beforeCreate\u3001created\uFF1A <a class="header-anchor" href="#_1-beforecreate\u3001created\uFF1A" aria-hidden="true">#</a></h3><div class="language-javascript"><span class="copy"></span><pre><code><span class="line"><span style="color:#FFCB6B;">Vue</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">_init</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Object</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">initLifecycle</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">vm</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">initEvents</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">vm</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">initRender</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">vm</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">callHook</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">vm</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">beforeCreate</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">initInjections</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">vm</span><span style="color:#F07178;">) </span><span style="color:#676E95;font-style:italic;">// resolve injections before data/props</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">initState</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">vm</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">initProvide</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">vm</span><span style="color:#F07178;">) </span><span style="color:#676E95;font-style:italic;">// resolve provide after data/props</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">callHook</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">vm</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">created</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">vm</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">$options</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">el</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">vm</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">$mount</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">vm</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">$options</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">el</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u5728\u6267\u884C beforeCreate \u4E4B\u524D\u8C03\u7528\u4E86 <code>initLifecycle\u3001initEvents\u3001initRender</code>\u51FD\u6570\uFF0C\u6240\u4EE5 beforeCreate \u662F\u5728\u521D\u59CB\u5316\u751F\u547D\u5468\u671F\u3001\u4E8B\u4EF6\u3001\u6E32\u67D3\u51FD\u6570\u4E4B\u540E\u7684\u751F\u547D\u5468\u671F\u3002</p><p>\u5728\u6267\u884C created \u4E4B\u524D\u8C03\u7528\u4E86 initInjections\u3001initState\u3001initProvide\uFF0C\u8FD9\u65F6\u5019 created \u521D\u59CB\u5316\u4E86 data\u3001props\u3001watcher\u3001provide\u3001inject \u7B49\uFF0C\u6240\u4EE5\u8FD9\u65F6\u5019\u5C31\u53EF\u4EE5\u8BBF\u95EE\u5230 data\u3001props \u7B49\u5C5E\u6027\u3002</p><h3 id="_2-beforemount\u3001mounted" tabindex="-1">2. beforeMount\u3001mounted <a class="header-anchor" href="#_2-beforemount\u3001mounted" aria-hidden="true">#</a></h3><p>\u5728\u4E0A\u9762\u7684\u4EE3\u7801\u7247\u6BB5\u53EF\u4EE5\u770B\u5230 created \u4E4B\u540E\u4F1A\u8FDB\u884C DOM \u7684\u6302\u8F7D\uFF0C\u6267\u884C\u7684\u51FD\u6570\u662F vm.$mount(vm.$options.el)\uFF0C\u63A5\u4E0B\u6765\u5206\u6790\u4E0B$mount \u65B9\u6CD5\u3002</p><p>vm.$mount\u5C31\u662FVue.prototype.$mount \u539F\u578B\u65B9\u6CD5\u7EE7\u627F\u800C\u6765\u7684\u3002\u8FD9\u4E2A\u65B9\u6CD5\u5728<code>src/platforms/web/entry-runtime-with-compiler.js</code>\u4E0B\u58F0\u660E\u7684\uFF0C\u4E3B\u8981\u8FDB\u884C\u6A21\u677F\u7684\u89E3\u6790\uFF0C\u4F18\u5148\u5224\u65AD\u662F\u5426\u6709 render \u51FD\u6570\u8FD9\u4E2A\u5C5E\u6027\uFF0C\u6CA1\u6709\u518D\u8FDB\u884C tamplare \u6A21\u677F\u89E3\u6790\uFF0C\u6700\u7EC8\u90FD\u662F\u7528 render \u51FD\u6570\u8FDB\u884C\u6E32\u67D3\u3002</p><p>\u5728\u89E3\u6790\u5B8C render \u51FD\u6570\u540E\u4F1A\u8C03\u7528 callHook(vm, &#39;beforeMount&#39;)\uFF0C\u800C\u540E\u6267\u884C vm._render()\uFF0C\u518D callHook(vm, &#39;mounted&#39;)\u65B9\u6CD5\uFF0C\u8FD9\u65F6\u5019\u6807\u8BB0\u7740 el \u88AB\u65B0\u521B\u5EFA\u7684 vm.$el \u66FF\u6362\uFF0C\u5E76\u88AB\u6302\u8F7D\u5230\u5B9E\u4F8B\u4E0A</p><h3 id="_3-beforeupdate\u3001updated" tabindex="-1">3. beforeUpdate\u3001updated <a class="header-anchor" href="#_3-beforeupdate\u3001updated" aria-hidden="true">#</a></h3><p>\u8FD9\u4E24\u4E2A\u94A9\u5B50\u51FD\u6570\u662F\u5728\u6570\u636E\u66F4\u65B0\u7684\u65F6\u5019\u8FDB\u884C\u56DE\u8C03\u7684\u51FD\u6570\u3002\u5728<code>src/core/instance/lifecycle.js</code>\u627E\u5230 beforeUpdate \u8C03\u7528\u7684\u4EE3\u7801\uFF1A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">new Watcher(vm, updateComponent, noop, {</span></span>
<span class="line"><span style="color:#A6ACCD;">    before () {</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (vm._isMounted &amp;&amp; !vm._isDestroyed) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        callHook(vm, &#39;beforeUpdate&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }, true /* isRenderWatcher */)</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>_isMounted \u4E3A ture \u7684\u8BDD\uFF08DOM \u5DF2\u7ECF\u88AB\u6302\u8F7D\uFF09\u4F1A\u8C03\u7528 callHook(vm, &#39;beforeUpdate&#39;)\u65B9\u6CD5\uFF0C\u7136\u540E\u4F1A\u5BF9\u865A\u62DF DOM \u8FDB\u884C\u91CD\u65B0\u6E32\u67D3\u3002\u7136\u540E\u5728/src/core/observer/scheduler.js \u4E0B\u7684 flushSchedulerQueue()\u51FD\u6570\u4E2D\u6E32\u67D3 DOM\uFF0CflushSchedulerQueue \u4F1A\u5237\u65B0 watcher \u961F\u5217\u5E76\u6267\u884C\uFF0C\u6267\u884C\u5B8C\u6240\u6709 watcher \u7684 run \u65B9\u6CD5\u4E4B\u540E\uFF08run \u65B9\u6CD5\u5C31\u662F watcher \u8FDB\u884C dom diff \u5E76\u66F4\u65B0 DOM \u7684\u65B9\u6CD5\uFF09\uFF0C\u518D\u8C03\u7528 callHook(vm, &#39;updated&#39;)\uFF0C\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * Flush both queues and run the watchers.</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">function flushSchedulerQueue () {</span></span>
<span class="line"><span style="color:#A6ACCD;"> ...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> for (index = 0; index &lt; queue.length; index++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    watcher = queue[index]</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (watcher.before) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      watcher.before()</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    watcher.run()</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  callUpdatedHooks(updatedQueue)</span></span>
<span class="line"><span style="color:#A6ACCD;"> ...</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function callUpdatedHooks (queue) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  let i = queue.length</span></span>
<span class="line"><span style="color:#A6ACCD;">  while (i--) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const watcher = queue[i]</span></span>
<span class="line"><span style="color:#A6ACCD;">    const vm = watcher.vm</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (vm._watcher === watcher &amp;&amp; vm._isMounted &amp;&amp; !vm._isDestroyed) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      callHook(vm, &#39;updated&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="_4-beforedestroy\u3001destroyed" tabindex="-1">4. beforeDestroy\u3001destroyed <a class="header-anchor" href="#_4-beforedestroy\u3001destroyed" aria-hidden="true">#</a></h3><p>\u8FD9\u4E24\u4E2A\u94A9\u5B50\u662F vue \u5B9E\u4F8B\u9500\u6BC1\u7684\u94A9\u5B50\uFF0C\u5B9A\u4E49\u5728 Vue.prototype.$destroy \u4E2D\uFF1A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">Vue.prototype.$destroy = function () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const vm: Component = this</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (vm._isBeingDestroyed) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    callHook(vm, &#39;beforeDestroy&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    vm._isBeingDestroyed = true</span></span>
<span class="line"><span style="color:#A6ACCD;">    // remove self from parent</span></span>
<span class="line"><span style="color:#A6ACCD;">    const parent = vm.$parent</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (parent &amp;&amp; !parent._isBeingDestroyed &amp;&amp; !vm.$options.abstract) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      remove(parent.$children, vm)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    // teardown watchers</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (vm._watcher) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      vm._watcher.teardown()</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    let i = vm._watchers.length</span></span>
<span class="line"><span style="color:#A6ACCD;">    while (i--) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      vm._watchers[i].teardown()</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    // remove reference from data ob</span></span>
<span class="line"><span style="color:#A6ACCD;">    // frozen object may not have observer.</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (vm._data.__ob__) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      vm._data.__ob__.vmCount--</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    // call the last hook...</span></span>
<span class="line"><span style="color:#A6ACCD;">    vm._isDestroyed = true</span></span>
<span class="line"><span style="color:#A6ACCD;">    // invoke destroy hooks on current rendered tree</span></span>
<span class="line"><span style="color:#A6ACCD;">    vm.__patch__(vm._vnode, null)</span></span>
<span class="line"><span style="color:#A6ACCD;">    // fire destroyed hook</span></span>
<span class="line"><span style="color:#A6ACCD;">    callHook(vm, &#39;destroyed&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    // turn off all instance listeners.</span></span>
<span class="line"><span style="color:#A6ACCD;">    vm.$off()</span></span>
<span class="line"><span style="color:#A6ACCD;">    // remove __vue__ reference</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (vm.$el) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      vm.$el.__vue__ = null</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (vm.$vnode) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      vm.$vnode.parent = null</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5728\u9500\u6BC1\u4E4B\u524D\u6267\u884C callHook(vm, &#39;beforeDestroy&#39;)\uFF0C\u7136\u540E\u9500\u6BC1\u7684\u65F6\u5019\u505A\u4E86\u51E0\u4EF6\u4E8B\uFF1A</p><ul><li>\u5982\u679C\u6709\u7236\u5143\u7D20\uFF0C\u5C06\u7236\u5143\u7D20\u7684$children \u4E2D\u628A\u8BE5\u7EC4\u4EF6\u5B9E\u4F8B\u79FB\u9664\u3002</li><li>\u79FB\u9664 watchers\uFF0C\u5E76\u5728\u4F9D\u8D56\u8BA2\u9605\u8005\u4E2D\u79FB\u9664\u81EA\u5DF1\u3002</li><li>\u5220\u9664\u6570\u636E\u5F15\u7528</li></ul><h3 id="_5-activated\u3001deactivated" tabindex="-1">5. activated\u3001deactivated <a class="header-anchor" href="#_5-activated\u3001deactivated" aria-hidden="true">#</a></h3><p>\u5269\u4E0B\u7684\u8FD8\u6709<code>activated\u3001deactivated\u3001errorCaptured</code>\u4E09\u4E2A\u94A9\u5B50\u51FD\u6570\u3002</p><p>activated\u3001deactivated \u8FD9\u4E24\u4E2A\u94A9\u5B50\u51FD\u6570\u5206\u522B\u662F\u5728 keep-alive \u7EC4\u4EF6\u6FC0\u6D3B\u548C\u505C\u7528\u4E4B\u540E\u7684\u56DE\u8C03\u3002</p><p>errorCaptured \u6355\u83B7\u5230\u5F53\u5B50\u5B59\u7EC4\u4EF6\u9519\u8BEF\u65F6\u4F1A\u88AB\u8C03\u7528\uFF0C\u5728\u6E90\u7801\u4E2D\u53EF\u4EE5\u7ECF\u5E38\u770B\u5230 try catch \u4E2D catch \u4F1A\u8C03\u7528 handleError \u51FD\u6570\uFF0ChandleError \u4F1A\u5411\u7EC4\u4EF6\u6240\u6709\u7684\u7236\u7EA7\u7EC4\u4EF6\u629B\u51FA\u5F02\u5E38\uFF0C</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function handleError (err: Error, vm: any, info: string) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  pushTarget()</span></span>
<span class="line"><span style="color:#A6ACCD;">  try {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (vm) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      let cur = vm</span></span>
<span class="line"><span style="color:#A6ACCD;">      while ((cur = cur.$parent)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        const hooks = cur.$options.errorCaptured</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (hooks) {</span></span>
<span class="line"><span style="color:#A6ACCD;">          for (let i = 0; i &lt; hooks.length; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            try {</span></span>
<span class="line"><span style="color:#A6ACCD;">              const capture = hooks[i].call(cur, err, vm, info) === false</span></span>
<span class="line"><span style="color:#A6ACCD;">              if (capture) return</span></span>
<span class="line"><span style="color:#A6ACCD;">            } catch (e) {</span></span>
<span class="line"><span style="color:#A6ACCD;">              globalHandleError(e, cur, &#39;errorCaptured hook&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    globalHandleError(err, vm, info)</span></span>
<span class="line"><span style="color:#A6ACCD;">  } finally {</span></span>
<span class="line"><span style="color:#A6ACCD;">    popTarget()</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5206\u6790\u5B8C\u6E90\u7801\u518D\u4E00\u4E0B\u5B98\u7F51\u56FE\u793A\uFF0C\u4F1A\u66F4\u6E05\u695A\uFF1A</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efe0499e41d24b8e9912d2e0cdd7423f~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><h2 id="_10-keep-alive-\u539F\u7406" tabindex="-1">10.keep-alive \u539F\u7406 <a class="header-anchor" href="#_10-keep-alive-\u539F\u7406" aria-hidden="true">#</a></h2><p>keep-alive \u662F Vue.js \u7684\u4E00\u4E2A\u5185\u7F6E\u7EC4\u4EF6\u3002\u5B83\u80FD\u591F\u5C06\u4E0D\u6D3B\u52A8\u7684\u7EC4\u4EF6\u5B9E\u4F8B\u4FDD\u5B58\u5728\u5185\u5B58\u4E2D\uFF0C\u800C\u4E0D\u662F\u76F4\u63A5\u5C06\u5176\u9500\u6BC1\uFF0C\u5B83\u662F\u4E00\u4E2A\u62BD\u8C61\u7EC4\u4EF6\uFF0C\u4E0D\u4F1A\u88AB\u6E32\u67D3\u5230\u771F\u5B9E DOM \u4E2D\uFF0C\u4E5F\u4E0D\u4F1A\u51FA\u73B0\u5728\u7236\u7EC4\u4EF6\u94FE\u4E2D\u3002</p><p>include \u4E0E exclude \u4E24\u4E2A\u5C5E\u6027\uFF0C\u5141\u8BB8\u7EC4\u4EF6\u6709\u6761\u4EF6\u5730\u8FDB\u884C\u7F13\u5B58\uFF0Cmax \u5C5E\u6027\u786E\u5B9A\u6700\u591A\u7F13\u5B58\u591A\u5C11\u7EC4\u4EF6\u5B9E\u4F8B\u3002</p><p>keep-alive \u662F\u4E00\u4E2A\u7EC4\u4EF6\uFF0C\u8DDF\u5176\u4ED6\u7EC4\u4EF6\u4E00\u6837\u6709\u751F\u547D\u5468\u671F\u548C render \u51FD\u6570\uFF0Ckeep-alive \u5305\u88F9\u7684\u5206\u6790 keep-alive \u5C31\u662F\u5206\u6790\u4E00\u4E2A\u7EC4\u4EF6\u3002</p><p>\u6E90\u7801\u518D<code>src/core/components/keep-alive</code>\uFF0Ccreated \u58F0\u660E\u4E86\u8981\u7F13\u5B58\u7684\u7EC4\u4EF6\u5BF9\u8C61\uFF0C\u548C\u5B58\u50A8\u7684\u7EC4\u4EF6 keys\uFF0Ckeep-alive \u9500\u6BC1\u7684\u65F6\u5019\u4F1A\u7528 pruneCacheEntry \u5C06\u7F13\u5B58\u7684\u6240\u6709\u7EC4\u4EF6\u5B9E\u4F8B\u9500\u6BC1\uFF0C\u4E5F\u5C31\u662F\u8C03\u7528\u7EC4\u4EF6\u5B9E\u4F8B\u7684 destroy \u65B9\u6CD5\u3002\u5728\u6302\u8F7D\u5B8C\u6210\u540E\u76D1\u542C include \u548C exclude\uFF0C\u52A8\u6001\u5730\u9500\u6BC1\u5DF2\u7ECF\u4E0D\u6EE1\u8DB3 include \u7684\u7EC4\u4EF6\u548C\u6EE1\u8DB3 exclude \u7684\u7EC4\u4EF6\u5B9E\u4F8B:</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">created () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.cache = Object.create(null) // \u5B58\u50A8\u9700\u8981\u7F13\u5B58\u7684\u7EC4\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.keys = [] // \u5B58\u50A8\u6BCF\u4E2A\u9700\u8981\u7F13\u5B58\u7684\u7EC4\u4EF6\u7684key\uFF0C\u5373\u5BF9\u5E94this.cache\u5BF9\u8C61\u4E2D\u7684\u952E\u503C</span></span>
<span class="line"><span style="color:#A6ACCD;">},</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// \u9500\u6BC1keep-alive\u7EC4\u4EF6\u7684\u65F6\u5019\uFF0C\u5BF9\u7F13\u5B58\u4E2D\u7684\u6BCF\u4E2A\u7EC4\u4EF6\u6267\u884C\u9500\u6BC1</span></span>
<span class="line"><span style="color:#A6ACCD;">destroyed () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    for (const key in this.cache) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      pruneCacheEntry(this.cache, key, this.keys)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">mounted () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.$watch(&#39;include&#39;, val =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      pruneCache(this, name =&gt; matches(val, name))</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.$watch(&#39;exclude&#39;, val =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      pruneCache(this, name =&gt; !matches(val, name))</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">},</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u63A5\u4E0B\u6765\u662F render \u51FD\u6570\uFF1A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">render () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const slot = this.$slots.default</span></span>
<span class="line"><span style="color:#A6ACCD;">    const vnode: VNode = getFirstComponentChild(slot)</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u5982\u679Cvnode\u5B58\u5728\u5C31\u53D6vnode\u7684\u9009\u9879</span></span>
<span class="line"><span style="color:#A6ACCD;">    const componentOptions: ?VNodeComponentOptions = vnode &amp;&amp; vnode.componentOptions</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (componentOptions) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // check pattern</span></span>
<span class="line"><span style="color:#A6ACCD;">      //\u83B7\u53D6\u7B2C\u4E00\u4E2A\u6709\u6548\u7EC4\u4EF6\u7684name</span></span>
<span class="line"><span style="color:#A6ACCD;">      const name: ?string = getComponentName(componentOptions)</span></span>
<span class="line"><span style="color:#A6ACCD;">      const { include, exclude } = this</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (</span></span>
<span class="line"><span style="color:#A6ACCD;">        // not included</span></span>
<span class="line"><span style="color:#A6ACCD;">        (include &amp;&amp; (!name || !matches(include, name))) ||</span></span>
<span class="line"><span style="color:#A6ACCD;">        // excluded</span></span>
<span class="line"><span style="color:#A6ACCD;">        (exclude &amp;&amp; name &amp;&amp; matches(exclude, name))</span></span>
<span class="line"><span style="color:#A6ACCD;">      ) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return vnode// \u8BF4\u660E\u4E0D\u7528\u7F13\u5B58\uFF0C\u76F4\u63A5\u8FD4\u56DE\u8FD9\u4E2A\u7EC4\u4EF6\u8FDB\u884C\u6E32\u67D3</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      // \u5339\u914D\u5230\u4E86\uFF0C\u5F00\u59CB\u7F13\u5B58\u64CD\u4F5C</span></span>
<span class="line"><span style="color:#A6ACCD;">      const { cache, keys } = this // keep-alive\u7EC4\u4EF6\u7684\u7F13\u5B58\u7EC4\u4EF6\u548C\u7F13\u5B58\u7EC4\u4EF6\u5BF9\u5E94\u7684key</span></span>
<span class="line"><span style="color:#A6ACCD;">      // \u83B7\u53D6\u7B2C\u4E00\u4E2A\u6709\u6548\u7EC4\u4EF6\u7684key</span></span>
<span class="line"><span style="color:#A6ACCD;">      const key: ?string = vnode.key == null</span></span>
<span class="line"><span style="color:#A6ACCD;">        // same constructor may get registered as different local components</span></span>
<span class="line"><span style="color:#A6ACCD;">        // so cid alone is not enough (#3269)</span></span>
<span class="line"><span style="color:#A6ACCD;">        ? componentOptions.Ctor.cid + (componentOptions.tag ? \`::\${componentOptions.tag}\` : &#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">        : vnode.key</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (cache[key]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // \u8FD9\u4E2A\u7EC4\u4EF6\u7684\u5B9E\u4F8B\u7528\u7F13\u5B58\u4E2D\u7684\u7EC4\u4EF6\u5B9E\u4F8B\u66FF\u6362</span></span>
<span class="line"><span style="color:#A6ACCD;">        vnode.componentInstance = cache[key].componentInstance</span></span>
<span class="line"><span style="color:#A6ACCD;">        // make current key freshest</span></span>
<span class="line"><span style="color:#A6ACCD;">        // \u66F4\u65B0\u5F53\u524Dkey\u5728keys\u4E2D\u7684\u4F4D\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">        remove(keys, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">        keys.push(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">        cache[key] = vnode</span></span>
<span class="line"><span style="color:#A6ACCD;">        keys.push(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">        // prune oldest entry</span></span>
<span class="line"><span style="color:#A6ACCD;">        // \u5982\u679C\u7F13\u5B58\u4E2D\u7684\u7EC4\u4EF6\u4E2A\u6570\u8D85\u8FC7\u4F20\u5165\u7684max\uFF0C\u9500\u6BC1\u7F13\u5B58\u4E2D\u7684LRU\u7EC4\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">        // LRU: least recently used \u6700\u8FD1\u6700\u5C11\u7528\uFF0C\u7F13\u5B58\u6DD8\u6C70\u7B56\u7565</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (this.max &amp;&amp; keys.length &gt; parseInt(this.max)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">          pruneCacheEntry(cache, keys[0], keys, this._vnode)</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      vnode.data.keepAlive = true</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u82E5\u7B2C\u4E00\u4E2A\u6709\u6548\u7684\u7EC4\u4EF6\u5B58\u5728\uFF0C\u4F46\u5176componentOptions\u4E0D\u5B58\u5728\uFF0C\u5C31\u8FD4\u56DE\u8FD9\u4E2A\u7EC4\u4EF6\u8FDB\u884C\u6E32\u67D3</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u6216\u82E5\u4E5F\u4E0D\u5B58\u5728\u6709\u6548\u7684\u7B2C\u4E00\u4E2A\u7EC4\u4EF6\uFF0C\u4F46keep-alive\u7EC4\u4EF6\u7684\u9ED8\u8BA4\u63D2\u69FD\u5B58\u5728\uFF0C\u5C31\u8FD4\u56DE\u9ED8\u8BA4\u63D2\u69FD\u7684\u7B2C\u4E00\u4E2A\u7EC4\u4EF6\u8FDB\u884C\u6E32\u67D3</span></span>
<span class="line"><span style="color:#A6ACCD;">    return vnode || (slot &amp;&amp; slot[0])</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u4EE3\u7801\u505A\u4E86\u8BE6\u7EC6\u7684\u6CE8\u91CA\uFF0C\u8FD9\u91CC\u518D\u5206\u6790\u4E0B render \u505A\u4E86\u4EC0\u4E48\u3002</p><p>\u901A\u8FC7 this.$slots.default \u62FF\u5230\u63D2\u69FD\u7EC4\u4EF6\uFF0C\u4E5F\u5C31\u662F keep-alive \u5305\u88F9\u7684\u7EC4\u4EF6\uFF0CgetFirstComponentChild \u83B7\u53D6\u7B2C\u4E00\u4E2A\u5B50\u7EC4\u4EF6\uFF0C\u83B7\u53D6\u8BE5\u7EC4\u4EF6\u7684 name\uFF08\u5B58\u5728\u7EC4\u4EF6\u540D\u5219\u76F4\u63A5\u4F7F\u7528\u7EC4\u4EF6\u540D\uFF0C\u5426\u5219\u4F1A\u4F7F\u7528 tag\uFF09\u3002\u63A5\u4E0B\u6765\u4F1A\u5C06\u8FD9\u4E2A name \u901A\u8FC7 include \u4E0E exclude \u5C5E\u6027\u8FDB\u884C\u5339\u914D\uFF0C\u5339\u914D\u4E0D\u6210\u529F\uFF08\u8BF4\u660E\u4E0D\u9700\u8981\u8FDB\u884C\u7F13\u5B58\uFF09\u5219\u4E0D\u8FDB\u884C\u4EFB\u4F55\u64CD\u4F5C\u76F4\u63A5\u8FD4\u56DE vnode<code>\uFF08vnode\u8282\u70B9\u63CF\u8FF0\u5BF9\u8C61\uFF0Cvue\u901A\u8FC7vnode\u521B\u5EFA\u771F\u5B9E\u7684DOM\uFF09</code>\u3002</p><p>\u5339\u914D\u5230\u4E86\u5C31\u5F00\u59CB\u7F13\u5B58\uFF0C\u6839\u636E key \u5728 this.cache \u4E2D\u67E5\u627E\uFF0C\u5982\u679C\u5B58\u5728\u5219\u8BF4\u660E\u4E4B\u524D\u5DF2\u7ECF\u7F13\u5B58\u8FC7\u4E86\uFF0C\u76F4\u63A5\u5C06\u7F13\u5B58\u7684 vnode \u7684 componentInstance\uFF08\u7EC4\u4EF6\u5B9E\u4F8B\uFF09\u8986\u76D6\u5230\u76EE\u524D\u7684 vnode \u4E0A\u9762\u3002\u5426\u5219\u5C06 vnode \u5B58\u50A8\u5728 cache \u4E2D\u3002\u5E76\u4E14\u901A\u8FC7 remove(keys, key)\uFF0C\u5C06\u5F53\u524D\u7684 key \u4ECE keys \u4E2D\u5220\u9664\u518D\u91CD\u65B0 keys.push(key)\uFF0C\u8FD9\u6837\u5C31\u6539\u53D8\u4E86\u5F53\u524D key \u5728 keys \u4E2D\u7684\u4F4D\u7F6E\u3002\u8FD9\u4E2A\u662F\u4E3A\u4E86\u5B9E\u73B0 max \u7684\u529F\u80FD\uFF0C\u5E76\u4E14\u9075\u5FAA\u7F13\u5B58\u6DD8\u6C70\u7B56\u7565\u3002</p><p>\u5982\u679C\u6CA1\u5339\u914D\u5230\uFF0C\u8BF4\u660E\u6CA1\u7F13\u5B58\u8FC7\uFF0C\u8FD9\u65F6\u5019\u9700\u8981\u8FDB\u884C\u7F13\u5B58\uFF0C\u5E76\u4E14\u5224\u65AD\u5F53\u524D\u7F13\u5B58\u7684\u4E2A\u6570\u662F\u5426\u8D85\u8FC7 max \u6307\u5B9A\u7684\u4E2A\u6570\uFF0C\u5982\u679C\u8D85\u8FC7\uFF0C\u5219\u9500\u6BC1 keys \u91CC\u7684\u6700\u540E\u4E00\u4E2A\u7EC4\u4EF6\uFF0C\u5E76\u4ECE keys \u4E2D\u79FB\u9664\uFF0C\u8FD9\u4E2A\u5C31\u662F LRU\uFF08<code>Least Recently Used \uFF1A\u6700\u8FD1\u6700\u5C11\u4F7F\u7528 </code>\uFF09\u7F13\u5B58\u6DD8\u6C70\u7B97\u6CD5\u3002</p><p>\u6700\u540E\u8FD4\u56DE vnode \u6216\u8005\u9ED8\u8BA4\u63D2\u69FD\u7684\u7B2C\u4E00\u4E2A\u7EC4\u4EF6\u8FDB\u884C DOM \u6E32\u67D3\u3002</p><h2 id="_12-\u865A\u62DF-dom-\u548C-diff-\u7B97\u6CD5" tabindex="-1">12.\u865A\u62DF dom \u548C diff \u7B97\u6CD5 <a class="header-anchor" href="#_12-\u865A\u62DF-dom-\u548C-diff-\u7B97\u6CD5" aria-hidden="true">#</a></h2><p>\u865A\u62DF DOM \u662F\u5BF9 DOM \u7684\u63CF\u8FF0\uFF0C\u7528\u5BF9\u8C61\u5C5E\u6027\u6765\u63CF\u8FF0\u8282\u70B9\uFF0C\u672C\u8D28\u4E0A\u662F JavaScript \u5BF9\u8C61\u3002\u5B83\u6709\u51E0\u4E2A\u610F\u4E49\uFF1A</p><ol><li><p>\u5177\u5907\u8DE8\u5E73\u53F0\u7684\u4F18\u52BF \u7531\u4E8E Virtual DOM \u662F\u4EE5 JavaScript \u5BF9\u8C61\u4E3A\u57FA\u7840\u800C\u4E0D\u4F9D\u8D56\u771F\u5B9E\u5E73\u53F0\u73AF\u5883\uFF0C\u6240\u4EE5\u4F7F\u5B83\u5177\u6709\u4E86\u8DE8\u5E73\u53F0\u7684\u80FD\u529B\uFF0C\u6BD4\u5982\u8BF4\u6D4F\u89C8\u5668\u3001\u5C0F\u7A0B\u5E8F\u3001Node\u3001\u539F\u751F\u5E94\u7528\u3001\u670D\u52A1\u7AEF\u6E32\u67D3\u7B49\u7B49\u3002</p></li><li><p>\u63D0\u5347\u6E32\u67D3\u6027\u80FD \u9891\u7E41\u53D8\u52A8 DOM \u4F1A\u9020\u6210\u6D4F\u89C8\u5668\u7684\u56DE\u6D41\u6216\u8005\u91CD\u56DE\uFF0C\u800C\u901A\u8FC7\u5C06\u5927\u91CF\u7684 DOM \u64CD\u4F5C\u642C\u8FD0\u5230 Javascript \u4E2D\uFF0C\u8FD0\u7528 patching \u7B97\u6CD5\u6765\u8BA1\u7B97\u51FA\u771F\u6B63\u9700\u8981\u66F4\u65B0\u7684\u8282\u70B9\uFF0C\u53EF\u4EE5\u51CF\u5C11\u771F\u5B9E DOM \u7684\u64CD\u4F5C\u6B21\u6570\uFF0C\u4ECE\u800C\u63D0\u9AD8\u6027\u80FD\u3002</p></li><li><p>\u4EE3\u7801\u53EF\u7EF4\u62A4\u6027\u66F4\u9AD8 \u901A\u8FC7\u865A\u62DF DOM \u7684\u62BD\u8C61\u80FD\u529B\uFF0C\u53EF\u4EE5\u7528\u58F0\u660E\u5F0F\u5199 UI \u7684\u65B9\u5F0F\uFF0C\u5927\u5927\u63D0\u9AD8\u4E86\u6211\u4EEC\u7684\u5DE5\u4F5C\u6548\u7387\u3002</p></li></ol><p>\u5728 vue \u4E2D template \u6700\u7EC8\u4F1A\u8F6C\u6210 render \u51FD\u6570\uFF0C\u800C render \u51FD\u6570\u6700\u7EC8\u662F\u6267\u884C\u7684 createElement\uFF0C\u751F\u6210 vnode\uFF0Cvnode \u6B63\u662F vue \u4E2D\u7528\u6765\u8868\u793A\u865A\u62DF DOM \u7684\u7C7B\uFF0C\u770B\u4E0B vnode\uFF1A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">class VNode {</span></span>
<span class="line"><span style="color:#A6ACCD;">  tag: string | void;</span></span>
<span class="line"><span style="color:#A6ACCD;">  data: VNodeData | void;</span></span>
<span class="line"><span style="color:#A6ACCD;">  children: ?Array&lt;VNode&gt;;</span></span>
<span class="line"><span style="color:#A6ACCD;">  text: string | void;</span></span>
<span class="line"><span style="color:#A6ACCD;">  elm: Node | void;</span></span>
<span class="line"><span style="color:#A6ACCD;">  ns: string | void;</span></span>
<span class="line"><span style="color:#A6ACCD;">  context: Component | void; // rendered in this component&#39;s scope</span></span>
<span class="line"><span style="color:#A6ACCD;">  key: string | number | void;</span></span>
<span class="line"><span style="color:#A6ACCD;">  componentOptions: VNodeComponentOptions | void;</span></span>
<span class="line"><span style="color:#A6ACCD;">  componentInstance: Component | void; // component instance</span></span>
<span class="line"><span style="color:#A6ACCD;">  parent: VNode | void; // component placeholder node</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // strictly internal</span></span>
<span class="line"><span style="color:#A6ACCD;">  raw: boolean; // contains raw HTML? (server only)</span></span>
<span class="line"><span style="color:#A6ACCD;">  isStatic: boolean; // hoisted static node</span></span>
<span class="line"><span style="color:#A6ACCD;">  isRootInsert: boolean; // necessary for enter transition check</span></span>
<span class="line"><span style="color:#A6ACCD;">  isComment: boolean; // empty comment placeholder?</span></span>
<span class="line"><span style="color:#A6ACCD;">  isCloned: boolean; // is a cloned node?</span></span>
<span class="line"><span style="color:#A6ACCD;">  isOnce: boolean; // is a v-once node?</span></span>
<span class="line"><span style="color:#A6ACCD;">  asyncFactory: Function | void; // async component factory function</span></span>
<span class="line"><span style="color:#A6ACCD;">  asyncMeta: Object | void;</span></span>
<span class="line"><span style="color:#A6ACCD;">  isAsyncPlaceholder: boolean;</span></span>
<span class="line"><span style="color:#A6ACCD;">  ssrContext: Object | void;</span></span>
<span class="line"><span style="color:#A6ACCD;">  fnContext: Component | void; // real context vm for functional nodes</span></span>
<span class="line"><span style="color:#A6ACCD;">  fnOptions: ?ComponentOptions; // for SSR caching</span></span>
<span class="line"><span style="color:#A6ACCD;">  devtoolsMeta: ?Object; // used to store functional render context for devtools</span></span>
<span class="line"><span style="color:#A6ACCD;">  fnScopeId: ?string; // functional scope id support</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  constructor(</span></span>
<span class="line"><span style="color:#A6ACCD;">    tag?: string,</span></span>
<span class="line"><span style="color:#A6ACCD;">    data?: VNodeData,</span></span>
<span class="line"><span style="color:#A6ACCD;">    children?: ?Array&lt;VNode&gt;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    text?: string,</span></span>
<span class="line"><span style="color:#A6ACCD;">    elm?: Node,</span></span>
<span class="line"><span style="color:#A6ACCD;">    context?: Component,</span></span>
<span class="line"><span style="color:#A6ACCD;">    componentOptions?: VNodeComponentOptions,</span></span>
<span class="line"><span style="color:#A6ACCD;">    asyncFactory?: Function</span></span>
<span class="line"><span style="color:#A6ACCD;">  ) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.tag = tag;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.data = data;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.children = children;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.text = text;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.elm = elm;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.ns = undefined;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.context = context;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.fnContext = undefined;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.fnOptions = undefined;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.fnScopeId = undefined;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.key = data &amp;&amp; data.key;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.componentOptions = componentOptions;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.componentInstance = undefined;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.parent = undefined;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.raw = false;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.isStatic = false;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.isRootInsert = true;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.isComment = false;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.isCloned = false;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.isOnce = false;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.asyncFactory = asyncFactory;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.asyncMeta = undefined;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.isAsyncPlaceholder = false;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // DEPRECATED: alias for componentInstance for backwards compat.</span></span>
<span class="line"><span style="color:#A6ACCD;">  /* istanbul ignore next */</span></span>
<span class="line"><span style="color:#A6ACCD;">  get child(): Component | void {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return this.componentInstance;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u770B\u4E0B\u5176\u4E2D\u5173\u952E\u7684\u51E0\u4E2A\u5C5E\u6027\uFF1A</p><ul><li><p>tag: \u5F53\u524D\u8282\u70B9\u7684\u6807\u7B7E\u540D</p></li><li><p>data: \u8868\u793A\u8282\u70B9\u4E0A\u7684 class\uFF0Cattribute\uFF0Cstyle \u4EE5\u53CA\u7ED1\u5B9A\u7684\u4E8B\u4EF6</p></li><li><p>children: \u5F53\u524D\u8282\u70B9\u7684\u5B50\u8282\u70B9\uFF0C\u662F\u4E00\u4E2A\u6570\u7EC4</p></li><li><p>text: \u5F53\u524D\u8282\u70B9\u7684\u6587\u672C</p></li><li><p>elm: \u5F53\u524D\u865A\u62DF\u8282\u70B9\u5BF9\u5E94\u7684\u771F\u5B9E dom \u8282\u70B9</p></li><li><p>key: \u8282\u70B9\u7684 key \u5C5E\u6027\uFF0C\u88AB\u5F53\u4F5C\u8282\u70B9\u7684\u6807\u5FD7\uFF0C\u7528\u4EE5\u4F18\u5316</p></li><li><p>componentOptions: \u7EC4\u4EF6\u7684 option \u9009\u9879</p></li><li><p>componentInstance: \u5F53\u524D\u8282\u70B9\u5BF9\u5E94\u7684\u7EC4\u4EF6\u7684\u5B9E\u4F8B</p></li><li><p>parent: \u5F53\u524D\u8282\u70B9\u7684\u7236\u8282\u70B9</p></li><li><p>isStatic: \u662F\u5426\u4E3A\u9759\u6001\u8282\u70B9</p></li></ul><p>children \u548C parent \u662F\u6307\u5F53\u524D\u7684 vnode \u7684\u5B50\u8282\u70B9\u548C\u7236\u8282\u70B9\uFF0C\u8FD9\u6837\u4E00\u4E2A\u4E2A vnode \u5C31\u5F62\u6210\u4E86 DOM \u6811\u3002</p><p>diff \u7B97\u6CD5\u53D1\u751F\u5728<code>\u89C6\u56FE\u66F4\u65B0</code>\u7684\u65F6\u5019\uFF0C\u4E5F\u5C31\u662F\u6570\u636E\u66F4\u65B0\u7684\u65F6\u5019\uFF0C<code>diff\u7B97\u6CD5\u4F1A\u5C06\u65B0\u65E7\u865A\u62DFDOM\u4F5C\u5BF9\u6BD4\uFF0C\u5C06\u53D8\u5316\u7684\u5730\u65B9\u8F6C\u6362\u4E3ADOM</code>\u3002</p><p>\u5F53\u67D0\u4E2A\u6570\u636E\u88AB\u4FEE\u6539\u7684\u65F6\u5019\uFF0C\u4F9D\u8D56\u5BF9\u5E94\u7684 watcher \u4F1A\u901A\u77E5\u66F4\u65B0\uFF0C\u6267\u884C\u6E32\u67D3\u51FD\u6570\u4F1A\u751F\u6210\u65B0\u7684 vnode\uFF0Cvnode \u518D\u53BB\u4E0E\u65E7\u7684 vnode \u8FDB\u884C\u5BF9\u6BD4\u66F4\u65B0\uFF0C\u8FD9\u5C31\u662F vue \u4E2D\u7684\u865A\u62DF dom diff \u7B97\u6CD5\u89E6\u53D1\u7684\u6D41\u7A0B\u3002</p><p>\u770B\u4E0B\u7EC4\u4EF6\u66F4\u65B0\u7684_update \u65B9\u6CD5\uFF1A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const vm: Component = this</span></span>
<span class="line"><span style="color:#A6ACCD;">    const prevEl = vm.$el</span></span>
<span class="line"><span style="color:#A6ACCD;">    const prevVnode = vm._vnode</span></span>
<span class="line"><span style="color:#A6ACCD;">    const restoreActiveInstance = setActiveInstance(vm)</span></span>
<span class="line"><span style="color:#A6ACCD;">    vm._vnode = vnode</span></span>
<span class="line"><span style="color:#A6ACCD;">    // Vue.prototype.__patch__ is injected in entry points</span></span>
<span class="line"><span style="color:#A6ACCD;">    // based on the rendering backend used.</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (!prevVnode) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // initial render</span></span>
<span class="line"><span style="color:#A6ACCD;">      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // updates</span></span>
<span class="line"><span style="color:#A6ACCD;">      vm.$el = vm.__patch__(prevVnode, vnode)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  ...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>vm.$el = vm._patch\uFF08\uFF09\uFF0C\u8FD9\u4E2A\u5C31\u662F\u6700\u7EC8\u6E32\u67D3\u7684 DOM \u5143\u7D20\uFF0Cpatch \u5C31\u662F vue \u4E2D diff \u7B97\u6CD5\u7684\u51FD\u6570\uFF0C\u5728 key \u7684\u4F5C\u7528\u7AE0\u8282\u6709\u63D0\u8FC7\u3002patch \u5C06\u65B0\u65E7\u865A\u62DF DOM \u8282\u70B9\u6BD4\u8F83\u540E\uFF0C\u6700\u7EC8\u8FD4\u56DE\u771F\u5B9E\u7684 DOM \u8282\u70B9\u3002</p><h3 id="patch" tabindex="-1">patch <a class="header-anchor" href="#patch" aria-hidden="true">#</a></h3><p>\u770B\u4E0B patch \u4EE3\u7801\uFF08\u90E8\u5206\uFF09\uFF1A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    /*vnode\u4E0D\u5B58\u5728\u5219\u76F4\u63A5\u8C03\u7528\u9500\u6BC1\u94A9\u5B50*/</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isUndef(vnode)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)</span></span>
<span class="line"><span style="color:#A6ACCD;">      return</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    let isInitialPatch = false</span></span>
<span class="line"><span style="color:#A6ACCD;">    const insertedVnodeQueue = []</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isUndef(oldVnode)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // empty mount (likely as component), create new root element</span></span>
<span class="line"><span style="color:#A6ACCD;">      isInitialPatch = true</span></span>
<span class="line"><span style="color:#A6ACCD;">      createElm(vnode, insertedVnodeQueue, parentElm, refElm)</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      /*\u6807\u8BB0\u65E7\u7684VNode\u662F\u5426\u6709nodeType*/</span></span>
<span class="line"><span style="color:#A6ACCD;">      /*Github:https://github.com/answershuto*/</span></span>
<span class="line"><span style="color:#A6ACCD;">      const isRealElement = isDef(oldVnode.nodeType)</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (!isRealElement &amp;&amp; sameVnode(oldVnode, vnode)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // patch existing root node</span></span>
<span class="line"><span style="color:#A6ACCD;">        /*\u662F\u540C\u4E00\u4E2A\u8282\u70B9\u7684\u65F6\u5019\u76F4\u63A5\u4FEE\u6539\u73B0\u6709\u7684\u8282\u70B9*/</span></span>
<span class="line"><span style="color:#A6ACCD;">        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)</span></span>
<span class="line"><span style="color:#A6ACCD;">   ...</span></span>
<span class="line"><span style="color:#A6ACCD;">   return vnode.elm</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u9996\u5148\u662F\u5224\u65AD\u662F\u5426\u6709\u65B0\u7684 vnode\uFF0C\u6CA1\u6709\u4EE3\u8868\u662F\u8981\u9500\u6BC1\u65E7\u7684 vnode\uFF0C\u8C03\u7528\u9500\u6BC1\u7EC4\u4EF6\u7684\u94A9\u5B50\u3002</p><p>\u7136\u540E\u5224\u65AD\u662F\u5426\u6709\u65E7\u7684 vnode\uFF0C\u6CA1\u6709\u4EE3\u8868\u662F\u65B0\u589E\uFF0C\u4E5F\u5C31\u662F\u65B0\u5EFA root \u8282\u70B9\u3002</p><p>\u63A5\u4E0B\u6765\u5224\u65AD\u65E7\u7684 vnode \u662F\u5426\u662F\u771F\u5B9E\u7684\u5143\u7D20\uFF0C\u800C\u4E0D\u662F\u7EC4\u4EF6\uFF0C\u5982\u679C\u662F\u7EC4\u4EF6\u5E76\u4E14\u7528 someVnode \u5224\u65AD\u65B0\u65E7\u8282\u70B9\u662F\u5426\u662F\u76F8\u540C\u7684\u8282\u70B9\uFF08sameVnode \u5728 key \u7684\u4F5C\u7528\u7AE0\u8282\u6709\u505A\u89E3\u6790\uFF09\uFF0C\u662F\u8FDB\u884C patchVnode\uFF0C\u8FD9\u65F6\u5019\u8FDB\u884C\u771F\u6B63\u7684\u65B0\u8001\u8282\u70B9\u7684 diff\u3002<code>\u53EA\u6709\u76F8\u540C\u7684\u8282\u70B9\u624D\u4F1A\u8FDB\u884Cdiff\u7B97\u6CD5\uFF01\uFF01\uFF01</code></p><h3 id="patchvnode" tabindex="-1">patchVnode <a class="header-anchor" href="#patchvnode" aria-hidden="true">#</a></h3><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function patchVnode (</span></span>
<span class="line"><span style="color:#A6ACCD;">    oldVnode,</span></span>
<span class="line"><span style="color:#A6ACCD;">    vnode,</span></span>
<span class="line"><span style="color:#A6ACCD;">    insertedVnodeQueue,</span></span>
<span class="line"><span style="color:#A6ACCD;">    ownerArray,</span></span>
<span class="line"><span style="color:#A6ACCD;">    index,</span></span>
<span class="line"><span style="color:#A6ACCD;">    removeOnly</span></span>
<span class="line"><span style="color:#A6ACCD;">  ) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u4E24\u4E2Avnode\u76F8\u540C\uFF0C\u8BF4\u660E\u4E0D\u9700\u8981diff\uFF0C\u76F4\u63A5\u8FD4\u56DE</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (oldVnode === vnode) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u5982\u679C\u4F20\u5165\u4E86ownerArray\u548Cindex\uFF0C\u53EF\u4EE5\u8FDB\u884C\u91CD\u7528vnode\uFF0CupdateChildren\u91CC\u7528\u6765\u66FF\u6362\u4F4D\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isDef(vnode.elm) &amp;&amp; isDef(ownerArray)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // clone reused vnode</span></span>
<span class="line"><span style="color:#A6ACCD;">      vnode = ownerArray[index] = cloneVNode(vnode)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    const elm = vnode.elm = oldVnode.elm</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u5982\u679ColdVnode\u7684isAsyncPlaceholder\u5C5E\u6027\u4E3Atrue\u65F6\uFF0C\u8DF3\u8FC7\u68C0\u67E5\u5F02\u6B65\u7EC4\u4EF6\uFF0Creturn</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isTrue(oldVnode.isAsyncPlaceholder)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (isDef(vnode.asyncFactory.resolved)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        hydrate(oldVnode.elm, vnode, insertedVnodeQueue)</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">        vnode.isAsyncPlaceholder = true</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      return</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    /*</span></span>
<span class="line"><span style="color:#A6ACCD;">      \u5982\u679C\u65B0\u65E7VNode\u90FD\u662F\u9759\u6001\u7684\uFF0C\u540C\u65F6\u5B83\u4EEC\u7684key\u76F8\u540C\uFF08\u4EE3\u8868\u540C\u4E00\u8282\u70B9\uFF09\uFF0C</span></span>
<span class="line"><span style="color:#A6ACCD;">      \u5E76\u4E14\u65B0\u7684VNode\u662Fclone\u6216\u8005\u662F\u6807\u8BB0\u4E86once\uFF08\u6807\u8BB0v-once\u5C5E\u6027\uFF0C\u53EA\u6E32\u67D3\u4E00\u6B21\uFF09\uFF0C</span></span>
<span class="line"><span style="color:#A6ACCD;">      \u90A3\u4E48\u53EA\u9700\u8981\u66FF\u6362elm\u4EE5\u53CAcomponentInstance\u5373\u53EF\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">    */</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isTrue(vnode.isStatic) &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">      isTrue(oldVnode.isStatic) &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">      vnode.key === oldVnode.key &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))</span></span>
<span class="line"><span style="color:#A6ACCD;">    ) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      vnode.componentInstance = oldVnode.componentInstance</span></span>
<span class="line"><span style="color:#A6ACCD;">      return</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    let i</span></span>
<span class="line"><span style="color:#A6ACCD;">    const data = vnode.data</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isDef(data) &amp;&amp; isDef(i = data.hook) &amp;&amp; isDef(i = i.prepatch)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      i(oldVnode, vnode)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    const oldCh = oldVnode.children</span></span>
<span class="line"><span style="color:#A6ACCD;">    const ch = vnode.children</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isDef(data) &amp;&amp; isPatchable(vnode)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      for (i = 0; i &lt; cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (isDef(i = data.hook) &amp;&amp; isDef(i = i.update)) i(oldVnode, vnode)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    /*\u5982\u679C\u8FD9\u4E2AVNode\u8282\u70B9\u6CA1\u6709text\u6587\u672C\u65F6*/</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isUndef(vnode.text)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (isDef(oldCh) &amp;&amp; isDef(ch)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // \u4E24\u4E2Avnode\u90FD\u5B9A\u4E49\u4E86\u5B50\u8282\u70B9\uFF0C\u5E76\u4E14\u4E0D\u76F8\u540C\uFF0C\u5C31\u5BF9\u5B50\u8282\u70B9\u8FDB\u884Cdiff</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else if (isDef(ch)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // \u5982\u679C\u53EA\u6709\u65B0\u7684vnode\u5B9A\u4E49\u4E86\u5B50\u8282\u70B9\uFF0C\u5219\u8FDB\u884C\u6DFB\u52A0\u5B50\u8282\u70B9\u7684\u64CD\u4F5C</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (process.<wbr>env.NODE_ENV !== &#39;production&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">          checkDuplicateKeys(ch)</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, &#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else if (isDef(oldCh)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // \u5982\u679C\u53EA\u6709\u65E7\u7684vnode\u5B9A\u4E49\u4E86\u5B50\u8282\u70B9\uFF0C\u5219\u8FDB\u884C\u5220\u9664\u5B50\u8282\u70B9\u7684\u64CD\u4F5C</span></span>
<span class="line"><span style="color:#A6ACCD;">        removeVnodes(oldCh, 0, oldCh.length - 1)</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else if (isDef(oldVnode.text)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        nodeOps.setTextContent(elm, &#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else if (oldVnode.text !== vnode.text) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      nodeOps.setTextContent(elm, vnode.text)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isDef(data)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (isDef(i = data.hook) &amp;&amp; isDef(i = i.postpatch)) i(oldVnode, vnode)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u901A\u8FC7\u4EE3\u7801\u53EF\u77E5\uFF0CpatchVnode \u5206\u4E3A\u591A\u79CD\u60C5\u51B5\uFF0C\u5206\u6790\u4E0B\u5B50\u8282\u70B9\u7684 diff \u8FC7\u7A0B <code>(oldCh \u4E3A oldVnode\u7684\u5B50\u8282\u70B9\uFF0Cch \u4E3A Vnode\u7684\u5B50\u8282\u70B9)</code></p><ol><li>oldCh\u3001ch \u90FD\u5B9A\u4E49\u4E86\u8C03\u7528 updateChildren \u518D\u8FDB\u884C diff</li><li>\u82E5 oldCh \u4E0D\u5B58\u5728\uFF0Cch \u5B58\u5728\uFF0C\u9996\u5148\u6E05\u7A7A oldVnode \u7684\u6587\u672C\u8282\u70B9\uFF0C\u540C\u65F6\u8C03\u7528 addVnodes \u65B9\u6CD5\u5C06 ch \u6DFB\u52A0\u5230 elm \u771F\u5B9E dom \u8282\u70B9\u5F53\u4E2D</li><li>\u82E5 oldCh \u5B58\u5728\uFF0Cch \u4E0D\u5B58\u5728\uFF0C\u5219\u5220\u9664 elm \u771F\u5B9E\u8282\u70B9\u4E0B\u7684 oldCh \u5B50\u8282\u70B9</li><li>\u82E5 oldVnode \u6709\u6587\u672C\u8282\u70B9\uFF0C\u800C vnode \u6CA1\u6709\uFF0C\u90A3\u4E48\u5C31\u6E05\u7A7A\u8FD9\u4E2A\u6587\u672C\u8282\u70B9</li></ol><p><code>updateChildren</code>\u662F\u5B50\u8282\u70B9 diff \u7684\u51FD\u6570\uFF0C\u4E5F\u662F\u6700\u91CD\u8981\u7684\u73AF\u8282\u3002</p><h3 id="updatechildren" tabindex="-1">updateChildren <a class="header-anchor" href="#updatechildren" aria-hidden="true">#</a></h3><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u58F0\u660EoldCh\u548CnewCh\u7684\u5934\u5C3E\u7D22\u5F15\u548C\u5934\u5C3E\u7684vnode\uFF0C</span></span>
<span class="line"><span style="color:#A6ACCD;">    let oldStartIdx = 0</span></span>
<span class="line"><span style="color:#A6ACCD;">    let newStartIdx = 0</span></span>
<span class="line"><span style="color:#A6ACCD;">    let oldEndIdx = oldCh.length - 1</span></span>
<span class="line"><span style="color:#A6ACCD;">    let oldStartVnode = oldCh[0]</span></span>
<span class="line"><span style="color:#A6ACCD;">    let oldEndVnode = oldCh[oldEndIdx]</span></span>
<span class="line"><span style="color:#A6ACCD;">    let newEndIdx = newCh.length - 1</span></span>
<span class="line"><span style="color:#A6ACCD;">    let newStartVnode = newCh[0]</span></span>
<span class="line"><span style="color:#A6ACCD;">    let newEndVnode = newCh[newEndIdx]</span></span>
<span class="line"><span style="color:#A6ACCD;">    let oldKeyToIdx, idxInOld, vnodeToMove, refElm</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    const canMove = !removeOnly</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    if (process.<wbr>env.NODE_ENV !== &#39;production&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      checkDuplicateKeys(newCh)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    while (oldStartIdx &lt;= oldEndIdx &amp;&amp; newStartIdx &lt;= newEndIdx) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (isUndef(oldStartVnode)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else if (isUndef(oldEndVnode)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        oldEndVnode = oldCh[--oldEndIdx]</span></span>
<span class="line"><span style="color:#A6ACCD;">        // \u5224\u65AD\u4E24\u8FB9\u7684\u5934\u662F\u4E0D\u662F\u76F8\u540C\u8282\u70B9</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else if (sameVnode(oldStartVnode, newStartVnode)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)</span></span>
<span class="line"><span style="color:#A6ACCD;">        oldStartVnode = oldCh[++oldStartIdx]</span></span>
<span class="line"><span style="color:#A6ACCD;">        newStartVnode = newCh[++newStartIdx]</span></span>
<span class="line"><span style="color:#A6ACCD;">        // \u5224\u65AD\u5C3E\u90E8\u662F\u4E0D\u662F\u76F8\u540C\u8282\u70B9</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else if (sameVnode(oldEndVnode, newEndVnode)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)</span></span>
<span class="line"><span style="color:#A6ACCD;">        oldEndVnode = oldCh[--oldEndIdx]</span></span>
<span class="line"><span style="color:#A6ACCD;">        newEndVnode = newCh[--newEndIdx]</span></span>
<span class="line"><span style="color:#A6ACCD;">        // \u5224\u65AD\u65E7\u8282\u70B9\u5934\u90E8\u662F\u4E0D\u662F\u4E0E\u65B0\u8282\u70B9\u7684\u5C3E\u90E8\u76F8\u540C\uFF0C\u76F8\u540C\u5219\u628A\u5934\u90E8\u5F80\u53F3\u79FB</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right</span></span>
<span class="line"><span style="color:#A6ACCD;">        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)</span></span>
<span class="line"><span style="color:#A6ACCD;">        canMove &amp;&amp; nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))</span></span>
<span class="line"><span style="color:#A6ACCD;">        oldStartVnode = oldCh[++oldStartIdx]</span></span>
<span class="line"><span style="color:#A6ACCD;">        newEndVnode = newCh[--newEndIdx]</span></span>
<span class="line"><span style="color:#A6ACCD;">        // \u5224\u65AD\u65E7\u8282\u70B9\u5C3E\u90E8\u662F\u4E0D\u662F\u4E0E\u65B0\u8282\u70B9\u7684\u5934\u90E8\u76F8\u540C\uFF0C\u76F8\u540C\u5219\u628A\u5934\u90E8\u5F80\u5DE6\u79FB</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left</span></span>
<span class="line"><span style="color:#A6ACCD;">        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)</span></span>
<span class="line"><span style="color:#A6ACCD;">        canMove &amp;&amp; nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)</span></span>
<span class="line"><span style="color:#A6ACCD;">        oldEndVnode = oldCh[--oldEndIdx]</span></span>
<span class="line"><span style="color:#A6ACCD;">        newStartVnode = newCh[++newStartIdx]</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">       /*</span></span>
<span class="line"><span style="color:#A6ACCD;">          \u751F\u6210\u4E00\u4E2Akey\u4E0E\u65E7VNode\u7684key\u5BF9\u5E94\u7684\u54C8\u5E0C\u8868</span></span>
<span class="line"><span style="color:#A6ACCD;">        */</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)</span></span>
<span class="line"><span style="color:#A6ACCD;">        idxInOld = isDef(newStartVnode.key)</span></span>
<span class="line"><span style="color:#A6ACCD;">          ? oldKeyToIdx[newStartVnode.key]</span></span>
<span class="line"><span style="color:#A6ACCD;">          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (isUndef(idxInOld)) { // New element</span></span>
<span class="line"><span style="color:#A6ACCD;">          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)</span></span>
<span class="line"><span style="color:#A6ACCD;">        } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">          vnodeToMove = oldCh[idxInOld]</span></span>
<span class="line"><span style="color:#A6ACCD;">          if (sameVnode(vnodeToMove, newStartVnode)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)</span></span>
<span class="line"><span style="color:#A6ACCD;">            oldCh[idxInOld] = undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">            canMove &amp;&amp; nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)</span></span>
<span class="line"><span style="color:#A6ACCD;">          } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">            // same key but different element. treat as new element</span></span>
<span class="line"><span style="color:#A6ACCD;">            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        newStartVnode = newCh[++newStartIdx]</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    // oldCh\u6216\u8005newCh\u904D\u5386\u5B8C\uFF0C\u8BF4\u660E\u5269\u4E0B\u7684\u8282\u70B9\u4E0D\u662F\u65B0\u589E\u5C31\u662F\u5220\u9664</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (oldStartIdx &gt; oldEndIdx) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm</span></span>
<span class="line"><span style="color:#A6ACCD;">      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else if (newStartIdx &gt; newEndIdx) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      removeVnodes(oldCh, oldStartIdx, oldEndIdx)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u9996\u5148\u7ED9 startIndex \u548C endIndex \u6765\u4F5C\u4E3A\u904D\u5386\u7684\u7D22\u5F15\uFF0C\u5728\u904D\u5386\u7684\u65F6\u5019\u4F1A\u5148\u5224\u65AD\u5934\u5C3E\u8282\u70B9\u662F\u5426\u76F8\u540C\uFF0C\u6CA1\u6709\u627E\u5230\u76F8\u540C\u8282\u70B9\u540E\u518D\u6309\u7167\u901A\u7528\u65B9\u5F0F\u904D\u5386\u67E5\u627E\uFF1B\u67E5\u627E\u7ED3\u675F\u518D\u6309\u60C5\u51B5\u5904\u7406\u5269\u4E0B\u7684\u8282\u70B9\uFF1B\u501F\u52A9 key \u901A\u5E38\u53EF\u4EE5\u975E\u5E38\u7CBE\u786E\u627E\u5230\u76F8\u540C\u8282\u70B9\u3002</p><p>\u5F53 oldCh \u6216\u8005 newCh \u904D\u5386\u5B8C\u540E(\u904D\u5386\u5B8C\u7684\u6761\u4EF6\u5C31\u662F oldCh \u6216\u8005 newCh \u7684 startIndex &gt;= endIndex )\uFF0C\u8BF4\u660E\u5269\u4E0B\u7684\u8282\u70B9\u4E3A\u65B0\u589E\u6216\u8005\u5220\u9664\uFF0C\u8FD9\u65F6\u5019\u505C\u6B62 oldCh \u548C newCh \u7684 diff\u3002</p><h2 id="_13-vuex-\u539F\u7406" tabindex="-1">13.Vuex \u539F\u7406 <a class="header-anchor" href="#_13-vuex-\u539F\u7406" aria-hidden="true">#</a></h2><p>vuex \u662F\u4EC0\u4E48\uFF0C\u5148\u770B\u4E0B\u5B98\u65B9\u7684\u539F\u8BDD\uFF1A</p><blockquote><p>Vuex \u662F\u4E00\u4E2A\u4E13\u4E3A Vue.js \u5E94\u7528\u7A0B\u5E8F\u5F00\u53D1\u7684\u72B6\u6001\u7BA1\u7406\u6A21\u5F0F\u3002\u5B83\u91C7\u7528\u96C6\u4E2D\u5F0F\u5B58\u50A8\u7BA1\u7406\u5E94\u7528\u7684\u6240\u6709\u7EC4\u4EF6\u7684\u72B6\u6001\uFF0C\u5E76\u4EE5\u76F8\u5E94\u7684\u89C4\u5219\u4FDD\u8BC1\u72B6\u6001\u4EE5\u4E00\u79CD\u53EF\u9884\u6D4B\u7684\u65B9\u5F0F\u53D1\u751F\u53D8\u5316</p></blockquote><p>\u8FD9\u6BB5\u8BDD\u53EF\u4EE5\u5F97\u51FA\u51E0\u4E2A\u7ED3\u8BBA\uFF1A<code>Vuex\u662F\u4E3Avue.js\u670D\u52A1\u7684</code>\uFF0C\u800C\u50CF redux \u4E0E react \u662F\u89E3\u8026\u7684\uFF0C\u7136\u540E vuex \u662F\u72B6\u6001\u7BA1\u7406\u6A21\u5F0F\uFF0C\u6240\u6709\u7684\u72B6\u6001\u4EE5\u4E00\u79CD\u53EF\u9884\u6D4B\u7684\u65B9\u5F0F\u53D1\u751F\u53D8\u5316\u3002</p><p>\u8BBE\u8BA1\u601D\u60F3\uFF1A</p><p>Vuex \u7684\u8BBE\u8BA1\u601D\u60F3\uFF0C\u501F\u9274\u4E86 Flux\u3001Redux\uFF0C\u5C06\u6570\u636E\u5B58\u653E\u5230\u5168\u5C40\u7684 store\uFF0C\u518D\u5C06 store \u6302\u8F7D\u5230\u6BCF\u4E2A vue \u5B9E\u4F8B\u7EC4\u4EF6\u4E2D\uFF0C\u5229\u7528 Vue.js \u7684\u7EC6\u7C92\u5EA6\u6570\u636E\u54CD\u5E94\u673A\u5236\u6765\u8FDB\u884C\u9AD8\u6548\u7684\u72B6\u6001\u66F4\u65B0\u3002</p><p>\u539F\u7406\u53EF\u4EE5\u4ECE\u4F7F\u7528\u65B9\u5F0F\u5F00\u59CB\u5206\u6790\u3002</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">Vue.use(Vuex); // 1. vue\u7684\u63D2\u4EF6\u673A\u5236\uFF0C\u5B89\u88C5vuex</span></span>
<span class="line"><span style="color:#A6ACCD;">let store = new Vuex.Store({ // 2.\u5B9E\u4F8B\u5316store\uFF0C\u8C03\u7528install\u65B9\u6CD5</span></span>
<span class="line"><span style="color:#A6ACCD;"> 	state,</span></span>
<span class="line"><span style="color:#A6ACCD;"> 	getters,</span></span>
<span class="line"><span style="color:#A6ACCD;"> 	modules,</span></span>
<span class="line"><span style="color:#A6ACCD;"> 	mutations,</span></span>
<span class="line"><span style="color:#A6ACCD;"> 	actions,</span></span>
<span class="line"><span style="color:#A6ACCD;"> 	plugins</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;">new Vue({ // 3.\u6CE8\u5165store, \u6302\u8F7Dvue\u5B9E\u4F8B</span></span>
<span class="line"><span style="color:#A6ACCD;">	store,</span></span>
<span class="line"><span style="color:#A6ACCD;">	render: h=&gt;h(app)</span></span>
<span class="line"><span style="color:#A6ACCD;">}).$mount(&#39;#app&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Vue.use \u662F vue \u4E2D\u7684\u63D2\u4EF6\u673A\u5236\uFF0C\u5185\u90E8\u4F1A\u8C03\u7528\u63D2\u4EF6\u7684 install \u65B9\u6CD5\uFF0Cvuex \u7684 install \u65B9\u6CD5\uFF1A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">export function install (_Vue) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (Vue) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (process.<wbr>env.NODE_ENV !== &#39;production&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      console.error(</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;[vuex] already installed. Vue.use(Vuex) should be called only once.&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      )</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    return</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  /*\u4FDD\u5B58Vue\uFF0C\u540C\u65F6\u7528\u4E8E\u68C0\u6D4B\u662F\u5426\u91CD\u590D\u5B89\u88C5*/</span></span>
<span class="line"><span style="color:#A6ACCD;">  Vue = _Vue</span></span>
<span class="line"><span style="color:#A6ACCD;">  /*\u5C06vuexInit\u6DF7\u6DC6\u8FDBVue\u7684beforeCreate(Vue2.0)\u6216_init\u65B9\u6CD5(Vue1.0)*/</span></span>
<span class="line"><span style="color:#A6ACCD;">  applyMixin(Vue)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>vuex \u662F\u4E2A\u5168\u5C40\u7684\u72B6\u6001\u7BA1\u7406\uFF0C\u5168\u5C40\u6709\u4E14\u53EA\u80FD\u6709\u4E00\u4E2A store \u5B9E\u4F8B\uFF0C\u6240\u4EE5\u5728 install \u7684\u65F6\u5019\u4F1A\u5224\u65AD\u662F\u5426\u5DF2\u7ECF\u5B89\u88C5\u8FC7\u4E86\uFF0C\u8FD9\u4E2A\u5C31\u662F\u5355\u4F8B\u6A21\u5F0F\uFF0C\u786E\u4FDD\u4E00\u4E2A\u7C7B\u53EA\u6709\u4E00\u4E2A\u5B9E\u4F8B\u3002\u5728\u7B2C\u4E00\u6B21 install \u7684\u65F6\u5019\u4F1A applyMixin\uFF0CapplyMixin \u662F<code>/src/mixin</code>\u5BFC\u5165\u7684\u65B9\u6CD5:</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function (Vue) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const version = Number(Vue.version.split(&#39;.&#39;)[0])</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  if (version &gt;= 2) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    Vue.mixin({ beforeCreate: vuexInit })</span></span>
<span class="line"><span style="color:#A6ACCD;">  } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // override init and inject vuex init procedure</span></span>
<span class="line"><span style="color:#A6ACCD;">    // for 1.x backwards compatibility.</span></span>
<span class="line"><span style="color:#A6ACCD;">    const _init = Vue.prototype._init</span></span>
<span class="line"><span style="color:#A6ACCD;">    Vue.prototype._init = function (options = {}) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      options.init = options.init</span></span>
<span class="line"><span style="color:#A6ACCD;">        ? [vuexInit].concat(options.init)</span></span>
<span class="line"><span style="color:#A6ACCD;">        : vuexInit</span></span>
<span class="line"><span style="color:#A6ACCD;">      _init.call(this, options)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * Vuex init hook, injected into each instances init hooks list.</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  function vuexInit () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const options = this.$options</span></span>
<span class="line"><span style="color:#A6ACCD;">    // store injection</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (options.store) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.$store = typeof options.store === &#39;function&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        ? options.store()</span></span>
<span class="line"><span style="color:#A6ACCD;">        : options.store</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else if (options.parent &amp;&amp; options.parent.$store) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.$store = options.parent.$store</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5148\u662F\u5224\u65AD\u4E0B vue \u7684\u7248\u672C\uFF0C\u8FD9\u8FB9\u5206\u6790 vue2 \u7684\u903B\u8F91\u3002\u5229\u7528 Vue.mixin \u6DF7\u5165\u7684\u673A\u5236\uFF0C\u5728\u7EC4\u4EF6\u5B9E\u4F8B\u7684 beforeCreate \u8C03\u7528 vuexInit \u65B9\u6CD5\uFF0C\u9996\u5148\u5224\u65AD options \u662F\u5426\u6709 store\uFF0C\u6CA1\u6709\u4EE3\u8868\u662F root \u8282\u70B9\uFF0C\u8FD9\u65F6\u5019\u8981\u8FDB\u884C store \u521D\u59CB\u5316\uFF0C\u6CA1\u6709\u7684\u8BDD\u5C31\u53D6\u7236\u7EC4\u4EF6\u7684$store \u8D4B\u503C\uFF0C\u8FD9\u6837\u5C31\u5B9E\u73B0\u4E86\u5168\u5C40\u5171\u7528\u552F\u4E00\u7684 store \u5B9E\u4F8B\u3002</p><p>store \u5B9E\u73B0\u7684\u6E90\u7801\u5728<code>src/store.js</code>\uFF0C\u5176\u4E2D\u6700\u6838\u5FC3\u7684\u662F\u54CD\u5E94\u5F0F\u7684\u5B9E\u73B0\uFF0C\u901A\u8FC7 resetStoreVM(this, state)\u8C03\u7528\uFF0C\u770B\u4E0B\u8FD9\u4E2A\u65B9\u6CD5\uFF1A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function resetStoreVM (store, state, hot) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const oldVm = store._vm</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // bind store public getters</span></span>
<span class="line"><span style="color:#A6ACCD;">  store.getters = {}</span></span>
<span class="line"><span style="color:#A6ACCD;">  // reset local getters cache</span></span>
<span class="line"><span style="color:#A6ACCD;">  store._makeLocalGettersCache = Object.create(null)</span></span>
<span class="line"><span style="color:#A6ACCD;">  const wrappedGetters = store._wrappedGetters</span></span>
<span class="line"><span style="color:#A6ACCD;">  const computed = {}</span></span>
<span class="line"><span style="color:#A6ACCD;">  forEachValue(wrappedGetters, (fn, key) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // use computed to leverage its lazy-caching mechanism</span></span>
<span class="line"><span style="color:#A6ACCD;">    // direct inline function use will lead to closure preserving oldVm.</span></span>
<span class="line"><span style="color:#A6ACCD;">    // using partial to return function with only arguments preserved in closure environment.</span></span>
<span class="line"><span style="color:#A6ACCD;">    computed[key] = partial(fn, store)</span></span>
<span class="line"><span style="color:#A6ACCD;">    Object.defineProperty(store.getters, key, {</span></span>
<span class="line"><span style="color:#A6ACCD;">      get: () =&gt; store._vm[key],</span></span>
<span class="line"><span style="color:#A6ACCD;">      enumerable: true // for local getters</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // use a Vue instance to store the state tree</span></span>
<span class="line"><span style="color:#A6ACCD;">  // suppress warnings just in case the user has added</span></span>
<span class="line"><span style="color:#A6ACCD;">  // some funky global mixins</span></span>
<span class="line"><span style="color:#A6ACCD;">  const silent = Vue.config.silent</span></span>
<span class="line"><span style="color:#A6ACCD;">  Vue.config.silent = true</span></span>
<span class="line"><span style="color:#A6ACCD;">  store._vm = new Vue({</span></span>
<span class="line"><span style="color:#A6ACCD;">    data: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      $$state: state</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    computed</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">  Vue.config.silent = silent</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // enable strict mode for new vm</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (store.strict) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    enableStrictMode(store)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  if (oldVm) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (hot) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // dispatch changes in all subscribed watchers</span></span>
<span class="line"><span style="color:#A6ACCD;">      // to force getter re-evaluation for hot reloading.</span></span>
<span class="line"><span style="color:#A6ACCD;">      store._withCommit(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">        oldVm._data.$$state = null</span></span>
<span class="line"><span style="color:#A6ACCD;">      })</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    Vue.nextTick(() =&gt; oldVm.$destroy())</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>resetStoreVM \u9996\u5148\u4F1A\u904D\u5386 wrappedGetters\uFF0C\u4F7F\u7528 Object.defineProperty \u65B9\u6CD5\u5BF9 store.getters \u7684\u6BCF\u4E00\u4E2A getter \u5B9A\u4E49 get \u65B9\u6CD5\uFF0C\u8FD9\u6837\u8BBF\u95EE this.$store.getter.test \u5C31\u7B49\u540C\u4E8E\u8BBF\u95EE store._vm.test\u3002</p><p>state \u662F\u901A\u8FC7 new \u4E00\u4E2A Vue \u5BF9\u8C61\u6765\u5B9E\u73B0\u6570\u636E\u7684\u201C\u54CD\u5E94\u5F0F\u5316\u201D\uFF0C\u8FD0\u7528 Vue \u7684 data \u5C5E\u6027\u6765\u5B9E\u73B0\u6570\u636E\u4E0E\u89C6\u56FE\u7684\u540C\u6B65\u66F4\u65B0\uFF0Ccomputed \u5B9E\u73B0 getters \u7684\u8BA1\u7B97\u5C5E\u6027\u3002\u6700\u7EC8\u8BBF\u95EE store.state \u4E5F\u5C31\u662F\u8BBF\u95EE store._vm.state\u3002</p>`,165),o=[p];function t(c,r,i,C,A,d){return a(),n("div",null,o)}var u=s(l,[["render",t]]);export{D as __pageData,u as default};
