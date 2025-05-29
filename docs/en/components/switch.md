<script setup lang="ts">
import switchBasic from '../examples/switch/basic.vue'
import switchDisabled from '../examples/switch/disabled.vue'
import switchLoading from '../examples/switch/loading.vue'
import switchRadius from '../examples/switch/radius.vue'
import switchColor from '../examples/switch/color.vue'
import switchSize from '../examples/switch/size.vue'
import switchContent from '../examples/switch/content.vue'
import switchEvents from '../examples/switch/events.vue'
</script>

# Switch Component

![Switch Component](/components/switch.png)

Switch component is used to represent two mutually opposing states, and users can toggle between states by clicking.

## Basic Usage

Basic switch usage, bind the switch value through `v-model`.

<demo :component="switchBasic" name="switch" examples="basic" />

## Disabled State

Set the `disabled` attribute to disable the switch.

<demo :component="switchDisabled" name="switch" examples="disabled" />

## Loading State

Set the `loading` attribute to display loading state.

<demo :component="switchLoading" name="switch" examples="loading" />

## Different Styles

Set the `radius` attribute to change the switch style, supporting `default` (circular) and `square` (square).

<demo :component="switchRadius" name="switch" examples="radius" />

## Custom Colors

Customize the switch background colors through `onBgColor` and `offBgColor` attributes.

<demo :component="switchColor" name="switch" examples="color" />

## Different Sizes

Switch supports three sizes: small, default, and large.

<demo :component="switchSize" name="switch" examples="size" />

## Custom Content

Use `onContent` and `offContent` slots to customize the switch content.

<demo :component="switchContent" name="switch" examples="content" />

## Event Handling

Switch provides a `change` event that is triggered when the state changes.

<demo :component="switchEvents" name="switch" examples="events" />

## Switch API

### Attributes

| Attribute  | Description                | Type    | Accepted Values         | Default |
| ---------- | -------------------------- | ------- | ----------------------- | ------- |
| v-model    | Binding value              | boolean | —                       | —       |
| size       | Size                       | string  | small / default / large | default |
| disabled   | Whether disabled           | boolean | —                       | false   |
| loading    | Whether in loading state   | boolean | —                       | false   |
| radius     | Button border radius type  | string  | default / square        | default |
| onBgColor  | Background color when on   | string  | —                       | —       |
| offBgColor | Background color when off  | string  | —                       | —       |

### Events

| Event Name | Description                    | Parameters        |
| ---------- | ------------------------------ | ----------------- |
| change     | Triggered when state changes   | (value: `boolean`) |

### Slots

| Slot Name  | Description        |
| ---------- | ------------------ |
| onContent  | Content when on    |
| offContent | Content when off   |

### Style Variables

The switch component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description            |
| --------------------- | ---------------------- |
| $theme-color-primary  | Theme color - Primary  |
| $theme-color-danger   | Theme color - Danger   |
| $color-white          | White color            |
| $color-black          | Black color            |
| $bg-color-default     | Default background color |
| $opacity-disabled     | Disabled state opacity |
| $font-size-small      | Small font size        |
| $font-size-default    | Default font size      |
| $font-size-large      | Large font size        |
