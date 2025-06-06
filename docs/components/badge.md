<script setup lang="ts">
import badgeBasic from '../examples/badge/basic.vue'
import badgeDot from '../examples/badge/dot.vue'
import badgeMax from '../examples/badge/max.vue'
import badgeColor from '../examples/badge/color.vue'
import badgeOffset from '../examples/badge/offset.vue'
import badgeHidden from '../examples/badge/hidden.vue'
</script>

# 徽章

![徽章](/components/badge.png)

徽章组件用于在元素右上角展示计数、小红点或状态标记，常用于消息提醒、新功能标记等场景。

## 基础用法

徽章可以直接附加在其他元素上，通过 `value` 属性设置显示的数值。

<demo :component="badgeBasic" name="badge" examples="basic" />

## 小圆点

通过设置 `isDot` 属性，可以显示为一个小圆点，不显示具体数值。

<demo :component="badgeDot" name="badge" examples="dot" />

## 最大值

可以通过 `max` 属性设置最大显示数值，超过最大值时将显示为 "最大值+"。

<demo :component="badgeMax" name="badge" examples="max" />

## 自定义颜色

通过 `color` 属性可以自定义徽章的背景颜色。

<demo :component="badgeColor" name="badge" examples="color" />

## 位置偏移

可以通过 `offsetX` 和 `offsetY` 属性调整徽章的位置，实现灵活的位置定制。

<demo :component="badgeOffset" name="badge" examples="offset" />

## 隐藏徽章

通过设置 `hiddenValue` 属性，当数值等于隐藏值时，徽章将不显示。

<demo :component="badgeHidden" name="badge" examples="hidden" />

## 徽章 API

### 属性

| 属性名       | 说明                   | 类型       | 可选值           | 默认值    |
| ------------ | ---------------------- | ---------- | ---------------- | --------- |
| `value`      | 显示的数值             | `number`   | —                | —         |
| `isDot`      | 是否显示为小圆点       | `boolean`  | —                | `false`   |
| `max`        | 最大显示数值           | `number`   | —                | `99`      |
| `color`      | 徽章背景颜色           | `string`   | —                | `#f56c6c` |
| `offsetX`    | X轴偏移量              | `number`   | —                | `0`       |
| `offsetY`    | Y轴偏移量              | `number`   | —                | `0`       |
| `hiddenValue`| 隐藏徽章时的值         | `number`   | —                | `0`       |

### 插槽

| 插槽名  | 说明               |
| ------- | ------------------ |
| default | 徽章包裹的内容元素 |

### 样式变量

徽章组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明           |
| --------------------- | -------------- |
| $theme-color-danger   | 主题色-危险    |
| $color-white          | 白色           |
| $z-index-show         | 显示层级       |
</rewritten_file> 