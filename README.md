# TUI (Tune UI)

<p align="center">
  <img src="https://i.postimg.cc/PxMBWVPz/logo.png" width="200" height="200" alt="TUI logo">
</p>

<p align="center">
  基于 Vue 3 的现代化 UI 组件库
</p>

<p align="center">
  <a href="https://github.com/tommyrunner/tui/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/tommyrunner/tui.svg" alt="license">
  </a>
  <a href="https://www.npmjs.com/package/tui">
    <img src="https://img.shields.io/npm/v/tui.svg" alt="npm">
  </a>
  <a href="https://github.com/tommyrunner/tui/stargazers">
    <img src="https://img.shields.io/github/stars/tommyrunner/tui.svg" alt="stars">
  </a>
</p>

## 🔥 特性

- 💪 基于 Vue 3 Composition API 开发
- 🔥 使用 TypeScript 编写，提供完整的类型定义
- 📦 开箱即用的高质量组件
- 🌈 支持主题定制，轻松适配不同设计风格
- 👓 专注于开发体验与用户体验的平衡

## 🚀 快速开始

### 安装

```bash
# 使用 npm
npm install tui

# 使用 yarn
yarn add tui

# 使用 pnpm
pnpm add tui
```

### 使用

```js
import { createApp } from "vue";
import App from "./App.vue";
import TUI from "tui";
import "tui/dist/styles/index.css";

const app = createApp(App);
app.use(TUI);
app.mount("#app");
```

## 📚 组件

### 基础组件

- Layout 布局
- Color 颜色
- Icon 图标
- Loading 加载

### 表单组件

- Form 表单
- Input 输入框
- Textarea 文本域
- Checkbox 复选框
- Radio 单选框
- Select 选择器
- Switch 开关

### 数据组件

- Table 表格
- Pagination 分页
- Date 日期
- Tree 树形控件
- Progress 进度条

### 交互组件

- Tab 标签页
- Message 消息提示
- Popover 弹出框
- Confirm 确认框
- Dialog 对话框
- Backdrop 背景遮罩

### 媒体组件

- Image 图片
- Video 视频
- Audio 音频

## 🎨 主题定制

TUI 提供了灵活的主题定制能力，支持两种配置方式：

### JavaScript 方式

```js
import { useOptions } from "tui";

useOptions({
  themeColor: "#409eff",
  borderRadius: "4px"
  // 更多配置...
});
```

### CSS 变量方式

```css
:root {
  --t-color-primary: #409eff;
  --t-border-radius: 4px;
  /* 更多变量... */
}
```

## 🧩 设计规范

### 组件命名规范

- 组件导出名称: `Txx`
- 组件 class 名称: `t-xx-xx`
- 组件嵌套样式类: `_xx`

## 🤝 贡献指南

我们非常欢迎您的贡献，您可以通过以下方式参与项目：

1. 提交 [Issue](https://github.com/tommyrunner/tui/issues) 报告问题或建议
2. 提交 [Pull Request](https://github.com/tommyrunner/tui/pulls) 改进代码

在提交之前，请确保阅读我们的[贡献指南](https://github.com/tommyrunner/tui/blob/main/CONTRIBUTING.md)。

## 📄 许可证

[MIT](https://github.com/tommyrunner/tui/blob/main/LICENSE)

Copyright (c) 2024-present, TommyRunner
