module.exports = {
  lang: 'zh-CN',
  port: '8002',
  // open: true,
  title: 'chen-junyi个人网站',
  description: 'chen-junyi 的个人网站',
  base: '/article/',
  serviceWorker: true,
  head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: `/favicon.ico` }],
    ["meta", { name: "description", content: "技术文章" }]
  ],
  themeConfig: {
    logo: '/images/logo.png',
    repo: 'https://github.com/chen-junyi/article',
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        serviceWorker: {
          updatePopup: {
            message: '发现新内容可用',
            buttonText: '刷新'
          }
        },
        navbar: [
          { text: '首页', link: '/' },
          {
            text: '基础',
            link: '/frontend/'
          },
          {
            text: '框架',
            children: ['/vue/', '/react/'],
          },
          {
            text: '算法',
            link: '/algorithm/',
          },
          { text: '关于我', link: 'https://github.com/chen-junyi' }
        ]
      }
    },
    sidebar: {
      '/vue/': [
        {
          isGroup: true,
          text: 'vue',
          children: ['/vue/NextTick.md', '/vue/KeepAlive.md'],
        },
      ],
      '/react/': [
        {
          isGroup: true,
          text: 'react',
          children: ['/react/hook.md', '/react/fiber.md'],
        },
      ],
    },
  },
}
