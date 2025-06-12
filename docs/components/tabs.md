<script setup lang="ts">
import tabsBasic from '../examples/tabs/basic.vue'
import tabsType from '../examples/tabs/type.vue'
import tabsGap from '../examples/tabs/gap.vue'
import tabsHeight from '../examples/tabs/height.vue'
import tabsIcon from '../examples/tabs/icon.vue'
import tabsClose from '../examples/tabs/close.vue'
import tabsDisabled from '../examples/tabs/disabled.vue'
</script>

# 标签页组件

![标签页组件](/components/tabs.png)

标签页组件允许用户在不同视图之间切换，是内容组织和导航的重要方式，通常用于内容分类展示。

## 基础用法

基础的标签页用法，展示默认的线条样式标签页。

<demo :component="tabsBasic" name="tabs" examples="basic" />

## 不同类型

标签页组件提供了三种不同的类型：线条样式（line）、块状样式（block）和边框样式（border）。

<demo :component="tabsType" name="tabs" examples="type" />

## 自定义间距

通过设置 `gap` 属性可以自定义标签页之间的间距，设置为 `0` 时标签页将充满整个容器。

<demo :component="tabsGap" name="tabs" examples="gap" />

## 自定义高度

通过设置 `height` 属性可以自定义标签页的高度。

<demo :component="tabsHeight" name="tabs" examples="height" />

## 带图标的标签页

通过在 `TTabs` 组件上使用 `icon` 属性可以为标签页添加图标。

<demo :component="tabsIcon" name="tabs" examples="icon" />

## 带关闭按钮

设置 `is-close` 属性为 `true` 可以启用标签页的关闭功能。

<demo :component="tabsClose" name="tabs" examples="close" />

## 禁用状态

在 `TTabs` 组件上设置 `disabled` 属性可以禁用特定的标签页。

<demo :component="tabsDisabled" name="tabs" examples="disabled" />

## 标签页 API

### TTabs 属性

| 属性名   | 说明         | 类型    | 可选值 | 默认值  |
| -------- | ------------ | ------- | ------ | ------- |
| disabled | 是否禁用     | boolean | —      | false   |
| value    | 标签页的值   | string/number | —  | —       |
| icon     | 标签页的图标 | string  | —      | —       |

### TTabsGroup 属性

| 属性名          | 说明               | 类型    | 可选值               | 默认值  |
| --------------- | ------------------ | ------- | -------------------- | ------- |
| v-model         | 绑定值             | string/number | —              | —       |
| type            | 标签页类型         | string  | line/block/border    | line    |
| height          | 标签页高度         | string  | —                    | 42px    |
| gap             | 标签页间距         | number  | —                    | 8       |
| is-close        | 是否显示关闭按钮   | boolean | —                    | false   |
| action-duration | 切换动画时长(毫秒) | number  | —                    | 220     |

### TTabsGroup 事件

| 事件名 | 说明                 | 回调参数                 |
| ------ | -------------------- | ------------------------ |
| change | 标签页切换时触发     | (value: `ValueType`)     |
| close  | 关闭标签页时触发     | (value: `ValueType`)     |

### TTabsGroup 方法

| 方法名       | 说明           | 参数 |
| ------------ | -------------- | ---- |
| updateAction | 更新action位置 | —    |

### TTabs 插槽

| 插槽名  | 说明             |
| ------- | ---------------- |
| default | 标签页的内容     |

### TTabsGroup 插槽

| 插槽名  | 说明               |
| ------- | ------------------ |
| default | 放置 TTabs 组件    |

### 样式变量

标签页组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明          |
| --------------------- | ------------- |
| $theme-color-primary  | 主题色-主要   |
| $theme-color-danger   | 主题色-危险   |
| $text-color-default   | 文本颜色-默认 |
| $font-size-default    | 字体大小-默认 | 
 