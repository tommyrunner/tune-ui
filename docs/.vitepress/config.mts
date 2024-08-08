import { DefaultTheme, defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'TUI',
  description: 'Vue3 UI',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/docs/getting-started' },
      { text: '组件', link: '/components/overview' }
    ],
    sidebar: {
      '/docs/': sidebarDocs(),
      '/components/': sidebarComponents()
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present TUI'
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/tommyrunner/t-ui' }]
  }
})

function sidebarDocs(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '',
      collapsed: false,
      items: [
        { text: '快速上手', link: '/docs/getting-started' },
        { text: '全局配置', link: '/docs/global-config' },
        { text: '常见问题', link: '/docs/faq' },
        { text: '支持我们', link: '/docs/sponsor' },
        { text: '更新日志', link: '/docs/changelog' }
      ]
    }
  ]
}

function sidebarComponents(): DefaultTheme.SidebarItem[] {
  return [
    { text: '组件总览', link: '/components/overview' },
    {
      text: '基础控件',
      collapsed: false,
      items: [
        { text: 'Layout', link: '/components/basic/layout' },
        { text: 'Color', link: '/components/basic/color' },
        { text: 'Icon', link: '/components/basic/icon' },
        { text: 'Loading', link: '/components/basic/loading' },
      ]
    },
    {
      text: '表单控件',
      collapsed: false,
      items: [
        { text: 'Form', link: '/components/form/form' },
        { text: 'Input', link: '/components/form/input' },
        { text: 'Textarea', link: '/components/form/textarea' },
        { text: 'Checkbox', link: '/components/form/checkbox' },
        { text: 'Radio', link: '/components/form/radio' },
        { text: 'Select', link: '/components/form/select' },
        { text: 'Switch', link: '/components/form/switch' },
      ]
    },
    {
      text: '数据控件',
      collapsed: false,
      items: [
        { text: 'Table', link: '/components/data/table' },
        { text: 'Pagination', link: '/components/data/pagination' },
        { text: 'Date', link: '/components/data/date' },
        { text: 'Tree', link: '/components/data/tree' },
        { text: 'Progress', link: '/components/data/progress' },
      ]
    },
    {
      text: '交互控件',
      collapsed: false,
      items: [
        { text: 'Tab', link: '/components/interaction/tab' },
        { text: 'Message', link: '/components/interaction/message' },
        { text: 'Popover', link: '/components/interaction/popover' },
        { text: 'Confirm', link: '/components/interaction/confirm' },
        { text: 'Dialog', link: '/components/interaction/dialog' },
        { text: 'Backdrop', link: '/components/interaction/backdrop' },
      ]
    },
    {
      text: '媒体控件',
      collapsed: false,
      items: [
        { text: 'Image', link: '/components/media/image' },
        { text: 'Video', link: '/components/media/video' },
        { text: 'Audio', link: '/components/media/audio' },
      ]
    }
  ]
}
