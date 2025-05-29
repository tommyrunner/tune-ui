<script setup lang="ts">
import dividerBasic from '../examples/divider/basic.vue'
import dividerDirection from '../examples/divider/direction.vue'
import dividerStyle from '../examples/divider/style.vue'
import dividerWithText from '../examples/divider/with-text.vue'
</script>

# Divider Component

![Divider Component](/components/divider.png)

The divider component is used to separate content groups, visually dividing content to better organize page structure.

## Basic Usage

The most basic divider, horizontal by default.

<demo :component="dividerBasic" name="divider" examples="basic" />

## Direction

Dividers have two directions: horizontal and vertical, with horizontal being the default.

<demo :component="dividerDirection" name="divider" examples="direction" />

## Different Styles

Dividers support different border styles: solid (default), dashed, dotted, and double.

<demo :component="dividerStyle" name="divider" examples="style" />

## Divider with Text

You can embed text content in the divider and customize the text position.

<demo :component="dividerWithText" name="divider" examples="with-text" />

## Divider API

### Attributes

| Attribute       | Description      | Type   | Accepted Values                  | Default    |
| --------------- | ---------------- | ------ | -------------------------------- | ---------- |
| direction       | Divider direction| string | horizontal / vertical            | horizontal |
| borderStyle     | Divider style    | string | solid / dashed / dotted / double | solid      |
| contentPosition | Text position    | string | left / center / right            | center     |

### Slots

| Slot Name | Description              |
| --------- | ------------------------ |
| default   | Text content in divider  |

### Style Variables

The divider component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description        |
| --------------------- | ------------------ |
| $border-color-default | Divider color      |
| $text-color-default   | Text color         |
| $bg-color-default     | Background color   |
| $font-size-default    | Default font size  |
