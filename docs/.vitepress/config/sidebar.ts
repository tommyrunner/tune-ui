import type { DefaultTheme } from "vitepress";

export default {
  zh: {
    "/guide/": [
      {
        text: "基础",
        items: [
          { text: "快速开始", link: "/guide/" },
          { text: "安装使用", link: "/guide/installation" }
        ]
      },
      {
        text: "进阶",
        items: [
          { text: "国际化", link: "/guide/i18n/" },
          { text: "主题定制", link: "/guide/theming/" }
        ]
      }
    ],
    "/components/": [
      {
        text: "基础组件",
        items: [
          { text: "按钮 Button", link: "/components/button" },
          { text: "图标 Icon", link: "/components/icon" },
          { text: "标签 Tag", link: "/components/tag" }
        ]
      },
      {
        text: "表单组件",
        items: [
          { text: "输入框 Input", link: "/components/input" },
          { text: "数字输入框 InputNumber", link: "/components/input-number" },
          { text: "文本域 Textarea", link: "/components/textarea" },
          { text: "单选框 Radio", link: "/components/radio" },
          { text: "复选框 Checkbox", link: "/components/checkbox" },
          { text: "开关 Switch", link: "/components/switch" },
          { text: "选择器 Select", link: "/components/select" },
          { text: "评分 Rate", link: "/components/rate" },
          { text: "滑块 Slider", link: "/components/slider" },
          { text: "日期选择器 DatePicker", link: "/components/date-picker" },
          { text: "多日期选择器 DatePickerMultiple", link: "/components/date-picker-multiple" },
          { text: "上传 Upload", link: "/components/upload" },
          { text: "颜色选择器 ColorPicker", link: "/components/color-picker" }
        ]
      },
      {
        text: "数据展示",
        items: [
          { text: "徽章 Badge", link: "/components/badge" },
          { text: "卡片 Card", link: "/components/card" },
          { text: "轮播图 Carousel", link: "/components/carousel" },
          { text: "列表视图 ListView", link: "/components/list-view" },
          { text: "表格 Table", link: "/components/table" },
          { text: "进度条 Progress", link: "/components/progress" },
          { text: "图片 Image", link: "/components/image" },
          { text: "日历 Calendar", link: "/components/calendar" },
          { text: "加载 Loading", link: "/components/loading" },
          { text: "滚动条 Scrollbar", link: "/components/scrollbar" }
        ]
      },
      {
        text: "导航组件",
        items: [
          { text: "面包屑 Breadcrumb", link: "/components/breadcrumb" },
          { text: "回到顶部 BackTop", link: "/components/back-top" },
          { text: "标签页 Tabs", link: "/components/tabs" },
          { text: "树形控件 Tree", link: "/components/tree" },
          { text: "折叠面板 Collapse", link: "/components/collapse" }
        ]
      },
      {
        text: "反馈组件",
        items: [
          { text: "对话框 Dialog", link: "/components/dialog" },
          { text: "抽屉 Drawer", link: "/components/drawer" },
          { text: "气泡确认框 PopConfirm", link: "/components/pop-confirm" },
          { text: "消息提示 Message", link: "/components/message" },
          { text: "气泡卡片 Popover", link: "/components/popover" }
        ]
      },
      {
        text: "布局组件",
        items: [{ text: "弹性布局 Flex", link: "/components/flex" }]
      }
    ]
  },
  en: {
    "/en/guide/": [
      {
        text: "Basics",
        items: [
          { text: "Getting Started", link: "/en/guide/" },
          { text: "Installation", link: "/en/guide/installation" }
        ]
      },
      {
        text: "Advanced",
        items: [
          { text: "Internationalization", link: "/en/guide/i18n/" },
          { text: "Theming", link: "/en/guide/theming/" }
        ]
      }
    ],
    "/en/components/": [
      {
        text: "Basic Components",
        items: [
          { text: "Button", link: "/en/components/button" },
          { text: "Icon", link: "/en/components/icon" },
          { text: "Tag", link: "/en/components/tag" }
        ]
      },
      {
        text: "Form Components",
        items: [
          { text: "Input", link: "/en/components/input" },
          { text: "InputNumber", link: "/en/components/input-number" },
          { text: "Textarea", link: "/en/components/textarea" },
          { text: "Radio", link: "/en/components/radio" },
          { text: "Checkbox", link: "/en/components/checkbox" },
          { text: "Switch", link: "/en/components/switch" },
          { text: "Select", link: "/en/components/select" },
          { text: "Rate", link: "/en/components/rate" },
          { text: "Slider", link: "/en/components/slider" },
          { text: "DatePicker", link: "/en/components/date-picker" },
          { text: "DatePickerMultiple", link: "/en/components/date-picker-multiple" },
          { text: "Upload", link: "/en/components/upload" },
          { text: "ColorPicker", link: "/en/components/color-picker" }
        ]
      },
      {
        text: "Data Display",
        items: [
          { text: "Badge", link: "/en/components/badge" },
          { text: "Card", link: "/en/components/card" },
          { text: "Carousel", link: "/en/components/carousel" },
          { text: "ListView", link: "/en/components/list-view" },
          { text: "Table", link: "/en/components/table" },
          { text: "Progress", link: "/en/components/progress" },
          { text: "Image", link: "/en/components/image" },
          { text: "Calendar", link: "/en/components/calendar" },
          { text: "Loading", link: "/en/components/loading" },
          { text: "Scrollbar", link: "/en/components/scrollbar" }
        ]
      },
      {
        text: "Navigation",
        items: [
          { text: "Breadcrumb", link: "/en/components/breadcrumb" },
          { text: "BackTop", link: "/en/components/back-top" },
          { text: "Tabs", link: "/en/components/tabs" },
          { text: "Tree", link: "/en/components/tree" },
          { text: "Collapse", link: "/en/components/collapse" }
        ]
      },
      {
        text: "Feedback",
        items: [
          { text: "Dialog", link: "/en/components/dialog" },
          { text: "Drawer", link: "/en/components/drawer" },
          { text: "PopConfirm", link: "/en/components/pop-confirm" },
          { text: "Message", link: "/en/components/message" },
          { text: "Popover", link: "/en/components/popover" }
        ]
      },
      {
        text: "Layout",
        items: [{ text: "Flex", link: "/en/components/flex" }]
      }
    ]
  }
} as { zh: DefaultTheme.Sidebar; en: DefaultTheme.Sidebar };
