<script setup lang="ts">
import flexBasic from '../examples/flex/basic.vue'
import flexGrid from '../examples/flex/grid.vue'
import flexSort from '../examples/flex/sort.vue'
import flexAlign from '../examples/flex/align.vue'
import flexGap from '../examples/flex/gap.vue'
import flexResponsive from '../examples/flex/responsive.vue'
</script>

# Flex Layout

![Flex Layout](/components/flex.png)

Flex component is a container component based on the Flexbox layout model, used to create flexible and responsive layout structures. The component provides a 10-column grid system, supports responsive layout, and can control element spacing, ordering, and alignment.

## Basic Usage

Use `t-flex` and `t-flex-group` components to create simple flex layouts.

<demo :component="flexBasic" name="flex" examples="basic" />

## Grid Configuration

Create grid layouts using `span` and `offset` attributes, with a total of 10 grid columns.

<demo :component="flexGrid" name="flex" examples="grid" />

## Ordering

Use the `sort` attribute to control the display order of elements.

<demo :component="flexSort" name="flex" examples="sort" />

## Alignment

Set the alignment of elements within the flex container using `justify` and `align` attributes.

<demo :component="flexAlign" name="flex" examples="align" />

## Gap Settings

Use the `gap` attribute to set spacing between elements.

<demo :component="flexGap" name="flex" examples="gap" />

## Responsive Layout

Flex component supports responsive layout, automatically adjusting layout based on different screen sizes.

<demo :component="flexResponsive" name="flex" examples="responsive" />

## Flex API

### Flex Attributes

| Attribute | Description                | Type           | Accepted Values       | Default |
| --------- | -------------------------- | -------------- | --------------------- | ------- |
| span      | Number of columns occupied | number         | 0-10                  | -       |
| offset    | Left spacing of grid       | number         | 0-10                  | 0       |
| sort      | Element ordering           | number         | -                     | -       |
| xs        | <768px responsive grid number | number      | 0-10                  | -       |
| sm        | ≥768px responsive grid number | number      | 0-10                  | -       |
| md        | ≥992px responsive grid number | number      | 0-10                  | -       |
| lg        | ≥1200px responsive grid number | number     | 0-10                  | -       |
| xl        | ≥1920px responsive grid number | number     | 0-10                  | -       |

### FlexGroup Attributes

| Attribute | Description              | Type           | Accepted Values                                         | Default |
| --------- | ------------------------ | -------------- | ------------------------------------------------------- | ------- |
| justify   | Main axis alignment      | string         | start/end/center/space-around/space-between/space-evenly | start   |
| align     | Cross axis alignment     | string         | start/center/end                                         | -       |
| gap       | Element spacing (px)     | number         | -                                                        | 12      |

### Slots

| Slot Name | Description                |
| --------- | -------------------------- |
| default   | Default slot for child elements |

### Style Variables

Flex component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description           |
| --------------------- | --------------------- |
| $bg-color-default     | Default background color |
| $border-color-default | Default border color  |
| $text-color-default   | Default text color    |
