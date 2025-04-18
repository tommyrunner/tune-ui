import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import demoBlockPlugin from './plugins/demoBlock'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tune UI",
  description: "现代化Vue3 UI组件库，提高开发效率",
  head: [
    ['link', { rel: 'icon', href: 'https://i.postimg.cc/PxMBWVPz/logo.png' }]
  ],
  markdown: {
    // 代码块行数显示
    lineNumbers: true,
    // 使用自定义容器
    config: (md) => {
      demoBlockPlugin(md)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'https://i.postimg.cc/PxMBWVPz/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
      {
        text: '相关链接',
        items: [
          { text: 'Github', link: 'https://github.com/yourusername/tune-ui' },
          { text: 'NPM', link: 'https://www.npmjs.com/package/tune-ui' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '基础',
          items: [
            { text: '快速开始', link: '/guide/' },
            { text: '安装使用', link: '/guide/installation' },
            { text: '组件开发指南', link: '/guide/component-development' }
          ]
        },
        {
          text: '进阶',
          items: [
            { text: '国际化', link: '/guide/i18n/' },
            { text: '主题定制', link: '/guide/theming/' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: '按钮 Button', link: '/components/button' },
            { text: '图标 Icon', link: '/components/icon' }
          ]
        },
        {
          text: '表单组件',
          items: [
            { text: '输入框 Input', link: '/components/input' },
            { text: '复选框 Checkbox', link: '/components/checkbox' },
            { text: '单选框 Radio', link: '/components/radio' },
            { text: '选择器 Select', link: '/components/select' }
          ]
        },
        {
          text: '数据展示',
          items: [
            { text: '表格 Table', link: '/components/table' },
            { text: '标签页 Tabs', link: '/components/tabs' }
          ]
        },
        {
          text: '反馈组件',
          items: [
            { text: '对话框 Dialog', link: '/components/dialog' },
            { text: '消息 Message', link: '/components/message' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/tune-ui' }
    ],

    footer: {
      message: '基于MIT许可发布',
      copyright: 'Copyright © 2023-present Tune UI Team'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
