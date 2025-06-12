<script setup lang="ts">
import selectBasic from '../examples/select/basic.vue'
import selectDisabled from '../examples/select/disabled.vue'
import selectSize from '../examples/select/size.vue'
import selectClearable from '../examples/select/clearable.vue'
import selectMultiple from '../examples/select/multiple.vue'
import selectFilterable from '../examples/select/filterable.vue'
import selectCustom from '../examples/select/custom.vue'
import selectCascade from '../examples/select/cascade.vue'
</script>

# Select Component

![Select Component](/components/select.png)

Select is a form component that allows users to choose one or more options from a predefined list of options.

## Basic Usage

Basic select for choosing a single option from a dropdown list.

<demo :component="selectBasic" name="select" examples="basic" />

## Disabled State

Set the `disabled` attribute to disable the entire select, or set the `disabled` attribute of a specific option in `options` to disable that particular option.

<demo :component="selectDisabled" name="select" examples="disabled" />

## Different Sizes

Select supports three sizes: small, default, and large.

<demo :component="selectSize" name="select" examples="size" />

## Clearable

Set the `clearable` attribute to create a clearable select, allowing users to quickly clear selected items.

<demo :component="selectClearable" name="select" examples="clearable" />

## Multiple Mode

Set the `multiple` attribute to enable multiple selection mode, allowing users to select multiple options.

<demo :component="selectMultiple" name="select" examples="multiple" />

## Filterable and Remote Search

Set the `filterable` attribute to enable filtering functionality, supporting local filtering, or implement remote search through `remote-method`.

<demo :component="selectFilterable" name="select" examples="filterable" />

## Custom Options

Select supports customizing option content and prefix icons through slots.

<demo :component="selectCustom" name="select" examples="custom" />

## Cascade Selection

Select supports cascade selection functionality, configure multi-level data through the `children` attribute.

<demo :component="selectCascade" name="select" examples="cascade" />

## Select API

### Attributes

| Attribute       | Description                    | Type                             | Accepted Values         | Default     |
| --------------- | ------------------------------ | -------------------------------- | ----------------------- | ----------- |
| v-model         | Binding value                  | string / number / object / array | —                       | —           |
| v-model:loading | Loading state                  | boolean                          | —                       | false       |
| options         | Option data                    | array                            | —                       | []          |
| type            | Select type                    | string                           | input / text            | input       |
| size            | Size                           | string                           | small / default / large | default     |
| clearable       | Whether clearable              | boolean                          | —                       | true        |
| disabled        | Whether disabled               | boolean                          | —                       | false       |
| empty-text      | Text displayed when no data    | string                           | —                       | No data     |
| filterable      | Whether filterable             | boolean                          | —                       | false       |
| multiple        | Whether multiple selection     | boolean                          | —                       | false       |
| placeholder     | Placeholder text               | string                           | —                       | Please select |
| show-all-levels | Whether to show complete cascade path | boolean                   | —                       | true        |
| check-strictly  | Whether to strictly select leaf nodes | boolean                | —                       | true        |
| select-parent   | Whether parent can be selected | boolean                          | —                       | false       |
| remote-method   | Remote search method           | function(query)                  | —                       | —           |
| filter-method   | Custom filter method           | function(option, query)          | —                       | —           |

### Option Configuration

| Parameter | Description                      | Type                     | Accepted Values | Default |
| --------- | -------------------------------- | ------------------------ | --------------- | ------- |
| value     | Option value                     | string / number / object | —               | —       |
| label     | Option label                     | string                   | —               | —       |
| disabled  | Whether to disable this option   | boolean                  | —               | false   |
| children  | Child option list for cascade selection | array              | —               | —       |
| subLabel  | Option sub-label                 | string                   | —               | —       |

### Events

| Event Name     | Description                      | Parameters                      |
| -------------- | -------------------------------- | ------------------------------- |
| change         | Triggered when option changes    | (option: `OptionsItemType`)     |
| clear          | Triggered when clear button is clicked | —                        |
| visible-change | Triggered when dropdown visibility changes | (visible: `boolean`)   |
| focus          | Triggered when gaining focus     | (event: `FocusEvent`)           |
| blur           | Triggered when losing focus      | (event: `FocusEvent`)           |
| remove-tag     | Triggered when removing tag in multiple mode | (value: `SingleValueType`) |
| input          | Triggered when input value changes in filterable mode | (value: `string`) |
| cascade-change | Triggered when cascade menu switches | (path: `OptionsItemType[]`) |

### Methods

| Method Name | Description | Parameters |
| ----------- | ----------- | ---------- |
| focus       | Focus select | —          |
| blur        | Blur select  | —          |
| clear       | Clear selection | —       |

### Slots

| Slot Name     | Description                    | Scope Parameters                            |
| ------------- | ------------------------------ | ------------------------------------------- |
| default       | Custom option content          | { row: `OptionsItemType`, index: `number` } |
| prefix        | Select header content          | —                                           |
| multiple-view | Custom view in multiple mode   | { model: `ValueType` }                      |
| empty         | Custom empty state content     | —                                           |

### Style Variables

The select component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description            |
| --------------------- | ---------------------- |
| $theme-color-primary  | Theme color - Primary  |
| $border-color-default | Default border color   |
| $text-color-default   | Default text color     |
| $bg-color-default     | Default background color |
| $bg-color-hover       | Hover background color |
| $opacity-disabled     | Disabled state opacity |
| $font-size-small      | Small font size        |
| $font-size-default    | Default font size      |
| $font-size-large      | Large font size        |
| $color-white          | White color            |
| $z-index-up           | Upper layer z-index    |
