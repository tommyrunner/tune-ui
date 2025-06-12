<script setup lang="ts">
import calendarBasic from '../examples/calendar/basic.vue'
import calendarModes from '../examples/calendar/modes.vue'
import calendarFormat from '../examples/calendar/format.vue'
import calendarCustomCell from '../examples/calendar/custom-cell.vue'
import calendarDisabledDate from '../examples/calendar/disabled-date.vue'
import calendarTimePicker from '../examples/calendar/time-picker.vue'
import calendarCustomFooter from '../examples/calendar/custom-footer.vue'
</script>

# 日历组件

![日历组件](/components/calendar.png)

日历组件用于展示和选择日期，支持多种视图模式、日期格式化和自定义样式。

## 基础用法

最简单的用法是提供一个双向绑定的日期值，组件会显示当前月份的日历并允许选择日期。

<demo :component="calendarBasic" name="calendar" examples="basic" />

## 不同视图模式

Calendar组件支持三种视图模式：日期(`date`)、月份(`month`)、年份(`year`)，可以通过`mode`属性来指定。

<demo :component="calendarModes" name="calendar" examples="modes" />

## 格式化输出

Calendar组件支持通过`value-format`属性指定日期的输出格式，组件将返回指定格式的字符串而不是Date对象。

<demo :component="calendarFormat" name="calendar" examples="format" />

## 自定义日期单元格

通过插槽`date`自定义日期单元格的内容和样式，可以添加假日标记、活动标记等。

<demo :component="calendarCustomCell" name="calendar" examples="custom-cell" />

## 禁用日期

通过`disabled-date`属性可以指定哪些日期不可选择，该属性接收一个函数，返回`true`表示禁用。

<demo :component="calendarDisabledDate" name="calendar" examples="disabled-date" />

## 时间选择器

通过设置`show-time`属性可以开启时间选择功能，可以同时选择日期和时间。

<demo :component="calendarTimePicker" name="calendar" examples="time-picker" />

## 自定义底部

通过插槽`footer`可以自定义日历底部内容，例如添加快捷按钮。

<demo :component="calendarCustomFooter" name="calendar" examples="custom-footer" />

## 日历 API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| `v-model` | 绑定值 | `Date` / `string` / `number` | — | — |
| `mode` | 日历模式 | `string` | `date` / `month` / `year` | `date` |
| `disabled` | 是否禁用 | `boolean` | — | `false` |
| `disabled-date` | 不可选择的日期 | `function(date: Date)` | — | — |
| `show-time` | 是否显示时间选择器 | `boolean` | — | `false` |
| `disabled-time-view` | 是否禁用时间选择视图 | `boolean` | — | `true` |
| `value-format` | 值的格式化，例如 YYYY-MM-DD | `string` | — | — |
| `is-select` | 是否可以选择日期 | `boolean` | — | `true` |

### 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `change` | 日期变化 | `(value: Date / string / number)` |
| `panel-change` | 面板模式变化 | `(mode: 'date' / 'month' / 'year')` |
| `jump-to-date` | 跳转到指定日期 | `(date: Date)` |
| `time-change` | 时间变化 | `(date: Date)` |
| `time-dialog-open` | 时间对话框打开 | — |
| `time-dialog-close` | 时间对话框关闭 | — |

### 插槽

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| `date` | 自定义日期单元格内容 | `{ date: Date }` |
| `month` | 自定义月份单元格内容 | `{ month: number, index: number }` |
| `year` | 自定义年份单元格内容 | `{ year: number }` |
| `footer` | 自定义日历底部内容 | — |
| `time-picker` | 自定义时间选择器 | — |

### 方法

组件暴露了以下方法，可以通过ref调用：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| `jumpToDate` | 跳转到指定日期 | `(date: Date)` |
| `switchPanelMode` | 切换面板模式 | `(mode: 'date' / 'month' / 'year')` |
| `currentYear` | 获取当前年份（计算属性） | - |
| `currentMonth` | 获取当前月份（计算属性） | - |
| `tempMode` | 获取当前临时模式 | - |

### 样式变量

日历组件使用了以下样式变量，可通过CSS变量进行自定义：

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `--t-calendar-bg-color` | 日历背景色 | `#fff` |
| `--t-calendar-border-color` | 日历边框颜色 | `#e4e7ed` |
| `--t-calendar-text-color` | 日历文本颜色 | `#303133` |
| `--t-calendar-date-hover-bg` | 日期悬停背景色 | `#f2f6fc` |
| `--t-calendar-date-active-bg` | 日期激活背景色 | `#409eff` |
| `--t-calendar-date-active-color` | 日期激活文本颜色 | `#fff` |
| `--t-calendar-disabled-bg` | 禁用日期背景色 | `#f5f7fa` |
| `--t-calendar-disabled-color` | 禁用日期文本颜色 | `#c0c4cc` | 