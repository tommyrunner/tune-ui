<script setup lang="ts">
import sliderBasic from '../examples/slider/basic.vue'
import sliderRange from '../examples/slider/range.vue'
import sliderStops from '../examples/slider/stops.vue'
import sliderMarks from '../examples/slider/marks.vue'
import sliderVertical from '../examples/slider/vertical.vue'
import sliderInput from '../examples/slider/input.vue'
import sliderTooltip from '../examples/slider/tooltip.vue'
import sliderEvents from '../examples/slider/events.vue'
</script>

# Slider Component

![Slider Component](/components/slider.png)

Slider component allows users to select a value or a range by sliding within a fixed interval.

## Basic Usage

Basic slider for selecting a single value within a continuous or discrete interval.

<demo :component="sliderBasic" name="slider" examples="basic" />

## Range Selection

Set the `range` attribute to enable range selection, suitable for scenarios where you need to select a numerical interval.

<demo :component="sliderRange" name="slider" examples="range" />

## Show Stops

When `step` is not 1, you can set the `show-stops` attribute to display stops, making it clearer for users to know the selectable values.

<demo :component="sliderStops" name="slider" examples="stops" />

## Slider with Marks

Use the `marks` attribute to customize marks on the slider, each mark can be simple text or an object with custom styles.

<demo :component="sliderMarks" name="slider" examples="marks" />

## Vertical Slider

Set the `vertical` attribute to `true` to make the slider vertical, and you need to set `height` to specify the slider height.

<demo :component="sliderVertical" name="slider" examples="vertical" />

## Slider with Input

Slider can be combined with number input for more precise numerical input.

<demo :component="sliderInput" name="slider" examples="input" />

## Tooltip Settings

You can customize the slider's tooltip information through `show-tooltip`, `format-tooltip`, and `placement` attributes.

<demo :component="sliderTooltip" name="slider" examples="tooltip" />

## Event Handling

Slider component provides `change` and `input` events, triggered when value change is completed and during value change process respectively.

<demo :component="sliderEvents" name="slider" examples="events" />

## Slider API

### Attributes

| Attribute     | Description                    | Type                          | Accepted Values       | Default |
| ------------- | ------------------------------ | ----------------------------- | --------------------- | ------- |
| v-model       | Binding value                  | number / number[]             | —                     | —       |
| min           | Minimum value                  | number                        | —                     | 0       |
| max           | Maximum value                  | number                        | —                     | 100     |
| disabled      | Whether disabled               | boolean                       | —                     | false   |
| step          | Step size                      | number                        | —                     | 1       |
| size          | Scrollbar size (width/height)  | number                        | —                     | 6       |
| show-stops    | Whether to show stops          | boolean                       | —                     | false   |
| show-tooltip  | Whether to show tooltip        | boolean                       | —                     | true    |
| format-tooltip | Function to format tooltip    | (val: number) => string       | —                     | —       |
| range         | Whether to enable range selection | boolean                    | —                     | false   |
| vertical      | Whether in vertical mode       | boolean                       | —                     | false   |
| height        | Slider height, required in vertical mode | string              | —                     | —       |
| tooltip-class | Custom class name for tooltip  | string                        | —                     | —       |
| placement     | Tooltip placement              | string                        | top / right / bottom / left | top |
| marks         | Marks                          | `Record<number, string \| MarkObject>` | —             | —       |
| debounce      | Input debounce delay (ms)      | number                        | —                     | 300     |
| status        | Status type                    | string                        | success / exception / warning | — |

### Events

| Event Name | Description                    | Parameters                |
| ---------- | ------------------------------ | ------------------------- |
| change     | Triggered when value change is completed | (value: `number \| number[]`) |
| input      | Triggered during value change process | (value: `number \| number[]`) |

### Slots

| Slot Name | Description          | Scope Parameters              |
| --------- | -------------------- | ----------------------------- |
| button    | Custom slider button | { value: `number`, index: `number` } |

### Mark Object Type

When using object format to define marks, it can contain the following properties:

| Property | Description        | Type                   |
| -------- | ------------------ | ---------------------- |
| label    | Text displayed on mark | string             |
| style    | Custom style for mark | `Record<string, string>` |

### Style Variables

The slider component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description           |
| --------------------- | --------------------- |
| $theme-color-primary  | Theme color - Primary |
| $theme-color-success  | Theme color - Success |
| $theme-color-warning  | Theme color - Warning |
| $theme-color-danger   | Theme color - Danger  |
| $border-color-default | Border color - Default |
