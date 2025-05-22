# 安装使用

## 环境要求

- Node.js >= 16
- Vue >= 3.3

## 安装

### 使用包管理器

```bash
# npm
npm install tune-ui

# yarn
yarn add tune-ui

# pnpm
pnpm add tune-ui
```

### 按需引入

你也可以手动按需引入组件：

```vue
<template>
  <t-button type="primary">按钮</t-button>
</template>

<script setup>
import { TButton } from "tune-ui";
</script>
```

## 全局配置

Tune UI 提供了全局配置选项，可以在引入时进行配置：

```ts
import { createApp } from "vue";
import { install } from "tune-ui";
import App from "./App.vue";

const app = createApp(App);

app.use(install);

app.mount("#app");
```
