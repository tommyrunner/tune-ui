<script setup lang="ts">
import inputNumberBasic from '../examples/input-number/basic.vue'
import inputNumberStep from '../examples/input-number/step.vue'
import inputNumberRange from '../examples/input-number/range.vue'
import inputNumberControls from '../examples/input-number/controls.vue'
import inputNumberSize from '../examples/input-number/size.vue'
import inputNumberRangeInput from '../examples/input-number/range-input.vue'
</script>

# 数值输入框组件

![数值输入框组件](/components/input-number.png)

数值输入框是一种特殊的输入框，专门用于输入数字，提供了增减按钮以便用户调整数值。

## 基础用法

基础数值输入框，支持输入数字并通过控制按钮调整值。

<demo :component="inputNumberBasic" name="input-number" examples="basic" />

## 步长设置

通过 `step` 属性设置数值变化的步长，默认为 1。

<demo :component="inputNumberStep" name="input-number" examples="step" />

## 数值范围限制

通过 `min-value` 和 `max-value` 属性限制输入的数值范围。

<demo :component="inputNumberRange" name="input-number" examples="range" />

## 控制按钮

通过 `is-controls` 属性控制是否显示增减按钮，默认为 true。

<demo :component="inputNumberControls" name="input-number" examples="controls" />

## 不同尺寸

数值输入框支持三种尺寸：small、default 和 large。

<demo :component="inputNumberSize" name="input-number" examples="size" />

## 范围输入

设置 `is-range` 属性开启范围输入模式，可同时输入两个数值。

<demo :component="inputNumberRangeInput" name="input-number" examples="range-input" />

## 数值输入框 API

### 属性

| 属性名         | 说明             | 类型                               | 可选值                  | 默认值  |
| -------------- | ---------------- | ---------------------------------- | ----------------------- | ------- |
| v-model        | 绑定值           | number / number[]                  | —                       | —       |
| size           | 尺寸             | string                             | small / default / large | default |
| placeholder    | 占位文本         | string                             | —                       | —       |
| disabled       | 是否禁用         | boolean                            | —                       | false   |
| step           | 计数器步长       | number                             | —                       | 1       |
| min-value      | 最小值           | number                             | —                       | —       |
| max-value      | 最大值           | number                             | —                       | —       |
| is-range       | 是否为范围输入   | boolean                            | —                       | false   |
| is-controls    | 是否显示控制按钮 | boolean                            | —                       | true    |
| debounce       | 防抖回调函数     | (value: number / number[]) => void | —                       | —       |
| debounce-delay | 防抖延迟时间(ms) | number                             | —                       | 1000    |

### 事件

| 事件名 | 说明               | 回调参数                   |
| ------ | ------------------ | -------------------------- |
| focus  | 获取焦点时触发     | (value: number / number[]) |
| blur   | 失去焦点时触发     | (value: number / number[]) |
| enter  | 按下回车键时触发   | (value: number / number[]) |
| input  | 输入值变化时触发   | (value: number / number[]) |
| clear  | 点击清空按钮时触发 | —                          |

### 插槽

| 插槽名  | 说明                   |
| ------- | ---------------------- |
| default | 输入框默认内容         |
| spe     | 范围选择器的分隔符内容 |

### 样式变量

数值输入框组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明          |
| --------------------- | ------------- |
| $theme-color-primary  | 主题色-主要   |
| $border-color-default | 边框颜色-默认 |
| $text-color-default   | 文本颜色-默认 |
| $font-size-small      | 字体大小-小   |
| $font-size-default    | 字体大小-默认 |
| $font-size-large      | 字体大小-大   |
