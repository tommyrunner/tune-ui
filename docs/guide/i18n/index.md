# 国际化

Tune UI 组件默认使用中文，如果你希望使用其他语言，可以参考下面的方案。

## 全局配置方式

Tune UI 提供了`useOptions`钩子函数，可以方便地进行国际化设置：

```ts
import { useOptions } from "tune-ui";

// 使用全局配置API
const { setLocale } = useOptions();

// 切换语言
setLocale("en-US");
```

## 实时切换示例

```vue
<template>
  <div>
    <!-- 语言选择器 -->
    <t-select v-model="locale" @change="handleLocaleChange" :options="localeOptions" />
    
    <!-- 展示国际化效果的组件 -->
    <t-calendar :disabled-time-view="false" show-time />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useOptions } from "tune-ui";

// 使用全局配置API
const { configOptions, setLocale } = useOptions();

// 当前语言
const locale = ref(configOptions.value.locale || "zh-CN");

// 可选语言
const localeOptions = [
  { label: "中文", value: "zh-CN" },
  { label: "英文", value: "en-US" }
];

/**
 * 处理语言变更
 */
const handleLocaleChange = () => {
  setLocale(locale.value);
  // 可以添加成功提示
  console.log(`语言已切换为${locale.value}`);
}
</script>
```

## 支持的语言

Tune UI 目前支持以下语言：

- 简体中文（zh-CN）
- 英语（en-US）

## 在组件中使用国际化

组件内部可以使用`useI18n` hook来获取翻译文本：

```vue
<template>
  <div>{{ t("confirm") }}</div>
</template>

<script lang="ts" setup>
import { useI18n } from "tune-ui";

// 使用命名空间
const { t } = useI18n("component");

// 使用翻译
const message = t("common.confirmDelete");
</script>
```

## 组件本地化原理

Tune UI 的国际化功能基于 `useI18n` Hook 实现，它提供了两个翻译函数：

- `t` - 普通翻译函数，返回普通字符串，适用于组件内部使用
- `tr` - 响应式翻译函数，返回响应式计算属性，适用于静态文本常量定义

### 使用响应式翻译定义静态文本

如果需要定义静态文本常量（例如在 i18n.ts 文件中），应使用 `tr` 函数以确保语言切换时文本能够更新：

```typescript
// i18n.ts
import { useI18n } from "tune-ui";

// 使用响应式翻译函数
const { tr } = useI18n("component");

// 导出响应式文本常量
export const TEXT_TITLE = tr("title");
export const TEXT_SUBMIT = tr("submit");

// 带参数的响应式文本
export const TEXT_WELCOME = tr("welcome", { defaultName: "Guest" });
```

然后在组件中使用：

```vue
<template>
  <h1>{{ TEXT_TITLE.value }}</h1>
  <button>{{ TEXT_SUBMIT.value }}</button>
</template>

<script lang="ts" setup>
import { TEXT_TITLE, TEXT_SUBMIT } from "./i18n";
</script>
```

## 使用插值

```typescript
// 带参数的普通翻译
const message = t("hello", { name: "World" }); // 对应 "hello": "你好，{name}"

// 带参数的响应式翻译
const welcomeMessage = tr("welcome", { name: userName }); // userName 可以是响应式的
``` 