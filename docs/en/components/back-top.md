<script setup lang="ts">
import backTopBasic from '../examples/back-top/basic.vue'
import backTopIcon from '../examples/back-top/icon.vue'
import backTopPlain from '../examples/back-top/plain.vue'
import backTopPosition from '../examples/back-top/position.vue'
import backTopHeight from '../examples/back-top/height.vue'
import backTopTarget from '../examples/back-top/target.vue'
import backTopCustom from '../examples/back-top/custom.vue'
</script>

# BackTop Component

![BackTop Component](/components/back-top.png)

BackTop component provides a convenient way for users to quickly return to the top of the page, especially suitable for long content pages.

## Basic Usage

Basic back to top button that appears when the page scrolls beyond a specified height.

<demo :component="backTopBasic" name="back-top" examples="basic" />

## Custom Icon

You can customize the icon of the back to top button by setting the `icon` attribute.

<demo :component="backTopIcon" name="back-top" examples="icon" />

## Plain Style

Setting the `plain` attribute enables a plain style back to top button with background color and border.

<demo :component="backTopPlain" name="back-top" examples="plain" />

## Custom Position

You can customize the position of the back to top button by setting the `bottom` and `right` attributes.

<demo :component="backTopPosition" name="back-top" examples="position" />

## Custom Trigger Height

You can customize the scroll height that triggers the back to top button display by setting the `visibilityHeight` attribute.

<demo :component="backTopHeight" name="back-top" examples="height" />

## Specify Scroll Container

You can specify the container element that triggers scrolling by setting the `target` attribute, which can be a CSS selector string or HTML element.

<demo :component="backTopTarget" name="back-top" examples="target" />

## Custom Content

You can customize the content of the back to top button through the default slot, completely controlling its appearance.

<demo :component="backTopCustom" name="back-top" examples="custom" />

## BackTop Component API

### Attributes

| Attribute | Description | Type | Accepted Values | Default |
| ----------------- | ---------------------- | ------------------- | ------ | ---------- |
| target | Target element that triggers scrolling | HTMLElement/string | — | — |
| icon | Icon type | string | — | caret-up |
| icon-size | Icon size | number | — | 32 |
| bottom | Distance from bottom | string | — | 32px |
| right | Distance from right | string | — | 32px |
| visibility-height | Scroll height that triggers display | number | — | 200 |
| plain | Whether to use plain style | boolean | — | false |

### Events

| Event Name | Description | Callback Parameters |
| ------ | ------------------ | -------- |
| click | Triggered when button is clicked | — |

### Slots

| Slot Name | Description |
| ------- | ---------------- |
| default | Custom button content |

### Style Variables

BackTop component uses the following style variables, which can be customized through SCSS variables:

| Variable Name | Description |
| --------------------- | -------------- |
| $theme-color-primary | Primary theme color |
| $color-white | White color |
| $bg-color-default | Default background color |
| $z-index-up | Upper layer z-index | 