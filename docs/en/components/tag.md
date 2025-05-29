<script setup lang="ts">
import tagBasic from '../examples/tag/basic.vue'
import tagSize from '../examples/tag/size.vue'
import tagClosable from '../examples/tag/closable.vue'
import tagRound from '../examples/tag/round.vue'
import tagDisabled from '../examples/tag/disabled.vue'
</script>

# Tag Component

![Tag Component](/components/tag.png)

Tags are used for marking, categorizing, and selecting, making it easy for users to quickly identify different types of information.

## Basic Usage

Tags have multiple types: default, primary, success, info, warning, and danger.

<demo :component="tagBasic" name="tag" examples="basic" />

## Different Sizes

Tags provide three sizes: small, default, and large.

<demo :component="tagSize" name="tag" examples="size" />

## Closable Tags

Setting the `closable` attribute allows the tag to display a close button. Clicking the close button will trigger the `close` event.

<demo :component="tagClosable" name="tag" examples="closable" />

## Round Tags

Setting the `round` attribute makes the tag have rounded corners.

<demo :component="tagRound" name="tag" examples="round" />

## Disabled State

Setting the `disabled` attribute disables tag interaction functionality.

<demo :component="tagDisabled" name="tag" examples="disabled" />

## Tag API

### Attributes

| Attribute | Description      | Type    | Accepted Values                                     | Default |
| --------- | ---------------- | ------- | --------------------------------------------------- | ------- |
| type      | Tag type         | string  | default / primary / success / info / warning / danger | default |
| size      | Tag size         | string  | small / default / large                             | default |
| closable  | Whether closable | boolean | -                                                   | false   |
| round     | Whether rounded  | boolean | -                                                   | false   |
| disabled  | Whether disabled | boolean | -                                                   | false   |

### Events

| Event Name | Description                    | Parameters            |
| ---------- | ------------------------------ | --------------------- |
| close      | Triggered when closing tag     | (event: `MouseEvent`) |
| click      | Triggered when clicking tag    | (event: `MouseEvent`) |

### Slots

| Slot Name | Description |
| --------- | ----------- |
| default   | Tag content |

### Style Variables

The tag component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description            |
| --------------------- | ---------------------- |
| $theme-color-primary  | Theme color - Primary  |
| $theme-color-success  | Theme color - Success  |
| $theme-color-info     | Theme color - Info     |
| $theme-color-warning  | Theme color - Warning  |
| $theme-color-danger   | Theme color - Danger   |
| $color-white          | White color            |
| $text-color-default   | Default text color     |
| $bg-color-default     | Default background color |
| $opacity-disabled     | Disabled state opacity |
| $font-size-small      | Small font size        |
| $font-size-default    | Default font size      |
| $font-size-large      | Large font size        |
