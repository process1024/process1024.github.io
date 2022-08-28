# node 实践浏览器缓存

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f6f2572c5c44b67a824a2e209ca3662~tplv-k3u1fbpfcp-watermark.image)

浏览器缓存是性能优化非常重要的一个方案，合理地使用缓存可以提高用户体验，还能节省服务器的开销。掌握好缓存的原理和并合理地使用无论对前端还是运维都是相当重要的。

## 什么是浏览器缓存

`浏览器缓存(http 缓存)` 是指浏览器在本地磁盘对用户最近请求过的文档进行存储，当访问者再次访问同一页面时，浏览器就可以直接从本地磁盘加载文档。

### 优点

1. 减少了冗余的数据传输，节省带宽，减少服务器压力

2. 加快了客户端加载速度，提升用户体验。

### 强缓存

强缓存不会向服务器发送请求，而是直接从缓存中读取资源，强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control，这两个头部分别是 HTTP1.0 和 HTTP1.1 的实现。

#### Expires

Expires 是 HTTP1.0 提出的一个表示资源过期时间的 header，它描述的是一个绝对时间，由服务器返回。
Expires 受限于本地时间，如果修改了本地时间，就会造成缓存失效。

#### Cache-Control

Cache-Control 出现于 HTTP/1.1，常见字段是 max-age，单位是秒，很多 web 服务器都有默认配置，优先级高于 Expires，表示的是相对时间。

例如 Cache-Control:max-age=3600 代表资源的有效期是 3600 秒。取的是响应头中的 Date，请求发送的时间，表示当前资源在 Date ~ Date +3600s 这段时间里都是有效的。Cache-Control 还拥有多个值：

- no-cache 不直接使用缓存，也就是跳过强缓存。
- no-store 禁止浏览器缓存数据，每次请求资源都会向服务器要完整的资源。
- public 可以被所有用户缓存，包括终端用户和 CDN 等中间件代理服务器。
- private 只允许终端用户的浏览器缓存，不允许其他中间代理服务器缓存。

`要注意的就是no-cache和no-store的区别，no-cache是跳过强缓存，还是会走协商缓存的步骤，而no-store是真正的完全不走缓存，所有资源都不会缓存在本地`

### 协商缓存

当浏览器对某个资源的请求没有命中强缓存，就会发一个请求到服务器，验证协商缓存是否命中，如果协商缓存命中，请求响应返回的 http 状态为 304 并且会显示一个 Not Modified 的字符串。

协商缓存用的是【Last-Modified，If-Modified-Since】和【ETag、If-None-Match】这两对 Header 来管理的。

`注意！！协商缓存需要配合强缓存使用，使用协商缓存需要先设置Cache-Control：no-cache或者pragma：no-cache来告诉浏览器不走强缓存`

#### Last-Modified、If-Modified-Since

这两个 Header 是 HTTP1.0 版本提出来的，两个字段配合使用。

Last-Modified 表示本地文件最后修改日期，浏览器会在请求头带上 If-Modified-Since（上次返回的 Last-Modified 的值），服务器会将这个值与资源修改的时间匹配，如果时间不一致，服务器会返回新的资源，并且将 Last-Modified 值更新，作为响应头返回给浏览器。如果时间一致，表示资源没有更新，服务器返回 304 状态码，浏览器拿到响应状态码后从本地缓存中读取资源。

但 Last-Modified 有几个问题。

- 文件虽然被修改了，但最终的内容没有变化，这样文件修改时间还是会被更新
- 有的文件修改频率在秒以内，这时候以秒粒度来记录就不够了
- 有的服务器无法精确获取文件的最后修改时间。

所以出现了 ETAG。

#### ETag、If-None-Match

在 HTTP1.1 版本中，服务器通过 Etag 来设置响应头缓存标识。Etag 的值由服务端生成。在第一次请求时，服务器会将资源和 Etag 一并返回给浏览器，浏览器将两者缓存到本地缓存数据库。在第二次请求时，浏览器会将 Etag 信息放到 If-None-Match 请求头去访问服务器，服务器收到请求后，会将服务器中的文件标识与浏览器发来的标识进行对比，如果不相同，服务器返回更新的资源和新的 Etag ，如果相同，服务器返回 304 状态码，浏览器读取缓存。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffc78ee5fd654037aa383500550c81d6~tplv-k3u1fbpfcp-watermark.image)

### 流程总结

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ff3c19866aa4db1aa62f462963bcdfa~tplv-k3u1fbpfcp-watermark.image)

总结这几个字段：

- Cache-Control —— 请求服务器之前
- Expires —— 请求服务器之前
- If-None-Match (Etag) —— 请求服务器
- If-Modified-Since (Last-Modified) —— 请求服务器

## node 实践

本文用 koa 来做例子，因为 koa 是更轻量级的、更纯净的，本身并没有捆绑任何中间件，相比 express 自带了很多 router、static 等多种中间件函数，koa 更适合本文来做示例。

### koa 启动服务

秉着学习和更容易理解的宗旨，不使用 koa-static 和 koa-router 中间件，用 koa 简易实现 web 服务器来验证之前的结论。

1. 创建项目

```bash
# 创建并进入一个目录并新建index.js文件
mkdir koa-cache
cd koa-cache
touch index.js

# 初始化项目
git init
yarn init

# 将 koa 安装为本地依赖
yarn add koa
```

2. koa 代码

```javascript
/*app.js*/
const Koa = require("koa")
const app = new Koa()

app.use(async (ctx) => {
  ctx.body = "hello koa"
})

app.listen(3000, () => {
  console.log("starting at port 3000")
})
```

3. 启动服务

```bash
node index.js
```

这样一个 koa 服务就起来了，访问 localhost:3000 可以就看到 hello koa。

为了方便调试，修改代码不用重新启动，推荐使用 nodemon 或者 pm2 启动服务。

### 原生 koa 实现简易静态资源服务

实现一个静态资源服务器关键点就是根据前端请求的地址来判断请求的资源类型，设置返回的 Content-Type，让浏览器知道返回的内容类型，浏览器才能决定以什么形式，什么编码来读取返回的内容。

#### 定义资源类型列表

```javascript
const mimes = {
  css: "text/css",
  less: "text/css",
  gif: "image/gif",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  pdf: "application/pdf",
  png: "image/png",
  svg: "image/svg+xml",
  swf: "application/x-shockwave-flash",
  tiff: "image/tiff",
  txt: "text/plain",
  wav: "audio/x-wav",
  wma: "audio/x-ms-wma",
  wmv: "video/x-ms-wmv",
  xml: "text/xml",
}
```

#### 解析请求的资源类型

```javascript
function parseMime(url) {
  // path.extname获取路径中文件的后缀名
  let extName = path.extname(url)
  extName = extName ? extName.slice(1) : "unknown"
  return mimes[extName]
}
```

#### fs 读取文件

```javascript
const parseStatic = (dir) => {
  return new Promise((resolve) => {
    resolve(fs.readFileSync(dir), "binary")
  })
}
```

#### koa 处理

```javascript
app.use(async (ctx) => {
  const url = ctx.request.url
  if (url === "/") {
    // 访问根路径返回index.html
    ctx.set("Content-Type", "text/html")
    ctx.body = await parseStatic("./index.html")
  } else {
    ctx.set("Content-Type", parseMime(url))
    ctx.body = await parseStatic(path.relative("/", url))
  }
})
```

这样基本也就完成了一个简单的静态资源服务器。然后在根目录下新建一个 html 文件和 static 目录，并在 static 下放一些文件。这时候的目录应该是这样的：

    |-- koa-cache
        |-- index.html
        |-- index.js
        |-- static
            |-- css
                |-- color.css
                |-- ...
            |-- image
                |-- soldier.png
                |-- ...
            ...
       ...

这时候就可以通过 localhost:3000/static 访问具体的资源文件了。

##### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>test cache</title>
    <link rel="stylesheet" href="/static/css/index.css" />
  </head>
  <body>
    <div id="app">测试css文件</div>
    <img src="/static/image/soldier.png" alt="" />
  </body>
</html>
```

##### css/color.css

```css
#app {
  color: blue;
}
```

这时候打开 localhost:3000，就能看到如下效果：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1062e5185be94b329b9964296e8b128a~tplv-k3u1fbpfcp-watermark.image)

到这里基本的环境就都搭好了。接下来进入验证阶段。

### 强缓存

在没有任何配置之前，可以看下 network：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6110c99abd67492d9fe221d3190b0b04~tplv-k3u1fbpfcp-watermark.image)

这时候无论是首次还是第几次，都会向服务器请求资源。

`注意！！！在开始实验之前要把network面板的Disable cache勾选去掉，这个选项表示禁用浏览器缓存，浏览器请求会带上Cache-Control: no-cache和Pragma: no-cache头部信息，这时候所有的请求都不会走缓存`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88f2440ce3cd4026aea411914e8fc7a5~tplv-k3u1fbpfcp-watermark.image)

#### 设置 Expire

修改 index.js 中的 app.use 代码段。

```javascript
app.use(async (ctx) => {
  const url = ctx.request.url
  if (url === "/") {
    // 访问根路径返回index.html
    ctx.set("Content-Type", "text/html")
    ctx.body = await parseStatic("./index.html")
  } else {
    const filePath = path.resolve(__dirname, `.${url}`)
    ctx.set("Content-Type", parseMime(url))
    // 设置过期时间在30000毫秒，也就是30秒后
    ctx.set("Expires", new Date(Date.now() + 30000))
    ctx.body = await parseStatic(filePath)
  }
})
```

用 ctx.set('Expires', new Date(Date.now() + 30000))，设置过期时间为当期时间的 30000 毫秒，也就是 30 秒后`（后面的设置头部信息都是这里修改）`。

再访问下 localhost:3000，可以看到多了 Expires 这个 Header。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e1c6f69e6944c35a8427e774a60ddb1~tplv-k3u1fbpfcp-watermark.image)

后面在 30 秒之内访问都可以看到 network 的 Size，css 文件显示的是 disk cache，而 image 资源显示的是 from memory cache。这时候浏览器是直接读的浏览器缓存，并没有请求服务器，可以尝试把 css 和图片文件改名称或者删除验证下，页面显示正常，说明之前的结论是没错的。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55201ba3536d4827ae846990170f63c8~tplv-k3u1fbpfcp-watermark.image)

#### Cache-Control

ctx.set('Cache-Control', 'max-age=300')设置 300 秒有效期，验证方式同上。

### 协商缓存

#### Last-Modified，If-Modified-Since

HTTP1.0 协商缓存关键点就是根据客户端请求带的 ifModifiedSince 字段的时间和请求的资源对应的修改时间来判断资源是否有更新。

首先设置 Cache-Control： no-cache, 使客户端不走强缓存，再判断客户端请求是否有带 ifModifiedSince 字段，没有就设置 Last-Modified 字段，并返回资源文件。如果有就用 fs.stat 读取资源文件的修改时间，并进行对比，如果时间一样，则返回状态码 304。

```javascript
ctx.set("Cache-Control", "no-cache")
const ifModifiedSince = ctx.request.header["if-modified-since"]
const fileStat = await getFileStat(filePath)
if (ifModifiedSince === fileStat.mtime.toGMTString()) {
  ctx.status = 304
} else {
  ctx.set("Last-Modified", fileStat.mtime.toGMTString())
  ctx.body = await parseStatic(filePath)
}
```

#### etag、If-None-Match

etag 的关键点在于计算资源文件的唯一性，这里使用 nodejs 内置的 crypto 模块来计算文件的 hash 值，并用十六进制的字符串表示。cypto 的用法可以看 nodejs 的[官网](http://nodejs.cn/api/crypto.html#crypto_crypto)
。crpto 不仅支持字符串的加密，还支持传入 buffer 加密，作为 nodejs 的内置模块，在这里用来计算文件的唯一标识再合适不过。

```javascript
ctx.set("Cache-Control", "no-cache")
const fileBuffer = await parseStatic(filePath)
const ifNoneMatch = ctx.request.headers["if-none-match"]
const hash = crypto.createHash("md5")
hash.update(fileBuffer)
const etag = `"${hash.digest("hex")}"`
if (ifNoneMatch === etag) {
  ctx.status = 304
} else {
  ctx.set("etag", etag)
  ctx.body = fileBuffer
}
```

效果如下图，第二次请求浏览器会带上 If-None-Match，服务器计算文件的 hash 值再次比较，相同则返回 304，不同再返回新的文件。而如果修改了文件，文件的 hash 值也就变了，这时候两个 hash 不匹配，服务器则返回新的文件并带上新文件的 hash 值作为 etag。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cb65d3c284f4042ba65668399315a3c~tplv-k3u1fbpfcp-watermark.image)

### 小结

通过以上代码实践了每个缓存字段的效果，代码仅作为演示，生产的静态资源服务器会更加复杂，例如 etag 不会每次都重新获取文件来计算文件的 hash 值，这样太费性能，一般都会有响应的缓存机制，比如对资源的 last-modified 和 etag 值建立索引缓存。

## 总结

通常 web 服务器都有默认的缓存配置，具体的实现可能也不大相同，像 nginx、tomcat、express 等 web 服务器都有相应的源码，有兴趣的可以去阅读学习。

合理的使用强缓存和协商缓存具体需要看项目的使用场景和需求。像目前常见的单页面应用，因为通常打包都是新生成 html 与相应的静态资源依赖，所以可以对 html 文件配置协商缓存，而打包生成的依赖，例如 js、css 这些文件可以使用强缓存。或者只对第三方库使用强缓存，因为第三方库通常版本更新较慢，可以锁定版本。

node 示例完整代码可以在这里看https://github.com/process1024/code/blob/main/node/cache/koa2.js

## 写在最后

本人写作水平有限，有哪里说得不对和写错的欢迎指出来，有什么问题也欢迎在底下留言交流。

`本人最近准备整理一个前端知识文档网站，有兴趣一起整理的可以留言，具体可以看下面的第一篇文章`

往期文章

- [用 GitHub Action + VuePress 自动化部署自己的文档网站](https://juejin.cn/post/6937532951223599141)
- [vue 中的 nextTick 完整解析](https://juejin.cn/post/6934539800527503368)
