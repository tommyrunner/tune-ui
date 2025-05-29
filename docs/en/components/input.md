<script setup lang="ts">
import inputBasic from '../examples/input/basic.vue'
import inputDisabled from '../examples/input/disabled.vue'
import inputPassword from '../examples/input/password.vue'
import inputClearable from '../examples/input/clearable.vue'
import inputSize from '../examples/input/size.vue'
import inputMaxlength from '../examples/input/maxlength.vue'
import inputEvents from '../examples/input/events.vue'
</script>

# Input Component

![Input Component](/components/input.png)

Input is a basic form control for users to enter data, supporting various types of input.

## Basic Usage

Basic input for entering single-line text.

<demo :component="inputBasic" name="input" examples="basic" />

## Disabled State

Set the `disabled` attribute to disable the input.

<demo :component="inputDisabled" name="input" examples="disabled" />

## Password Input

Set the `password` attribute to create a password input with show/hide password toggle.

<demo :component="inputPassword" name="input" examples="password" />

## Clearable Input

By default, inputs with `v-model` will show a clear icon after entering content, which can be clicked to clear the content.

<demo :component="inputClearable" name="input" examples="clearable" />

## Different Sizes

Input supports three sizes: small, default, and large.

<demo :component="inputSize" name="input" examples="size" />

## Maximum Input Length

Set the `maxLength` attribute to limit the maximum input length.

<demo :component="inputMaxlength" name="input" examples="maxlength" />

## Event Handling

Input provides multiple events: focus, blur, enter, input, clear.

<demo :component="inputEvents" name="input" examples="events" />

## Input API

### Attributes

| Attribute     | Description           | Type                | Accepted Values         | Default |
| ------------- | --------------------- | ------------------- | ----------------------- | ------- |
| v-model       | Binding value         | string              | —                       | —       |
| size          | Size                  | string              | small / default / large | default |
| placeholder   | Placeholder text      | string              | —                       | —       |
| disabled      | Whether disabled      | boolean             | —                       | false   |
| clearable     | Whether clearable     | boolean             | —                       | true    |
| password      | Whether password input| boolean             | —                       | false   |
| maxLength     | Maximum input length  | number              | —                       | —       |
| debounce      | Debounce callback     | (value: string) => void | —                  | —       |
| debounceDelay | Debounce delay (ms)   | number              | —                       | 1000    |
| autocomplete  | Autocomplete          | string              | on / off                | off     |
| isTip         | Whether show tip      | boolean             | —                       | true    |

### Events

| Event Name | Description                    | Parameters         |
| ---------- | ------------------------------ | ------------------ |
| focus      | Triggered when input is focused| (value: `string`)  |
| blur       | Triggered when input loses focus| (value: `string`) |
| enter      | Triggered when Enter key is pressed| (value: `string`) |
| input      | Triggered when input value changes| (value: `string`) |
| clear      | Triggered when clear button is clicked| —            |

### Slots

| Slot Name | Description           |
| --------- | --------------------- |
| prefix    | Input prefix content  |
| default   | Input default content |

### Style Variables

The input component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description            |
| --------------------- | ---------------------- |
| $theme-color-primary  | Theme color - Primary  |
| $text-color-default   | Default text color     |
| $border-color-default | Default border color   |
| $bg-color-default     | Default background color |
| $opacity-disabled     | Disabled state opacity |
| $font-size-small      | Small font size        |
| $font-size-default    | Default font size      |
| $font-size-large      | Large font size        |
