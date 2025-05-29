<script setup lang="ts">
import drawerBasic from '../examples/drawer/basic.vue'
import drawerPosition from '../examples/drawer/position.vue'
import drawerStyle from '../examples/drawer/style.vue'
import drawerButton from '../examples/drawer/button.vue'
import drawerInteraction from '../examples/drawer/interaction.vue'
import drawerCustom from '../examples/drawer/custom.vue'
import drawerEvents from '../examples/drawer/events.vue'
</script>

# Drawer Component

![Drawer Component](/components/drawer.png)

Drawer component is a floating panel that slides out from the edge of the screen, used to display temporary content or operation areas. It's commonly used for side navigation, settings panels, detail viewing and other scenarios, suitable for content display that needs quick access without interrupting the main page browsing.

## Basic Usage

Basic drawer component usage, slides out from the left by default, including title, content, and bottom button areas.

<demo :component="drawerBasic" name="drawer" examples="basic" />

## Slide Direction

Drawer component supports sliding out from four directions: left, right, top, bottom, adapting to different interaction scenarios.

<demo :component="drawerPosition" name="drawer" examples="position" />

## Size and Style

You can customize the drawer's size, padding, shadow, offset and other style properties.

<demo :component="drawerStyle" name="drawer" examples="style" />

## Button Configuration

You can customize the text, type, alignment of bottom buttons, or completely hide the bottom button area and close icon.

<demo :component="drawerButton" name="drawer" examples="button" />

## Interaction Configuration

Drawer component provides various interaction configuration options, such as whether to show mask layer, whether to close when clicking mask, whether to close when pressing ESC, whether to limit maximum height, etc.

<demo :component="drawerInteraction" name="drawer" examples="interaction" />

## Custom Content

Through slots, you can customize the drawer's title, content, and bottom areas to achieve more flexible layouts and styles.

<demo :component="drawerCustom" name="drawer" examples="custom" />

## Event Handling

Drawer component provides a series of events for monitoring the drawer's opening, closing, and interaction states.

<demo :component="drawerEvents" name="drawer" examples="events" />

## Drawer API

### TDrawer Attributes

| Attribute             | Description                    | Type              | Accepted Values                     | Default    |
| --------------------- | ------------------------------ | ----------------- | ----------------------------------- | ---------- |
| `modelValue`          | Whether to show drawer (two-way binding) | `boolean`   | —                                   | `false`    |
| `title`               | Drawer title                   | `string`          | —                                   | —          |
| `position`            | Drawer slide direction         | `string`          | `left`/`right`/`top`/`bottom`       | `left`     |
| `size`                | Drawer size                    | `string`          | —                                   | `600px`    |
| `icon`                | Title icon                     | `string`          | —                                   | `inspiration` |
| `padding`             | Padding                        | `array`/`number`  | —                                   | `[12, 16, 12, 16]` |
| `box-shadow`          | Shadow settings                | `array`           | —                                   | —          |
| `is-modal`            | Whether to show mask layer     | `boolean`         | —                                   | `true`     |
| `close-on-press-model`| Whether to close drawer when clicking mask | `boolean` | —                                   | `true`     |
| `close-on-press-escape`| Whether to close drawer when pressing ESC | `boolean` | —                                   | `true`     |
| `is-close-icon`       | Whether to show close icon     | `boolean`         | —                                   | `true`     |
| `is-foot`             | Whether to show bottom buttons | `boolean`         | —                                   | `true`     |
| `is-set-max-height`   | Whether to set maximum height  | `boolean`         | —                                   | `true`     |
| `confirm-text`        | Confirm button text            | `string`          | —                                   | `Confirm`  |
| `cancel-text`         | Cancel button text             | `string`          | —                                   | `Cancel`   |
| `confirm-type`        | Confirm button type            | `string`          | `primary`/`success`/`warning`/`danger`/`info` | `primary` |
| `cancel-type`         | Cancel button type             | `string`          | `primary`/`success`/`warning`/`danger`/`info` | `default` |
| `btn-align`           | Button alignment               | `string`          | `flex-start`/`center`/`flex-end`    | `flex-end` |
| `offset`              | Offset position                | `object`          | —                                   | `{ x: 0, y: 0 }` |

### Events

| Event Name | Description                    | Parameters |
| ---------- | ------------------------------ | ---------- |
| `open`     | Triggered when drawer opens    | —          |
| `close`    | Triggered when drawer closes   | —          |
| `confirm`  | Triggered when confirm button is clicked | —    |
| `cancel`   | Triggered when cancel button is clicked  | —    |

### Slots

| Slot Name | Description                    | Scope Parameters |
| --------- | ------------------------------ | ---------------- |
| `default` | Drawer content                 | —                |
| `title`   | Custom title area content      | —                |
| `footer`  | Drawer bottom operation area content | —          |

### Style Variables

| Variable Name               | Description             |
| --------------------------- | ----------------------- |
| `$drawer-bg-color`          | Drawer background color |
| `$drawer-border-radius`     | Drawer border radius    |
| `$drawer-header-height`     | Drawer header height    |
| `$drawer-header-color`      | Drawer header text color |
| `$drawer-content-color`     | Drawer content text color |
| `$drawer-footer-height`     | Drawer footer area height |
| `$drawer-shadow`            | Drawer shadow           |
</rewritten_file> 