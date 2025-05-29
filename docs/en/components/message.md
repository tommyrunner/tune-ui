<script setup lang="ts">
import messageBasic from '../examples/message/basic.vue'
import messageStyle from '../examples/message/style.vue'
import messageNotification from '../examples/message/notification.vue'
import messageClose from '../examples/message/close.vue'
import messageCustom from '../examples/message/custom.vue'
import messageEvents from '../examples/message/events.vue'
</script>

# Message Component

![Message Component](/components/message.png)

Message component is used to display operation feedback or system prompts on the page, supporting multiple message types and styles, can automatically disappear or be manually closed, and is a lightweight feedback method.

## Basic Usage

Basic message prompts, including four types: success, warning, info, and error.

<demo :component="messageBasic" name="message" examples="basic" />

## Message Style

You can customize the message width, padding, icon, and plain style.

<demo :component="messageStyle" name="message" examples="style" />

## Notification Type

Supports notification message display in four directions, can include title and content.

<demo :component="messageNotification" name="message" examples="notification" />

## Close Configuration

Supports multiple closing methods including manual close, auto close, and close by pressing ESC key.

<demo :component="messageClose" name="message" examples="close" />

## Custom Configuration

You can customize the message mount position and display position.

<demo :component="messageCustom" name="message" examples="custom" />

## Event Handling

Message provides close callback events and supports stacked display of multiple messages.

<demo :component="messageEvents" name="message" examples="events" />

## Message API

### Message Methods

| Method Name                 | Description            | Parameters                                                              | Return Value      |
| --------------------------- | ---------------------- | ----------------------------------------------------------------------- | ----------------- |
| `TMessage.message`          | Display normal message | `(content: string, type?: string, options?: object) => string`          | Unique ID of message instance |
| `TNotification.message`     | Display notification message | `(title: string, content: string, type?: string, options?: object) => string` | Unique ID of message instance |

### Message Configuration

| Attribute                   | Description                    | Type                                    | Accepted Values                             | Default               |
| --------------------------- | ------------------------------ | --------------------------------------- | ------------------------------------------- | --------------------- |
| `type`                      | Message type                   | `string`                                | `success` / `warning` / `info` / `danger`   | `info`                |
| `plain`                     | Whether to use plain style     | `boolean`                               | `true` / `false`                            | `false`               |
| `messageType`               | Message display mode           | `string`                                | `default` / `notice`                        | `default`             |
| `title`                     | Title (available in notification mode) | `string`                       | —                                           | —                     |
| `position`                  | Position (available in notification mode) | `string`                    | `topRight` / `bottomRight` / `bottomLeft` / `topLeft` | `topRight`         |
| `content`                   | Message content                | `string`                                | —                                           | —                     |
| `icon`                      | Icon type                      | `string`                                | —                                           | Auto-selected by type |
| `duration`                  | Display duration (ms)          | `number`                                | —                                           | `2600`                |
| `radius`                    | Border radius size             | `array` / `number`                      | —                                           | `[6, 6, 6, 6]`        |
| `padding`                   | Padding size                   | `array` / `number`                      | —                                           | `[8, 12, 8, 12]`      |
| `width`                     | Message box width              | `string`                                | —                                           | —                     |
| `appendTo`                  | Target position for message rendering | `string` / `element`             | —                                           | `body`                |
| `custom`                    | Custom position coordinates    | `object {x: string, y: string}`         | —                                           | `{x: "50%", y: "24px"}` |
| `maxLength`                 | Maximum number of messages     | `number`                                | —                                           | `8`                   |
| `isClose`                   | Whether to show close button   | `boolean`                               | `true` / `false`                            | `false`               |
| `closeCallback`             | Close callback function        | `function(id: string)`                  | —                                           | —                     |
| `closeOnPressEscape`        | Whether to support ESC key close | `boolean`                            | `true` / `false`                            | `true`                |

### Style Variables

The message component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description           |
| --------------------- | --------------------- |
| $theme-color-primary  | Theme color - Primary |
| $theme-color-success  | Theme color - Success |
| $theme-color-info     | Theme color - Info    |
| $theme-color-warning  | Theme color - Warning |
| $theme-color-danger   | Theme color - Danger  |
| $color-white          | White color           |
| $bg-color-default     | Default background color |
| $bg-color-model       | Modal background color |
| $text-color-default   | Default text color    |
| $z-index-up           | Upper layer z-index   | 