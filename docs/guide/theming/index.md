# 主题定制

Tune UI 默认提供了一套主题，同时也支持多种方式自定义主题风格，满足个性化产品需求。

## 全局主题配置API

Tune UI 提供了`useOptions`钩子函数进行全局主题配置，这是推荐的主题配置方式：

```ts
import { useOptions } from "tune-ui";

// 使用全局配置API
const { updateThemeColor, updateDefaultSize } = useOptions();

// 更新主题颜色
updateThemeColor({
  primary: "#6a1cf7",
  success: "#28b178",
  danger: "#eb2f4b"
});

// 更新默认元素尺寸
updateDefaultSize("large"); // 可选值: "small", "default", "large"
```

### 完整配置示例

```vue
<template>
  <div>
    <!-- 主题颜色配置 -->
    <div class="theme-colors">
      <div v-for="(_, key) in themeColors" :key="key">
        <div>{{ themeLabels[key] }}</div>
        <t-color-picker v-model="themeColors[key]" @change="handleThemeChange(key)" />
        <div>{{ themeColors[key] }}</div>
      </div>
    </div>
    
    <!-- 尺寸设置 -->
    <t-radio-group v-model="elementSize" @change="handleSizeChange">
      <t-radio value="small">小尺寸</t-radio>
      <t-radio value="default">默认尺寸</t-radio>
      <t-radio value="large">大尺寸</t-radio>
    </t-radio-group>
    
    <!-- 重置按钮 -->
    <t-button type="primary" @click="resetThemeSettings">重置主题设置</t-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useOptions } from "tune-ui";
import type { OptionsThemeType } from "tune-ui";

// 使用全局配置API
const { updateThemeColor, updateDefaultSize, configOptions, initOptions } = useOptions();

// 主题颜色标签
const themeLabels = {
  primary: "主要颜色",
  success: "成功颜色",
  warning: "警告颜色",
  danger: "危险颜色",
  info: "信息颜色"
};

// 主题颜色数据
const themeColors = reactive<OptionsThemeType>({ ...configOptions.value.theme });

// 元素尺寸
const elementSize = ref(configOptions.value.elSize || "default");

/**
 * 处理主题颜色变更
 * @param {string} key - 颜色类型
 */
const handleThemeChange = (key: keyof OptionsThemeType) => {
  const themeUpdate = { [key]: themeColors[key] } as OptionsThemeType;
  updateThemeColor(themeUpdate);
}

/**
 * 处理尺寸变更
 */
const handleSizeChange = () => {
  updateDefaultSize(elementSize.value);
}

/**
 * 重置主题设置
 */
const resetThemeSettings = () => {
  const defaultOptions = initOptions();
  
  // 重置主题颜色
  Object.keys(defaultOptions.theme).forEach(key => {
    themeColors[key as keyof OptionsThemeType] = defaultOptions.theme[key as keyof OptionsThemeType];
  });
  updateThemeColor(themeColors);
  
  // 重置元素尺寸
  elementSize.value = defaultOptions.elSize;
  updateDefaultSize(defaultOptions.elSize);
}
</script>
```

### 主题配置API

TUI组件库提供的主题相关API：

- `updateThemeColor(theme: OptionsThemeType)`: 更新主题颜色
- `updateDefaultSize(size: ElSizeType)`: 更新默认元素尺寸
- `initOptions()`: 初始化配置，返回默认配置
- `configOptions`: 响应式的当前配置对象

### 支持的主题颜色配置

```ts
interface OptionsThemeType {
  primary: string; // 主要颜色
  success: string; // 成功颜色
  warning: string; // 警告颜色
  danger: string;  // 危险颜色
  info: string;    // 信息颜色
  dark: string;    // 深色
  light: string;   // 浅色
}
```

## 使用CSS变量方式定制主题

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