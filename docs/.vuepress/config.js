var ip = require('ip');

module.exports = {
  title: 'xiumei\'s blog',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  host: ip.address(),
  port: 9090,
  base: '/blog/', // 这是部署到github相关的配置
  dest: "dist/",
  // theme: "ououe",
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    defaultTheme: "dark",
    // cover: "./cover.jpg",
    // logo: "./logo.png",
    search: true,
    pageGroup: 5,
    postTime: {
      createTime: "Create Time",
      lastUpdated: "Last Updated"
    },
    // navbar: false,
    nav: [ // 导航栏配置
      { text: '前端基础', link: '/accumulate/' },
      { text: '算法题库', link: '/algorithm/' },
      {
        text: '微博', items: [
          { text: 'Chinese', link: 'https://baidu.com' },
          { text: 'Japanese', link: 'https://baidu.comcom' }
        ]
      },
      {
        text: 'Languages', items: [
          { text: 'Group1', items: [{ text: 'Chinese1', link: 'https://baidu.com1' }, { text: 'Chinese2', link: 'https://baidu.com2' }] },
          { text: 'Group1', items: [{ text: 'Japanese1', link: 'https://baidu.com11' }, { text: 'Japanese2', link: 'https://baidu.com22' }] }
        ]
      }
    ],
    sidebar: [{
      title: '资源链接',
      collapsable: false,
      children: [
        '/zh/link/link'
      ]
    },
    {
      title: '问题收集',
      collapsable: false,
      children: [
        '/zh/collect/question',
        '/zh/collect/emoji',
        '/zh/collect/html',
        '/zh/collect/js',
        '/zh/collect/css',
        '/zh/collect/markdown',
      ]
    },
    {
      title: '命令相关',
      collapsable: false,
      children: [
        '/zh/command/cmd',
      ]
    },
    {
      title: '常用代码',
      collapsable: false,
      children: [
        '/zh/common/code'
      ]
    },
    {
      title: 'chrome',
      collapsable: false,
      children: [
        '/zh/chrome/devtool'
      ]
    },
    {
      title: '组件相关',
      collapsable: false,
      children: [
        '/zh/component/base'
      ]
    },
    {
      title: 'npm相关',
      collapsable: false,
      children: [
        '/zh/npm/npm'
      ]
    },
    {
      title: 'node相关',
      collapsable: false,
      children: [
        '/zh/node/base'
      ]
    },
    {
      title: '设计模式',
      collapsable: false,
      children: [
        '/zh/design/designPatterns'
      ]
    },
    {
      title: 'Es6相关',
      collapsable: false,
      children: [
        '/zh/es6/promise'
      ]
    },
    {
      title: 'git相关',
      collapsable: false,
      children: [
        '/zh/git/git'
      ]
    },
    {
      title: 'js相关',
      collapsable: false,
      children: [
        '/zh/javascript/base',
        '/zh/javascript/javascript'
      ]
    },
    {
      title: 'vue相关',
      collapsable: false,
      children: [
        '/zh/vue/vue',
        '/zh/vue/vuex',
        '/zh/vue/vue-cli',
        '/zh/vue/vuetest'
      ]
    },
    {
      title: 'http相关',
      collapsable: false,
      children: [
        '/zh/http/http流程梳理',
        '/zh/http/请求响应报文',
        '/zh/http/持久化存储与HTTP缓存',
        '/zh/http/http持久化',
        '/zh/http/http管线化',
        '/zh/http/https'
      ]
    },
    {
      title: 'nginx相关',
      collapsable: false,
      children: [
        '/zh/nginx/base',
      ]
    },
    {
      title: 'webpack相关',
      collapsable: false,
      children: [
        '/zh/webpack/base',
      ]
    },
    {
      title: '正则相关',
      collapsable: false,
      children: [
        '/zh/regExp/base',
      ]
    },
    {
      title: 'babel相关',
      collapsable: false,
      children: [
        '/zh/babel/base',
      ]
    },
    {
      title: 'vuePress搭建博客记录',
      collapsable: false,
      children: [
        '/zh/vuepress/博客搭建',
      ]
    },
    {
      title: 'test-玩玩',
      collapsable: false,
      children: [
        '/zh/test'
      ]
    },
    ], // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
    displayAllHeaders: true // 默认值：false
  },
  plugins: [['@vuepress/back-to-top', true]]
};