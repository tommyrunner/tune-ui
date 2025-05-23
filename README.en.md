# TUI (Tune UI)

<p align="center">
  <img src="https://i.postimg.cc/PxMBWVPz/logo.png" width="200" height="200" alt="TUI logo">
</p>

<p align="center">
  Modern UI Component Library for Vue 3
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
  English | <a href="./README.md">中文</a>
</p>

## 🔥 Features

- 💪 Developed with Vue 3 Composition API
- 🔥 Written in TypeScript with complete type definitions
- 📦 High-quality components ready to use
- 🌈 Support for theme customization, easily adapting to different design styles
- 👓 Focus on balancing developer experience and user experience
- ⚡ Support for full import and on-demand import, optimizing application size

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install tune-ui

# Using yarn
yarn add tune-ui

# Using pnpm
pnpm add tune-ui
```

### Usage

#### Full Import

If you want to register all components at once, you can use:

```js
import { createApp } from "vue";
import App from "./App.vue";
import { install } from "tune-ui";
import "tune-ui/dist/lib/style.css";

const app = createApp(App);
app.use(install);
app.mount("#app");
```

#### On-Demand Import

If you only need to use certain components, you can import them on demand to reduce application size:

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

## 🎨 Theme Customization and Global Configuration

TUI provides rich theme customization and global configuration capabilities to help you quickly build interfaces that meet your design requirements.

### Theme Color Configuration

```js
import { useOptions } from "tune-ui";

// Get configuration API
const { updateThemeColor, configOptions } = useOptions();

// Update a single theme color
updateThemeColor({ primary: "#3b82f6" });

// Update multiple theme colors
updateThemeColor({
  primary: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#6b7280",
  dark: "#1f2937",
  light: "#f3f4f6"
});

// Get current configuration
console.log(configOptions.value.theme);
```

### Element Size Configuration

```js
import { useOptions } from "tune-ui";

const { updateDefaultSize } = useOptions();

// Set global default size (options: "small", "default", "large")
updateDefaultSize("default");
```

### Internationalization Configuration

```js
import { useOptions, LOCALE_TYPE } from "tune-ui";

const { setLocale } = useOptions();

// Set language to Chinese
setLocale(LOCALE_TYPE.ZH_CN);

// Set language to English
setLocale(LOCALE_TYPE.EN_US);
```

### Reset Configuration

```js
import { useOptions } from "tune-ui";

const { initOptions } = useOptions();

// Reset all configurations to default values
initOptions();
```

### CSS Variables Method

You can also directly override default styles using CSS variables:

```css
:root {
  /* Theme colors */
  --t-color-primary: #3b82f6;
  --t-color-success: #10b981;
  --t-color-warning: #f59e0b;
  --t-color-danger: #ef4444;
  --t-color-info: #6b7280;

  /* Text colors */
  --t-text-color: #374151;
  --t-text-color-light: #6b7280;

  /* Border styles */
  --t-border-radius: 4px;
  --t-border-color: #e5e7eb;

  /* More variables... */
}
```

## 🧩 Component Overview

### Basic Components

- `TButton` - Button
- `TIcon` - Icon
- `TTag` - Tag
- `TDivider` - Divider

### Form Components

- `TInput` - Input
- `TInputNumber` - Number Input
- `TTextarea` - Textarea
- `TRadio` - Radio
- `TCheckbox` - Checkbox
- `TSwitch` - Switch
- `TSelect` - Select
- `TRate` - Rate
- `TSlider` - Slider
- `TDatePicker` - DatePicker
- `TDatePickerMultiple` - Multiple DatePicker
- `TUpload` - Upload
- `TColorPicker` - Color Picker

### Data Display

- `TBadge` - Badge
- `TCard` - Card
- `TCarousel` - Carousel
- `TListView` - List View
- `TTable` - Table
- `TProgress` - Progress
- `TImage` - Image
- `TCalendar` - Calendar
- `TLoading` - Loading
- `TScrollbar` - Scrollbar

### Navigation Components

- `TBreadcrumb` - Breadcrumb
- `TBackTop` - Back to Top
- `TTabs` - Tabs
- `TTree` - Tree
- `TCollapse` - Collapse

### Feedback Components

- `TDialog` - Dialog
- `TDrawer` - Drawer
- `TPopConfirm` - PopConfirm
- `TMessage` - Message
- `TPopover` - Popover

### Layout Components

- `TFlex` - Flex

## 🤝 Contribution Guide

We welcome your contributions! You can participate in the project through:

1. Submitting [Issues](https://github.com/tommyrunner/tune-ui/issues) to report problems or suggestions
2. Submitting [Pull Requests](https://github.com/tommyrunner/tune-ui/pulls) to improve code

Before submitting, please make sure to read our [Contribution Guide](https://github.com/tommyrunner/tune-ui/blob/main/CONTRIBUTING.md).

## 📄 License

[MIT](https://github.com/tommyrunner/tune-ui/blob/main/LICENSE)

Copyright (c) 2024-present, TommyRunner 