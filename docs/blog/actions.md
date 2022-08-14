# GitHub Action + VuePress 部署

本文教你如何使用 GitHub Action + vuepress 自动化部署在 GitHub Pages。最终的代码在我的[GitHub](https://github.com/chen-junyi/article)可以看，演示可以点[这里](https://chen-junyi.github.io/article/)，演示访问不了的可以访问我的[gitee pages 地址](https://junyi-chen.gitee.io/article/)，我在 gitee 也有同步代码部署 gitee pages。

## VuePress

VuePress 是一个以 Markdown 为中心的静态网站生成器。在本文的示例里使用的是 vue3 版本的 vuepress-next。VuePress 还能在 Markdown 里使用 Vue 语法，并且每个页面都会预渲染生成静态的 HTML，也就是说加载性能好还有非常好的 SEO 支持，非常适合用来写文档和博客。

### 项目搭建

#### 1.创建项目

```bash
# 创建并进入一个目录
mkdir vuepress-starter
cd vuepress-starter

# 初始化项目
git init
yarn init

# 将 VuePress 安装为本地依赖
yarn add -D vuepress@next
```

#### 2.添加 script 命令

```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}

```

#### 3.创建第一篇文章

```
mkdir docs
echo '# Hello VuePress' > docs/README.md
```

#### 4.本地启动

```
yarn docs:dev
```

然后就可以打开 localhost:8080 看到 Hello Vuepress 的文章了，并且是支持热更新，因为 vuepress 就是用 webpack-dev-server 驱动的。VuePress 还有很多扩展的配置，在 docs 目录下加新建.vuepress/config.js，在这里可以配置标题、主题、语言、导航栏等等，在这里不展开描述。

最后部署的时候用 yarn docs:build 命令，会在 docs/.vuepress 生成 dist 目录，这个目录后面配置 workflow 会用到。

## GitHub-Actions

actions 顾名思义就是一堆动作，是一个持续集成服务，持续集成包含了拉代码、运行测试、编译代码、登录远程服务器，发布到第三方服务等等的操作，GitHub 将这些操作称为 actions。

不同项目的很多操作可以是一样的，比如拉取分支代码、缓存依赖等，每个也就是一个 action 脚本是可以共用的，所以 GitHub 允许开发者把每个操作写成独立的脚本文件，存放到代码仓库，使得其他开发者可以引用。

GitHub 做了一个[官方市场](https://github.com/marketplace?type=actions)，可以让开发者提交 action 供其他人使用，GitHub 官方的 actions 则都放在 [github.com/actions](https://github.com/actions) 里面。接下来介绍写一个 VuePress 的 action。

### 建立仓库

首先在 github 上创建仓库，如果建立的仓库名称是 username.github.io，则最后访问的地址https://username.github.io/。 如果不是这个名称，则最后访问的地址是https://username.github.io/repo/ ,repo 就是仓库名字，此时还需要先修改.vuepress/config.js，该文件导出一个对象，增加 base 的配置项，值为“/repo/”。

### 添加.github 相关配置文件

在项目的根目录下新建.github/workflows 目录，workflow 就是 GitHub Actions 的配置文件。随便新建.yml 文件就是一个 flow，github 会自动运行 workflows 目录下所有的 yml 文件。介绍下 workflow 最重要的几个配置和概念。

1. name

name 字段是 workflow 的名称。如果省略该字段，默认为当前 workflow 的文件名

2. on

on 字段指定触发 workflow 的条件，通常是某些事件。在本文实例里用的是 push，指的就是当 git push 事件发生时触发该 workflow。

3. jobs

jobs 是 workflow 最重要的部分，表示 workflow 要执行的任务，可以是一个或者多个。

接下里开始就是本文示例的部署内容。

我们希望的流程是，本地改完代码，上传到 github 后能自动打包部署到 gh-pages 分支。先配置触发条件 on：

```yaml
on: # 触发条件
  # 每当 push 到 master 分支时触发部署
  push:
    branches: [master]
  # 是否手动触发部署
  workflow_dispatch:
```

接下来配置重头戏 jobs:

```yaml
jobs:
  docs:
    runs-on: ubuntu-latest # 指定运行所需要的虚拟机环境（必填）

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # 选择要使用的 node 版本
          node-version: "14"

      # 缓存 node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      # 如果缓存没有命中，安装依赖
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn --frozen-lockfile

      # 运行构建脚本
      - name: Build VuePress site
        run: yarn docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        # 环境变量
        env:
          GITHUB_TOKEN: ${{ secrets.ACTION_SECRET }}
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
```

首先 job 里配置运行这个脚本需要的虚拟机环境，这个虚拟机环境由 github 提供，可用的包括 windows、linux、macos 等环境，具体看官方文档。在此示例中其实不论哪个系统都是可以的，因为我们需要的是 node 环境，而 node 本身就是跨平台的。

接下里设置获取源码、需要的 node 版本、增加缓存依赖，这里使用官方提供的 actions/setup-node@v1、setup-node@v1、cache@v2。这里的@表示版本，使用别人的 action 时最好都加上版本，以防后面更新的 action 不兼容当前的脚本。这些前置条件配置好，接下来就是熟悉的 yarn install、yarn build:docs，安装依赖使用--frozen-lockfile 来锁定版本。最后一步就是将打包的目录更新到 gh-pages 分支。因为要更新 github 代码，所以还需要配置 github-token。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61815fbd6adc4b10b5d60da9b49ab8b5~tplv-k3u1fbpfcp-watermark.image)

在仓库的 setting 下找到 secert，新建一个 secert，文件名可以随便取，在 workflow 的环境变量里 secerts 指的就是这里 secert，后面就是 secert 里文件的具体名称，在这里取为 ACTION_SECERT，env 配置 secerts.ACTION_SECRET 就行。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74607c18da504d63a88894d9493d6dce~tplv-k3u1fbpfcp-watermark.image)

最后指定部署的分支名称，和部署到分支的默认输出目录就行。

尝试着推送代码，可以看到仓库的 Actions 开始自动运行了，并且能看到运行的日志。
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc2cd9e087804342978c671aec803489~tplv-k3u1fbpfcp-watermark.image)

运行完后访问 https://username.github.io/repo 就能看到部署后的效果了。

## 源码

gitHub: https://github.com/chen-junyi/article

github pages: https://chen-junyi.github.io/article/

gitee pages: https://junyi-chen.gitee.io/article/

本人整理的开源文档项目，有兴趣的可以私聊我一起维护完善~

## 结束语

有什么说的不对或者有疑问的，欢迎在下面留言交流~~
