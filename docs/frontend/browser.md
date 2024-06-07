# 浏览器

## 浏览器缓存

### service worker

Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能
使用 Service Worker的话，传输协议必须为 HTTPS,因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全
步骤

注册 Service Worker
监听到 install 事件以后就可以缓存需要的文件
下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存

是:可以直接读取缓存文件
否:请求数据

Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的
当 Service Worker 没有命中缓存的时候，就需要去调用 fetch 函数获取数据
也就是说，当没有在 Service Worker 命中缓存的话，会根据缓存查找优先级去查找数据
但是不管是从 Memory Cache 中还是从网络请求中获取的数据，浏览器都会先从 Service Worker 中获取的内容

### Memory Cache

Memory Cache 也就是内存中的缓存，读取内存中的数据比磁盘快

内存缓存虽然读取高效，但是缓存持续性很短，会随着进程的释放而释放。一旦关闭 Tab 页面，内存中的缓存就被释放了

当我们访问过页面以后，再次刷新页面，可以发现很多数据都来自于内存缓存

浏览器会把哪些文件放入内存:question:

浏览器会把解析完成的js与css放入内存中

特点

快速读取：将编译解析后的文件，直接存入该进程的内存中，占据该进程一定的内存资源，以方便下次运行使用时的快速读取
时效性：一旦该进程关闭，则该进程的内存则会清空

### Disk Cache

Disk Cache 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache 胜在容量和存储时效性上
在所有浏览器缓存中，Disk Cache 覆盖面基本是最大的
可以根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求
即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据
哪些资源会被放入磁盘:question:

对于大文件来说，大概率是不存储在内存中的，反之优先
当前系统内存使用率高的话，文件也会优先存储进硬盘

特点

直接将缓存写入硬盘文件中
读取需要对硬盘上文件进行I/O操作，然后重新解析该缓存内容，读取复杂，速度比内存缓存慢
文件类型覆盖面大
容量大，存储时间可控

### Push Cache

Push Cache 是 HTTP2 协议新增的内容
当以上三种缓存都没有命中时，它才会被使用。并且缓存时间也很短暂，只在会话（Session）中存在，一旦会话结束就被释放。
特点

所有的资源都能被推送，但有一定的兼容性问题
可以推送 no-cache 和 no-store 的资源
一旦连接被关闭，Push Cache 就被释放
多个页面可以使用相同的 HTTP/2 连接，即可以使用同一份缓存
Push Cache 中的缓存只能被使用一次
浏览器可以拒绝接受已经存在的资源推送

当所有缓存都没有命中时,就会发起网络请求来获取资源

### 缓存策略

强缓存
协商缓存
优先级较高的是强缓存，当强缓存失效的情况下，才会走协商缓存流程

都是通过设置 HTTP Header 来实现的

## 渲染原理


HTML 经过解析生成 DOM 树； CSS 经过解析生成　 Style Rules。 二者一结合生成了 Render Tree。
通过 layout 计算出 DOM 要显示的宽高、位置、颜色。
最后渲染在界面上，用户就看到了

浏览器的渲染过程：

- 解析 HTML 构建 DOM(DOM 树)，并行请求 css/image/js
- CSS 文件下载完成，开始构建 CSSOM(CSS 树)
- CSSOM 构建结束后，和 DOM 一起生成 Render Tree(渲染树)
- 布局(Layout)：计算出每个节点在屏幕中的位置
- 显示(Painting)：通过显卡把页面画到屏幕上

DOM 树 和 渲染树 的区别：

- DOM 树与 HTML 标签一一对应，包括 head 和隐藏元素
- 渲染树不包括 head 和隐藏元素，大段文本的每一个行都是独立节点，每一个节点都有对应的 css 属性

### CSS 会阻塞 DOM 解析吗？

对于一个 HTML 文档来说，不管是内联还是外链的 css，都会阻碍后续的 dom 渲染，但是不会阻碍后续 dom 的解析。

当 css 文件放在 `<head>` 中时，虽然 css 解析也会阻塞后续 dom 的渲染，但是在解析 css 的同时也在解析 dom，所以等到 css 解析完毕就会逐步的渲染页面了。

### 重绘和回流（重排）的区别和关系？

- 重绘：当渲染树中的元素**外观**（如：颜色）发生改变，不影响布局时，产生重绘
- 回流：当渲染树中的元素的**布局**（如：尺寸、位置、隐藏/状态状态）发生改变时，产生重绘回流
- 注意：JS 获取 Layout 属性值（如：offsetLeft、scrollTop、getComputedStyle 等）也会引起回流。因为浏览器需要通过回流计算最新值
- 回流必将引起重绘，而重绘不一定会引起回流

DOM 结构中的各元素都有自己的盒子，这些都需要浏览器根据各种样式来计算并更具结果将元素放到它该出现的位置，这个过程叫 reflow

触发 reflow

- 添加或删除可见的 DOM 元素。
- 元素位置改变。
- 元素的尺寸改变（包括：内外边距、边框厚度、宽度、高度等属性的改变）。
- 内容改变。
- 页面渲染器初始化。
- 浏览器窗口尺寸改变。

### 如何最小化重绘(repaint)和回流(reflow)？

以下几个操作会导致性能问题：

- 改变 window 大小
- 改变字体
- 添加或删除样式
- 文字改变
- 定位或者浮动
- 盒模型

解决方法：

- 需要要对 DOM 元素进行复杂的操作时，可以先隐藏(display:"none")，操作完成后再显示
- 需要创建多个 DOM 节点时，使用 DocumentFragment 创建完后一次性的加入 document，或使用字符串拼接方式构建好对应 HTML 后再使用 innerHTML 来修改页面
- 缓存 Layout 属性值，如：var left = elem.offsetLeft; 这样，多次使用 left 只产生一次回流
- 避免用 table 布局（table 元素一旦触发回流就会导致 table 里所有的其它元素回流）
- 避免使用 css 表达式(expression)，因为每次调用都会重新计算值（包括加载页面）
- 尽量使用 css 属性简写，如：用 border 代替 border-width, border-style, border-color
- 批量修改元素样式：elem.className 和 elem.style.cssText 代替 elem.style.xxx

## 阻塞渲染

浏览器阻塞渲染是指浏览器在构建DOM树、CSSOM树和渲染树的过程中，如果遇到某些资源（如图片、CSS、JavaScript等）需要加载或执行，而这些资源的加载或执行过程被阻塞，那么浏览器就无法继续构建和渲染后续的内容。这种情况会导致页面的渲染被阻塞，用户可能会看到一个空白页面或者页面内容加载不完整。

以下是一些可能导致浏览器阻塞渲染的情况：

CSS阻塞渲染：

当浏览器遇到一个 `<link>` 标签或者`<style>`标签时，它必须先下载和解析CSS文件或样式，然后才能继续构建DOM树。如果CSS文件很大或者网络条件不好，这可能会导致CSS阻塞渲染。

JavaScript阻塞渲染：

当浏览器遇到一个`<script>`标签时，它必须先下载、解析和执行JavaScript代码，然后才能继续构建DOM树。如果JavaScript代码执行时间过长或者存在死循环，这可能会导致JavaScript阻塞渲染。

此外，如果JavaScript代码中操作了DOM，并且这个操作在DOM树构建完成之前，那么浏览器也需要等待JavaScript执行完毕才能继续渲染。

图片阻塞渲染：

当浏览器遇到一个`<img>`标签时，它必须先下载图片，然后才能继续构建DOM树。如果图片很大或者网络条件不好，这可能会导致图片阻塞渲染。

为了减少阻塞渲染的时间，可以采取以下措施：

CSS放在头部：将CSS放在`<head>`标签中，这样浏览器就可以尽早下载和解析CSS，减少渲染阻塞。

JavaScript放在底部：将JavaScript放在`<body>`标签的底部，这样浏览器就可以先构建DOM树，然后再执行JavaScript。

图片优化：使用适当的图片格式（如WebP）和适当的图片大小，以减少图片的加载时间。

异步加载JavaScript：使用async或defer属性，让JavaScript异步加载，不阻塞DOM的构建。

使用CSS Sprites：将多个小图片合并成一个大图片，减少HTTP请求次数。

使用字体图标：使用字体图标代替图片图标，减少HTTP请求次数。

通过这些优化措施，可以尽量减少浏览器阻塞渲染的时间，提高页面的加载速度和用户体验。

## 本地存储

## web 安全

### XSS（跨站脚本攻击）
XSS（跨站脚本攻击）是一种常见的Web安全漏洞，它允许攻击者在用户浏览器中注入恶意脚本，从而劫持用户会话、窃取用户信息或者在用户机器上执行恶意操作。XSS攻击通常发生在应用程序对用户输入的数据没有进行适当的过滤和转义的情况下。

XSS攻击的类型主要有三种：

存储型XSS攻击：这种攻击的恶意脚本被存储在目标服务器上，当用户请求数据时，恶意脚本从服务器传输到浏览器并执行。

反射型XSS攻击：这种攻击的恶意脚本作为用户输入的一部分，通过服务器反射给浏览器。

基于DOM的XSS攻击：这种攻击的恶意脚本通过修改页面的DOM环境来执行。

为了防止XSS攻击，可以采取以下措施：

输入验证：对用户输入的数据进行验证，确保其符合预期的格式和内容。

输出编码：在输出用户输入的数据到HTML页面时，对特殊字符进行编码，如<转换为&lt;，>转换为&gt;，"转换为&quot;等。

使用HTTP头部：通过设置Content-Security-Policy（CSP）HTTP头部，可以限制浏览器只能执行特定的脚本。

使用内容安全策略（CSP）：CSP是一种安全策略，用于检测和减轻XSS攻击，通过指定受信任的内容源来控制浏览器加载哪些资源。

使用HTTP-only Cookies：设置HttpOnly属性的Cookie，这样浏览器就无法通过JavaScript脚本访问这些Cookie，增加了攻击者的攻击难度。

使用安全的Cookie属性：设置Secure属性，使得Cookie只在HTTPS连接中传输。

避免内联事件处理器：不要在HTML标签中使用内联的JavaScript事件处理器，如onclick、onerror等。

使用自动化的安全测试工具：定期进行安全测试，使用自动化的工具来发现和修复安全漏洞。

保持软件更新：保持服务器和应用程序的软件更新，以修复已知的安全漏洞。

教育和培训：对开发人员进行安全编码的教育和培训，确保他们了解XSS攻击的风险，并能够正确地处理用户输入。

通过采取这些措施，可以大大降低XSS攻击的风险，保护用户免受恶意脚本的攻击。

### CSRF（跨站请求伪造）

CSRF（Cross-Site Request Forgery，跨站请求伪造）是一种网络攻击方式，它利用用户已通过身份验证的网站在用户不知情的情况下执行未经授权的命令。这种攻击通常发生在用户访问了恶意网站，而这个恶意网站诱导用户在目标网站上执行某些操作。

CSRF攻击的关键在于攻击者可以伪造用户的请求，因为浏览器会自动发送与该网站相关的任何cookie。例如，用户可能在访问银行网站时已经登录，并且浏览器已经存储了他们的登录凭证（如cookie）。攻击者可以创建一个恶意网站，其中包含一个表单，该表单向银行网站发送一个请求，看起来像是用户自己提交的。由于浏器会自动发送与银行网站相关的cookie，银行网站会误以为这个请求是用户自己发送的，从而执行未经授权的操作。

CSRF攻击的类型主要有两种：

GET型CSRF：这种攻击通常通过诱导用户点击一个链接来进行，链接的地址指向攻击者控制的网站，并包含对目标网站的请求。

POST型CSRF：这种攻击通常通过诱导用户提交一个表单来进行，表单的内容指向攻击者控制的网站，并包含对目标网站的请求。

防止CSRF攻击的策略包括：

同源检测：服务器可以在HTTP请求头中检查Origin或Referer字段，以确定请求是否来自于同源。

使用CSRF令牌：服务器为每个用户会话生成一个唯一的CSRF令牌，并将其包含在表单中。当表单提交时，服务器会验证提交的令牌是否与用户会话中的令牌匹配。

双重Cookie验证：服务器在设置cookie时，同时设置一个CSRF令牌的cookie。当用户发送请求时，服务器会验证请求中的cookie和CSRF令牌是否匹配。

SameSite Cookie属性：通过设置SameSite属性，可以限制cookie在跨站请求中的发送。SameSite属性可以设置为Strict或Lax，以防止跨站请求发送cookie。

验证码：对于关键操作，可以要求用户输入验证码来确认他们的身份。

敏感操作限制：对于敏感操作，如转账、修改密码等，可以设置更高的验证要求，如短信验证码、邮件验证链接等。

定期更新和修补：保持服务器和应用程序的软件更新，以修复已知的安全漏洞。

教育和培训：对开发人员进行安全编码的教育和培训，确保他们了解CSRF攻击的风险，并能够正确地处理用户请求。

通过采取这些措施，可以大大降低CSRF攻击的风险，保护用户免受未经授权的操作。

## 跨域（同源策略）

### 同源策略

- 端口相同
- 域名相同
- 协议相同

例子：`http://www.example.com/dir/page.html` 这个网址，协议是`http`，域名是`www.example.com`，端口是`80`

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。**是浏览器做的努力**

### 同源策略限制范围

- Cookie、LocalStorage 和 IndexDB 无法读取
- DOM 无法获得
- AJAX 请求不能发送

### CORS 跨域资源请求

CORS(Cross-origin resource sharing)跨域资源请求

浏览器在请求一个跨域资源的时候，如果是跨域的 Ajax 请求，他会在请求头中加一个`origin`字段，但他是不知道这个资源服务端是否允许跨域请求的。浏览器会发送到服务端，如果服务器返回的头中没有`'Access-Control-Allow-Origin': '对应网址或 * '` 的话，那么浏览器就会把请求内容给忽略掉，并且在控制台报错

### CORS 限制

允许的请求方法

- GET
- POST
- HEAD

允许的 Content-Type

- text/plain
- multipart/form-data
- application/x-www-form-ulencoded

其他类型的请求方法和 Content-Type 需要通过**预请求验证**后然后才能发送

### CORS 预请求

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求。

服务器在 HTTP header 中加入允许请求的方法和 Content-Type 后，其他指定的方法和 Content-Type 就可以成功请求了

```
'Access-Control-Allow-Headers': '允许Content-Type'
'Access-Control-Allow-Methods': '允许的请求方法'
'Access-Control-Max-Age': '预请求允许其他方法和类型传输的时间'
```

### JSONP 跨域

浏览器上虽然有同源限制，但是像 script 标签、link 标签、img 标签、iframe 标签，这种**在标签上通过 src 地址来加载一些内容的时候浏览器是允许进行跨域请求的**。

所以 JSONP 的原理就是：

- 创建一个 script 标签，这个 script 标签的 src 就是请求的地址；
- 这个 script 标签插入到 DOM 中，浏览器就根据 src 地址访问服务器资源
- 返回的资源是一个文本，但是因为是在 script 标签中，浏览器会执行它
- 而这个文本恰好是函数调用的形式，即函数名（数据），浏览器会把它当作 JS 代码来执行即调用这个函数
- 只要提前约定好这个函数名，并且这个函数存在于 window 对象中，就可以把数据传递给处理函数。

### Hash 值跨域通信

背景：在页面 A 下提供 iframe 或 frame 嵌入了跨域的页面 B

容器页面 -> 嵌入页通信：

在 A 页面中改变 B 的 url 中的 hash 值，B 不会刷新，但是 B 可以用过`window.onhashchange`事件监听到 hash 变化

### postMessage 通信

```js
// 窗口A中
window.postMessage("data", "http://A.com");
// 窗口B中
window.addEventListener("message", function (event) {
  console.log(event.origin); // http://A.com
  console.log(event.source); // A 对象window引用
  console.log(event.data); // 数据
});
```

### WebSocket 跨域通信

```js
var ws = new WebSocket("wss://echo.websocket.org"); //这个是后端端口

ws.onopen = function (evt) {
  ws.send("some message");
};

ws.onmessage = function (evt) {
  console.log(evt.data);
};

ws.onclose = function (evt) {
  console.log("连接关闭");
};
```

### document.domain

该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。

只需要给页面添加 document.domain = 'test.com' 表示二级域名都相同就可以实现跨域

### localhost 与 127.0.0.1

- localhost 等于 127.0.0.1，不过 localhost 是域名，127.0.0.1 是 IP 地址
- localhost 和 127.0.0.1 不需要联网，都是本机访问

注意：localhost 和 127.0.0.1 虽然都指向本机，但也属于**跨域**，
（配置 localhost 出现 CORS 时，可尝试改为 127.0.0.1）
