<script setup lang="ts">
import inputNumberBasic from '../examples/input-number/basic.vue'
import inputNumberStep from '../examples/input-number/step.vue'
import inputNumberRange from '../examples/input-number/range.vue'
import inputNumberControls from '../examples/input-number/controls.vue'
import inputNumberSize from '../examples/input-number/size.vue'
import inputNumberRangeInput from '../examples/input-number/range-input.vue'
</script>

# InputNumber Component

![InputNumber Component](/components/input-number.png)

InputNumber is a special input component designed specifically for entering numbers, providing increment and decrement buttons for users to adjust values.

## Basic Usage

Basic number input that supports entering numbers and adjusting values through control buttons.

<demo :component="inputNumberBasic" name="input-number" examples="basic" />

## Step Setting

Set the step size for value changes through the `step` attribute, default is 1.

<demo :component="inputNumberStep" name="input-number" examples="step" />

## Value Range Limitation

Limit the input value range through `min-value` and `max-value` attributes.

<demo :component="inputNumberRange" name="input-number" examples="range" />

## Control Buttons

Control whether to show increment/decrement buttons through the `is-controls` attribute, default is true.

<demo :component="inputNumberControls" name="input-number" examples="controls" />

## Different Sizes

InputNumber supports three sizes: small, default, and large.

<demo :component="inputNumberSize" name="input-number" examples="size" />

## Range Input

Set the `is-range` attribute to enable range input mode, allowing input of two values simultaneously.

<demo :component="inputNumberRangeInput" name="input-number" examples="range-input" />

## InputNumber API

### Attributes

| Attribute      | Description           | Type                               | Accepted Values         | Default |
| -------------- | --------------------- | ---------------------------------- | ----------------------- | ------- |
| v-model        | Binding value         | number / number[]                  | —                       | —       |
| size           | Size                  | string                             | small / default / large | default |
| placeholder    | Placeholder text      | string                             | —                       | —       |
| disabled       | Whether disabled      | boolean                            | —                       | false   |
| step           | Counter step          | number                             | —                       | 1       |
| min-value      | Minimum value         | number                             | —                       | —       |
| max-value      | Maximum value         | number                             | —                       | —       |
| is-range       | Whether range input   | boolean                            | —                       | false   |
| is-controls    | Whether show control buttons | boolean                      | —                       | true    |
| debounce       | Debounce callback     | (value: number / number[]) => void | —                       | —       |
| debounce-delay | Debounce delay (ms)   | number                             | —                       | 1000    |

### Events

| Event Name | Description                    | Parameters                 |
| ---------- | ------------------------------ | -------------------------- |
| focus      | Triggered when input is focused| (value: number / number[]) |
| blur       | Triggered when input loses focus| (value: number / number[]) |
| enter      | Triggered when Enter key is pressed| (value: number / number[]) |
| input      | Triggered when input value changes| (value: number / number[]) |
| clear      | Triggered when clear button is clicked| —                    |

### Slots

| Slot Name | Description                    |
| --------- | ------------------------------ |
| default   | Input default content          |
| spe       | Range selector separator content |

### Style Variables

The InputNumber component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description           |
| --------------------- | --------------------- |
| $theme-color-primary  | Theme color - Primary |
| $border-color-default | Border color - Default |
| $text-color-default   | Text color - Default  |
| $font-size-small      | Font size - Small     |
| $font-size-default    | Font size - Default   |
| $font-size-large      | Font size - Large     |
