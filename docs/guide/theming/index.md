# 主题定制

Tune UI 默认提供了一套主题，同时也支持多种方式自定义主题风格，满足个性化产品需求。

## 使用预设主题

### 默认主题

Tune UI 默认使用浅色主题，无需额外配置即可使用。

### 内置暗色主题

Tune UI 内置了暗色主题（Dark Mode），你可以通过以下方式启用：

1. 通过 CSS 类名切换：

```html
<html class="dark">
  <!-- 应用会以暗色主题展示 -->
</html>
```

2. 通过 JavaScript 动态切换：

```js
// 开启暗色模式
document.documentElement.classList.add('dark')

// 关闭暗色模式
document.documentElement.classList.remove('dark')

// 判断当前是否为暗色模式
const isDark = document.documentElement.classList.contains('dark')
```

3. 跟随系统主题：

```css
@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}
```

```js
// 检测系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (e.matches) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

// 初始化
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark')
}
```

## 自定义主题

### CSS 变量

Tune UI 的主题系统基于 CSS 变量实现，你可以通过覆盖 CSS 变量来自定义主题。

#### 基础变量

```css
:root {
  /* 主色调 */
  --tune-primary-color: #626aef;
  --tune-success-color: #67c23a;
  --tune-warning-color: #e6a23c;
  --tune-danger-color: #f56c6c;
  --tune-info-color: #909399;
  
  /* 文字颜色 */
  --tune-text-color-primary: #303133;
  --tune-text-color-regular: #606266;
  --tune-text-color-secondary: #909399;
  --tune-text-color-placeholder: #c0c4cc;
  
  /* 边框颜色 */
  --tune-border-color: #dcdfe6;
  --tune-border-color-light: #e4e7ed;
  --tune-border-color-lighter: #ebeef5;
  --tune-border-color-extra-light: #f2f6fc;
  
  /* 背景颜色 */
  --tune-bg-color: #ffffff;
  --tune-bg-color-page: #f2f3f5;
  --tune-bg-color-overlay: #ffffff;
  
  /* 字体大小 */
  --tune-font-size-extra-large: 20px;
  --tune-font-size-large: 18px;
  --tune-font-size-medium: 16px;
  --tune-font-size-base: 14px;
  --tune-font-size-small: 13px;
  --tune-font-size-extra-small: 12px;
  
  /* 圆角 */
  --tune-border-radius-base: 4px;
  --tune-border-radius-small: 2px;
  --tune-border-radius-round: 20px;
  --tune-border-radius-circle: 100%;
}
```

#### 覆盖变量

你可以在你的样式文件中覆盖这些变量，例如创建一个 `theme.css` 文件：

```css
:root {
  --tune-primary-color: #6a1cf7;
  --tune-success-color: #28b178;
  --tune-danger-color: #eb2f4b;
}
```

然后在入口文件中引入：

```js
import 'tune-ui/dist/index.css'
// 引入自定义主题文件，必须在组件库样式之后引入
import './theme.css'
```

#### 暗色主题变量

```css
.dark {
  --tune-bg-color: #141414;
  --tune-bg-color-page: #0a0a0a;
  --tune-bg-color-overlay: #1d1e1f;
  
  --tune-text-color-primary: #ffffff;
  --tune-text-color-regular: #e5eaf3;
  --tune-text-color-secondary: #a3a6ad;
  --tune-text-color-placeholder: #8d9095;
  
  --tune-border-color: #434343;
  --tune-border-color-light: #363637;
  --tune-border-color-lighter: #262727;
  --tune-border-color-extra-light: #1d1d1d;
}
```

### SCSS 变量

如果你使用 SCSS 预处理器，还可以利用 Tune UI 提供的 SCSS 变量进行更深层次的主题定制。

首先，你需要创建一个 SCSS 文件，例如 `theme.scss`：

```scss
// 覆盖 Tune UI 的主题变量
$tune-primary-color: #09b3af;
$tune-danger-color: #dc3030;

// 引入 Tune UI 的 SCSS 文件
@import 'tune-ui/styles/index.scss';
```

然后在入口文件中引入：

```js
// 不再需要引入原组件库的 CSS 文件
// import 'tune-ui/dist/index.css'
import './theme.scss'
```

### 使用主题生成工具

Tune UI 提供了一个在线主题生成工具，你可以直观地调整主题颜色，并下载生成的主题文件。

[前往主题编辑器](https://tune-ui.example.com/theme-editor)

## 动态主题切换

### 在运行时切换主题

```vue
<template>
  <div>
    <t-button @click="toggleTheme">切换主题</t-button>
    <t-select v-model="currentTheme" @change="changeTheme">
      <t-option value="default" label="默认主题"></t-option>
      <t-option value="dark" label="暗色主题"></t-option>
      <t-option value="green" label="绿色主题"></t-option>
      <t-option value="purple" label="紫色主题"></t-option>
    </t-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDark = ref(document.documentElement.classList.contains('dark'))
const currentTheme = ref('default')

// 切换明暗主题
const toggleTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
  isDark.value = !isDark.value
}

// 切换自定义主题
const changeTheme = (theme) => {
  // 移除已有的主题类
  document.documentElement.classList.remove('theme-green', 'theme-purple')
  
  if (theme !== 'default' && theme !== 'dark') {
    document.documentElement.classList.add(`theme-${theme}`)
  }
}
</script>

<style>
/* 自定义绿色主题 */
.theme-green {
  --tune-primary-color: #0c8918;
  --tune-success-color: #13ce66;
}

/* 自定义紫色主题 */
.theme-purple {
  --tune-primary-color: #8e44ad;
  --tune-success-color: #16a085;
}
</style>
```

## 按需引入时的主题定制

当使用按需引入方式时，可以通过以下方式定制主题：

### 使用 CSS 变量

CSS 变量方式依然有效，你可以创建自己的 CSS 文件覆盖变量。

### 使用 SCSS 变量

结合 `unplugin-vue-components` 和 SCSS 变量：

1. 创建 `styles/theme.scss` 文件：

```scss
// 覆盖变量
$tune-primary-color: #09b3af;

// 导入公共样式
@import 'tune-ui/styles/base.scss';
```

2. 在 `vite.config.ts` 中配置：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { TuneUIResolver } from 'tune-ui/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        TuneUIResolver({
          importStyle: 'sass',
          // 指定自定义主题文件
          directives: true,
          // 同时导入组件和指令
        }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 将自定义变量传递给 sass 编译器
        additionalData: `@use "@/styles/theme.scss" as *;`,
      },
    },
  },
})
``` 