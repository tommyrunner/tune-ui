<script setup lang="ts">
import scrollbarBasic from '../examples/scrollbar/basic.vue'
import scrollbarPermanent from '../examples/scrollbar/permanent.vue'
import scrollbarHorizontal from '../examples/scrollbar/horizontal.vue'
import scrollbarEvents from '../examples/scrollbar/events.vue'
import scrollbarHeight from '../examples/scrollbar/height.vue'
</script>

# Scrollbar Component

![Scrollbar Component](/components/scrollbar.png)

Scrollbar component provides a custom-styled scrollbar container to replace the browser's native scrollbar, supporting both vertical and horizontal scrolling with customizable styles and behavior.

## Basic Usage

The most basic usage is to create a scrollable container with a fixed height. When content exceeds the container height, a scrollbar will automatically appear.

<demo :component="scrollbarBasic" name="scrollbar" examples="basic" />

## Permanent Scrollbar

By default, the scrollbar only appears on hover. Setting the `permanent` attribute to `true` makes the scrollbar always visible.

<demo :component="scrollbarPermanent" name="scrollbar" examples="permanent" />

## Horizontal Scrolling

When content width exceeds the container width, a horizontal scrollbar will automatically appear.

<demo :component="scrollbarHorizontal" name="scrollbar" examples="horizontal" />

## Scroll Events

The scrollbar component provides vertical and horizontal scroll events to get real-time scroll position.

<demo :component="scrollbarEvents" name="scrollbar" examples="events" />

## Custom Height

You can specify the height of the scroll container through the `height` attribute.

<demo :component="scrollbarHeight" name="scrollbar" examples="height" />

## Scrollbar Component API

### Attributes

| Attribute | Description | Type | Accepted Values | Default |
|-----------|-------------|------|-----------------|---------|
| `height` | Container height | `number` | — | `300` |
| `permanent` | Whether scrollbar is always visible | `boolean` | — | `false` |

### Events

| Event Name | Description | Callback Parameters |
|------------|-------------|-------------------|
| `scroll-y` | Vertical scroll event | `(element: HTMLElement)` |
| `scroll-x` | Horizontal scroll event | `(element: HTMLElement)` |
| `click-track` | Scrollbar track click event | `(element: HTMLElement)` |

### Slots

| Slot Name | Description | Scope Parameters |
|-----------|-------------|------------------|
| `default` | Content of the scroll container | — |

### Methods

The component exposes the following methods, which can be called through ref:

| Method Name | Description | Parameters |
|-------------|-------------|------------|
| `scrollTo` | Scroll to specified position | `(options: ScrollToOptions)` |
| `updateScrollbar` | Update scrollbar state | — |
| `setScrollbar` | Set scrollbar position | `(mobile: number, direction: 'top' \| 'left' \| 'none')` |

### Style Variables

Scrollbar component uses the following style variables, which can be customized through SCSS variables:

| Variable Name | Description | 
|---------------|-------------|
| $scrollbar-size | Scrollbar size |
| $scrollbar-bg | Scrollbar background color |
| $scrollbar-thumb-color | Scrollbar thumb color |
| $bg-color-default | Default background color | 