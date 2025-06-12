<script setup lang="ts">
import colorPickerBasic from '../examples/color-picker/basic.vue'
import colorPickerAlpha from '../examples/color-picker/alpha.vue'
import colorPickerPredefine from '../examples/color-picker/predefine.vue'
import colorPickerSizes from '../examples/color-picker/sizes.vue'
import colorPickerFormats from '../examples/color-picker/formats.vue'
import colorPickerDisabled from '../examples/color-picker/disabled.vue'
import colorPickerEvents from '../examples/color-picker/events.vue'
</script>

# ColorPicker Component

![ColorPicker Component](/components/color-picker.png)

ColorPicker component allows users to select colors through a visual interface, supporting multiple color formats, transparency adjustment, and predefined colors.

## Basic Usage

The most basic color picker usage.

<demo :component="colorPickerBasic" name="color-picker" examples="basic" />

## Alpha Selection

Enable transparency selection by setting the `show-alpha` attribute.

<demo :component="colorPickerAlpha" name="color-picker" examples="alpha" />

## Predefined Colors

Set predefined colors through the `predefine` attribute to provide quick selection of commonly used colors.

<demo :component="colorPickerPredefine" name="color-picker" examples="predefine" />

## Different Sizes

ColorPicker supports different sizes, set through the `size` attribute, supporting `small`, `default`, and `large` sizes.

<demo :component="colorPickerSizes" name="color-picker" examples="sizes" />

## Different Color Formats

ColorPicker supports different color format outputs, which can be set through the `color-format` attribute.

<demo :component="colorPickerFormats" name="color-picker" examples="formats" />

## Disabled State

Disable the color picker by setting the `disabled` attribute.

<demo :component="colorPickerDisabled" name="color-picker" examples="disabled" />

## Event Handling

ColorPicker provides various events for handling operations during the color selection process.

<demo :component="colorPickerEvents" name="color-picker" examples="events" />

## ColorPicker Component API

### Attributes

| Attribute | Description | Type | Accepted Values | Default |
| ---------------- | -------------------------- | ------------------- | ----------------------------- | --------- |
| `v-model` | Binding value | `string` | — | — |
| `disabled` | Whether disabled | `boolean` | — | `false` |
| `size` | Size | `string` | `small` / `default` / `large` | `default` |
| `show-alpha` | Whether to support alpha selection | `boolean` | — | `false` |
| `color-format` | Color format written to v-model | `string` | `hsl` / `hsv` / `hex` / `rgb` | `hex` |
| `popper-class` | Class name for ColorPicker dropdown | `string` | — | — |
| `predefine` | Predefined colors | `string[]` | — | — |
| `validate-event` | Whether to trigger form validation on input | `boolean` | — | `true` |
| `tabindex` | ColorPicker tabindex | `string` / `number` | — | `0` |
| `teleported` | Whether to render dropdown under body | `boolean` | — | `true` |

### Events

| Event Name | Description | Parameters |
| --------------- | ---------------------------------- | --------------------- |
| `change` | Triggered when binding value changes | `(value: string)` |
| `active-change` | Triggered when currently displayed color changes | `(value: string)` |
| `focus` | Triggered when focused | `(event: FocusEvent)` |
| `blur` | Triggered when blurred | `(event: FocusEvent)` |

### Methods

ColorPicker component exposes the following methods, which can be called through template refs.

| Method Name | Description | Parameters |
| ------------------ | -------------- | ---- |
| `handleTriggerClick` | Toggle color picker panel display/hide | — |

### Style Variables

ColorPicker component uses the following style variables, which can be customized through SCSS variables:

| Variable Name | Description |
| ----------------------- | ------------ |
| $theme-color-primary | Primary theme color |
| $text-color-default | Default text color |
| $border-color-default | Default border color |
| $bg-color-default | Default background color |
| $color-white | White color |
| $color-black | Black color |
| $font-size-default | Default font size |
| $font-size-small | Small font size |
| $opacity-disabled | Disabled state opacity |
