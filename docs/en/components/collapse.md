<script setup lang="ts">
import collapseBasic from '../examples/collapse/basic.vue'
import collapseAccordion from '../examples/collapse/accordion.vue'
import collapseCustom from '../examples/collapse/custom.vue'
import collapseNested from '../examples/collapse/nested.vue'
import collapseDisabled from '../examples/collapse/disabled.vue'
import collapseIcon from '../examples/collapse/icon.vue'
</script>

# Collapse Component

![Collapse Component](/components/collapse.png)

Collapse component is used to fold/expand content areas, saving page space. It's commonly used for grouped information display, FAQ, settings, and other content. It's suitable for scenarios with large amounts of information that need to be displayed in groups.

## Basic Usage

Basic collapse usage, click panel title to toggle expand/collapse state of content area.

<demo :component="collapseBasic" name="collapse" examples="basic" />

## Accordion Mode

Setting the `accordion` attribute to `true` enables accordion mode, where only one panel can be expanded at a time.

<demo :component="collapseAccordion" name="collapse" examples="accordion" />

## Custom Styles

You can customize the style of collapse panels by setting related attributes, such as background color, borders, etc.

<demo :component="collapseCustom" name="collapse" examples="custom" />

## Nested Panels

Collapse panels can be nested to achieve multi-level content organization.

<demo :component="collapseNested" name="collapse" examples="nested" />

## Disabled State

Setting the `disabled` attribute on panel items can disable specific panel items.

<demo :component="collapseDisabled" name="collapse" examples="disabled" />

## Custom Icons

Setting the `rightIcon` attribute can customize expand/collapse icons, and you can also completely customize the title area through slots.

<demo :component="collapseIcon" name="collapse" examples="icon" />

## Collapse Component API

### TCollapseGroup Attributes

| Attribute | Description | Type | Accepted Values | Default |
| --------------- | ------------------------ | ---------------- | ------ | ------- |
| `modelValue` | Currently active panels (two-way binding) | `array`/`string` | — | `[]` |
| `accordion` | Whether accordion mode | `boolean` | — | `false` |
| `border` | Whether to show border | `boolean` | — | `true` |
| `before-change` | Callback function before panel switching | `function` | — | — |

### TCollapse Attributes

| Attribute | Description | Type | Accepted Values | Default |
| ----------- | ---------- | ----------------- | ------ | ------------- |
| `value` | Unique identifier | `string`/`number` | — | Index value |
| `title` | Panel title | `string` | — | — |
| `disabled` | Whether disabled | `boolean` | — | `false` |
| `rightIcon` | Custom icon | `string` | — | `arrow-right` |

### Events

| Event Name | Description | Callback Parameters |
| -------- | ---------------------- | --------------------------------- |
| `change` | Triggered when active panels change | `(activeNames: `array`/`string`)` |

### Slots

| Slot Name | Description | Scope Parameters |
| --------- | --------------------- | ----------------------- |
| `default` | TCollapseGroup content | — |
| `title` | Custom title content | — |
| `icon` | Custom icon | `{ isActive: boolean }` |

### Methods

| Method Name | Description | Parameters |
| ------------ | --------------------------- | ---------------------------- |
| `toggleItem` | Toggle expand/collapse state of specified panel | `(value: `string`/`number`)` |

### Style Variables

Collapse component uses the following style variables, which can be customized through SCSS variables:

| Variable Name | Description |
| --------------------- | -------------- |
| $border-color-default | Default border color |
| $bg-color-default | Default background color |
| $bg-color-hover | Hover background color |
| $text-color-default | Default text color |
| $opacity-disabled | Disabled state opacity |
| $font-size-default | Default font size |
