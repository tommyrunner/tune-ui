<script setup lang="ts">
import rateBasic from '../examples/rate/basic.vue'
import rateSize from '../examples/rate/size.vue'
import rateCustomIcon from '../examples/rate/custom-icon.vue'
import rateColor from '../examples/rate/color.vue'
import rateMax from '../examples/rate/max.vue'
import rateHalf from '../examples/rate/half.vue'
import rateGap from '../examples/rate/gap.vue'
import rateEvents from '../examples/rate/events.vue'
</script>

# Rate Component

![Rate Component](/components/rate.png)

Rate component is used for rating operations, supporting custom icons, colors, half selection and other features.

## Basic Usage

Basic rate component usage, bind the rating value through `v-model`.

<demo :component="rateBasic" name="rate" examples="basic" />

## Different Sizes

Rate component supports three sizes: small, default, and large.

<demo :component="rateSize" name="rate" examples="size" />

## Custom Icon

You can customize the icons of the rate component through the `icon` attribute, including unselected icon, half-selected icon, and selected icon.

<demo :component="rateCustomIcon" name="rate" examples="custom-icon" />

## Custom Color

You can customize colors for different rating values through the `color` attribute.

<demo :component="rateColor" name="rate" examples="color" />

## Maximum Rating Value

Set the maximum rating value of the rate component through the `max` attribute, default is 5.

<demo :component="rateMax" name="rate" examples="max" />

## Half Selection Mode

Rate component supports half selection mode by default, you can control whether to enable half selection through the `is-half` attribute.

<demo :component="rateHalf" name="rate" examples="half" />

## Custom Gap

You can set the gap between rating icons through the `gap` attribute, default is 5px.

<demo :component="rateGap" name="rate" examples="gap" />

## Event Handling

Rate component provides a `change` event that is triggered when the rating value changes.

<demo :component="rateEvents" name="rate" examples="events" />

## Rate API

### Attributes

| Attribute | Description           | Type                                        | Accepted Values         | Default |
| --------- | --------------------- | ------------------------------------------- | ----------------------- | ------- |
| v-model   | Binding value         | number                                      | —                       | —       |
| size      | Size                  | string                                      | small / default / large | default |
| color     | Rating color configuration | `{ [key in number]?: string }`         | —                       | —       |
| icon      | Custom icon configuration | `{ empty?: string, half?: string, show?: string }` | —       | —       |
| gap       | Icon gap              | number                                      | —                       | 5       |
| max       | Maximum rating value  | number                                      | —                       | 5       |
| is-half   | Whether to support half selection | boolean                         | —                       | true    |
| disabled  | Whether disabled      | boolean                                     | —                       | false   |

### Events

| Event Name | Description                    | Parameters        |
| ---------- | ------------------------------ | ----------------- |
| change     | Triggered when rating value changes | (value: `number`) |

### Style Variables

The rate component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description           |
| --------------------- | --------------------- |
| $theme-color-primary  | Theme color - Primary |
| $font-size-small      | Font size - Small     |
| $font-size-default    | Font size - Default   |
| $font-size-large      | Font size - Large     |
