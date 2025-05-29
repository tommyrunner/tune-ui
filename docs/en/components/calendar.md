<script setup lang="ts">
import calendarBasic from '../examples/calendar/basic.vue'
import calendarModes from '../examples/calendar/modes.vue'
import calendarFormat from '../examples/calendar/format.vue'
import calendarCustomCell from '../examples/calendar/custom-cell.vue'
import calendarDisabledDate from '../examples/calendar/disabled-date.vue'
import calendarTimePicker from '../examples/calendar/time-picker.vue'
import calendarCustomFooter from '../examples/calendar/custom-footer.vue'
</script>

# Calendar Component

![Calendar Component](/components/calendar.png)

Calendar component is used to display and select dates, supporting multiple view modes, date formatting, and custom styles.

## Basic Usage

The simplest usage is to provide a two-way bound date value. The component will display the current month's calendar and allow date selection.

<demo :component="calendarBasic" name="calendar" examples="basic" />

## Different View Modes

Calendar component supports three view modes: date (`date`), month (`month`), year (`year`), which can be specified through the `mode` attribute.

<demo :component="calendarModes" name="calendar" examples="modes" />

## Format Output

Calendar component supports specifying the output format of dates through the `value-format` attribute. The component will return a string in the specified format instead of a Date object.

<demo :component="calendarFormat" name="calendar" examples="format" />

## Custom Date Cells

Customize the content and style of date cells through the `date` slot, allowing you to add holiday markers, event markers, etc.

<demo :component="calendarCustomCell" name="calendar" examples="custom-cell" />

## Disabled Dates

Through the `disabled-date` attribute, you can specify which dates are not selectable. This attribute accepts a function that returns `true` to disable.

<demo :component="calendarDisabledDate" name="calendar" examples="disabled-date" />

## Time Picker

By setting the `show-time` attribute, you can enable time selection functionality to select both date and time simultaneously.

<demo :component="calendarTimePicker" name="calendar" examples="time-picker" />

## Custom Footer

Through the `footer` slot, you can customize the calendar footer content, such as adding shortcut buttons.

<demo :component="calendarCustomFooter" name="calendar" examples="custom-footer" />

## Calendar API

### Attributes

| Attribute | Description | Type | Accepted Values | Default |
|-----------|-------------|------|-----------------|---------|
| `v-model` | Binding value | `Date` / `string` / `number` | — | — |
| `mode` | Calendar mode | `string` | `date` / `month` / `year` | `date` |
| `disabled` | Whether disabled | `boolean` | — | `false` |
| `disabled-date` | Unselectable dates | `function(date: Date)` | — | — |
| `show-time` | Whether to show time picker | `boolean` | — | `false` |
| `disabled-time-view` | Whether to disable time selection view | `boolean` | — | `true` |
| `value-format` | Value format, e.g., YYYY-MM-DD | `string` | — | — |
| `is-select` | Whether dates can be selected | `boolean` | — | `true` |

### Events

| Event Name | Description | Callback Parameters |
|------------|-------------|-------------------|
| `change` | Date change | `(value: Date / string / number)` |
| `panel-change` | Panel mode change | `(mode: 'date' / 'month' / 'year')` |
| `jump-to-date` | Jump to specified date | `(date: Date)` |
| `time-change` | Time change | `(date: Date)` |
| `time-dialog-open` | Time dialog open | — |
| `time-dialog-close` | Time dialog close | — |

### Slots

| Slot Name | Description | Scope Parameters |
|-----------|-------------|------------------|
| `date` | Custom date cell content | `{ date: Date }` |
| `month` | Custom month cell content | `{ month: number, index: number }` |
| `year` | Custom year cell content | `{ year: number }` |
| `footer` | Custom calendar footer content | — |
| `time-picker` | Custom time picker | — |

### Methods

The component exposes the following methods, which can be called through ref:

| Method Name | Description | Parameters |
|-------------|-------------|------------|
| `jumpToDate` | Jump to specified date | `(date: Date)` |
| `switchPanelMode` | Switch panel mode | `(mode: 'date' / 'month' / 'year')` |

### Style Variables

Calendar component uses the following style variables, which can be customized through CSS variables:

| Variable Name | Description | Default Value |
|---------------|-------------|---------------|
| `--t-calendar-bg-color` | Calendar background color | `#fff` |
| `--t-calendar-border-color` | Calendar border color | `#e4e7ed` |
| `--t-calendar-text-color` | Calendar text color | `#303133` |
| `--t-calendar-date-hover-bg` | Date hover background color | `#f2f6fc` |
| `--t-calendar-date-active-bg` | Date active background color | `#409eff` |
| `--t-calendar-date-active-color` | Date active text color | `#fff` |
| `--t-calendar-disabled-bg` | Disabled date background color | `#f5f7fa` |
| `--t-calendar-disabled-color` | Disabled date text color | `#c0c4cc` | 