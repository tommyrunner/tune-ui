<script setup lang="ts">
import scrollbarBasic from '../examples/scrollbar/basic.vue'
import scrollbarPermanent from '../examples/scrollbar/permanent.vue'
import scrollbarHorizontal from '../examples/scrollbar/horizontal.vue'
import scrollbarEvents from '../examples/scrollbar/events.vue'
import scrollbarHeight from '../examples/scrollbar/height.vue'
</script>

# 滚动条组件

![滚动条组件](/components/scrollbar.png)

滚动条组件提供了一个自定义样式的滚动条容器，用于替代浏览器原生滚动条，支持垂直和水平滚动，可自定义样式和行为。

## 基础用法

最基本的用法是创建一个具有固定高度的滚动容器，当内容超出容器高度时，会自动显示滚动条。

<demo :component="scrollbarBasic" name="scrollbar" examples="basic" />

## 常驻滚动条

默认情况下，滚动条仅在悬停时显示，设置`permanent`属性为`true`可以让滚动条常驻显示。

<demo :component="scrollbarPermanent" name="scrollbar" examples="permanent" />

## 水平滚动

当内容宽度超出容器宽度时，会自动显示水平滚动条。

<demo :component="scrollbarHorizontal" name="scrollbar" examples="horizontal" />

## 滚动事件

滚动条组件提供了垂直滚动和水平滚动事件，可以实时获取滚动位置。

<demo :component="scrollbarEvents" name="scrollbar" examples="events" />

## 自定义高度

通过`height`属性可以指定滚动容器的高度。

<demo :component="scrollbarHeight" name="scrollbar" examples="height" />

## 滚动条 API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| `height` | 容器高度 | `number` | — | `300` |
| `permanent` | 滚动条是否常驻 | `boolean` | — | `false` |

### 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `scroll-y` | 垂直滚动事件 | `(element: HTMLElement)` |
| `scroll-x` | 水平滚动事件 | `(element: HTMLElement)` |
| `click-track` | 滚动条轨道点击事件 | `(element: HTMLElement)` |

### 插槽

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| `default` | 滚动容器的内容 | — |

### 方法

组件暴露了以下方法，可以通过ref调用：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| `scrollTo` | 滚动到指定位置 | `(options: ScrollToOptions)` |
| `updateScrollbar` | 更新滚动条状态 | — |
| `setScrollbar` | 设置滚动条位置 | `(mobile: number, direction: 'top' \| 'left' \| 'none')` |

### 样式变量

滚动条组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名 | 说明 | 
|--------|------|
| $scrollbar-size | 滚动条大小 |
| $scrollbar-bg | 滚动条背景色 |
| $scrollbar-thumb-color | 滚动条滑块颜色 |
| $bg-color-default | 默认背景颜色 | 