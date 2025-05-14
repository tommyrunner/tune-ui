# 按钮组件

![按钮组件](/components/button.png)

按钮用于开始一个即时操作，标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## 基础用法

按钮有六种类型：默认按钮、主要按钮、成功按钮、信息按钮、警告按钮、危险按钮和文本按钮。

<demo component-name="button" examples="basic"></demo>

## 禁用状态

按钮不可用状态，通过设置 `disabled` 属性为 `true` 来禁用按钮。

<demo component-name="button" examples="disabled"></demo>

## 图标按钮

带图标的按钮可增强按钮的可识别性，使用 `prefixIcon` 和 `suffixIcon` 属性分别设置前缀和后缀图标。

<demo component-name="button" examples="icon"></demo>

## 加载状态

点击按钮后进行数据加载操作，在按钮上显示加载状态，通过设置 `loading` 属性为 `true` 来显示加载中状态。

<demo component-name="button" examples="loading"></demo>

## 按钮尺寸

Button 组件提供了三种尺寸：大型按钮、默认按钮和小型按钮，通过设置 `size` 属性来控制按钮的大小。

<demo component-name="button" examples="size"></demo>

## 按钮圆角

通过设置 `radius` 属性控制按钮的圆角样式，提供 `default`、`round` 和 `circle` 三种圆角类型。

<demo component-name="button" examples="radius"></demo>

## 自定义颜色

你可以通过 `color` 属性自定义按钮的主题颜色。

<demo component-name="button" examples="color"></demo>

## 缩放效果

按钮默认具有点击缩放效果，可以通过设置 `scale` 属性为 `false` 来关闭这一效果。

<demo component-name="button" examples="scale"></demo>

## 按钮 API

### 属性

| 属性名     | 说明             | 类型    | 可选值                                                       | 默认值  |
| ---------- | ---------------- | ------- | ------------------------------------------------------------ | ------- |
| type       | 按钮类型         | string  | default / primary / success / warning / danger / info / text | default |
| size       | 按钮尺寸         | string  | large / default / small                                      | default |
| disabled   | 是否禁用         | boolean | true / false                                                 | false   |
| loading    | 是否加载中       | boolean | true / false                                                 | false   |
| prefixIcon | 前缀图标         | string  | —                                                            | —       |
| suffixIcon | 后缀图标         | string  | —                                                            | —       |
| radius     | 按钮圆角类型     | string  | default / round / circle                                     | default |
| color      | 自定义按钮颜色   | string  | —                                                            | —       |
| scale      | 是否启用缩放效果 | boolean | true / false                                                 | true    |
| htmlType   | 原生button类型   | string  | button / submit / reset                                      | button  |

### 事件

| 事件名 | 说明           | 参数                |
| ------ | -------------- | ------------------- |
| click  | 点击按钮时触发 | (event: `MouseEvent`) |

### 插槽

| 插槽名  | 说明       |
| ------- | ---------- |
| default | 按钮的内容 |

### 样式变量

按钮组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明         |
| --------------------- | ------------ |
| $theme-color-primary  | 主题色-主要  |
| $theme-color-success  | 主题色-成功  |
| $theme-color-info     | 主题色-信息  |
| $theme-color-warning  | 主题色-警告  |
| $theme-color-danger   | 主题色-危险  |
| $text-color-default   | 默认文本颜色 |
| $bg-color-default     | 默认背景颜色 |
| $border-color-default | 默认边框颜色 |
| $font-size-default    | 默认字体大小 |
| $font-size-small      | 小号字体大小 |
| $font-size-large      | 大号字体大小 |
