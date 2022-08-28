/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  title: "前端好好玩",
  description: "前端进阶网站",
  lastUpdated: true,
  base: "/article",
  // lang: 'zh-CN',
  head: [["link", { rel: "icon", type: "image/png", href: "pure-logo.svg" }]],
  themeConfig: {
    logo: "/pure-logo.svg",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "基础",
        link: "/frontend/javascript",
      },
      {
        text: "框架",
        items: [
          { text: "vue", link: "/vue/" },
          { text: "react", link: "/react/" },
        ],
      },
      {
        text: "算法",
        link: "/algorithm/sort",
      },
      {
        text: "文章",
        link: "/blog/actions",
      },
      {
        text: "关于我",
        items: [
          {
            text: "github",
            link: "https://github.com/process1024",
          },
          {
            text: "源码",
            link: "https://github.com/process1024/article",
          },
          {
            text: "掘金首页",
            link: "https://juejin.cn/user/1011206427522078",
          },
        ],
      },
    ],
    sidebar: {
      "/frontend/": [
        {
          isGroup: true,

          text: "大前端",
          items: [
            {
              text: "javascript",
              link: "/frontend/javascript",
            },
            {
              text: "浏览器",
              link: "/frontend/browser",
            },
            {
              text: "node",
              link: "/frontend/nodejs",
            },
            {
              text: "http",
              link: "/frontend/http",
            },
          ],
        },
      ],
      "/vue/": [
        {
          isGroup: true,
          text: "vue",
          items: [
            {
              text: "nextTick",
              link: "/vue/next-tick",
            },
            {
              text: "keep-alive",
              link: "/vue/keep-alive",
            },
          ],
        },
      ],
      "/react/": [
        {
          isGroup: true,
          text: "react",
          items: [
            {
              text: "fiber",
              link: "/react/fiber",
            },
            {
              text: "hook",
              link: "/react/hook",
            },
          ],
        },
      ],
      "/algorithm/": [
        {
          isGroup: true,
          text: "算法",
          items: [
            {
              text: "数据结构",
              link: "/algorithm/data-struct",
            },
            {
              text: "排序算法",
              link: "/algorithm/sort",
            },
          ],
        },
      ],
      "/blog/": [
        {
          isGroup: true,
          text: "博客",
          items: [
            {
              text: "github action",
              link: "/blog/actions",
            },
            {
              text: "位运算",
              link: "/blog/bit-operation",
            },
            {
              text: "node实践浏览器缓存",
              link: "/blog/nodejs-cache",
            },
            {
              text: "nextTick原理解析",
              link: "/blog/next-tick",
            },
            {
              text: "vue2面试题原理解析",
              link: "/blog/vue2-interview",
            },
            {
              text: "vue3面试题原理解析",
              link: "/blog/vue3-interview",
            },
            {
              text: "函数式编程",
              link: "/blog/functional",
            },
            {
              text: "element-ui表单校验源码解析",
              link: "/blog/element-validate",
            },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/process1024" }],
  },
  slide: {
    "/frontend/": [
      {
        isGroup: true,
        text: "大前端",
        children: [
          "/frontend/javascript.md",
          "/frontend/browser.md",
          "/frontend/nodejs.md",
          "/frontend/http.md",
        ],
      },
    ],
    "/vue/": [
      {
        isGroup: true,
        text: "vue",
        children: ["/vue/next-tick.md", "/vue/keep-alive.md"],
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
        children: ["/algorithm/data-struct.md", "/algorithm/sort.md"],
      },
    ],
    "/blog/": [
      {
        isGroup: true,
        text: "blog",
        children: [
          "/blog/actions.md",
          "/blog/nodejs-cache.md",
          "/blog/next-tick.md",
          "/blog/element-validate.md",
          "/blog/functional.md",
          "/blog/bit-operation.md",
          "/blog/vue2-interview.md",
          "/blog/vue3-interview.md",
        ],
      },
    ],
  },
};

export default config;
