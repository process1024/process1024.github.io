module.exports = {
  lang: "zh-CN",
  port: "8002",
  // open: true,
  title: "前端好好玩",
  description: "前端进阶网站",
  base: "/article/",
  serviceWorker: true,
  head: [
    [
      "link",
      { rel: "shortcut icon", type: "image/x-icon", href: `/favicon.ico` },
    ],
    ["meta", { name: "description", content: "技术文章" }],
  ],
  themeConfig: {
    logo: "/images/logo.png",
    // repo: 'https://github.com/chen-junyi/article',
    locales: {
      "/": {
        label: "简体中文",
        selectText: "选择语言",
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新",
          },
        },
        navbar: [
          { text: "首页", link: "/" },
          {
            text: "基础",
            link: "/frontend/Javascript.html",
          },
          {
            text: "框架",
            children: ["/vue/", "/react/"],
          },
          {
            text: "算法",
            link: "/algorithm/sort.md",
          },
          {
            text: "文章",
            link: "/blog/Action.html",
          },
          {
            text: "关于我",
            children: [
              {
                text: "github",
                link: "https://github.com/chen-junyi",
              },
              {
                text: "源码",
                link: "https://github.com/chen-junyi/article",
              },
              {
                text: "掘金首页",
                link: "https://juejin.cn/user/1011206427522078",
              },
            ],
          },
        ],
      },
    },
    sidebar: {
      "/frontend/": [
        {
          isGroup: true,
          text: "大前端",
          children: [
            "/frontend/Javascript.md",
            "/frontend/Browser.md",
            "/frontend/Nodejs.md",
            "/frontend/Http.md",
          ],
        },
      ],
      "/vue/": [
        {
          isGroup: true,
          text: "vue",
          children: ["/vue/NextTick.md", "/vue/KeepAlive.md"],
        },
      ],
      "/react/": [
        {
          isGroup: true,
          text: "react",
          children: ["/react/hook.md", "/react/fiber.md"],
        },
      ],
      "/algorithm/": [
        {
          isGroup: true,
          text: "算法",
          children: ["/algorithm/sort.md"],
        },
      ],
      "/blog/": [
        {
          isGroup: true,
          text: "blog",
          children: [
            "/blog/Action.md",
            "/blog/Cache.md",
            "/blog/NextTick.md",
            "/blog/Element-Validate.md",
            "/blog/Function.md",
            "/blog/Bit.md",
            "/blog/Vue2.md",
            "/blog/Vue3.md",
          ],
        },
      ],
    },
  },
};
