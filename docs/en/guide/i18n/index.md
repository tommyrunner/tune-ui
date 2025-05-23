# Internationalization

Tune UI components use Chinese by default. If you want to use other languages, you can refer to the solutions below.

## Configuration Method

Tune UI provides a `useOptions` hook function for internationalization configuration:

```js
import { useOptions, LOCALE_TYPE } from "tune-ui";

const { setLocale } = useOptions();

// Set language to Chinese
setLocale(LOCALE_TYPE.ZH_CN);

// Set language to English
setLocale(LOCALE_TYPE.EN_US);
```

## Real-time Switching Example

```vue
<template>
  <div>
    <!-- Language selector -->
    <t-select v-model="locale" @change="handleLocaleChange" :options="localeOptions" />

    <!-- Component showing internationalization effect -->
    <t-calendar :disabled-time-view="false" show-time />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useOptions, LOCALE_TYPE } from "tune-ui";

// Use global configuration API
const { configOptions, setLocale } = useOptions();

// Current language
const locale = ref(configOptions.value.locale || "zh-CN");

// Available languages
const localeOptions = [
  { label: "Chinese", value: LOCALE_TYPE.ZH_CN },
  { label: "English", value: LOCALE_TYPE.EN_US }
];

/**
 * Handle language change
 */
const handleLocaleChange = () => {
  setLocale(locale.value);
  // Can add success notification
  console.log(`Language has been switched to ${locale.value}`);
};
</script>
```

## Supported Languages

Tune UI currently supports the following languages:

- Simplified Chinese (zh-CN)
- English (en-US)
