# 输入框组件

![输入框组件](/components/input.png)

输入框是用户录入数据的基础表单控件，支持各种类型的输入。

## 基础用法

基础输入框用于输入单行文本。

<demo component-name="input" examples="basic"></demo>

## 禁用状态

设置 `disabled` 属性可以禁用输入框。

<demo component-name="input" examples="disabled"></demo>

## 密码输入框

设置 `password` 属性可以创建密码输入框，支持显示/隐藏密码切换。

<demo component-name="input" examples="password"></demo>

## 可清除输入框

默认情况下，设置了 `v-model` 的输入框在输入内容后会显示清除图标，点击可以清空内容。

<demo component-name="input" examples="clearable"></demo>

## 不同尺寸

输入框支持三种尺寸：small、default 和 large。

<demo component-name="input" examples="size"></demo>

## 最大输入长度

设置 `maxLength` 属性可以限制最大输入长度。

<demo component-name="input" examples="maxlength"></demo>

## 事件处理

输入框提供了多种事件：focus、blur、enter、input、clear。

<demo component-name="input" examples="events"></demo>

## 输入框 API

### 属性

| 属性名        | 说明             | 类型                | 可选值                  | 默认值  |
| ------------- | ---------------- | ------------------- | ----------------------- | ------- |
| v-model       | 绑定值           | string              | —                       | —       |
| size          | 尺寸             | string              | small / default / large | default |
| placeholder   | 占位文本         | string              | —                       | —       |
| disabled      | 是否禁用         | boolean             | —                       | false   |
| clearable     | 是否可清空       | boolean             | —                       | true    |
| password      | 是否为密码框     | boolean             | —                       | false   |
| maxLength     | 最大输入长度     | number              | —                       | —       |
| debounce      | 防抖回调函数     | (value: string) => void | —                  | —       |
| debounceDelay | 防抖延迟时间(ms) | number              | —                       | 1000    |
| autocomplete  | 自动完成         | string              | on / off                | off     |
| isTip         | 是否显示提示     | boolean             | —                       | true    |

### 事件

| 事件名 | 说明                 | 回调参数           |
| ------ | -------------------- | ------------------ |
| focus  | 获取焦点时触发       | (value: `string`)    |
| blur   | 失去焦点时触发       | (value: `string`)    |
| enter  | 按下回车键时触发     | (value: `string`)    |
| input  | 输入值变化时触发     | (value: `string`)    |
| clear  | 点击清空按钮时触发   | —                  |

### 插槽

| 插槽名  | 说明             |
| ------- | ---------------- |
| prefix  | 输入框头部内容   |
| default | 输入框默认内容   |

### 样式变量

输入框组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名               | 说明           |
| -------------------- | -------------- |
| $theme-color-primary | 主题色-主要    |
| $text-color-default  | 默认文本颜色   |
| $border-color-default | 默认边框颜色  |
| $bg-color-default    | 默认背景颜色   |
| $opacity-disabled    | 禁用状态透明度 |
| $font-size-small     | 小号字体大小   |
| $font-size-default   | 默认字体大小   |
| $font-size-large     | 大号字体大小   |
