<script setup lang="ts">
import datePickerMultipleBasic from '../examples/date-picker-multiple/basic.vue'
import datePickerMultipleModes from '../examples/date-picker-multiple/modes.vue'
import datePickerMultipleSize from '../examples/date-picker-multiple/size.vue'
import datePickerMultipleStatus from '../examples/date-picker-multiple/status.vue'
import datePickerMultipleFormat from '../examples/date-picker-multiple/format.vue'
import datePickerMultipleDateTime from '../examples/date-picker-multiple/date-time.vue'
import datePickerMultipleShortcuts from '../examples/date-picker-multiple/shortcuts.vue'
import datePickerMultiplePosition from '../examples/date-picker-multiple/position.vue'
import datePickerMultipleEvents from '../examples/date-picker-multiple/events.vue'
</script>

# DatePickerMultiple Component

![DatePickerMultiple Component](/components/date-picker-multiple.png)

DatePickerMultiple component allows users to select multiple dates or date ranges. It supports different date formatting options, multiple selection modes, and shortcut options functionality.

## Basic Usage

DatePickerMultiple provides two selection modes: date range selection and multiple date selection.

<demo :component="datePickerMultipleBasic" name="date-picker-multiple" examples="basic" />

## Different Modes

The component supports multiple selection modes: date, month, and year.

<demo :component="datePickerMultipleModes" name="date-picker-multiple" examples="modes" />

## Different Sizes

The component provides three sizes: small, default, and large.

<demo :component="datePickerMultipleSize" name="date-picker-multiple" examples="size" />

## Different States

The component can be set to disabled state, and can also customize disabled specific dates through the `disabled-date` function.

<demo :component="datePickerMultipleStatus" name="date-picker-multiple" examples="status" />

## Formatting

You can use `value-format` and `format` to control the value format and display format respectively.

<demo :component="datePickerMultipleFormat" name="date-picker-multiple" examples="format" />

## Date Time Selection

Setting the `show-time` attribute allows you to select time while selecting dates.

<demo :component="datePickerMultipleDateTime" name="date-picker-multiple" examples="date-time" />

## Shortcuts

Through the `shortcuts` attribute, you can set shortcut options to provide preset date selections.

<demo :component="datePickerMultipleShortcuts" name="date-picker-multiple" examples="shortcuts" />

## Custom Position

Through the `position` attribute, you can set the popup position of the dropdown panel.

<demo :component="datePickerMultiplePosition" name="date-picker-multiple" examples="position" />

## Event Handling

DatePickerMultiple provides various events such as `change`, `clear`, `focus`, etc.

<demo :component="datePickerMultipleEvents" name="date-picker-multiple" examples="events" />

## DatePickerMultiple Component API

### Attributes

| Attribute     | Description                | Type                             | Accepted Values             | Default |
| ------------- | -------------------------- | -------------------------------- | --------------------------- | ------- |
| v-model       | Binding value              | `Date[] \| string[] \| number[]` | —                           | []      |
| mode          | DatePicker mode            | string                           | date / month / year         | date    |
| disabled      | Whether disabled           | boolean                          | —                           | false   |
| disabled-date | Unselectable dates         | `(date: Date) => boolean`        | —                           | —       |
| show-time     | Whether to show time picker | boolean                         | —                           | false   |
| value-format  | Value formatting           | string                           | —                           | —       |
| format        | Display formatting         | string                           | —                           | —       |
| placeholder   | Placeholder                | string                           | —                           | —       |
| clearable     | Whether clearable          | boolean                          | —                           | true    |
| position      | Popup position             | string                           | top / bottom / left / right | bottom  |
| size          | Size                       | string                           | small / default / large     | default |
| is-range      | Whether range selection mode | boolean                        | —                           | false   |
| shortcuts     | Shortcut options list      | ShortcutType[]                   | —                           | —       |
| is-tip        | Whether to show tip        | boolean                          | —                           | true    |
| tip-text      | Tip text                   | string                           | —                           | —       |
| tip-position  | Tip position               | string                           | top / bottom / left / right | —       |

### ShortcutType Type

| Attribute | Description        | Type                               | Accepted Values | Default |
| --------- | ------------------ | ---------------------------------- | --------------- | ------- |
| label     | Shortcut option label | string                          | —               | —       |
| value     | Shortcut option value | `DateType[] \| (() => DateType[])` | —               | —       |

### Events

| Event Name        | Description                    | Callback Parameters                       |
| ----------------- | ------------------------------ | ----------------------------------------- |
| change            | Triggered when date changes    | (value: `Date[] \| string[] \| number[]`) |
| panel-change      | Triggered when panel changes   | (mode: 'date \| month \| year')           |
| clear             | Triggered when cleared         | —                                         |
| focus             | Triggered when focused         | —                                         |
| blur              | Triggered when blurred         | —                                         |
| date-dialog-open  | Triggered when date dialog opens | —                                       |
| date-dialog-close | Triggered when date dialog closes | —                                      |

### Slots

| Slot Name | Description              | Scope Parameters |
| --------- | ------------------------ | ---------------- |
| prefix    | Input prefix content     | —                |
| date      | Custom date cell         | { date: `Date` } |
| footer    | Calendar panel footer area | —              |

### Style Variables

DatePickerMultiple component uses the following style variables, which can be customized through SCSS variables:

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
