<script setup lang="ts">
import treeBasic from '../examples/tree/basic.vue'
import treeCheckable from '../examples/tree/checkable.vue'
import treeDefaultState from '../examples/tree/default-state.vue'
import treeAccordion from '../examples/tree/accordion.vue'
import treeDisabled from '../examples/tree/disabled.vue'
import treeCustomNode from '../examples/tree/custom-node.vue'
import treeExpandControl from '../examples/tree/expand-control.vue'
</script>

# Tree Component

![Tree Component](/components/tree.png)

Tree component is used to display hierarchical data, supporting interactive operations such as selection, expand/collapse, suitable for folders, organizational structures, category management and other scenarios.

## Basic Usage

Basic tree component usage, displaying hierarchical data.

<demo :component="treeBasic" name="tree" examples="basic" />

## Selectable Tree

Set the `checkable` attribute to `true` to display checkboxes and enable node selection functionality.

<demo :component="treeCheckable" name="tree" examples="checkable" />

## Default Expanded and Checked

You can set default expanded and checked nodes through the `expanded` and `checked` attributes.

<demo :component="treeDefaultState" name="tree" examples="default-state" />

## Accordion Mode

Set the `accordion` attribute to `true` to enable accordion mode, where only one sibling node can be expanded at a time.

<demo :component="treeAccordion" name="tree" examples="accordion" />

## Disabled State

Set the `disabled` attribute to disable the entire tree, or set the `disabled` field in the data to disable specific nodes.

<demo :component="treeDisabled" name="tree" examples="disabled" />

## Custom Node Content

You can customize node content and styles through the default slot.

<demo :component="treeCustomNode" name="tree" examples="custom-node" />

## Control Node Expansion

You can control whether to expand/collapse nodes when clicking on them by setting the `expand-on-click-node` attribute.

<demo :component="treeExpandControl" name="tree" examples="expand-control" />

## Tree API

### Attributes

| Attribute              | Description                                      | Type      | Accepted Values | Default    |
| ---------------------- | ------------------------------------------------ | --------- | --------------- | ---------- |
| `data`                 | Data to be displayed                             | `array`   | —               | `[]`       |
| `node-key`             | Unique identifier attribute for each tree node   | `string`  | —               | `id`       |
| `label`                | Specify node label as a property value of node object | `string` | —            | `label`    |
| `children`             | Specify subtree as a property value of node object | `string` | —             | `children` |
| `expanded`             | Array of keys of nodes that are expanded by default | `array` | —             | `[]`       |
| `checked`              | Array of keys of nodes that are checked by default | `array`  | —             | `[]`       |
| `indent`               | Horizontal indentation between adjacent level nodes in pixels | `number` | —      | `16`       |
| `checkable`            | Whether nodes can be checked                     | `boolean` | —               | `false`    |
| `accordion`            | Whether to open only one sibling tree node at a time | `boolean` | —           | `false`    |
| `expand-on-click-node` | Whether to expand or collapse node when clicking on it | `boolean` | —         | `true`     |
| `disabled`             | Whether to disable the entire tree               | `boolean` | —               | `false`    |

### Events

| Event Name      | Description                              | Parameters                |
| --------------- | ---------------------------------------- | ------------------------- |
| `node-expand`   | Triggered when node is expanded          | `(nodeData, node)`        |
| `node-collapse` | Triggered when node is collapsed         | `(nodeData, node)`        |
| `check-change`  | Triggered when node check state changes  | `(checkedKeys: string[])` |

### Methods

| Method Name       | Description                     | Parameters                                |
| ----------------- | ------------------------------- | ----------------------------------------- |
| `getCheckedKeys`  | Get currently checked node keys | —                                         |
| `getCheckedNodes` | Get currently checked node data | —                                         |
| `setCheckedKeys`  | Set checked node keys           | `(keys: string[])`                        |
| `expandAll`       | Expand all nodes                | —                                         |
| `collapseAll`     | Collapse all nodes              | —                                         |

### Slots

| Slot Name | Description                    | Scope Parameters                       |
| --------- | ------------------------------ | -------------------------------------- |
| `default` | Custom tree node content       | `{ node: TreeNodeType, data: object }` |
| `empty`   | Custom content when tree is empty | —                                   |

### Data Structure

Each node object should contain the following fields:

```typescript
interface NodeData {
  [nodeKey: string]: string; // Unique identifier, default is id
  [label: string]: string;   // Text displayed by node, default is label
  [children: string]?: NodeData[]; // Child nodes, default is children
  disabled?: boolean;        // Whether to disable node
}
```

### Style Variables

The tree component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description           |
| --------------------- | --------------------- |
| $font-size-default    | Default font size     |
| $text-color-default   | Default text color    |
| $border-color-default | Default border color  |
| $bg-color-default     | Default background color |
| $bg-color-hover       | Hover background color |
| $theme-color-primary  | Theme color - Primary |
