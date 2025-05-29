<script setup lang="ts">
import tabsBasic from '../examples/tabs/basic.vue'
import tabsType from '../examples/tabs/type.vue'
import tabsGap from '../examples/tabs/gap.vue'
import tabsHeight from '../examples/tabs/height.vue'
import tabsIcon from '../examples/tabs/icon.vue'
import tabsClose from '../examples/tabs/close.vue'
import tabsDisabled from '../examples/tabs/disabled.vue'
</script>

# Tabs Component

![Tabs Component](/components/tabs.png)

Tabs component allows users to switch between different views, serving as an important way for content organization and navigation, commonly used for categorized content display.

## Basic Usage

Basic tabs usage, displaying the default line-style tabs.

<demo :component="tabsBasic" name="tabs" examples="basic" />

## Different Types

Tabs component provides three different types: line style (line), block style (block), and border style (border).

<demo :component="tabsType" name="tabs" examples="type" />

## Custom Gap

You can customize the gap between tabs by setting the `gap` attribute. When set to `0`, tabs will fill the entire container.

<demo :component="tabsGap" name="tabs" examples="gap" />

## Custom Height

You can customize the height of tabs by setting the `height` attribute.

<demo :component="tabsHeight" name="tabs" examples="height" />

## Tabs with Icons

You can add icons to tabs by using the `icon` attribute on the `TTabs` component.

<demo :component="tabsIcon" name="tabs" examples="icon" />

## With Close Button

Set the `is-close` attribute to `true` to enable the close functionality for tabs.

<demo :component="tabsClose" name="tabs" examples="close" />

## Disabled State

Set the `disabled` attribute on the `TTabs` component to disable specific tabs.

<demo :component="tabsDisabled" name="tabs" examples="disabled" />

## Tabs API

### TTabs Attributes

| Attribute | Description      | Type          | Accepted Values | Default |
| --------- | ---------------- | ------------- | --------------- | ------- |
| disabled  | Whether disabled | boolean       | —               | false   |
| value     | Tab value        | string/number | —               | —       |
| icon      | Tab icon         | string        | —               | —       |

### TTabsGroup Attributes

| Attribute       | Description                    | Type          | Accepted Values   | Default |
| --------------- | ------------------------------ | ------------- | ----------------- | ------- |
| v-model         | Binding value                  | string/number | —                 | —       |
| type            | Tab type                       | string        | line/block/border | line    |
| height          | Tab height                     | string        | —                 | 42px    |
| gap             | Tab gap                        | number        | —                 | 8       |
| is-close        | Whether to show close button   | boolean       | —                 | false   |
| action-duration | Switch animation duration (ms) | number        | —                 | 220     |

### TTabsGroup Events

| Event Name | Description                    | Parameters           |
| ---------- | ------------------------------ | -------------------- |
| change     | Triggered when tab switches    | (value: `ValueType`) |
| close      | Triggered when tab is closed   | (value: `ValueType`) |

### TTabs Slots

| Slot Name | Description  |
| --------- | ------------ |
| default   | Tab content  |

### TTabsGroup Slots

| Slot Name | Description           |
| --------- | --------------------- |
| default   | Place TTabs component |

### Style Variables

The tabs component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description           |
| --------------------- | --------------------- |
| $theme-color-primary  | Theme color - Primary |
| $theme-color-danger   | Theme color - Danger  |
| $text-color-default   | Text color - Default  |
| $font-size-default    | Font size - Default   | 
 