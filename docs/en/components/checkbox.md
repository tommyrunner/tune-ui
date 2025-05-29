<script setup lang="ts">
import checkboxBasic from '../examples/checkbox/basic.vue'
import checkboxDisabled from '../examples/checkbox/disabled.vue'
import checkboxRadius from '../examples/checkbox/radius.vue'
import checkboxIndeterminate from '../examples/checkbox/indeterminate.vue'
import checkboxIcon from '../examples/checkbox/icon.vue'
import checkboxSize from '../examples/checkbox/size.vue'
import checkboxGroup from '../examples/checkbox/group.vue'
import checkboxGroupType from '../examples/checkbox/group-type.vue'
import checkboxDirection from '../examples/checkbox/direction.vue'
import checkboxEvents from '../examples/checkbox/events.vue'
</script>

# Checkbox Component

![Checkbox Component](/components/checkbox.png)

Checkbox component is used for multiple selection from a group of options. Users can change the selected state by clicking.

## Basic Usage

Basic checkbox for selecting a single state.

<demo :component="checkboxBasic" name="checkbox" examples="basic" />

## Disabled State

Set the `disabled` attribute to disable the checkbox.

<demo :component="checkboxDisabled" name="checkbox" examples="disabled" />

## Different Styles

Set the `radius` attribute to change the checkbox style, supporting `default` (circular) and `square` (square, default).

<demo :component="checkboxRadius" name="checkbox" examples="radius" />

## Indeterminate State

Set the `indeterminate` attribute to set the checkbox to indeterminate state. Use the `indeterminateIcon` attribute to customize the indeterminate state icon.

<demo :component="checkboxIndeterminate" name="checkbox" examples="indeterminate" />

## Custom Icon

Set the `icon` attribute to customize the checkbox icon.

<demo :component="checkboxIcon" name="checkbox" examples="icon" />

## Different Sizes

Checkbox supports three sizes: small, default, and large.

<demo :component="checkboxSize" name="checkbox" examples="size" />

## Checkbox Group

Use the `t-checkbox-group` component to combine multiple checkboxes into a group, bind values through `v-model`.

<demo :component="checkboxGroup" name="checkbox" examples="group" />

## Checkbox Group Types

Checkbox group supports four types: `default` (default), `text` (text), `border` (border), and `button` (button).

<demo :component="checkboxGroupType" name="checkbox" examples="group-type" />

## Arrangement Direction

Set the arrangement direction of checkbox group through the `direction` attribute, supporting `row` (horizontal) and `column` (vertical).

<demo :component="checkboxDirection" name="checkbox" examples="direction" />

## Event Handling

Checkbox and checkbox group provide `change` events.

<demo :component="checkboxEvents" name="checkbox" examples="events" />

## Checkbox API

### Attributes

| Attribute         | Description                    | Type                               | Accepted Values         | Default |
| ----------------- | ------------------------------ | ---------------------------------- | ----------------------- | ------- |
| v-model           | Binding value                  | string / number / boolean / object | —                       | —       |
| value             | Value when selected            | string / number / boolean / object | —                       | false   |
| size              | Size                           | string                             | small / default / large | default |
| radius            | Selected shape style           | string                             | default / square        | square  |
| objKey            | Binding object type mark key   | string                             | —                       | —       |
| disabled          | Whether disabled               | boolean                            | —                       | false   |
| name              | Native name attribute          | string                             | —                       | —       |
| icon              | Custom icon type               | string                             | —                       | —       |
| indeterminate     | Whether indeterminate          | boolean                            | —                       | false   |
| indeterminateIcon | Indeterminate icon             | string                             | —                       | minus   |

### Events

| Event Name | Description                | Parameters                                         |
| ---------- | -------------------------- | -------------------------------------------------- |
| change     | Triggered when value changes | (value: `string` / `number` / `boolean` / `object`) |

### Slots

| Slot Name    | Description              |
| ------------ | ------------------------ |
| default      | Checkbox text content    |
| checkboxSpan | Custom checkbox icon     |

## Checkbox Group API

### Attributes

| Attribute       | Description                    | Type    | Accepted Values                  | Default |
| --------------- | ------------------------------ | ------- | -------------------------------- | ------- |
| v-model         | Binding value                  | Array   | —                                | —       |
| size            | Size                           | string  | small / default / large          | default |
| objKey          | Binding object mark key        | string  | —                                | —       |
| type            | Checkbox group type            | string  | default / text / border / button | button  |
| direction       | Arrangement direction          | string  | column / row                     | row     |
| immediateChange | Whether immediately trigger change event | boolean | —                          | false   |

### Events

| Event Name | Description                | Parameters      |
| ---------- | -------------------------- | --------------- |
| change     | Triggered when value changes | (value: `Array`) |

### Style Variables

The checkbox component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description            |
| --------------------- | ---------------------- |
| $theme-color-primary  | Theme color - Primary  |
| $border-color-default | Default border color   |
| $text-color-default   | Default text color     |
| $bg-color-default     | Default background color |
| $opacity-disabled     | Disabled state opacity |
| $font-size-small      | Small font size        |
| $font-size-default    | Default font size      |
| $font-size-large      | Large font size        |
| $color-white          | White color            |
 