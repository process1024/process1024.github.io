module.exports = {
  lang: 'zh-CN',
  title: 'chen-junyi个人网站',
  description: 'chen-junyi 的个人网站',
  base: '/article/',
  serviceWorker: true,
  head: [
    ["meta", { name: "description", content: "技术文章" }]
  ],
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
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
          { text: '关于我', link: 'https://github.com/chen-junyi' }
        ]
      }
    },
  },
}
