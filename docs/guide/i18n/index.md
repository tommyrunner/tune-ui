# 国际化

Tune UI 组件默认使用中文，如果你希望使用其他语言，可以参考下面的方案。

## 配置语言

### 完整引入

```ts
import { createApp } from 'vue'
import TuneUI from 'tune-ui'
import 'tune-ui/dist/index.css'
import App from './App.vue'
import zhCN from 'tune-ui/locale/zh-CN'
import enUS from 'tune-ui/locale/en-US'

const app = createApp(App)
app.use(TuneUI, {
  locale: enUS, // 设置为英文
})
app.mount('#app')
```

### 实时切换

通过 `TuneUIConfig` 组件的 `locale` 属性可以实时更改当前的语言。

```vue
<template>
  <t-config-provider :locale="locale">
    <app />
  </t-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import { TConfigProvider } from 'tune-ui'
import zhCN from 'tune-ui/locale/zh-CN'
import enUS from 'tune-ui/locale/en-US'
import jaJP from 'tune-ui/locale/ja-JP'

const locale = ref(enUS)

// 切换到日语
const changeLocale = () => {
  locale.value = jaJP
}
</script>
```

## 支持的语言

Tune UI 目前支持以下语言：

- 简体中文（zh-CN）
- 英语（en-US）
- 繁体中文（zh-TW）
- 日语（ja-JP）
- 韩语（ko-KR）
- 法语（fr-FR）
- 德语（de-DE）
- 西班牙语（es-ES）
- 葡萄牙语（pt-BR）
- 俄语（ru-RU）

如果你需要使用其他语言，你也可以参考已有的语言文件来创建一个新的语言包。

## 语言包结构

如果你想添加新的语言支持，可以参考语言包的结构：

```ts
export default {
  name: 'en-US',
  el: {
    colorpicker: {
      confirm: 'OK',
      clear: 'Clear',
    },
    datepicker: {
      now: 'Now',
      today: 'Today',
      cancel: 'Cancel',
      clear: 'Clear',
      confirm: 'OK',
      selectDate: 'Select date',
      selectTime: 'Select time',
      startDate: 'Start Date',
      startTime: 'Start Time',
      endDate: 'End Date',
      endTime: 'End Time',
      prevYear: 'Previous Year',
      nextYear: 'Next Year',
      prevMonth: 'Previous Month',
      nextMonth: 'Next Month',
      year: '',
      month1: 'January',
      month2: 'February',
      // ...
    },
    // ...
  },
}
```

## 与其他国际化方案一起使用

Tune UI 的国际化是独立的，如果你的项目中已经使用了像 vue-i18n 这样的国际化方案，你可以选择以下方式进行集成：

### 与 vue-i18n 集成

```ts
import { createApp } from 'vue'
import TuneUI from 'tune-ui'
import 'tune-ui/dist/index.css'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import tuneUIEnUS from 'tune-ui/locale/en-US'
import tuneUIZhCN from 'tune-ui/locale/zh-CN'

// 创建 vue-i18n 实例
const i18n = createI18n({
  locale: 'zh-CN',
  messages: {
    'en-US': {
      // 你自己的翻译
      hello: 'Hello',
      // 加载 Tune UI 的语言包
      ...tuneUIEnUS,
    },
    'zh-CN': {
      hello: '你好',
      ...tuneUIZhCN,
    },
  },
})

const app = createApp(App)
app.use(i18n)
app.use(TuneUI, {
  locale: i18n.global.messages[i18n.global.locale],
})
app.mount('#app')

// 切换语言同时应用到 Tune UI
function setLocale(lang) {
  i18n.global.locale = lang
  app.config.globalProperties.$TuneUI.locale = i18n.global.messages[lang]
}
```

## 自定义语言文本

如果你想修改某些组件的文本，但不想创建完整的语言包，可以使用以下方式：

```ts
import { createApp } from 'vue'
import TuneUI from 'tune-ui'
import 'tune-ui/dist/index.css'
import App from './App.vue'
import zhCN from 'tune-ui/locale/zh-CN'

const customizedZhCN = {
  ...zhCN,
  el: {
    ...zhCN.el,
    button: {
      ...zhCN.el.button,
      confirm: '确认一下',  // 自定义文本
    },
  },
}

const app = createApp(App)
app.use(TuneUI, {
  locale: customizedZhCN,
})
app.mount('#app')
``` 