var ip = require('ip');

module.exports = {
  title: 'xiumei\'s blog',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  host: ip.address(),
  port: 9090,
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    // navbar: false,
    nav: [ // 导航栏配置
      { text: '前端基础', link: '/accumulate/' },
      { text: '算法题库', link: '/algorithm/' }
      // {
      //   text: '微博', items: [
      //     { text: 'Chinese', link: 'https://baidu.com' },
      //     { text: 'Japanese', link: 'https://baidu.comcom' }
      //   ]
      // }
      // {
      //   text: 'Languages', items: [
      //     { text: 'Group1', items: [{ text: 'Chinese1', link: 'https://baidu.com1' }, { text: 'Chinese2', link: 'https://baidu.com2' }] },
      //     { text: 'Group1', items: [{ text: 'Japanese1', link: 'https://baidu.com11' }, { text: 'Japanese2', link: 'https://baidu.com22' }] }
      //   ]
      // }
    ],
    sidebar: [
      // {
      //   title: '开发指南',
      //   collapsable: false, //是否展开
      // },
      ['/zh/link/link', '资源链接'],
      ['/zh/npm/npm', 'npm'],
      ['/zh/collect/question', '问题收集'],
      // ['/zh/component/base', '🌟组件'],
      ['/zh/common/code', '常用代码'],
      ['/zh/design/designPatterns', '设计模式'],
      ['/zh/vue/vue', 'vue'],
      ['/zh/vue/vuetest', 'vuetest'],
      ['/zh/vue/vuex', 'vuex'],
      // {
      //   title: '组件',
      //   collapsable: false
      // },
      ['/zh/test', 'test']
    ], // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
    displayAllHeaders: true // 默认值：false
  },
  plugins: [['@vuepress/back-to-top', true]]
};