# 开关组件

![开关组件](/components/switch.png)

开关组件用于表示两种相互对立的状态，用户可以通过点击来切换状态。

## 基础用法

基础的开关用法，通过`v-model`绑定开关的值。

<demo component-name="switch" examples="basic"></demo>

## 禁用状态

设置`disabled`属性可以禁用开关。

<demo component-name="switch" examples="disabled"></demo>

## 加载状态

设置`loading`属性可以显示加载状态。

<demo component-name="switch" examples="loading"></demo>

## 不同样式

设置`radius`属性可以改变开关的样式，支持`default`（圆形）和`square`（方形）。

<demo component-name="switch" examples="radius"></demo>

## 自定义颜色

通过`onBgColor`和`offBgColor`属性可以自定义开关的背景颜色。

<demo component-name="switch" examples="color"></demo>

## 不同尺寸

开关支持三种尺寸：small、default 和 large。

<demo component-name="switch" examples="size"></demo>

## 自定义内容

使用`onContent`和`offContent`插槽可以自定义开关的内容。

<demo component-name="switch" examples="content"></demo>

## 事件处理

开关提供了`change`事件，在状态改变时触发。

<demo component-name="switch" examples="events"></demo>

## 开关 API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model | 绑定值 | boolean | — | — |
| size | 尺寸 | string | small / default / large | default |
| disabled | 是否禁用 | boolean | — | false |
| loading | 是否为加载状态 | boolean | — | false |
| radius | 按钮圆角类型 | string | default / square | default |
| onBgColor | 开启状态的背景颜色 | string | — | — |
| offBgColor | 关闭状态的背景颜色 | string | — | — |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 状态改变时触发 | (value: `boolean`) |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| onContent | 开启状态内容 |
| offContent | 关闭状态内容 |

### 样式变量

开关组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明           |
| --------------------- | -------------- |
| $theme-color-primary  | 主题色-主要    |
| $theme-color-danger   | 主题色-危险    |
| $color-white          | 白色           |
| $color-black          | 黑色           |
| $bg-color-default     | 默认背景颜色   |
| $opacity-disabled     | 禁用状态透明度 |
| $font-size-small      | 小号字体大小   |
| $font-size-default    | 默认字体大小   |
| $font-size-large      | 大号字体大小   |
