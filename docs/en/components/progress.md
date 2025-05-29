<script setup lang="ts">
import progressBasic from '../examples/progress/basic.vue'
import progressStatus from '../examples/progress/status.vue'
import progressTextInside from '../examples/progress/text-inside.vue'
import progressColor from '../examples/progress/color.vue'
import progressCircle from '../examples/progress/circle.vue'
import progressDashboard from '../examples/progress/dashboard.vue'
import progressStriped from '../examples/progress/striped.vue'
import progressSize from '../examples/progress/size.vue'
import progressIndeterminate from '../examples/progress/indeterminate.vue'
import progressFormat from '../examples/progress/format.vue'
</script>

# Progress Component

![Progress Component](/components/progress.png)

Progress component is used to display the current progress of an operation, letting users understand the completion status of the current task.

## Basic Usage

Basic progress bar for displaying percentage progress.

<demo :component="progressBasic" name="progress" examples="basic" />

## Progress Status

Progress bar provides four states: default, success, warning, and exception.

<demo :component="progressStatus" name="progress" examples="status" />

## Text Inside

Set the `textInside` attribute to display the percentage inside the progress bar.

<demo :component="progressTextInside" name="progress" examples="text-inside" />

## Custom Color

Through the `color` attribute, you can customize the progress bar color, supporting three methods: single color, multi-color intervals, and dynamic functions.

<demo :component="progressColor" name="progress" examples="color" />

## Circle Progress

Set `type` to `circle` to use circular progress bar.

<demo :component="progressCircle" name="progress" examples="circle" />

## Dashboard Progress

Set `type` to `dashboard` to use dashboard-style progress bar.

<demo :component="progressDashboard" name="progress" examples="dashboard" />

## Striped Effect

Set the `striped` attribute to make the progress bar show striped effect, set `stripedFlow` to make the stripes animate.

<demo :component="progressStriped" name="progress" examples="striped" />

## Custom Size

Set the `strokeWidth` attribute to change the thickness of the progress bar. For circular and dashboard progress bars, you can also set the overall size through the `width` attribute.

<demo :component="progressSize" name="progress" examples="size" />

## Indeterminate Progress

Set the `indeterminate` attribute to create an indeterminate progress effect, suitable for scenarios where progress cannot be accurately determined.

<demo :component="progressIndeterminate" name="progress" examples="indeterminate" />

## Custom Text Format

Through the `format` attribute, you can customize the display text format, or use the default slot to completely customize the content.

<demo :component="progressFormat" name="progress" examples="format" />

## Progress API

### Attributes

| Attribute | Description | Type | Accepted Values | Default |
| --- | --- | --- | --- | --- |
| percentage | Percentage value | number | 0-100 | 0 |
| type | Progress bar type | string | line / circle / dashboard | line |
| strokeWidth | Progress bar width | number | — | 6 |
| textInside | Whether to display text inside progress bar | boolean | — | false |
| status | Progress bar status | string | success / warning / exception | — |
| indeterminate | Whether indeterminate progress bar | boolean | — | false |
| duration | Animation duration | number | — | 3 |
| color | Progress bar color | string / function / array | — | — |
| width | Circle/dashboard progress bar width | number | — | 126 |
| showText | Whether to show progress text | boolean | — | true |
| strokeLinecap | Progress bar endpoint shape | string | butt / round / square | round |
| format | Custom text format | function(percentage) | — | — |
| striped | Whether to have stripes | boolean | — | false |
| stripedFlow | Whether stripes flow | boolean | — | false |

### Slots

| Slot Name | Description | Scope Parameters |
| --- | --- | --- |
| default | Custom progress bar text content | { percentage: number } |

### Style Variables

The progress component uses the following style variables, which can be customized through SCSS variables:

| Variable Name | Description |
| --- | --- |
| $theme-color-primary | Theme color - Primary |
| $theme-color-success | Theme color - Success |
| $theme-color-warning | Theme color - Warning |
| $theme-color-danger | Theme color - Danger |
| $color-white | White color |
| $text-color-default | Default text color |
| $bg-color-default | Default background color | 