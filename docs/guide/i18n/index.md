# 国际化

Tune UI 组件默认使用中文，如果你希望使用其他语言，可以参考下面的方案。

## 配置方式

Tune UI 提供了`useOptions`钩子函数进行国际化配置：

```js
import { useOptions, LOCALE_TYPE } from "tune-ui";

const { setLocale } = useOptions();

// 设置语言为中文
setLocale(LOCALE_TYPE.ZH_CN);

// 设置语言为英文
setLocale(LOCALE_TYPE.EN_US);
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
import { useOptions, LOCALE_TYPE } from "tune-ui";

// 使用全局配置API
const { configOptions, setLocale } = useOptions();

// 当前语言
const locale = ref(configOptions.value.locale || "zh-CN");

// 可选语言
const localeOptions = [
  { label: "中文", value: LOCALE_TYPE.ZH_CN },
  { label: "英文", value: LOCALE_TYPE.EN_US }
];

/**
 * 处理语言变更
 */
const handleLocaleChange = () => {
  setLocale(locale.value);
  // 可以添加成功提示
  console.log(`语言已切换为${locale.value}`);
};
</script>
```

## 支持的语言

Tune UI 目前支持以下语言：

- 简体中文（zh-CN）
- 英语（en-US）
