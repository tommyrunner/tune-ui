<script setup lang="ts">
import buttonBasic from '../examples/button/basic.vue'
import buttonDisabled from '../examples/button/disabled.vue'
import buttonIcon from '../examples/button/icon.vue'
import buttonLoading from '../examples/button/loading.vue'
import buttonSize from '../examples/button/size.vue'
import buttonRadius from '../examples/button/radius.vue'
import buttonColor from '../examples/button/color.vue'
import buttonScale from '../examples/button/scale.vue'
</script>

# Button Component

![Button Component](/components/button.png)

Buttons are used to trigger an immediate action, marking one (or encapsulating a group of) action commands, responding to user click behavior, and triggering corresponding business logic.

## Basic Usage

Buttons have six types: default button, primary button, success button, info button, warning button, danger button, and text button.

<demo :component="buttonBasic" name="button" examples="basic" />

## Disabled State

Button unavailable state. Disable the button by setting the `disabled` attribute to `true`.

<demo :component="buttonDisabled" name="button" examples="disabled" />

## Icon Button

Buttons with icons can enhance button recognizability. Use `prefixIcon` and `suffixIcon` attributes to set prefix and suffix icons respectively.

<demo :component="buttonIcon" name="button" examples="icon" />

## Loading State

After clicking the button to perform data loading operations, display the loading state on the button. Show the loading state by setting the `loading` attribute to `true`.

<demo :component="buttonLoading" name="button" examples="loading" />

## Button Size

The Button component provides three sizes: large button, default button, and small button. Control the button size by setting the `size` attribute.

<demo :component="buttonSize" name="button" examples="size" />

## Button Radius

Control the button's border radius style by setting the `radius` attribute, providing three border radius types: `default`, `round`, and `circle`.

<demo :component="buttonRadius" name="button" examples="radius" />

## Custom Color

You can customize the button's theme color through the `color` attribute.

<demo :component="buttonColor" name="button" examples="color" />

## Scale Effect

Buttons have a click scale effect by default. You can disable this effect by setting the `scale` attribute to `false`.

<demo :component="buttonScale" name="button" examples="scale" />

## Button API

### Attributes

| Attribute  | Description              | Type    | Accepted Values                                              | Default |
| ---------- | ------------------------ | ------- | ------------------------------------------------------------ | ------- |
| type       | Button type              | string  | default / primary / success / warning / danger / info / text | default |
| size       | Button size              | string  | large / default / small                                      | default |
| disabled   | Whether disabled         | boolean | true / false                                                 | false   |
| loading    | Whether loading          | boolean | true / false                                                 | false   |
| prefixIcon | Prefix icon              | string  | —                                                            | —       |
| suffixIcon | Suffix icon              | string  | —                                                            | —       |
| radius     | Button border radius type| string  | default / round / circle                                     | default |
| color      | Custom button color      | string  | —                                                            | —       |
| scale      | Whether to enable scale effect | boolean | true / false                                           | true    |
| htmlType   | Native button type       | string  | button / submit / reset                                      | button  |

### Events

| Event Name | Description                | Parameters            |
| ---------- | -------------------------- | --------------------- |
| click      | Triggered when button is clicked | (event: `MouseEvent`) |

### Slots

| Slot Name | Description    |
| --------- | -------------- |
| default   | Button content |

### Style Variables

The button component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description            |
| --------------------- | ---------------------- |
| $theme-color-primary  | Theme color - Primary  |
| $theme-color-success  | Theme color - Success  |
| $theme-color-info     | Theme color - Info     |
| $theme-color-warning  | Theme color - Warning  |
| $theme-color-danger   | Theme color - Danger   |
| $color-white          | White color            |
| $color-black          | Black color            |
| $text-color-default   | Default text color     |
| $bg-color-default     | Default background color |
| $border-color-default | Default border color   |
| $font-size-default    | Default font size      |
| $font-size-small      | Small font size        |
| $font-size-large      | Large font size        |
| $opacity-disabled     | Disabled state opacity |
