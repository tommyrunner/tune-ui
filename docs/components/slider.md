# 滑块组件

![滑块组件](/components/slider.png)

滑块组件允许用户在一个固定区间内通过滑动来选择一个值或一个范围。

## 基础用法

基础滑块用于在连续或离散的区间内选择单个值。

<demo component-name="slider" examples="basic"></demo>

## 范围选择

设置 `range` 属性可以开启范围选择，适用于需要选择某个数值区间的场景。

<demo component-name="slider" examples="range"></demo>

## 显示间断点

当 `step` 不为 1 时，可以设置 `show-stops` 属性显示间断点，让用户更清晰地知道可选的值。

<demo component-name="slider" examples="stops"></demo>

## 带标记的滑块

使用 `marks` 属性可以自定义滑块上的标记，每个标记可以是简单的文本或带有自定义样式的对象。

<demo component-name="slider" examples="marks"></demo>

## 垂直滑块

设置 `vertical` 属性为 `true` 可以使滑块变为垂直方向，同时需要设置 `height` 指定滑块高度。

<demo component-name="slider" examples="vertical"></demo>

## 滑块与输入框结合

滑块可以与数字输入框组合使用，提供更精确的数值输入方式。

<demo component-name="slider" examples="input"></demo>

## 提示设置

可以通过 `show-tooltip`、`format-tooltip` 和 `placement` 属性自定义滑块的提示信息。

<demo component-name="slider" examples="tooltip"></demo>

## 事件处理

滑块组件提供了 `change` 和 `input` 事件，分别在值改变完成和值改变过程中触发。

<demo component-name="slider" examples="events"></demo>

## 滑块组件 API

### 属性

| 属性名        | 说明                   | 类型                          | 可选值                | 默认值  |
| ------------- | ---------------------- | ----------------------------- | --------------------- | ------- |
| v-model       | 绑定值                 | number / number[]             | —                     | —       |
| min           | 最小值                 | number                        | —                     | 0       |
| max           | 最大值                 | number                        | —                     | 100     |
| disabled      | 是否禁用               | boolean                       | —                     | false   |
| step          | 步长                   | number                        | —                     | 1       |
| size          | 滚动条大小（宽度/高度）| number                        | —                     | 6       |
| show-stops    | 是否显示间断点         | boolean                       | —                     | false   |
| show-tooltip  | 是否显示提示信息       | boolean                       | —                     | true    |
| format-tooltip | 格式化提示信息的函数   | (val: number) => string       | —                     | —       |
| range         | 是否开启选择范围       | boolean                       | —                     | false   |
| vertical      | 是否为垂直模式         | boolean                       | —                     | false   |
| height        | 滑块高度，垂直模式必填 | string                        | —                     | —       |
| tooltip-class | tooltip 的自定义类名   | string                        | —                     | —       |
| placement     | Tooltip 出现的位置     | string                        | top / right / bottom / left | top |
| marks         | 标记                   | `Record<number, string \| MarkObject>` | —             | —       |
| debounce      | 输入框去抖动延迟（毫秒）| number                       | —                     | 300     |
| status        | 状态类型               | string                        | success / exception / warning | — |

### 事件

| 事件名 | 说明                 | 回调参数                  |
| ------ | -------------------- | ------------------------- |
| change | 值改变完成时触发     | (value: `number \| number[]`) |
| input  | 值改变过程中触发     | (value: `number \| number[]`) |

### 插槽

| 插槽名 | 说明             | 作用域参数                    |
| ------ | ---------------- | ----------------------------- |
| button | 自定义滑块按钮   | { value: `number`, index: `number` } |

### 标记对象类型

当使用对象格式定义标记时，可以包含以下属性：

| 属性名 | 说明           | 类型                   |
| ------ | -------------- | ---------------------- |
| label  | 标记显示的文本 | string                 |
| style  | 标记的自定义样式 | `Record<string, string>` |

### 样式变量

滑块组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明           |
| --------------------- | -------------- |
| $theme-color-primary  | 主题色-主要    |
| $theme-color-success  | 主题色-成功    |
| $theme-color-warning  | 主题色-警告    |
| $theme-color-danger   | 主题色-危险    |
| $border-color-default | 边框颜色-默认  |
</rewritten_file> 