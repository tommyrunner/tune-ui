# 复选框组件

![复选框组件](/components/checkbox.png)

复选框组件用于在一组选项中进行多选，用户单击选择后可以更改选中状态。

## 基础用法

基础复选框用于选择单个状态。

<demo component-name="checkbox" examples="basic"></demo>

## 禁用状态

设置 `disabled` 属性可以禁用复选框。

<demo component-name="checkbox" examples="disabled"></demo>

## 不同样式

设置 `radius` 属性可以改变复选框的样式，支持 `default`（圆形）和 `square`（方形，默认）。

<demo component-name="checkbox" examples="radius"></demo>

## 半选状态

设置 `indeterminate` 属性可以设置复选框为半选状态，通过 `indeterminateIcon` 属性可以自定义半选状态的图标。

<demo component-name="checkbox" examples="indeterminate"></demo>

## 自定义图标

设置 `icon` 属性可以自定义复选框的图标。

<demo component-name="checkbox" examples="icon"></demo>

## 不同尺寸

复选框支持三种尺寸：small、default 和 large。

<demo component-name="checkbox" examples="size"></demo>

## 复选框组

使用 `t-checkbox-group` 组件可以将多个复选框组合为一组，通过 `v-model` 绑定值。

<demo component-name="checkbox" examples="group"></demo>

## 复选框组类型

复选框组支持四种类型：`default`（默认）、`text`（文本）、`border`（边框）和 `button`（按钮）。

<demo component-name="checkbox" examples="group-type"></demo>

## 排列方向

通过 `direction` 属性设置复选框组的排列方向，支持 `row`（水平）和 `column`（垂直）。

<demo component-name="checkbox" examples="direction"></demo>

## 事件处理

复选框和复选框组提供了 `change` 事件。

<demo component-name="checkbox" examples="events"></demo>

## 复选框 API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model | 绑定值 | string / number / boolean / object | — | — |
| value | 选中时的值 | string / number / boolean / object | — | false |
| size | 尺寸 | string | small / default / large | default |
| radius | 选中图形样式 | string | default / square | square |
| objKey | 绑定对象类型的标记key | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| name | 原生name属性 | string | — | — |
| icon | 自定义图标类型 | string | — | — |
| indeterminate | 是否半选 | boolean | — | false |
| indeterminateIcon | 半选图标 | string | — | minus |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 值变化时触发 | (value: string / number / boolean / object) |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 复选框文本内容 |
| checkboxSpan | 自定义复选框图标 |

## 复选框组 API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model | 绑定值 | Array | — | — |
| size | 尺寸 | string | small / default / large | default |
| objKey | 绑定对象标记key | string | — | — |
| type | 复选框组类型 | string | default / text / border / button | button |
| direction | 排列方向 | string | column / row | row |
| immediateChange | 是否立即触发change事件 | boolean | — | false |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 值变化时触发 | (value: Array) |

### 样式变量

复选框组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名 | 说明 |
| --- | --- |
| $theme-color-primary | 主题色-主要 |
| $border-color-default | 边框颜色-默认 |
| $font-size-small | 字体大小-小 |
| $font-size-default | 字体大小-默认 |
| $font-size-large | 字体大小-大 |
 