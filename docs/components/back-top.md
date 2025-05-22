<script setup lang="ts">
import backTopBasic from '../examples/back-top/basic.vue'
import backTopIcon from '../examples/back-top/icon.vue'
import backTopPlain from '../examples/back-top/plain.vue'
import backTopPosition from '../examples/back-top/position.vue'
import backTopHeight from '../examples/back-top/height.vue'
import backTopTarget from '../examples/back-top/target.vue'
import backTopCustom from '../examples/back-top/custom.vue'
</script>

# 回到顶部组件

![回到顶部组件](/components/back-top.png)

回到顶部组件提供了一种便捷的方式让用户快速返回页面顶部，特别适用于长内容页面。

## 基础用法

基础的回到顶部按钮，当页面滚动超过指定高度时显示。

<demo :component="backTopBasic" name="back-top" examples="basic" />

## 自定义图标

通过设置 `icon` 属性可以自定义回到顶部按钮的图标。

<demo :component="backTopIcon" name="back-top" examples="icon" />

## 朴素样式

设置 `plain` 属性可以使用朴素样式的回到顶部按钮，添加背景色和边框。

<demo :component="backTopPlain" name="back-top" examples="plain" />

## 自定义位置

通过设置 `bottom` 和 `right` 属性可以自定义回到顶部按钮的位置。

<demo :component="backTopPosition" name="back-top" examples="position" />

## 自定义触发高度

通过设置 `visibilityHeight` 属性可以自定义触发回到顶部按钮显示的滚动高度。

<demo :component="backTopHeight" name="back-top" examples="height" />

## 指定滚动容器

通过设置 `target` 属性可以指定触发滚动的容器元素，可以是CSS选择器字符串或HTML元素。

<demo :component="backTopTarget" name="back-top" examples="target" />

## 自定义内容

通过默认插槽可以自定义回到顶部按钮的内容，完全控制其外观。

<demo :component="backTopCustom" name="back-top" examples="custom" />

## 回到顶部 API

### 属性

| 属性名            | 说明                   | 类型                | 可选值 | 默认值     |
| ----------------- | ---------------------- | ------------------- | ------ | ---------- |
| target            | 触发滚动的目标元素     | HTMLElement/string  | —      | —          |
| icon              | 图标类型               | string              | —      | caret-up   |
| icon-size         | 图标大小               | number              | —      | 32         |
| bottom            | 距离底部距离           | string              | —      | 32px       |
| right             | 距离右侧距离           | string              | —      | 32px       |
| visibility-height | 显示触发的滚动高度     | number              | —      | 200        |
| plain             | 是否使用朴素样式       | boolean             | —      | false      |

### 事件

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| click  | 点击按钮时触发     | —        |

### 插槽

| 插槽名  | 说明             |
| ------- | ---------------- |
| default | 自定义按钮内容   |

### 样式变量

回到顶部组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明           |
| --------------------- | -------------- |
| $theme-color-primary  | 主题色-主要    |
| $color-white          | 白色           |
| $bg-color-default     | 默认背景颜色   |
| $z-index-up           | 上层层级       |
</rewritten_file> 