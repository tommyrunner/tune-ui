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

# 表格组件

![表格组件](/components/table.png)

表格组件用于展示结构化数据，支持多级表头、固定列、固定行、虚拟滚动、排序、筛选等特性。

## 基础用法

基础表格用于展示简单的表格数据。

<demo :component="tableBasic" name="table" examples="basic" />

## 多级表头

通过 `columns` 的 `children` 属性可以创建多级表头。

<demo :component="tableNested" name="table" examples="nested" />

## 虚拟滚动

当需要展示大量数据时，可以启用虚拟滚动以提高性能。

<demo :component="tableVirtual" name="table" examples="virtual" />

## 固定列

通过设置 `columns` 中的 `fixed` 属性可以固定列。

<demo :component="tableFixedColumn" name="table" examples="fixedcolumn" />

## 固定行

通过 `fixedRow` 属性可以设置特定行固定不随滚动而移动。

<demo :component="tableFixedRow" name="table" examples="fixedrow" />

## 排序和筛选

表格支持列排序和筛选功能。

<demo :component="tableSortFilter" name="table" examples="sortfilter" />

## 自定义渲染

通过 `render` 和 `renderHead` 属性可以自定义单元格和表头内容。

<demo :component="tableCustomRender" name="table" examples="customrender" />

## 选择与事件

表格支持行选择功能和各种事件处理。

<demo :component="tableSelection" name="table" examples="selection" />

## 样式配置

表格提供了丰富的样式配置选项，包括边框、斑马纹等。

<demo :component="tableStyle" name="table" examples="style" />

## 合计行

通过 `summary` 属性可以设置表格底部的合计行。

<demo :component="tableSummary" name="table" examples="summary" />

## 表格 API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| columns | 表格列配置 | array | — | [] |
| data | 表格数据源 | array | — | [] |
| height | 表格高度 | number | — | — |
| isVirtualized | 是否启用虚拟滚动 | boolean | — | false |
| virtualizedItemHeight | 虚拟滚动行高 | number | — | 50 |
| headBgColor | 表头背景色 | string | — | #f5f7fa |
| hoverBgColor | 鼠标悬浮背景色 | string | — | — |
| border | 表格边框 | string | — | #dcdcdc68 |
| stripe | 斑马纹 | boolean/string | — | false |
| dbClickAutoWidth | 是否支持双击自适应列宽 | boolean | — | true |
| changeType | 选择模式 | string | single/multiple/none | none |
| changeKey | 选中标识字段 | string | — | _checked |
| fixedRow | 固定行方法 | function(index, row) | — | — |
| summary | 合计行配置 | boolean/function | — | — |
| rowStyle | 自定义行样式 | function(index, row) | — | — |
| sortMethod | 自定义排序方法 | function | — | — |
| renderExtend | 行扩展内容 | function(row) | — | — |

### 列配置

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| prop | 列字段名 | string | — | — |
| label | 列标题 | string | — | — |
| width | 列宽度 | number | — | — |
| fixed | 固定列位置 | string | left/right | — |
| children | 子列配置 | array | — | — |
| sort | 排序值 | number | — | — |
| sortable | 是否可排序 | boolean | — | false |
| filters | 筛选配置 | array | — | — |
| renderHead | 自定义表头渲染 | function(scope) | — | — |
| render | 自定义单元格渲染 | function(scope) | — | — |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| checked | 选中事件 | ({ row: `object`, data: `array` }) |
| click-row | 行点击事件 | (row: `object`) |

### 样式变量

表格组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名 | 说明 |
| --- | --- |
| $border-color-default | 默认边框颜色 |
| $text-color-default | 默认文本颜色 |
| $bg-color-default | 默认背景颜色 |
| $bg-color-hover | 悬停背景颜色 |
| $z-index-show | 显示层级 |
| $z-index-up | 上层层级 | 