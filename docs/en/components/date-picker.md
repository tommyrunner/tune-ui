<script setup lang="ts">
import datePickerBasic from '../examples/date-picker/basic.vue'
import datePickerSize from '../examples/date-picker/size.vue'
import datePickerStatus from '../examples/date-picker/status.vue'
import datePickerFormat from '../examples/date-picker/format.vue'
import datePickerModes from '../examples/date-picker/modes.vue'
import datePickerDateTime from '../examples/date-picker/date-time.vue'
import datePickerDisabledDate from '../examples/date-picker/disabled-date.vue'
import datePickerPosition from '../examples/date-picker/position.vue'
import datePickerEvents from '../examples/date-picker/events.vue'
</script>

# DatePicker Component

![DatePicker Component](/components/date-picker.png)

DatePicker component allows users to select dates or date ranges. It supports different date formatting options and multiple selection modes.

## Basic Usage

Use `v-model` to bind the date value. By default, the value is a `Date` object.

<demo :component="datePickerBasic" name="date-picker" examples="basic" />

## Different Sizes

The component provides three sizes: small, default, and large.

<demo :component="datePickerSize" name="date-picker" examples="size" />

## Different States

The component can be set to different states such as disabled, readonly, and non-clearable.

<demo :component="datePickerStatus" name="date-picker" examples="status" />

## Formatting

You can use `value-format` and `format` to control the value format and display format respectively.

<demo :component="datePickerFormat" name="date-picker" examples="format" />

## Different Modes

DatePicker supports multiple selection modes: date, month, and year.

<demo :component="datePickerModes" name="date-picker" examples="modes" />

## Date Time Selection

Setting the `show-time` attribute allows you to select time while selecting a date.

<demo :component="datePickerDateTime" name="date-picker" examples="date-time" />

## Disabled Dates

Through the `disabled-date` function, you can customize which dates are not selectable.

<demo :component="datePickerDisabledDate" name="date-picker" examples="disabled-date" />

## Custom Position

Through the `position` attribute, you can set the popup position of the dropdown panel.

<demo :component="datePickerPosition" name="date-picker" examples="position" />

## Event Handling

DatePicker provides various events such as `change`, `clear`, `focus`, etc.

<demo :component="datePickerEvents" name="date-picker" examples="events" />

## DatePicker Component API

### Attributes

| Attribute        | Description                | Type                                                  | Accepted Values             | Default |
| ---------------- | -------------------------- | ----------------------------------------------------- | --------------------------- | ------- |
| v-model          | Binding value              | `Date \| string \| number`                            | —                           | —       |
| mode             | DatePicker mode            | string                                                | date / month / year         | date    |
| disabled         | Whether disabled           | boolean                                               | —                           | false   |
| readonly         | Whether readonly           | boolean                                               | —                           | false   |
| disabled-date    | Unselectable dates         | `(date: Date) => boolean`                             | —                           | —       |
| show-time        | Whether to show time picker | boolean                                              | —                           | false   |
| value-format     | Value formatting           | string                                                | —                           | —       |
| format           | Display formatting         | string                                                | —                           | —       |
| placeholder      | Placeholder                | string                                                | —                           | —       |
| clearable        | Whether clearable          | boolean                                               | —                           | true    |
| position         | Popup position             | string                                                | top / bottom / left / right | bottom  |
| size             | Size                       | string                                                | small / default / large     | default |
| is-tip           | Whether to show tip        | boolean                                               | —                           | true    |
| tip-text         | Tip text                   | string                                                | —                           | —       |
| tip-position     | Tip position               | string                                                | top / bottom / left / right | —       |
| default-time     | Default time               | `{ hours: number, minutes: number, seconds: number }` | —                           | —       |
| time-range-limit | Time range limit           | `{ minHour?: number, maxHour?: number }`              | —                           | —       |

### Events

| Event Name        | Description                    | Callback Parameters                 |
| ----------------- | ------------------------------ | ----------------------------------- |
| change            | Triggered when date changes    | (value: `Date \| string \| number`) |
| panel-change      | Triggered when panel changes   | (mode: 'date \| month \| year')     |
| clear             | Triggered when cleared         | —                                   |
| focus             | Triggered when focused         | —                                   |
| blur              | Triggered when blurred         | —                                   |
| time-dialog-open  | Triggered when time dialog opens | —                                 |
| time-dialog-close | Triggered when time dialog closes | —                                |
| date-dialog-open  | Triggered when date dialog opens | —                                 |
| date-dialog-close | Triggered when date dialog closes | —                                |

### Slots

| Slot Name | Description              | Scope Parameters |
| --------- | ------------------------ | ---------------- |
| prefix    | Input prefix content     | —                |
| date      | Custom date cell         | { date: `Date` } |
| footer    | Calendar panel footer area | —              |

### Style Variables

DatePicker component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description           |
| --------------------- | --------------------- |
| $border-color-default | Border color          |
| $bg-color-default     | Background color      |
| $theme-color-primary  | Theme color           |
| $text-color-default   | Text color            |
| $font-size-small      | Small font size       |
| $font-size-default    | Default font size     |
| $font-size-large      | Large font size       |
| $bg-color-hover       | Hover background color |
