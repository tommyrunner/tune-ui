# TUI (Tune UI)

<p align="center">
  <img src="https://i.postimg.cc/PxMBWVPz/logo.png" width="200" height="200" alt="TUI logo">
</p>

<p align="center">
  基于 Vue 3 的现代化 UI 组件库
</p>

<p align="center">
  <a href="https://github.com/tommyrunner/tune-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/tommyrunner/tune-ui.svg" alt="license">
  </a>
  <a href="https://www.npmjs.com/package/tune-ui">
    <img src="https://img.shields.io/npm/v/tune-ui.svg" alt="npm">
  </a>
  <a href="https://github.com/tommyrunner/tune-ui/stargazers">
    <img src="https://img.shields.io/github/stars/tommyrunner/tune-ui.svg" alt="stars">
  </a>
</p>

<p align="center">
  <a href="./README.en.md">English</a> | 中文
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
import "tune-ui/dist/lib/style.css";

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

## 🎨 主题定制与全局配置

TUI 提供了丰富的主题定制和全局配置能力，帮助你快速构建符合设计需求的界面。

### 主题颜色配置

```js
import { useOptions } from "tune-ui";

// 获取配置API
const { updateThemeColor, configOptions } = useOptions();

// 更新单个主题颜色
updateThemeColor({ primary: "#3b82f6" });

// 更新多个主题颜色
updateThemeColor({
  primary: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#6b7280",
  dark: "#1f2937",
  light: "#f3f4f6"
});

// 获取当前配置
console.log(configOptions.value.theme);
```

### 元素尺寸配置

```js
import { useOptions } from "tune-ui";

const { updateDefaultSize } = useOptions();

// 设置全局默认尺寸 (可选值: "small", "default", "large")
updateDefaultSize("default");
```

### 国际化配置

```js
import { useOptions, LOCALE_TYPE } from "tune-ui";

const { setLocale } = useOptions();

// 设置语言为中文
setLocale(LOCALE_TYPE.ZH_CN);

// 设置语言为英文
setLocale(LOCALE_TYPE.EN_US);
```

### 重置配置

```js
import { useOptions } from "tune-ui";

const { initOptions } = useOptions();

// 重置所有配置到默认值
initOptions();
```

### CSS 变量方式

你也可以通过 CSS 变量直接覆盖默认样式：

```css
:root {
  /* 主题颜色 */
  --t-color-primary: #3b82f6;
  --t-color-success: #10b981;
  --t-color-warning: #f59e0b;
  --t-color-danger: #ef4444;
  --t-color-info: #6b7280;

  /* 文字颜色 */
  --t-text-color: #374151;
  --t-text-color-light: #6b7280;

  /* 边框样式 */
  --t-border-radius: 4px;
  --t-border-color: #e5e7eb;

  /* 更多变量... */
}
```

## 🧩 组件总览

### 基础组件

- `TButton` - 按钮
- `TIcon` - 图标
- `TTag` - 标签
- `TDivider` - 分割线

### 表单组件

- `TInput` - 输入框
- `TInputNumber` - 数字输入框
- `TTextarea` - 文本域
- `TRadio` - 单选框
- `TCheckbox` - 复选框
- `TSwitch` - 开关
- `TSelect` - 选择器
- `TRate` - 评分
- `TSlider` - 滑块
- `TDatePicker` - 日期选择器
- `TDatePickerMultiple` - 多日期选择器
- `TUpload` - 上传
- `TColorPicker` - 颜色选择器

### 数据展示

- `TBadge` - 徽章
- `TCard` - 卡片
- `TCarousel` - 轮播图
- `TListView` - 列表视图
- `TTable` - 表格
- `TProgress` - 进度条
- `TImage` - 图片
- `TCalendar` - 日历
- `TLoading` - 加载
- `TScrollbar` - 滚动条

### 导航组件

- `TBreadcrumb` - 面包屑
- `TBackTop` - 回到顶部
- `TTabs` - 标签页
- `TTree` - 树形控件
- `TCollapse` - 折叠面板

### 反馈组件

- `TDialog` - 对话框
- `TDrawer` - 抽屉
- `TPopConfirm` - 气泡确认框
- `TMessage` - 消息提示
- `TPopover` - 气泡卡片

### 布局组件

- `TFlex` - 弹性布局

## 🤝 贡献指南

我们非常欢迎您的贡献，您可以通过以下方式参与项目：

1. 提交 [Issue](https://github.com/tommyrunner/tune-ui/issues) 报告问题或建议
2. 提交 [Pull Request](https://github.com/tommyrunner/tune-ui/pulls) 改进代码

在提交之前，请确保阅读我们的[贡献指南](https://github.com/tommyrunner/tune-ui/blob/main/CONTRIBUTING.md)。

## 📄 许可证

[MIT](https://github.com/tommyrunner/tune-ui/blob/main/LICENSE)

Copyright (c) 2024-present, TommyRunner
