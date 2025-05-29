<script setup lang="ts">
import breadcrumbBasic from '../examples/breadcrumb/basic.vue'
import breadcrumbSeparator from '../examples/breadcrumb/separator.vue'
import breadcrumbIcon from '../examples/breadcrumb/icon.vue'
import breadcrumbRouter from '../examples/breadcrumb/router.vue'
import breadcrumbDisabled from '../examples/breadcrumb/disabled.vue'
import breadcrumbGap from '../examples/breadcrumb/gap.vue'
</script>

# Breadcrumb Component

![Breadcrumb Component](/components/breadcrumb.png)

Breadcrumb is a navigation aid that allows users to understand the current page's position within the website structure and quickly return to parent pages.

## Basic Usage

Basic breadcrumb usage, displaying hierarchical structure.

<demo :component="breadcrumbBasic" name="breadcrumb" examples="basic" />

## Custom Separator

You can customize the separator icon by setting the `separatedIcon` attribute. If not set, the default `/` symbol is used.

<demo :component="breadcrumbSeparator" name="breadcrumb" examples="separator" />

## Breadcrumb with Icons

Add icons to each breadcrumb item by setting the `icon` attribute in `options`.

<demo :component="breadcrumbIcon" name="breadcrumb" examples="icon" />

## Router Navigation

Set the `isRouter` attribute to enable router navigation functionality, used together with the `to` attribute in `options`.

<demo :component="breadcrumbRouter" name="breadcrumb" examples="router" />

## Disabled State

Set the `disabled` attribute in `options` to disable specific breadcrumb items.

<demo :component="breadcrumbDisabled" name="breadcrumb" examples="disabled" />

## Custom Gap

You can customize the gap between separator and content by setting the `gap` attribute.

<demo :component="breadcrumbGap" name="breadcrumb" examples="gap" />

## Breadcrumb API

### Attributes

| Attribute      | Description                | Type    | Accepted Values | Default |
| -------------- | -------------------------- | ------- | --------------- | ------- |
| options        | Breadcrumb option data     | array   | —               | []      |
| is-router      | Whether to enable router   | boolean | —               | true    |
| is-replace     | Whether to use replace mode| boolean | —               | false   |
| separated-icon | Separator icon             | string  | —               | —       |
| gap            | Separator gap              | number  | —               | 6       |

### Option Configuration

| Parameter | Description  | Type           | Accepted Values | Default |
| --------- | ------------ | -------------- | --------------- | ------- |
| label     | Display text | string         | —               | —       |
| value     | Unique identifier | string    | —               | —       |
| icon      | Icon type    | string         | —               | —       |
| to        | Router path  | RouteRecordRaw | —               | —       |
| disabled  | Whether disabled | boolean    | —               | false   |

### Events

| Event Name | Description                    | Parameters          |
| ---------- | ------------------------------ | ------------------- |
| change     | Triggered when breadcrumb item is clicked | (item: `ValueType`) |

### Style Variables

The breadcrumb component uses the following style variables, which can be customized through SCSS variables:

| Variable Name        | Description            |
| -------------------- | ---------------------- |
| $theme-color-primary | Theme color - Primary  |
| $text-color-default  | Default text color     |
| $font-size-default   | Default font size      |
| $opacity-disabled    | Disabled state opacity |
