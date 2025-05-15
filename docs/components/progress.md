# 进度条组件

![进度条组件](/components/progress.png)

进度条组件用于展示操作的当前进度，让用户了解当前任务的完成情况。

## 基础用法

基础进度条用于展示百分比进度。

<demo component-name="progress" examples="basic"></demo>

## 进度条状态

进度条提供了四种状态：默认、成功、警告和异常。

<demo component-name="progress" examples="status"></demo>

## 文本内显

设置 `textInside` 属性可以将百分比显示在进度条内部。

<demo component-name="progress" examples="text-inside"></demo>

## 自定义颜色

通过 `color` 属性可以自定义进度条颜色，支持单色、多色区间和动态函数三种方式。

<demo component-name="progress" examples="color"></demo>

## 环形进度条

设置 `type` 为 `circle` 可以使用环形进度条。

<demo component-name="progress" examples="circle"></demo>

## 仪表盘形进度条

设置 `type` 为 `dashboard` 可以使用仪表盘形进度条。

<demo component-name="progress" examples="dashboard"></demo>

## 条纹效果

设置 `striped` 属性可以让进度条呈现条纹效果，设置 `stripedFlow` 可以让条纹动起来。

<demo component-name="progress" examples="striped"></demo>

## 自定义尺寸

设置 `strokeWidth` 属性可以改变进度条的粗细，对于环形和仪表盘进度条，还可以通过 `width` 属性设置整体尺寸。

<demo component-name="progress" examples="size"></demo>

## 不确定进度

设置 `indeterminate` 属性可以创建不确定进度效果，适用于无法准确获知进度的场景。

<demo component-name="progress" examples="indeterminate"></demo>

## 自定义文本格式

通过 `format` 属性可以自定义显示文本格式，也可以使用默认插槽完全自定义内容。

<demo component-name="progress" examples="format"></demo>

## 进度条 API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| percentage | 百分比值 | number | 0-100 | 0 |
| type | 进度条类型 | string | line / circle / dashboard | line |
| strokeWidth | 进度条宽度 | number | — | 6 |
| textInside | 是否在进度条内显示文字 | boolean | — | false |
| status | 进度条状态 | string | success / warning / exception | — |
| indeterminate | 是否为不确定进度条 | boolean | — | false |
| duration | 动画持续时间 | number | — | 3 |
| color | 进度条颜色 | string / function / array | — | — |
| width | 环形/仪表盘进度条宽度 | number | — | 126 |
| showText | 是否显示进度文字 | boolean | — | true |
| strokeLinecap | 进度条端点形状 | string | butt / round / square | round |
| format | 自定义文本格式 | function(percentage) | — | — |
| striped | 是否有条纹 | boolean | — | false |
| stripedFlow | 条纹是否流动 | boolean | — | false |

### 插槽

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| default | 自定义进度条文本内容 | { percentage: number } |

### 样式变量

进度条组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名 | 说明 |
| --- | --- |
| $theme-color-primary | 主题色-主要 |
| $theme-color-success | 主题色-成功 |
| $theme-color-warning | 主题色-警告 |
| $theme-color-danger | 主题色-危险 |
| $color-white | 颜色-白色 |
| $text-color-default | 文本颜色-默认 | 