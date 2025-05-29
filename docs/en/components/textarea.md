<script setup lang="ts">
import textareaBasic from '../examples/textarea/basic.vue'
import textareaDisabled from '../examples/textarea/disabled.vue'
import textareaResize from '../examples/textarea/resize.vue'
import textareaEnter from '../examples/textarea/enter.vue'
import textareaMaxlength from '../examples/textarea/maxlength.vue'
import textareaDebounce from '../examples/textarea/debounce.vue'
import textareaSize from '../examples/textarea/size.vue'
import textareaEvents from '../examples/textarea/events.vue'
</script>

# Textarea Component

![Textarea Component](/components/textarea.png)

Textarea component for multi-line text input, supporting adaptive height, character limit, line break control, and other features.

## Basic Usage

Basic textarea usage, bind the textarea value through `v-model`.

<demo :component="textareaBasic" name="textarea" examples="basic" />

## Disabled State

Add the `disabled` attribute to disable the textarea.

<demo :component="textareaDisabled" name="textarea" examples="disabled" />

## Resize Control

Textarea can be resized by default. Use the `isResize` attribute to control whether resizing is allowed.

<demo :component="textareaResize" name="textarea" examples="resize" />

## Line Break Control

Textarea allows line breaks by default. Use the `isEnter` attribute to control whether line breaks are allowed.

<demo :component="textareaEnter" name="textarea" examples="enter" />

## Character Limit

Set the `maxLength` attribute to limit the maximum input length of the textarea. By default, it shows the current cursor line number and character count. Use the `isCursor` attribute to control whether to show cursor line number.

<demo :component="textareaMaxlength" name="textarea" examples="maxlength" />

## Debounced Input

Set the `debounce` attribute to implement debounced input, delaying the trigger of input events.

<demo :component="textareaDebounce" name="textarea" examples="debounce" />

## Different Sizes

Textarea supports three sizes: small, default, and large.

<demo :component="textareaSize" name="textarea" examples="size" />

## Event Handling

Textarea provides multiple events: focus, blur, enter, input.

<demo :component="textareaEvents" name="textarea" examples="events" />

## Textarea API

### Attributes

| Attribute     | Description                    | Type                    | Accepted Values         | Default |
| ------------- | ------------------------------ | ----------------------- | ----------------------- | ------- |
| v-model       | Binding value                  | string                  | —                       | —       |
| size          | Size                           | string                  | small / default / large | default |
| placeholder   | Placeholder text               | string                  | —                       | —       |
| disabled      | Whether disabled               | boolean                 | —                       | false   |
| maxLength     | Maximum input length           | number                  | —                       | —       |
| isCursor      | Whether show current cursor line number | boolean        | —                       | true    |
| isResize      | Whether allow resizing         | boolean                 | —                       | true    |
| isEnter       | Whether allow line break input | boolean                 | —                       | true    |
| isTip         | Whether show tip text          | boolean                 | —                       | true    |
| tip           | Custom tip text                | string                  | —                       | —       |
| tipClass      | Tip text class name            | string                  | —                       | —       |
| debounce      | Debounce event callback        | (data?: string) => void | —                       | —       |
| debounceDelay | Debounce delay time (ms)       | number                  | —                       | 1000    |

### Events

| Event Name | Description                    | Parameters        |
| ---------- | ------------------------------ | ----------------- |
| focus      | Triggered when gaining focus   | (value: `string`) |
| blur       | Triggered when losing focus    | (value: `string`) |
| input      | Triggered when input value changes | (value: `string`) |
| enter      | Triggered when Enter key is pressed | (value: `string`) |
| clear      | Triggered when clear button is clicked | —           |

### Style Variables

The textarea component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description           |
| --------------------- | --------------------- |
| $theme-color-primary  | Theme color - Primary |
| $border-color-default | Border color - Default |
| $font-size-default    | Font size - Default   | 