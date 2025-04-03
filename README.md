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
  <a href="https://www.npmjs.com/package/tune-ui">
    <img src="https://img.shields.io/npm/v/tune-ui.svg" alt="npm">
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
- ⚡ 支持全量引入和按需引入，优化应用体积

## 🚀 快速开始

### 安装

```bash
# 使用 npm
npm install tune-ui

# 使用 yarn
yarn add tune-ui

# 使用 pnpm
pnpm add tune-ui
```

### 使用方式

#### 全量引入

如果你希望一次性注册所有组件，可以使用以下方式：

```js
import { createApp } from "vue";
import App from "./App.vue";
import { install } from "tune-ui";
import "tune-ui/dist/styles/index.css";

const app = createApp(App);
app.use(install);
app.mount("#app");
```

#### 按需引入

如果你只需要使用部分组件，可以按需引入以减小应用体积：

```vue
<template>
  <t-button type="primary" prefix-icon="github">Click</t-button>
  <t-input v-model="value1" placeholder="Please input" />
  <t-select v-model="value2" placeholder="Please select" :options="options" />
</template>

<script lang="ts" setup>
import { TButton, TInput, TSelect } from "tune-ui";
import { ref } from "vue";
const value1 = ref("");
const value2 = ref("");
const options = ref([
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" }
]);
</script>
```

## 🎨 主题定制

TUI 提供了灵活的主题定制能力，支持两种配置方式：

### JavaScript 方式

```js
import { useOptions } from "tune-ui";

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

### 基础组件

- `TButton` - 按钮
- `TIcon` - 图标
- `TDivider` - 分割线

### 表单组件

- `TInput` - 输入框
- `TInputNumber` - 数字输入框
- `TTextarea` - 文本域
- `TRadio` / `TRadioGroup` - 单选框
- `TCheckbox` / `TCheckboxGroup` - 复选框
- `TSwitch` - 开关
- `TSelect` - 选择器
- `TDatePicker` - 日期选择器
- `TDatePickerMultiple` - 多日期选择器
- `TSlider` - 滑块
- `TUpload` - 上传
- `TForm` / `TFormItem` - 表单

### 数据展示组件

- `TBadge` - 徽章
- `TCard` - 卡片
- `TCarousel` / `TCarouselGroup` - 轮播图
- `TCollapse` / `TCollapseGroup` - 折叠面板
- `TListView` / `TListViewItem` - 列表视图
- `TScrollbar` - 滚动条
- `TTable` / `TTableRow` - 表格
- `TProgress` - 进度条
- `TImage` - 图片
- `TTree` - 树形控件

### 反馈组件

- `Message` - 消息提示
- `Notification` - 通知提醒
- `TDialog` - 对话框
- `TDrawer` - 抽屉
- `TPopover` - 气泡卡片
- `TPopConfirm` - 气泡确认框

### 导航组件

- `TBreadcrumb` - 面包屑
- `TBackTop` - 回到顶部
- `TTabs` / `TTabsGroup` - 标签页
- `TMenu` - 菜单

### 布局组件

- `TFlex` / `TFlexGroup` - 弹性布局
- `TWatermark` - 水印

## 🤝 贡献指南

我们非常欢迎您的贡献，您可以通过以下方式参与项目：

1. 提交 [Issue](https://github.com/tommyrunner/tui/issues) 报告问题或建议
2. 提交 [Pull Request](https://github.com/tommyrunner/tui/pulls) 改进代码

在提交之前，请确保阅读我们的[贡献指南](https://github.com/tommyrunner/tui/blob/main/CONTRIBUTING.md)。

## 📄 许可证

[MIT](https://github.com/tommyrunner/tui/blob/main/LICENSE)

Copyright (c) 2024-present, TommyRunner
