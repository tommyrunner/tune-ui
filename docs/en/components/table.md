<script setup lang="ts">
import tableBasic from '../examples/table/basic.vue'
import tableNested from '../examples/table/nested.vue'
import tableVirtual from '../examples/table/virtual.vue'
import tableFixedColumn from '../examples/table/fixed-column.vue'
import tableFixedRow from '../examples/table/fixed-row.vue'
import tableSortFilter from '../examples/table/sort-filter.vue'
import tableCustomRender from '../examples/table/custom-render.vue'
import tableSelection from '../examples/table/selection.vue'
import tableStyle from '../examples/table/style.vue'
import tableSummary from '../examples/table/summary.vue'
</script>
<style>
    /* Specific, because there are specified li attributes in the documentation, need to restore */
    .t-listView-item {
        margin-top: 0px !important;
    }
    .t-listView{
        margin: 0px !important;
        padding-left: 0px !important;
    }
</style>

# Table Component

![Table Component](/components/table.png)

Table component is used to display structured data, supporting multi-level headers, fixed columns, fixed rows, virtual scrolling, sorting, filtering and other features.

## Basic Usage

Basic table for displaying simple table data.

<demo :component="tableBasic" name="table" examples="basic" />

## Multi-level Headers

Multi-level headers can be created through the `children` attribute of `columns`.

<demo :component="tableNested" name="table" examples="nested" />

## Virtual Scrolling

When you need to display large amounts of data, virtual scrolling can be enabled to improve performance.

<demo :component="tableVirtual" name="table" examples="virtual" />

## Fixed Columns

Columns can be fixed by setting the `fixed` attribute in `columns`.

<demo :component="tableFixedColumn" name="table" examples="fixed-column" />

## Fixed Rows

Specific rows can be set to be fixed and not move with scrolling through the `fixedRow` attribute.

<demo :component="tableFixedRow" name="table" examples="fixed-row" />

## Sorting and Filtering

Table supports column sorting and filtering functionality.

<demo :component="tableSortFilter" name="table" examples="sort-filter" />

## Custom Rendering

Cell and header content can be customized through `render` and `renderHead` attributes.

<demo :component="tableCustomRender" name="table" examples="custom-render" />

## Selection and Events

Table supports row selection functionality and various event handling.

<demo :component="tableSelection" name="table" examples="selection" />

## Style Configuration

Table provides rich style configuration options, including borders, stripes, etc.

<demo :component="tableStyle" name="table" examples="style" />

## Summary Row

A summary row at the bottom of the table can be set through the `summary` attribute.

<demo :component="tableSummary" name="table" examples="summary" />

## Table API

### Attributes

| Attribute             | Description                    | Type                 | Accepted Values      | Default   |
| --------------------- | ------------------------------ | -------------------- | -------------------- | --------- |
| columns               | Table column configuration     | array                | —                    | []        |
| data                  | Table data source              | array                | —                    | []        |
| height                | Table height                   | number               | —                    | —         |
| isVirtualized         | Whether to enable virtual scrolling | boolean         | —                    | false     |
| virtualizedItemHeight | Virtual scroll row height      | number               | —                    | 50        |
| headBgColor           | Header background color        | string               | —                    | #f5f7fa   |
| footBgColor           | Footer background color        | string               | —                    | #f5f7fa   |
| hoverBgColor          | Mouse hover background color   | string               | —                    | —         |
| border                | Table border                   | string               | —                    | #dcdcdc68 |
| stripe                | Stripe pattern                 | boolean/string       | —                    | false     |
| dbClickAutoWidth      | Whether to support double-click auto-fit column width | boolean | —         | true      |
| changeType            | Selection mode                 | string               | single/multiple/none | none      |
| changeKey             | Selection identifier field     | string               | —                    | \_checked |
| fixedRow              | Fixed row method               | function(index, row) | —                    | —         |
| summary               | Summary row configuration      | boolean/function     | —                    | —         |
| rowStyle              | Custom row style               | function(index, row) | —                    | —         |
| sortMethod            | Custom sort method             | function             | —                    | —         |
| renderExtend          | Row expansion content          | function(row)        | —                    | —         |

### Column Configuration

| Attribute  | Description              | Type            | Accepted Values | Default |
| ---------- | ------------------------ | --------------- | --------------- | ------- |
| prop       | Column field name        | string          | —               | —       |
| label      | Column title             | string          | —               | —       |
| width      | Column width             | number          | —               | —       |
| fixed      | Fixed column position    | string          | left/right      | —       |
| children   | Sub-column configuration | array           | —               | —       |
| sort       | Sort value               | number          | —               | —       |
| sortable   | Whether sortable         | boolean         | —               | false   |
| filters    | Filter configuration     | array           | —               | —       |
| renderHead | Custom header rendering  | function(scope) | —               | —       |
| render     | Custom cell rendering    | function(scope) | —               | —       |

### Events

| Event Name | Description    | Parameters                         |
| ---------- | -------------- | ---------------------------------- |
| checked    | Selection event| ({ row: `object`, data: `array` }) |
| click-row  | Row click event| (row: `object`)                    |

### Style Variables

The table component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description           |
| --------------------- | --------------------- |
| $border-color-default | Default border color  |
| $text-color-default   | Default text color    |
| $bg-color-default     | Default background color |
| $bg-color-hover       | Hover background color |
| $z-index-show         | Display z-index       |
| $z-index-up           | Upper layer z-index   |
