<script setup lang="ts">
import breadcrumbBasic from '../examples/breadcrumb/basic.vue'
import breadcrumbSeparator from '../examples/breadcrumb/separator.vue'
import breadcrumbIcon from '../examples/breadcrumb/icon.vue'
import breadcrumbRouter from '../examples/breadcrumb/router.vue'
import breadcrumbDisabled from '../examples/breadcrumb/disabled.vue'
import breadcrumbGap from '../examples/breadcrumb/gap.vue'
</script>

# 面包屑组件

![面包屑组件](/components/breadcrumb.png)

面包屑是一种导航辅助工具，可以让用户了解当前所在页面在网站结构中的位置，并能够快速返回上级页面。

## 基础用法

基础的面包屑用法，展示层级结构。

<demo :component="breadcrumbBasic" name="breadcrumb" examples="basic" />

## 自定义分隔符

通过设置 `separatedIcon` 属性可以自定义分隔符图标，不设置则使用默认的 `/` 符号。

<demo :component="breadcrumbSeparator" name="breadcrumb" examples="separator" />

## 带图标的面包屑

通过在 `options` 中设置 `icon` 属性为每个面包屑项添加图标。

<demo :component="breadcrumbIcon" name="breadcrumb" examples="icon" />

## 路由跳转

设置 `isRouter` 属性可以启用路由跳转功能，配合 `options` 中的 `to` 属性使用。

<demo :component="breadcrumbRouter" name="breadcrumb" examples="router" />

## 禁用状态

在 `options` 中设置 `disabled` 属性可以禁用特定的面包屑项。

<demo :component="breadcrumbDisabled" name="breadcrumb" examples="disabled" />

## 自定义间距

通过设置 `gap` 属性可以自定义分隔符与内容之间的间距。

<demo :component="breadcrumbGap" name="breadcrumb" examples="gap" />

## 面包屑 API

### 属性

| 属性名         | 说明                | 类型    | 可选值 | 默认值 |
| -------------- | ------------------- | ------- | ------ | ------ |
| options        | 面包屑选项数据      | array   | —      | []     |
| is-router      | 是否启用路由        | boolean | —      | true   |
| is-replace     | 是否使用replace模式 | boolean | —      | false  |
| separated-icon | 分隔符图标          | string  | —      | —      |
| gap            | 分隔符间距          | number  | —      | 6      |

### 选项配置

| 参数     | 说明     | 类型           | 可选值 | 默认值 |
| -------- | -------- | -------------- | ------ | ------ |
| label    | 显示文本 | string         | —      | —      |
| value    | 唯一标识 | string         | —      | —      |
| icon     | 图标类型 | string         | —      | —      |
| to       | 跳转路由 | RouteRecordRaw | —      | —      |
| disabled | 是否禁用 | boolean        | —      | false  |

### 事件

| 事件名 | 说明               | 回调参数            |
| ------ | ------------------ | ------------------- |
| change | 点击面包屑项时触发 | (item: `ValueType`) |

### 样式变量

面包屑组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名               | 说明           |
| -------------------- | -------------- |
| $theme-color-primary | 主题色-主要    |
| $text-color-default  | 默认文本颜色   |
| $font-size-default   | 默认字体大小   |
| $opacity-disabled    | 禁用状态透明度 |
