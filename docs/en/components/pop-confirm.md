<script setup lang="ts">
import popConfirmBasic from '../examples/pop-confirm/basic.vue'
import popConfirmIcon from '../examples/pop-confirm/icon.vue'
import popConfirmButton from '../examples/pop-confirm/button.vue'
import popConfirmPosition from '../examples/pop-confirm/position.vue'
import popConfirmStyle from '../examples/pop-confirm/style.vue'
import popConfirmTrigger from '../examples/pop-confirm/trigger.vue'
import popConfirmEvents from '../examples/pop-confirm/events.vue'
</script>

# PopConfirm Component

![PopConfirm Component](/components/pop-confirm.png)

PopConfirm component is used for scenarios that require secondary confirmation for operations. Clicking an element will pop up a bubble-style confirmation box, commonly used for dangerous operations like deletion and modification that require user secondary confirmation. It's more lightweight and concise compared to modal dialogs.

## Basic Usage

Basic pop confirm with confirm and cancel buttons, supporting disabled state.

<demo :component="popConfirmBasic" name="pop-confirm" examples="basic" />

## Custom Icon

You can customize the icon type and color of the pop confirm by setting the `icon` and `icon-color` attributes to make the operation semantics clearer.

<demo :component="popConfirmIcon" name="pop-confirm" examples="icon" />

## Custom Buttons

You can customize the text and type of confirm and cancel buttons to better fit business scenario requirements.

<demo :component="popConfirmButton" name="pop-confirm" examples="button" />

## Popup Position

Supports four directions for popup: top, right, bottom, left. You can choose the appropriate popup direction based on page space.

<demo :component="popConfirmPosition" name="pop-confirm" examples="position" />

## Custom Style

You can customize the style of the pop confirm by setting attributes like `padding`, `box-shadow`, and `max-width`.

<demo :component="popConfirmStyle" name="pop-confirm" examples="style" />

## Trigger Configuration

Supports multiple interaction configurations such as close by pressing ESC key, close by clicking other areas, etc.

<demo :component="popConfirmTrigger" name="pop-confirm" examples="trigger" />

## Event Handling

PopConfirm provides `confirm` and `cancel` events for handling user's confirm and cancel operations.

<demo :component="popConfirmEvents" name="pop-confirm" examples="events" />

## PopConfirm API

### TPopConfirm Attributes

| Attribute               | Description                    | Type             | Accepted Values                                      | Default        |
| ----------------------- | ------------------------------ | ---------------- | ---------------------------------------------------- | -------------- |
| `modelValue`            | Whether to show pop confirm (two-way binding) | `boolean`        | —                                                    | `false`        |
| `content`               | Confirm box content            | `string`         | —                                                    | —              |
| `icon`                  | Icon type                      | `string`         | —                                                    | `illustrate`   |
| `icon-color`            | Icon color                     | `string`         | —                                                    | `#999`         |
| `confirm-text`          | Confirm button text            | `string`         | —                                                    | `Confirm`      |
| `cancel-text`           | Cancel button text             | `string`         | —                                                    | `Cancel`       |
| `confirm-type`          | Confirm button type            | `string`         | `primary`/`success`/`warning`/`danger`/`info`/`text` | `text`         |
| `cancel-type`           | Cancel button type             | `string`         | `primary`/`success`/`warning`/`danger`/`info`/`text` | `text`         |
| `position`              | Popup position                 | `string`         | `top`/`right`/`bottom`/`left`                        | `top`          |
| `disabled`              | Whether disabled               | `boolean`        | —                                                    | `false`        |
| `padding`               | Padding                        | `array`/`number` | —                                                    | `[8, 6, 8, 6]` |
| `box-shadow`            | Shadow settings                | `array`          | —                                                    | —              |
| `max-width`             | Maximum width                  | `string`         | —                                                    | —              |
| `close-on-press-escape` | Whether to close by pressing ESC | `boolean`       | —                                                    | `false`        |
| `close-on-press-other`  | Whether to close by clicking other areas | `boolean`  | —                                                    | `false`        |

### Events

| Event Name | Description                    | Callback Parameters |
| ---------- | ------------------------------ | ------------------- |
| `confirm`  | Triggered when confirm button is clicked | —              |
| `cancel`   | Triggered when cancel button is clicked  | —              |

### Slots

| Slot Name | Description                    | Scope Parameters |
| --------- | ------------------------------ | ---------------- |
| `default` | Element that triggers pop confirm display | —         |
| `content` | Custom pop confirm content     | —                |

### Style Variables

| Variable Name               | Description            |
| --------------------------- | ---------------------- |
| `$popconfirm-bg-color`      | PopConfirm background color |
| `$popconfirm-text-color`    | PopConfirm text color  |
| `$popconfirm-border-radius` | PopConfirm border radius |
| `$popconfirm-shadow`        | PopConfirm shadow      |
