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

## 完整引入

```ts
import { createApp } from 'vue'
import TuneUI from 'tune-ui'
import 'tune-ui/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(TuneUI)
app.mount('#app')
```

## 按需引入

Tune UI 支持按需引入，你可以只引入你需要的组件，以减小打包体积。

### 自动导入（推荐）

使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 和 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 插件可以实现自动导入：

```bash
# npm
npm install -D unplugin-vue-components unplugin-auto-import

# yarn
yarn add -D unplugin-vue-components unplugin-auto-import

# pnpm
pnpm add -D unplugin-vue-components unplugin-auto-import
```

在 `vite.config.ts` 中配置：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TuneUIResolver } from 'tune-ui/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [TuneUIResolver()],
    }),
    Components({
      resolvers: [TuneUIResolver()],
    }),
  ],
})
```

这样你就可以直接在模板中使用 Tune UI 组件，而无需手动导入它们：

```vue
<template>
  <t-button type="primary">按钮</t-button>
  <t-input v-model="input" placeholder="请输入内容"></t-input>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
```

### 手动按需引入

你也可以手动按需引入组件：

```vue
<template>
  <t-button type="primary">按钮</t-button>
</template>

<script setup>
import { TButton } from 'tune-ui'
</script>
```

## 全局配置

Tune UI 提供了全局配置选项，可以在引入时进行配置：

```ts
import { createApp } from 'vue'
import TuneUI from 'tune-ui'
import App from './App.vue'

const app = createApp(App)

app.use(TuneUI, {
  // 全局配置选项
  size: 'medium', // 全局组件大小: small/medium/large
  zIndex: 2000, // 全局初始 z-index
  locale: 'zh-CN', // 语言
})

app.mount('#app')
```

## 浏览器兼容性

Tune UI 的 CSS 变量使用功能需要现代浏览器支持。如果你需要支持低版本浏览器，请使用相应的 polyfill。

## CDN 引入

你也可以通过 CDN 直接在 HTML 中引入 Tune UI：

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/tune-ui/dist/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/tune-ui"></script>
```

使用示例：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Tune UI 示例</title>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="https://unpkg.com/tune-ui/dist/index.css">
</head>
<body>
  <div id="app">
    <t-button type="primary">按钮</t-button>
  </div>
  
  <!-- 引入Vue -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <!-- 引入Tune UI组件库 -->
  <script src="https://unpkg.com/tune-ui"></script>
  <script>
    const app = Vue.createApp({
      data() {
        return {
          message: 'Hello Tune UI!'
        }
      }
    })
    app.use(TuneUI)
    app.mount('#app')
  </script>
</body>
</html> 