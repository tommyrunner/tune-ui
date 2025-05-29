<script setup lang="ts">
import dialogBasic from '../examples/dialog/basic.vue'
import dialogTitle from '../examples/dialog/title.vue'
import dialogButton from '../examples/dialog/button.vue'
import dialogInteraction from '../examples/dialog/interaction.vue'
import dialogNested from '../examples/dialog/nested.vue'
import dialogDraggable from '../examples/dialog/draggable.vue'
import dialogEvents from '../examples/dialog/events.vue'
</script>

# Dialog Component

![Dialog Component](/components/dialog.png)

Dialog component is used to interact with users without leaving the current page, typically used to display important information, request user confirmation, or collect user input, suitable for scenarios that require forcing user attention.

## Basic Usage

Basic dialog usage, including title, content, and action button areas.

<demo :component="dialogBasic" name="dialog" examples="basic" />

## Title Configuration

You can customize the dialog title by setting related attributes, such as adding icons, hiding close buttons, or using custom content.

<demo :component="dialogTitle" name="dialog" examples="title" />

## Button Configuration

You can customize the text, type, alignment of bottom buttons, or completely hide the bottom button area.

<demo :component="dialogButton" name="dialog" examples="button" />

## Interaction Methods

Dialog provides various interaction methods and style configuration options, such as hiding the mask layer, disabling default close methods, custom styles, etc.

<demo :component="dialogInteraction" name="dialog" examples="interaction" />

## Nested Dialog

You can nest another dialog within a dialog to meet more complex interaction requirements.

<demo :component="dialogNested" name="dialog" examples="nested" />

## Draggable Dialog

Set the `draggable` attribute to `true` to enable dialog dragging functionality.

<demo :component="dialogDraggable" name="dialog" examples="draggable" />

## Event Handling

Dialog component provides rich events for monitoring dialog opening, closing, and interaction states.

<demo :component="dialogEvents" name="dialog" examples="events" />

## Dialog API

### TDialog Attributes

| Attribute               | Description                      | Type              | Accepted Values                               | Default                            |
| ----------------------- | -------------------------------- | ----------------- | --------------------------------------------- | ---------------------------------- |
| `modelValue`            | Whether to show dialog (two-way binding) | `boolean`    | —                                             | `false`                            |
| `title`                 | Dialog title                     | `string`          | —                                             | —                                  |
| `width`                 | Dialog width                     | `string`/`number` | —                                             | `500px`                            |
| `top`                   | Dialog distance from top         | `string`/`number` | —                                             | `15vh`                             |
| `center`                | Whether to center title and footer | `boolean`       | —                                             | `false`                            |
| `append-to-body`        | Whether to append to body element | `boolean`        | —                                             | `false`                            |
| `close-on-click-modal`  | Whether to close dialog when clicking mask | `boolean` | —                                             | `true`                             |
| `close-on-press-escape` | Whether to close dialog when pressing ESC | `boolean`  | —                                             | `true`                             |
| `show-close`            | Whether to show close button     | `boolean`         | —                                             | `true`                             |
| `draggable`             | Whether draggable                | `boolean`         | —                                             | `false`                            |
| `fullscreen`            | Whether to display fullscreen    | `boolean`         | —                                             | `false`                            |
| `before-close`          | Callback before closing          | `function`        | —                                             | —                                  |
| `destroy-on-close`      | Whether to destroy component when closing | `boolean` | —                                             | `false`                            |
| `z-index`               | Dialog z-index                   | `number`          | —                                             | `2000`                             |
| `icon`                  | Title icon                       | `string`          | —                                             | —                                  |
| `is-close-icon`         | Whether to show close icon       | `boolean`         | —                                             | `true`                             |
| `is-modal`              | Whether to show mask layer       | `boolean`         | —                                             | `true`                             |
| `confirm-text`          | Confirm button text              | `string`          | —                                             | `Confirm`                          |
| `cancel-text`           | Cancel button text               | `string`          | —                                             | `Cancel`                           |
| `confirm-type`          | Confirm button type              | `string`          | `primary`/`success`/`warning`/`danger`/`info` | `primary`                          |
| `cancel-type`           | Cancel button type               | `string`          | `primary`/`success`/`warning`/`danger`/`info` | —                                  |
| `btn-align`             | Button alignment                 | `string`          | `flex-start`/`center`/`flex-end`              | `flex-end`                         |
| `is-foot`               | Whether to show footer buttons   | `boolean`         | —                                             | `true`                             |
| `padding`               | Padding                          | `array`           | —                                             | `[16, 16, 16, 16]`                 |
| `box-shadow`            | Shadow settings                  | `array`           | —                                             | `[0, 2, 12, 'rgba(0, 0, 0, 0.1)']` |

### Events

| Event Name   | Description                      | Parameters |
| ------------ | -------------------------------- | ---------- |
| `open`       | Triggered when dialog opens      | —          |
| `opened`     | Triggered when dialog open animation ends | —    |
| `close`      | Triggered when dialog closes     | —          |
| `closed`     | Triggered when dialog close animation ends | —   |
| `confirm`    | Triggered when confirm button is clicked | —     |
| `cancel`     | Triggered when cancel button is clicked | —      |
| `drag-start` | Triggered when dragging starts   | `event`    |
| `drag`       | Triggered during dragging        | `event`    |
| `drag-end`   | Triggered when dragging ends     | `event`    |

### Slots

| Slot Name | Description                  | Scope Parameters |
| --------- | ---------------------------- | ---------------- |
| `default` | Dialog content               | —                |
| `title`   | Custom title area content    | —                |
| `footer`  | Dialog footer operation area content | —          |

### Methods

| Method Name | Description  | Parameters |
| ----------- | ------------ | ---------- |
| `open`      | Open dialog  | —          |
| `close`     | Close dialog | —          |

### Style Variables

The dialog component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description          |
| --------------------- | -------------------- |
| $bg-color-default     | Default background color |
| $bg-color-model       | Modal background color |
| $text-color-default   | Default text color   |
| $border-color-default | Default border color |
| $theme-color-primary  | Theme color - Primary |
| $color-white          | White color          |
| $color-black          | Black color          |
| $font-size-default    | Default font size    |
| $z-index-up           | Upper layer z-index  |
