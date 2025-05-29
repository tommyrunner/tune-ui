<script setup lang="ts">
import badgeBasic from '../examples/badge/basic.vue'
import badgeDot from '../examples/badge/dot.vue'
import badgeMax from '../examples/badge/max.vue'
import badgeColor from '../examples/badge/color.vue'
import badgeOffset from '../examples/badge/offset.vue'
import badgeHidden from '../examples/badge/hidden.vue'
</script>

# Badge

![Badge](/components/badge.png)

Badge component is used to display counts, small dots, or status markers in the upper right corner of elements, commonly used for message reminders, new feature markers, and other scenarios.

## Basic Usage

Badge can be directly attached to other elements, set the displayed value through the `value` attribute.

<demo :component="badgeBasic" name="badge" examples="basic" />

## Small Dot

By setting the `isDot` attribute, it can be displayed as a small dot without showing specific values.

<demo :component="badgeDot" name="badge" examples="dot" />

## Maximum Value

You can set the maximum display value through the `max` attribute. When exceeding the maximum value, it will display as "max value+".

<demo :component="badgeMax" name="badge" examples="max" />

## Custom Color

Customize the badge background color through the `color` attribute.

<demo :component="badgeColor" name="badge" examples="color" />

## Position Offset

You can adjust the badge position through `offsetX` and `offsetY` attributes to achieve flexible position customization.

<demo :component="badgeOffset" name="badge" examples="offset" />

## Hidden Badge

By setting the `hiddenValue` attribute, when the value equals the hidden value, the badge will not be displayed.

<demo :component="badgeHidden" name="badge" examples="hidden" />

## Badge API

### Attributes

| Attribute     | Description                    | Type      | Accepted Values | Default   |
| ------------- | ------------------------------ | --------- | --------------- | --------- |
| `value`       | Displayed value                | `number`  | —               | —         |
| `isDot`       | Whether to display as small dot| `boolean` | —               | `false`   |
| `max`         | Maximum display value          | `number`  | —               | `99`      |
| `color`       | Badge background color         | `string`  | —               | `#f56c6c` |
| `offsetX`     | X-axis offset                  | `number`  | —               | `0`       |
| `offsetY`     | Y-axis offset                  | `number`  | —               | `0`       |
| `hiddenValue` | Value when hiding badge        | `number`  | —               | `0`       |

### Slots

| Slot Name | Description                    |
| --------- | ------------------------------ |
| default   | Content element wrapped by badge |

### Style Variables

The badge component uses the following style variables, which can be customized through SCSS variables:

| Variable Name       | Description         |
| ------------------- | ------------------- |
| $theme-color-danger | Theme color - Danger |
| $color-white        | White color         |
| $z-index-show       | Display z-index     |
</rewritten_file> 