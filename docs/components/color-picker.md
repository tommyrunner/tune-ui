<script setup lang="ts">
import colorPickerBasic from '../examples/color-picker/basic.vue'
import colorPickerAlpha from '../examples/color-picker/alpha.vue'
import colorPickerPredefine from '../examples/color-picker/predefine.vue'
import colorPickerSizes from '../examples/color-picker/sizes.vue'
import colorPickerFormats from '../examples/color-picker/formats.vue'
import colorPickerDisabled from '../examples/color-picker/disabled.vue'
import colorPickerEvents from '../examples/color-picker/events.vue'
</script>

# 颜色选择器

![颜色选择器](/components/color-picker.png)

颜色选择器组件允许用户通过可视化的界面选择颜色，支持多种颜色格式、透明度调节及预定义颜色等功能。

## 基础用法

最基本的颜色选择器用法。

<demo :component="colorPickerBasic" name="color-picker" examples="basic" />

## 透明度选择

通过设置 `show-alpha` 属性开启透明度选择功能。

<demo :component="colorPickerAlpha" name="color-picker" examples="alpha" />

## 预定义颜色

通过 `predefine` 属性设置预定义颜色，提供常用颜色快速选择。

<demo :component="colorPickerPredefine" name="color-picker" examples="predefine" />

## 不同尺寸

颜色选择器支持不同尺寸，通过 `size` 属性设置，支持 `small`、`default`、`large` 三种尺寸。

<demo :component="colorPickerSizes" name="color-picker" examples="sizes" />

## 不同颜色格式

颜色选择器支持不同的颜色格式输出，可以通过 `color-format` 属性设置。

<demo :component="colorPickerFormats" name="color-picker" examples="formats" />

## 禁用状态

通过设置 `disabled` 属性禁用颜色选择器。

<demo :component="colorPickerDisabled" name="color-picker" examples="disabled" />

## 事件处理

颜色选择器提供了多种事件用于处理颜色选择过程中的操作。

<demo :component="colorPickerEvents" name="color-picker" examples="events" />

## 颜色选择器 API

### 属性

| 属性名           | 说明                       | 类型                | 可选值                        | 默认值    |
| ---------------- | -------------------------- | ------------------- | ----------------------------- | --------- |
| `v-model`        | 绑定值                     | `string`            | —                             | —         |
| `disabled`       | 是否禁用                   | `boolean`           | —                             | `false`   |
| `size`           | 尺寸                       | `string`            | `small` / `default` / `large` | `default` |
| `show-alpha`     | 是否支持透明度选择         | `boolean`           | —                             | `false`   |
| `color-format`   | 写入v-model的颜色的格式    | `string`            | `hsl` / `hsv` / `hex` / `rgb` | `hex`     |
| `popper-class`   | ColorPicker下拉框的类名    | `string`            | —                             | —         |
| `predefine`      | 预定义颜色                 | `string[]`          | —                             | —         |
| `validate-event` | 输入时是否触发表单的校验   | `boolean`           | —                             | `true`    |
| `tabindex`       | ColorPicker的tabindex      | `string` / `number` | —                             | `0`       |
| `teleported`     | 是否将下拉列表渲染至body下 | `boolean`           | —                             | `true`    |

### 事件

| 事件名          | 说明                               | 参数                  |
| --------------- | ---------------------------------- | --------------------- |
| `change`        | 当绑定值变化时触发                 | `(value: string)`     |
| `active-change` | 面板中当前显示的颜色发生改变时触发 | `(value: string)`     |
| `focus`         | 当获得焦点时触发                   | `(event: FocusEvent)` |
| `blur`          | 当失去焦点时触发                   | `(event: FocusEvent)` |

### 方法

颜色选择器组件暴露了以下方法，可以通过模板引用调用。

| 方法名             | 说明           | 参数 |
| ------------------ | -------------- | ---- |
| `handleTriggerClick` | 触发颜色选择面板的显示/隐藏 | —    |

### 样式变量

颜色选择器组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                  | 说明         |
| ----------------------- | ------------ |
| $theme-color-primary    | 主题色-主要  |
| $text-color-default     | 默认文本颜色 |
| $border-color-default   | 默认边框颜色 |
| $bg-color-default       | 默认背景颜色 |
| $color-white            | 白色         |
| $color-black            | 黑色         |
| $font-size-default      | 默认字体大小 |
| $font-size-small        | 小号字体大小 |
| $opacity-disabled       | 禁用状态透明度 |
