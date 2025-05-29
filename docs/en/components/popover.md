<script setup lang="ts">
import popoverBasic from '../examples/popover/basic.vue'
import popoverGroup from '../examples/popover/group.vue'
import popoverPosition from '../examples/popover/position.vue'
import popoverStyle from '../examples/popover/style.vue'
import popoverContent from '../examples/popover/content.vue'
import popoverTrigger from '../examples/popover/trigger.vue'
import popoverModal from '../examples/popover/modal.vue'
import popoverEvents from '../examples/popover/events.vue'
</script>

# Popover Component

![Popover Component](/components/popover.png)

Popover component is used to pop up a lightweight tooltip near an element, which can contain various custom content. It's commonly used for displaying hint information, operation menus, detailed descriptions, etc.

## Basic Usage

Basic popover providing both hover and click trigger methods.

<demo :component="popoverBasic" name="popover" examples="basic" />

## Group Usage

You can apply popover to a group of elements and manage their popup behavior simultaneously.

<demo :component="popoverGroup" name="popover" examples="group" />

## Popup Position

Supports four directions for popup: top, right, bottom, left. You can choose the appropriate popup direction based on page space.

<demo :component="popoverPosition" name="popover" examples="position" />

## Custom Style

You can customize the popover's width, border radius, padding, shadow and other styles.

<demo :component="popoverStyle" name="popover" examples="style" />

## Custom Content

You can customize the popover content through slots, supporting any HTML structure.

<demo :component="popoverContent" name="popover" examples="content" />

## Trigger Configuration

Supports multiple interaction configurations such as delayed hiding, close by pressing ESC key, close by clicking other areas, etc.

<demo :component="popoverTrigger" name="popover" examples="trigger" />

## Modal Layer

You can add a modal layer to the popover for a more focused interactive experience.

<demo :component="popoverModal" name="popover" examples="modal" />

## Event Handling

Popover provides various events for monitoring mouse enter, leave, state changes, etc.

<demo :component="popoverEvents" name="popover" examples="events" />

## Popover API

### TPopover Attributes

| Attribute               | Description                    | Type                                 | Accepted Values             | Default       |
| ----------------------- | ------------------------------ | ------------------------------------ | --------------------------- | ------------- |
| `width`                 | Popover width                  | `string / number`                    | —                           | —             |
| `disabled`              | Whether disabled               | `boolean`                            | `true / false`              | `false`       |
| `type`                  | Trigger method                 | `string`                             | `hover / click / none`      | `hover`       |
| `content`               | Display content                | `string`                             | —                           | —             |
| `radius`                | Border radius size             | `array / number`                     | —                           | `4`           |
| `padding`               | Padding size                   | `array / number`                     | —                           | `[8, 12, 8, 12]` |
| `box-shadow`            | Shadow configuration           | `array`                              | —                           | —             |
| `gap`                   | Gap between popover and trigger element | `number`                    | —                           | `10`          |
| `hide-after`            | Hide delay time (ms)           | `number`                             | —                           | `0`           |
| `position`              | Popup position                 | `string`                             | `top / right / bottom / left` | `top`       |
| `append-to`             | Target position for rendering  | `string / element`                   | —                           | `body`        |
| `auto-position`         | Whether to auto adjust position | `boolean`                           | `true / false`              | `true`        |
| `show-arrow`            | Whether to show arrow          | `boolean`                            | `true / false`              | `true`        |
| `custom`                | Custom position coordinates    | `object {x: number, y: number}`      | —                           | —             |
| `dialog-animation`      | Whether to use dialog animation | `boolean`                           | `true / false`              | `false`       |
| `drawer-animation`      | Whether to use drawer animation | `boolean`                           | `true / false`              | `false`       |
| `close-on-press-escape` | Whether to support ESC key close | `boolean`                         | `true / false`              | `false`       |
| `close-on-press-other`  | Whether to close by clicking other areas | `boolean`                | `true / false`              | `false`       |
| `is-modal`              | Whether to show modal layer    | `boolean`                            | `true / false`              | `false`       |
| `is-modal-nest`         | Whether to allow modal layer nesting | `boolean`                     | `true / false`              | `false`       |

### Events

| Event Name     | Description                    | Callback Parameters   |
| -------------- | ------------------------------ | --------------------- |
| `click-model`  | Triggered when modal is clicked | —                    |
| `hover-enter`  | Triggered when mouse enters    | `(el: HTMLElement)`   |
| `hover-out`    | Triggered when mouse leaves    | `(el: HTMLElement)`   |
| `model-change` | Triggered when display state changes | —                |
| `open`         | Triggered when popover opens   | —                     |
| `close`        | Triggered when popover closes  | —                     |

### Slots

| Slot Name  | Description                    | Scope Parameters |
| ---------- | ------------------------------ | ---------------- |
| `default`  | Element that triggers popover display | —         |
| `content`  | Popover content                | —                |

### Style Variables

| Variable Name            | Description            |
| ------------------------ | ---------------------- |
| `$popover-bg-color`      | Popover background color |
| `$popover-text-color`    | Popover text color     |
| `$popover-border-radius` | Popover border radius  |
| `$popover-shadow`        | Popover shadow         |
| `$popover-arrow-size`    | Popover arrow size     |
</rewritten_file> 