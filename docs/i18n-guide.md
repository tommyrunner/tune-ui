# TUI 组件库国际化使用指南

## 1. 国际化概述

TUI 组件库支持多语言国际化，默认提供中文和英文两种语言包。国际化功能通过 `useI18n` Hook 实现，它提供了两个翻译函数：

- `t` - 普通翻译函数，返回普通字符串，适用于组件内部使用
- `tr` - 响应式翻译函数，返回响应式计算属性，适用于静态文本常量定义

## 2. 正确使用国际化的方式

### 2.1 组件内部直接使用

在组件内部直接使用 `useI18n` Hook 的 `t` 函数，这是**最推荐**的做法，因为每次渲染组件时都会重新执行翻译函数：

```vue
<template>
  <div>{{ t("key") }}</div>
</template>

<script lang="ts" setup>
import { useI18n } from "@/hooks/useI18n";

// 使用命名空间
const { t } = useI18n("component");

// 使用翻译
function showMessage() {
  alert(t("common.confirmDelete"));
}
</script>
```

### 2.2 静态文本常量

如果需要定义静态文本常量（例如在 i18n.ts 文件中），**必须使用 `tr` 函数**以确保语言切换时文本能够更新：

```typescript
// i18n.ts
import { useI18n } from "@/hooks/useI18n";

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

### 2.3 两个翻译函数的区别

1. `t` 函数 - 返回普通字符串：
   ```typescript
   // 在组件内部使用
   const { t } = useI18n("component");
   const message = t("key");  // 返回普通字符串
   const paramMessage = t("key", { name: "Value" });  // 带参数返回字符串
   ```

2. `tr` 函数 - 返回响应式计算属性：
   ```typescript
   // 在模块级别定义静态文本
   const { tr } = useI18n("component");
   export const TEXT = tr("key");  // 返回响应式计算属性
   export const PARAM_TEXT = tr("key", { name: "Value" });  // 带参数返回响应式计算属性
   ```

### 2.4 常见错误做法

❌ **错误**：在组件外部使用普通`t`函数创建静态文本

```typescript
// 错误示例
const { t } = useI18n("component");
export const TEXT = t("key"); // 这个值在语言切换时不会更新！
```

✅ **正确**：使用响应式的`tr`函数

```typescript
const { tr } = useI18n("component");
export const TEXT = tr("key"); // 正确，会随语言切换而更新
```

## 3. 高级用法

### 3.1 使用插值

```typescript
// 带参数的普通翻译
const message = t("hello", { name: "World" }); // 对应 "hello": "你好，{name}"

// 带参数的响应式翻译
const welcomeMessage = tr("welcome", { name: userName }); // userName 可以是响应式的
```

### 3.2 手动切换语言

```typescript
<script lang="ts" setup>
import { useI18n } from "@/hooks/useI18n";

const { t, setLocale, locale } = useI18n();

// 显示当前语言
console.log(locale.value); // 'zh-CN'

// 切换语言
function switchToEnglish() {
  setLocale("en-US");
}
</script>
```

## 4. 为组件添加国际化支持

1. 在 `src/locale/components/{组件名}/` 目录下创建语言文件
2. 更新 `src/locale/zh-CN.ts` 和 `src/locale/en-US.ts` 以导入新的语言文件
3. 在组件中创建 `i18n.ts` 文件，使用`tr`函数定义响应式常量

## 5. 实现原理

我们的i18n实现使用两个不同函数处理不同场景，但它们共享底层翻译逻辑：

```typescript
// 内部实现简化版
const translateText = (key, values) => {
  // 获取翻译文本逻辑
  return translatedText;
};

// 普通翻译函数
const t = (key, values) => {
  return translateText(key, values);
};

// 响应式翻译函数
const tr = (key, values) => {
  return computed(() => translateText(key, values));
};
```

这种设计明确区分了两种使用场景：
1. 在组件中使用`t`函数，每次渲染都会获取最新翻译
2. 在模块级静态文本定义中使用`tr`函数，确保语言切换时能自动更新

## 6. 注意事项

- 组件内部使用`t`函数（返回字符串）
- 静态文本定义使用`tr`函数（返回响应式值）
- 使用响应式值时，必须通过`.value`访问实际文本
- 使用嵌套的键名（例如`common.confirm`）可以不指定命名空间
- 确保翻译键在对应的语言包中存在，否则将显示键名本身 