<script setup lang="ts">
import iconBasic from '../examples/icon/basic.vue'
import iconSize from '../examples/icon/size.vue'
import iconColor from '../examples/icon/color.vue'
import iconCustom from '../examples/icon/custom.vue'
import iconAll from '../examples/icon/all.vue'
</script>

# Icon Component

![Icon Component](/components/icon.png)

Icons are fundamental elements in interface design, used to represent common operations, navigation hints, status indicators, etc., making the interface more intuitive. Tune UI provides a set of commonly used icons, supporting custom size, color, and type.

## Basic Usage

Tune UI has a rich set of built-in icons. Specify the icon name through the `icon` attribute.

<demo :component="iconBasic" name="icon" examples="basic" />

## Icon Size

You can customize the icon size through the `size` attribute, with the unit being `px`.

<demo :component="iconSize" name="icon" examples="size" />

## Icon Color

There are two ways to customize icon color:

1. Use the `color` attribute to specify a custom color value
2. Use the `type` attribute to use theme colors

<demo :component="iconColor" name="icon" examples="color" />

## Custom Icons

In addition to built-in icons, you can also introduce custom icons through the `customIcon` attribute.

<demo :component="iconCustom" name="icon" examples="custom" />

## Icon Categories

Below are all available icons, grouped by different categories. Click on an icon to copy its name.

<demo :component="iconAll" name="icon" examples="all" />

## Icon API

### Attributes

| Attribute  | Description        | Type   | Accepted Values                                       | Default    |
| ---------- | ------------------ | ------ | ----------------------------------------------------- | ---------- |
| icon       | Icon name          | string | -                                                     | success-to |
| size       | Icon size (px)     | number | -                                                     | 16         |
| color      | Icon color         | string | -                                                     | -          |
| type       | Icon theme type    | string | default / primary / success / info / warning / danger | -          |
| customIcon | Custom icon name   | string | -                                                     | -          |

### Slots

| Slot Name | Description         |
| --------- | ------------------- |
| default   | Content inside icon |

### Style Variables

The icon component uses the following style variables, which can be customized through SCSS variables:

| Variable Name        | Description           |
| -------------------- | --------------------- |
| $theme-color-primary | Theme color - Primary |
| $theme-color-success | Theme color - Success |
| $theme-color-info    | Theme color - Info    |
| $theme-color-warning | Theme color - Warning |
| $theme-color-danger  | Theme color - Danger  |
