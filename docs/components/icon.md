<script setup lang="ts">
import iconBasic from '../examples/icon/basic.vue'
import iconSize from '../examples/icon/size.vue'
import iconColor from '../examples/icon/color.vue'
import iconCustom from '../examples/icon/custom.vue'
import iconAll from '../examples/icon/all.vue'
</script>

# 图标组件

![图标组件](/components/icon.png)

图标是界面设计中的基础元素，可用于表示常见操作、导航提示、状态指示等，使界面更加直观。Tune UI 提供了一套常用的图标集合，支持自定义大小、颜色和类型。

## 基础用法

Tune UI 内置了丰富的图标，通过 `icon` 属性指定图标名称。

<demo :component="iconBasic" name="icon" examples="basic" />

## 图标尺寸

可以通过 `size` 属性自定义图标的尺寸，单位为 `px`。

<demo :component="iconSize" name="icon" examples="size" />

## 图标颜色

有两种方式可以自定义图标颜色：

1. 使用 `color` 属性指定自定义颜色值
2. 使用 `type` 属性使用主题颜色

<demo :component="iconColor" name="icon" examples="color" />

## 自定义图标

除了内置图标，你还可以通过 `customIcon` 属性引入自定义的图标。

<demo :component="iconCustom" name="icon" examples="custom" />

## 图标分类

以下是所有可用的图标，按照不同的类别进行了分组。点击图标可复制图标名称。

<demo :component="iconAll" name="icon" examples="all" />

## 图标 API

### 属性

| 属性名     | 说明           | 类型   | 可选值                                                | 默认值     |
| ---------- | -------------- | ------ | ----------------------------------------------------- | ---------- |
| icon       | 图标名称       | string | -                                                     | success-to |
| size       | 图标大小(px)   | number | -                                                     | 16         |
| color      | 图标颜色       | string | -                                                     | -          |
| type       | 图标主题类型   | string | default / primary / success / info / warning / danger | -          |
| customIcon | 自定义图标名称 | string | -                                                     | -          |

### 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 图标内部的内容 |

### 样式变量

图标组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名               | 说明        |
| -------------------- | ----------- |
| $theme-color-primary | 主题色-主要 |
| $theme-color-success | 主题色-成功 |
| $theme-color-info    | 主题色-信息 |
| $theme-color-warning | 主题色-警告 |
| $theme-color-danger  | 主题色-危险 |
