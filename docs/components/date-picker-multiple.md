# 多选日期选择器组件

![多选日期选择器组件](/components/date-picker-multiple.png)

多选日期选择器组件允许用户选择多个日期或日期范围。支持不同的日期格式化选项、多种选择模式和快捷选项功能。

## 基础用法

多选日期选择器提供了两种选择模式：日期范围选择和多个日期选择。

<demo component-name="date-picker-multiple" examples="basic"></demo>

## 不同模式

组件支持多种选择模式：日期、月份和年份。

<demo component-name="date-picker-multiple" examples="modes"></demo>

## 不同尺寸

组件提供了三种尺寸：small、default、large。

<demo component-name="date-picker-multiple" examples="size"></demo>

## 不同状态

组件可以设置为禁用状态，也可以通过 `disabled-date` 函数自定义禁用特定日期。

<demo component-name="date-picker-multiple" examples="status"></demo>

## 格式化

可以使用 `value-format` 和 `format` 分别控制值的格式和显示格式。

<demo component-name="date-picker-multiple" examples="format"></demo>

## 日期时间选择

设置 `show-time` 属性可以在选择日期的同时选择时间。

<demo component-name="date-picker-multiple" examples="date-time"></demo>

## 快捷选项

通过 `shortcuts` 属性可以设置快捷选项，提供预设的日期选择。

<demo component-name="date-picker-multiple" examples="shortcuts"></demo>

## 自定义位置

通过 `position` 属性可以设置下拉面板的弹出位置。

<demo component-name="date-picker-multiple" examples="position"></demo>

## 事件处理

多选日期选择器提供了多种事件，如 `change`、`clear`、`focus` 等。

<demo component-name="date-picker-multiple" examples="events"></demo>

## 多选日期选择器组件 API

### 属性

| 属性名        | 说明               | 类型                             | 可选值                      | 默认值  |
| ------------- | ------------------ | -------------------------------- | --------------------------- | ------- |
| v-model       | 绑定值             | `Date[] \| string[] \| number[]` | —                           | []      |
| mode          | 日期选择器模式     | string                           | date / month / year         | date    |
| disabled      | 是否禁用           | boolean                          | —                           | false   |
| disabled-date | 不可选择的日期     | `(date: Date) => boolean`        | —                           | —       |
| show-time     | 是否显示时间选择器 | boolean                          | —                           | false   |
| value-format  | 值的格式化         | string                           | —                           | —       |
| format        | 显示格式化         | string                           | —                           | —       |
| placeholder   | 占位符             | string                           | —                           | —       |
| clearable     | 是否可清空         | boolean                          | —                           | true    |
| position      | 弹出位置           | string                           | top / bottom / left / right | bottom  |
| size          | 尺寸               | string                           | small / default / large     | default |
| is-range      | 是否为范围选择模式 | boolean                          | —                           | false   |
| shortcuts     | 快捷选项列表       | ShortcutType[]                   | —                           | —       |
| is-tip        | 是否显示提示       | boolean                          | —                           | true    |
| tip-text      | 提示文本           | string                           | —                           | —       |
| tip-position  | 提示位置           | string                           | top / bottom / left / right | —       |

### ShortcutType 类型

| 属性名 | 说明         | 类型                               | 可选值 | 默认值 |
| ------ | ------------ | ---------------------------------- | ------ | ------ |
| label  | 快捷选项标签 | string                             | —      | —      |
| value  | 快捷选项值   | `DateType[] \| (() => DateType[])` | —      | —      |

### 事件

| 事件名            | 说明                 | 回调参数                                  |
| ----------------- | -------------------- | ----------------------------------------- |
| change            | 日期变化时触发       | (value: `Date[] \| string[] \| number[]`) |
| panel-change      | 面板变化时触发       | (mode: 'date \| month \| year')           |
| clear             | 清空时触发           | —                                         |
| focus             | 获得焦点时触发       | —                                         |
| blur              | 失去焦点时触发       | —                                         |
| date-dialog-open  | 日期对话框打开时触发 | —                                         |
| date-dialog-close | 日期对话框关闭时触发 | —                                         |

### 插槽

| 插槽名 | 说明             | 作用域参数       |
| ------ | ---------------- | ---------------- |
| prefix | 输入框前缀内容   | —                |
| date   | 自定义日期单元格 | { date: `Date` } |
| footer | 日历面板底部区域 | —                |

### 样式变量

多选日期选择器组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明         |
| --------------------- | ------------ |
| $border-color-default | 边框颜色     |
| $bg-color-default     | 背景色       |
| $theme-color-primary  | 主题色       |
| $text-color-default   | 文本颜色     |
| $font-size-small      | 小号字体大小 |
| $font-size-default    | 默认字体大小 |
| $font-size-large      | 大号字体大小 |
| $bg-color-hover       | 悬停背景色   |
