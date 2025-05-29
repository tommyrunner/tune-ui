<script setup lang="ts">
import listViewBasic from '../examples/list-view/basic.vue'
import listViewEmpty from '../examples/list-view/empty.vue'
import listViewVirtual from '../examples/list-view/virtual.vue'
import listViewFixed from '../examples/list-view/fixed.vue'
import listViewSlots from '../examples/list-view/slots.vue'
</script>

# ListView Component

![ListView Component](/components/list-view.png)

ListView component is used to display large amounts of data, supporting virtual scrolling, fixed rows, and custom layouts.

## Basic Usage

Basic list view for displaying a set of data.

<demo :component="listViewBasic" name="list-view" examples="basic" />

## Empty Data Display

When list data is empty, an empty state prompt will be displayed.

<demo :component="listViewEmpty" name="list-view" examples="empty" />

## Virtual Scrolling

When displaying large amounts of data, virtual scrolling can be enabled to improve performance.

<demo :component="listViewVirtual" name="list-view" examples="virtual" />

## Fixed Items

Through the `itemFixed` attribute, you can set specific items to be fixed and not move with scrolling.

<demo :component="listViewFixed" name="list-view" examples="fixed" />

## List Slots

ListView provides header and footer slots for adding additional content.

<demo :component="listViewSlots" name="list-view" examples="slots" />

## ListView Component API

### Attributes

| Attribute | Description | Type | Accepted Values | Default |
| --- | --- | --- | --- | --- |
| listData | List data source | array | — | [] |
| height | List container height | number | — | — |
| isVirtualized | Whether to enable virtual scrolling | boolean | — | false |
| itemHeight | Fixed height for virtual list items | number | — | — |
| itemFixed | Fixed item judgment function | function(index, row) | — | — |
| emptyText | Empty data prompt text | string | — | No data |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| scroll | Triggered when list scrolls | (element: `HTMLElement`) |
| update-view | Triggered when view updates | (element: `HTMLElement`) |

### Slots

| Slot Name | Description | Scope Parameters |
| --- | --- | --- |
| default | List item content | { row: `any`, index: `number` } |
| head | List header content | — |
| footer | List footer content | — |
| empty | Empty state content | — |

### Style Variables

ListView component uses the following style variables, which can be customized through SCSS variables:

| Variable Name | Description |
| --- | --- |
| $border-color-default | Default border color |
| $z-index-dropdown | Dropdown z-index |
| $bg-color-overlay | Overlay background color | 