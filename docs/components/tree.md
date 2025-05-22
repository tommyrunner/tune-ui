<script setup lang="ts">
import treeBasic from '../examples/tree/basic.vue'
import treeCheckable from '../examples/tree/checkable.vue'
import treeDefaultState from '../examples/tree/default-state.vue'
import treeAccordion from '../examples/tree/accordion.vue'
import treeDisabled from '../examples/tree/disabled.vue'
import treeCustomNode from '../examples/tree/custom-node.vue'
import treeExpandControl from '../examples/tree/expand-control.vue'
</script>

# 树形控件

![树形控件](/components/tree.png)

树形控件用于展示具有层级结构的数据，支持选择、展开/折叠等交互操作，适用于文件夹、组织架构、分类管理等场景。

## 基础用法

基础的树形控件用法，展示层级结构的数据。

<demo :component="treeBasic" name="tree" examples="basic" />

## 可选择的树形控件

设置 `checkable` 属性为 `true` 可以显示复选框，实现节点的选择功能。

<demo :component="treeCheckable" name="tree" examples="checkable" />

## 默认展开和选中

通过 `expanded` 和 `checked` 属性可以设置默认展开和选中的节点。

<demo :component="treeDefaultState" name="tree" examples="defaultstate" />

## 手风琴模式

设置 `accordion` 属性为 `true` 可以实现手风琴模式，同级节点只能展开一个。

<demo :component="treeAccordion" name="tree" examples="accordion" />

## 禁用状态

设置 `disabled` 属性可以禁用整棵树，也可以通过在数据中设置 `disabled` 字段来禁用特定节点。

<demo :component="treeDisabled" name="tree" examples="disabled" />

## 自定义节点内容

通过默认插槽可以自定义节点的内容和样式。

<demo :component="treeCustomNode" name="tree" examples="customnode" />

## 控制节点展开方式

通过设置 `expand-on-click-node` 属性可以控制是否在点击节点时展开/折叠节点。

<demo :component="treeExpandControl" name="tree" examples="expandcontrol" />

## 树形控件 API

### 属性

| 属性名                 | 说明                                 | 类型      | 可选值 | 默认值     |
| ---------------------- | ------------------------------------ | --------- | ------ | ---------- |
| `data`                 | 显示的数据                           | `array`   | —      | `[]`       |
| `node-key`             | 每个树节点用来作为唯一标识的属性     | `string`  | —      | `id`       |
| `label`                | 指定节点标签为节点对象的某个属性值   | `string`  | —      | `label`    |
| `children`             | 指定子树为节点对象的某个属性值       | `string`  | —      | `children` |
| `expanded`             | 默认展开的节点的 key 的数组          | `array`   | —      | `[]`       |
| `checked`              | 默认勾选的节点的 key 的数组          | `array`   | —      | `[]`       |
| `indent`               | 相邻级节点间的水平缩进，单位为像素   | `number`  | —      | `16`       |
| `checkable`            | 节点是否可被勾选                     | `boolean` | —      | `false`    |
| `accordion`            | 是否每次只打开一个同级树节点         | `boolean` | —      | `false`    |
| `expand-on-click-node` | 是否在点击节点的时候展开或者收缩节点 | `boolean` | —      | `true`     |
| `disabled`             | 是否禁用整棵树                       | `boolean` | —      | `false`    |

### 事件

| 事件名          | 说明                       | 回调参数                  |
| --------------- | -------------------------- | ------------------------- |
| `node-expand`   | 节点被展开时触发           | `(nodeData, node)`        |
| `node-collapse` | 节点被收起时触发           | `(nodeData, node)`        |
| `check-change`  | 节点选中状态发生变化时触发 | `(checkedKeys: string[])` |

### 方法

| 方法名            | 说明                    | 参数                                  |
| ----------------- | ----------------------- | ------------------------------------- |
| `expandByKey`     | 通过 key 展开指定的节点 | `(key: string, deep: boolean = true)` |
| `collapseByKey`   | 通过 key 收起指定的节点 | `(key: string, deep: boolean = true)` |
| `getCheckedNodes` | 获取当前选中的节点数据  | —                                     |

### 插槽

| 插槽名    | 说明                 | 作用域参数                             |
| --------- | -------------------- | -------------------------------------- |
| `default` | 自定义树节点的内容   | `{ node: TreeNodeType, data: object }` |
| `empty`   | 自定义树为空时的内容 | —                                      |

### 数据结构

每个节点对象应包含以下字段：

```typescript
interface NodeData {
  [nodeKey: string]: string; // 唯一标识，默认为id
  [label: string]: string;   // 节点显示的文本，默认为label
  [children: string]?: NodeData[]; // 子节点，默认为children
  disabled?: boolean;        // 是否禁用节点
}
```

### 样式变量

树形控件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名               | 说明         |
| -------------------- | ------------ |
| $font-size-default   | 默认字体大小 |
| $text-color-default  | 默认文本颜色 |
| $border-color-default| 默认边框颜色 |
| $bg-color-default    | 默认背景颜色 |
| $bg-color-hover      | 悬停背景颜色 |
| $theme-color-primary | 主题色-主要  |
