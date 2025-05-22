<script setup lang="ts">
import radioBasic from '../examples/radio/basic.vue'
import radioDisabled from '../examples/radio/disabled.vue'
import radioRadius from '../examples/radio/radius.vue'
import radioIcon from '../examples/radio/icon.vue'
import radioGroup from '../examples/radio/group.vue'
import radioGroupType from '../examples/radio/group-type.vue'
import radioDirection from '../examples/radio/direction.vue'
import radioEvents from '../examples/radio/events.vue'
</script>

# 单选框组件

![单选框组件](/components/radio.png)

单选框组件用于在多个备选项中选择一个选项，用户单击选择后可以更改选中状态。

## 基础用法

基础单选框用于选择单个状态。

<demo :component="radioBasic" name="radio" examples="basic" />

## 禁用状态

设置 `disabled` 属性可以禁用单选框。

<demo :component="radioDisabled" name="radio" examples="disabled" />

## 不同样式

设置 `radius` 属性可以改变单选框的样式，支持 `default`（圆形）和 `square`（方形）。

<demo :component="radioRadius" name="radio" examples="radius" />

## 自定义图标

设置 `icon` 属性可以自定义单选框的图标。

<demo :component="radioIcon" name="radio" examples="icon" />

## 单选框组

使用 `t-radio-group` 组件可以将多个单选框组合为一组，通过 `v-model` 绑定值。

<demo :component="radioGroup" name="radio" examples="group" />

## 单选框组类型

单选框组支持四种类型：`default`（默认）、`text`（文本）、`border`（边框）和 `button`（按钮）。

<demo :component="radioGroupType" name="radio" examples="grouptype" />

## 排列方向

通过 `direction` 属性设置单选框组的排列方向，支持 `row`（水平）和 `column`（垂直）。

<demo :component="radioDirection" name="radio" examples="direction" />

## 事件处理

单选框和单选框组提供了 `change` 事件。

<demo :component="radioEvents" name="radio" examples="events" />

## 单选框 API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model | 绑定值 | string / number / boolean / object | — | — |
| value | 选中时的值 | string / number / boolean / object | — | false |
| size | 尺寸 | string | small / default / large | default |
| radius | 选中图形样式 | string | default / square | default |
| objKey | 绑定对象类型的标记key | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| name | 原生name属性 | string | — | — |
| icon | 自定义图标类型 | string | — | — |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 值变化时触发 | (value: `string` / `number` / `boolean` / `object`) |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 单选框文本内容 |
| radioSpan | 自定义单选框图标 |

## 单选框组 API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model | 绑定值 | string / number / boolean / object | — | — |
| size | 尺寸 | string | small / default / large | default |
| objKey | 绑定对象标记key | string | — | — |
| type | 单选框组类型 | string | default / text / border / button | button |
| direction | 排列方向 | string | column / row | row |
| immediateChange | 是否立即触发change事件 | boolean | — | false |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 值变化时触发 | (value: `string` / `number` / `boolean` / `object`) |

### 样式变量

单选框组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名 | 说明 |
| --- | --- |
| $theme-color-primary | 主题色-主要 |
| $border-color-default | 边框颜色-默认 |
| $font-size-small | 字体大小-小 |
| $font-size-default | 字体大小-默认 |
| $font-size-large | 字体大小-大 | 