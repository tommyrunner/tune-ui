<script setup lang="ts">
import rateBasic from '../examples/rate/basic.vue'
import rateSize from '../examples/rate/size.vue'
import rateCustomIcon from '../examples/rate/custom-icon.vue'
import rateColor from '../examples/rate/color.vue'
import rateMax from '../examples/rate/max.vue'
import rateHalf from '../examples/rate/half.vue'
import rateGap from '../examples/rate/gap.vue'
import rateEvents from '../examples/rate/events.vue'
</script>

# 评分组件

![评分组件](/components/rate.png)

评分组件用于对事物进行评级操作，支持自定义图标、颜色、半选等功能。

## 基础用法

基础的评分组件用法，通过 `v-model` 绑定评分值。

<demo :component="rateBasic" name="rate" examples="basic" />

## 不同尺寸

评分组件支持三种尺寸：small、default 和 large。

<demo :component="rateSize" name="rate" examples="size" />

## 自定义图标

可以通过 `icon` 属性自定义评分组件的图标，包括未选中图标、半选图标和选中图标。

<demo :component="rateCustomIcon" name="rate" examples="custom-icon" />

## 自定义颜色

通过 `color` 属性可以自定义不同分值下的颜色。

<demo :component="rateColor" name="rate" examples="color" />

## 最大评分值

通过 `max` 属性设置评分组件的最大分值，默认为 5。

<demo :component="rateMax" name="rate" examples="max" />

## 半选模式

评分组件默认支持半选模式，可以通过 `is-half` 属性控制是否启用半选。

<demo :component="rateHalf" name="rate" examples="half" />

## 自定义间距

通过 `gap` 属性可以设置评分图标之间的间距，默认为 5px。

<demo :component="rateGap" name="rate" examples="gap" />

## 事件处理

评分组件提供了 `change` 事件，在评分值变化时触发。

<demo :component="rateEvents" name="rate" examples="events" />

## 评分组件 API

### 属性

| 属性名   | 说明                  | 类型                              | 可选值                  | 默认值  |
| -------- | --------------------- | --------------------------------- | ----------------------- | ------- |
| v-model  | 绑定值                | number                            | —                       | —       |
| size     | 尺寸                  | string                            | small / default / large | default |
| color    | 评分颜色配置          | `{ [key in number]?: string }`      | —                       | —       |
| icon     | 自定义图标配置        | `{ empty?: string, half?: string, show?: string }` | —       | —       |
| gap      | 图标间距              | number                            | —                       | 5       |
| max      | 最大评分值            | number                            | —                       | 5       |
| is-half  | 是否支持半选          | boolean                           | —                       | true    |
| disabled | 是否禁用              | boolean                           | —                       | false   |

### 事件

| 事件名 | 说明               | 回调参数           |
| ------ | ------------------ | ------------------ |
| change | 评分值变化时触发   | (value: `number`) |

### 样式变量

评分组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明           |
| --------------------- | -------------- |
| $theme-color-primary  | 主题色-主要    |
| $font-size-small      | 字体大小-小    |
| $font-size-default    | 字体大小-默认  |
| $font-size-large      | 字体大小-大    |
