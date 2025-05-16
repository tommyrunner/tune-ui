# 分割线组件

![分割线组件](/components/divider.png)

分割线组件用于区隔内容的分组，可以在视觉上将内容分隔开，更好地组织页面结构。

## 基础用法

最基础的分割线，默认为水平分割线。

<demo component-name="divider" examples="basic"></demo>

## 方向

分割线有水平和垂直两种方向，默认为水平方向。

<demo component-name="divider" examples="direction"></demo>

## 不同样式

分割线支持不同的边框样式：实线（默认）、虚线、点线和双线。

<demo component-name="divider" examples="style"></demo>

## 带文本的分割线

可以在分割线中嵌入文本内容，支持自定义文本位置。

<demo component-name="divider" examples="with-text"></demo>

## 分割线 API

### 属性

| 属性名          | 说明       | 类型   | 可选值                           | 默认值     |
| --------------- | ---------- | ------ | -------------------------------- | ---------- |
| direction       | 分割线方向 | string | horizontal / vertical            | horizontal |
| borderStyle     | 分割线样式 | string | solid / dashed / dotted / double | solid      |
| contentPosition | 文本位置   | string | left / center / right            | center     |

### 插槽

| 插槽名  | 说明               |
| ------- | ------------------ |
| default | 分割线内的文本内容 |

### 样式变量

分割线组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明         |
| --------------------- | ------------ |
| $border-color-default | 分割线颜色   |
| $text-color-default   | 文本颜色     |
| $bg-color-default     | 背景颜色     |
| $font-size-default    | 默认字体大小 |
