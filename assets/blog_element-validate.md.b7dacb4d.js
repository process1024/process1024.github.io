import{_ as t,c as r,d as a,o as i}from"./app.a276ccf0.js";const c=JSON.parse('{"title":"element-ui\u8868\u5355\u6821\u9A8C\u6E90\u7801\u89E3\u6790","description":"","frontmatter":{},"headers":[{"level":2,"title":"form\u7EC4\u4EF6","slug":"form\u7EC4\u4EF6"},{"level":2,"title":"form-item\u7EC4\u4EF6","slug":"form-item\u7EC4\u4EF6"},{"level":2,"title":"mixins/emitter\u89E3\u6790","slug":"mixins-emitter\u89E3\u6790"},{"level":2,"title":"\u603B\u7ED3\u6536\u96C6\u539F\u7406","slug":"\u603B\u7ED3\u6536\u96C6\u539F\u7406"},{"level":2,"title":"form-item\u6570\u636E\u6821\u9A8C","slug":"form-item\u6570\u636E\u6821\u9A8C"},{"level":2,"title":"PS","slug":"ps"}],"relativePath":"blog/element-validate.md","lastUpdated":1730122358000}'),m={name:"blog/element-validate.md"};function o(f,e,l,d,p,n){return i(),r("div",null,e[0]||(e[0]=[a('<h1 id="element-ui\u8868\u5355\u6821\u9A8C\u6E90\u7801\u89E3\u6790" tabindex="-1">element-ui\u8868\u5355\u6821\u9A8C\u6E90\u7801\u89E3\u6790 <a class="header-anchor" href="#element-ui\u8868\u5355\u6821\u9A8C\u6E90\u7801\u89E3\u6790" aria-hidden="true">#</a></h1><p>\u76F8\u4FE1\u5F88\u591A\u4EBA\u90FD\u6709\u7528\u8FC7element-ui\uFF0C\u5176\u4E2Dform\u8868\u5355\u662F\u5176\u4E2D\u975E\u5E38\u91CD\u8981\u7684\u4E00\u4E2A\u7EC4\u4EF6\uFF0C\u8FD9\u91CC\u4ECE\u6E90\u7801\u89D2\u5EA6\u6765\u5206\u6790\u4E0Belement from\u8868\u5355\u5982\u4F55\u6536\u96C6\u5B50\u7EC4\u4EF6\u7684\u503C\u5E76\u8FDB\u884C\u6821\u9A8C\u3002</p><h2 id="form\u7EC4\u4EF6" tabindex="-1">form\u7EC4\u4EF6 <a class="header-anchor" href="#form\u7EC4\u4EF6" aria-hidden="true">#</a></h2><p>\u4ECE\u5B98\u65B9\u6587\u6863API\u6587\u6863\u770B\uFF0Cform\u8868\u5355\u6821\u9A8C\u6709\u4E24\u4E2A\u5173\u952E\u7684api\uFF0C\u4E00\u4E2A\u662Frules\u914D\u7F6E\u5B57\u6BB5\u6821\u9A8C\u89C4\u5219\uFF0C\u4E00\u4E2A\u662Fvalidate\uFF0C\u9996\u5148\u6765\u770B<a href="https://element.eleme.cn/#/zh-CN/component/form" target="_blank" rel="noopener noreferrer">validate</a>\u65B9\u6CD5\u7684\u5B98\u65B9\u4ECB\u7ECD\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u63A5\u6536\u4E00\u4E2A\u56DE\u8C03\u51FD\u6570\uFF0C\u5728\u8868\u5355\u6821\u9A8C\u5B8C\u540E\u4F1A\u6267\u884C\u4F20\u5165\u7684\u56DE\u8C03\u51FD\u6570\uFF0C\u5728\u4E0D\u4F20\u56DE\u8C03\u51FD\u6570\u65F6\u5219\u4F1A\u8FD4\u56DE\u4E00\u4E2Apromise\uFF0C\u5728\u8868\u5355\u6821\u9A8C\u540E\u4F1A\u6539\u53D8promise\u7684\u72B6\u6001\u3002</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e714015fa16d4de09dbdd5d2bf421c0b~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>\u4ECEvalidate\u51FD\u6570\u5165\u624B\uFF0C\u6E90\u7801\u5728<a href="https://github.com/ElemeFE/element/blob/dev/packages/form/src/form.vue" target="_blank" rel="noopener noreferrer">packages/form</a>\u3002</p><p>\u4ECE\u8FD9\u4E2A\u51FD\u6570\u53EF\u4EE5\u770B\u5230\uFF0C\u6700\u7EC8\u662F\u901A\u8FC7this.fields\u8FD9\u4E2A\u6570\u7EC4\u8FDB\u884C\u7684\u8868\u5355\u6821\u9A8C\uFF0Cfields\u5B58\u653E\u4E86form\u7684\u5B50\u7EC4\u4EF6form-item\u7684\u6240\u6709\u5B9E\u4F8B\uFF0Cvalidate\u6267\u884C\u7684\u65F6\u5019\u4FBF\u662F\u8C03\u7528\u6240\u6709form-item\u5404\u81EA\u7684validate\u65B9\u6CD5\uFF0C\u770B\u4E0Bform\u7EC4\u4EF6validate\u65B9\u6CD5\u7684\u6E90\u7801\uFF0C\u5BF9\u8FD9\u4E2A\u51FD\u6570\u7684\u6E90\u7801\u6211\u5728\u4E0B\u56FE\u505A\u4E86\u8BE6\u7EC6\u7684\u6CE8\u91CA\u89E3\u6790\u3002</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f76929efadc43579181e71b5335817f~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>\u6240\u4EE5\u8FD9\u91CC\u7684\u91CD\u70B9\u5C31\u662F\u5982\u4F55\u6536\u96C6\u5B50\u7EC4\u4EF6form-item\u7684\u5B9E\u4F8B\uFF0C\u5728form\u7EC4\u4EF6\u7684created\u53EF\u4EE5\u91CC\u53D1\u73B0\u8FD9\u91CC\u7528\u4E86this.$on\u8BA2\u9605\u4E86el.form.addField\u548Cel.form.removeField\u4E24\u4E2A\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF0C\u5206\u522B\u5BF9\u5E94fields\u6570\u7EC4\u7684\u6DFB\u52A0\u548C\u79FB\u9664\u3002\u6240\u4EE5\u8FD9\u91CC\u53EF\u4EE5\u5230form\u7684\u5B50\u7EC4\u4EF6\uFF0Cform-item\u7EE7\u7EED\u5F80\u4E0B\u5206\u6790\u3002</p><h2 id="form-item\u7EC4\u4EF6" tabindex="-1">form-item\u7EC4\u4EF6 <a class="header-anchor" href="#form-item\u7EC4\u4EF6" aria-hidden="true">#</a></h2><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bcc81d071544f6bb24f223126c53056~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>\u5728form-item\u7684mounted\u548CbeforeDestory\u751F\u547D\u5468\u671F\u91CC\u53D1\u73B0\u4E86\u8FD9\u91CC\u5206\u522Bdispatch\u4E86\u8FD9\u4E2Aform\u8868\u5355\u7684\u6DFB\u52A0\u548C\u79FB\u9664\u4E8B\u4EF6\uFF0C\u5728\u6DFB\u52A0\u4E8B\u4EF6\u65F6\u5C06form-item\u7684\u5B9E\u4F8B\u4F5C\u4E3A\u53C2\u6570\u4F20\u7ED9form\u7EC4\u4EF6\uFF0C\u8BA9form\u7EC4\u4EF6\u6536\u96C6\u9700\u8981\u9A8C\u8BC1\u7684\u8FD9\u4E2Aform-item\u5B9E\u4F8B\u3002\u5728destoryed\u65F6\u5219\u5411form\u7EC4\u4EF6\u53D1\u5E03\u79FB\u9664\u8BE5form-item\u7EC4\u4EF6\u5B9E\u4F8B\u3002\u800C\u5728\u8FD9\u4E2Aform-item\u7EC4\u4EF6\u91CC\u5E76\u6CA1\u6709\u627E\u5230dispatch\u8FD9\u4E2A\u65B9\u6CD5\uFF0C\u6240\u4EE5\u53EF\u80FD\u662F\u5728mixin\u91CC\u6DF7\u5408\u8FDB\u6765\u7684\uFF0C\u5728minxins/emitter\u91CC\u53D1\u73B0\u4E86dispatch\u7684\u65B9\u6CD5\u3002</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5b94b599bdd43e5a379207cdf868545~tplv-k3u1fbpfcp-watermark.image" alt=""></p><h2 id="mixins-emitter\u89E3\u6790" tabindex="-1">mixins/emitter\u89E3\u6790 <a class="header-anchor" href="#mixins-emitter\u89E3\u6790" aria-hidden="true">#</a></h2><p>\u63A5\u4E0B\u6765\u5206\u6790\u4E0B\u8FD9\u4E2Aemitter\u8FD9\u4E2A\u6587\u4EF6\u3002dispath\u6D3E\u53D1\u51FD\u6570\uFF0C\u4F5C\u7528\u662F\u89E6\u53D1\u7236\u7EC4\u4EF6\u76D1\u542C\u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1Bbroadcast\u5E7F\u64AD\u51FD\u6570\uFF0C\u5219\u662F\u9012\u5F52\u67E5\u8BE2\u5230\u5339\u914D\u7684\u5B50\u7EC4\u4EF6\uFF0C\u89E6\u53D1\u5B50\u7EC4\u4EF6\u76D1\u542C\u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\u3002 \u5728\u4E0B\u56FE\u4E2D\u6211\u5BF9\u4EE3\u7801\u505A\u4E86\u8BE6\u7EC6\u7684\u6CE8\u91CA\u89E3\u6790\u3002</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd7316b4043647c982023e30f8567c41~tplv-k3u1fbpfcp-watermark.image" alt=""></p><h2 id="\u603B\u7ED3\u6536\u96C6\u539F\u7406" tabindex="-1">\u603B\u7ED3\u6536\u96C6\u539F\u7406 <a class="header-anchor" href="#\u603B\u7ED3\u6536\u96C6\u539F\u7406" aria-hidden="true">#</a></h2><p>\u5176\u5B9E\u5728\u8FD9\u91CC\u5C31\u8BB2\u5B8C\u4E86form\u7EC4\u4EF6\u6821\u9A8C\u89C4\u5219\u6536\u96C6\u7684\u539F\u7406\u3002\u603B\u7ED3\u5C31\u662F\u5728form\u7EC4\u4EF6\u91CC\u76D1\u542C\u6DFB\u52A0\u548C\u79FB\u9664field\u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF0C\u5728form-item\u91CC\u901A\u8FC7emitter\u7684dispatch\u51FD\u6570\u5C06\u81EA\u8EAB\u5B9E\u4F8B\u4F5C\u4E3A\u53C2\u6570\u53D1\u5E03\u5230\u51FA\u53BB\uFF0C\u5728form\u6536\u5230\u540E\u8FDB\u884C\u6536\u96C6\u548C\u79FB\u9664\u3002\u63A5\u4E0B\u6765\u5206\u6790\u5728form\u7EC4\u4EF6\u914D\u7F6E\u7684rules\u5982\u4F55\u8BA9\u5B50\u7EC4\u4EF6form-item\u83B7\u53D6\u5230\u5404\u81EA\u7684\u68C0\u9A8C\u5B57\u6BB5\u548C\u89C4\u5219\u3002</p><h2 id="form-item\u6570\u636E\u6821\u9A8C" tabindex="-1">form-item\u6570\u636E\u6821\u9A8C <a class="header-anchor" href="#form-item\u6570\u636E\u6821\u9A8C" aria-hidden="true">#</a></h2><p>\u521A\u5728\u4E0A\u9762\u6709\u8BF4\u5230form\u8868\u5355validate\u6700\u7EC8\u662F\u8C03\u7528\u6240\u6709form-item\u7EC4\u4EF6\u7684validate\uFF0C\u6240\u4EE5\u8FD9\u91CC\u5206\u6790form-item\u7684validate\u65B9\u6CD5\u3002\u5728element-ui\u91CC\u8868\u5355\u6821\u9A8C\u4F7F\u7528\u7684\u662Fasync-validator\u5E93\uFF0Cant-design\u4E5F\u662F\u4F7F\u7528\u4E86\u8FD9\u4E2A\u5E93\uFF0C\u8FD9\u4E2A\u5E93\u5728<a href="https://github.com/yiminghe/async-validator" target="_blank" rel="noopener noreferrer">github</a>\u6709\u77406k\u591A\u7684star\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7528\u4E8E\u8868\u5355\u5F02\u6B65\u6821\u9A8C\u7684\u5E93\u3002\u7528\u6CD5\u4E5F\u5F88\u7B80\u5355\uFF0C\u5C31\u662F\u58F0\u660E\u4E00\u4E2A\u6821\u9A8C\u5668\uFF0C\u4F20\u5165descriptor\u63CF\u8FF0\u5BF9\u8C61\uFF0C\u518D\u8C03\u7528validate\u65B9\u6CD5\uFF0C\u4F20\u5165\u6821\u9A8C\u7684\u6570\u636E\uFF0C\u8FD9\u4E5F\u662Felement-ui\u548Cant-design\u8868\u5355\u7EC4\u4EF6\u63D0\u4F9B\u7684validate api\u65B9\u6CD5\uFF0C\u5728\u5404\u81EA\u7684form-item\u7EC4\u4EF6\u5185\u90E8\u4E5F\u662F\u8C03\u7528\u8FD9\u4E2A\u65B9\u6CD5\u3002</p><h2 id="ps" tabindex="-1">PS <a class="header-anchor" href="#ps" aria-hidden="true">#</a></h2><p>\u81EA\u5DF1\u6574\u7406\u7684\uFF0C\u7EAF\u624B\u5199\uFF0C\u6709\u9519\u8BEF\u7684\u5730\u65B9\u6B22\u8FCE\u5927\u5BB6\u6307\u51FA\u6765~~</p>',22)]))}var h=t(m,[["render",o]]);export{c as __pageData,h as default};
