# 安装使用

## 环境要求

- Node.js >= 16
- Vue >= 3.3

## 安装

```bash
# npm
npm install tune-ui

# yarn
yarn add tune-ui

# pnpm
pnpm add tune-ui
```

## 引入方式

Tune UI 提供两种引入方式：全局引入和局部引入。

### 全局引入

全局引入会注册所有组件，适合快速开发或全面使用组件库的场景。

```js
import { createApp } from "vue";
import App from "./App.vue";
import { install } from "tune-ui";
import "tune-ui/dist/lib/style.css";

const app = createApp(App);
app.use(install);
app.mount("#app");
```

### 局部引入

局部引入只导入需要的组件，可以有效减小打包体积，适合对项目体积有严格要求的场景。

```vue
<template>
  <t-button type="primary" prefix-icon="github">Click</t-button>
  <t-input v-model="value" placeholder="Please input" />
</template>

<script setup>
import { ref } from "vue";
import { TButton, TInput } from "tune-ui";
import "tune-ui/dist/lib/style.css";

const value = ref("");
</script>
```

> 注意：使用局部引入时，仍需引入样式文件 `tune-ui/dist/lib/style.css`。

## 浏览器兼容性

Tune UI 的 CSS 变量使用功能需要现代浏览器支持。如果你需要支持低版本浏览器，请使用相应的 polyfill。
