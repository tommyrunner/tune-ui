# 选择器组件

![选择器组件](/components/select.png)

选择器是一种表单组件，允许用户从预定义的选项列表中选择一个或多个选项。

## 基础用法

基础选择器用于从下拉列表中选择单个选项。

<demo component-name="select" examples="basic"></demo>

## 禁用状态

设置 `disabled` 属性可以禁用整个选择器，也可以在 `options` 中设置某个选项的 `disabled` 属性来禁用特定选项。

<demo component-name="select" examples="disabled"></demo>

## 不同尺寸

选择器支持三种尺寸：small、default 和 large。

<demo component-name="select" examples="size"></demo>

## 可清空

设置 `clearable` 属性可以创建一个可清空的选择器，允许用户快速清除已选项。

<demo component-name="select" examples="clearable"></demo>

## 多选模式

设置 `multiple` 属性可以启用多选模式，允许用户选择多个选项。

<demo component-name="select" examples="multiple"></demo>

## 可过滤和远程搜索

设置 `filterable` 属性可以启用过滤功能，支持本地过滤，也可以通过 `remote-method` 实现远程搜索。

<demo component-name="select" examples="filterable"></demo>

## 自定义选项

选择器支持通过插槽自定义选项内容和前缀图标等。

<demo component-name="select" examples="custom"></demo>

## 级联选择

选择器支持级联选择功能，通过 `children` 属性配置多级数据。

<demo component-name="select" examples="cascade"></demo>

## 选择器 API

### 属性

| 属性名          | 说明                   | 类型                             | 可选值                  | 默认值   |
| --------------- | ---------------------- | -------------------------------- | ----------------------- | -------- |
| v-model         | 绑定值                 | string / number / object / array | —                       | —        |
| v-model:loading | 加载状态               | boolean                          | —                       | false    |
| options         | 选项数据               | array                            | —                       | []       |
| type            | 选择器类型             | string                           | input / text            | input    |
| size            | 尺寸                   | string                           | small / default / large | default  |
| clearable       | 是否可清空             | boolean                          | —                       | true     |
| disabled        | 是否禁用               | boolean                          | —                       | false    |
| empty-text      | 无数据时显示的文本     | string                           | —                       | 暂无数据 |
| filterable      | 是否可过滤             | boolean                          | —                       | false    |
| multiple        | 是否多选               | boolean                          | —                       | false    |
| placeholder     | 占位文本               | string                           | —                       | 请选择   |
| show-all-levels | 是否显示完整的级联路径 | boolean                          | —                       | true     |
| check-strictly  | 是否严格选择叶子节点   | boolean                          | —                       | true     |
| select-parent   | 是否可选择父级         | boolean                          | —                       | false    |
| remote-method   | 远程搜索方法           | function(query)                  | —                       | —        |
| filter-method   | 自定义过滤方法         | function(option, query)          | —                       | —        |

### 选项配置

| 参数     | 说明                     | 类型                     | 可选值 | 默认值 |
| -------- | ------------------------ | ------------------------ | ------ | ------ |
| value    | 选项的值                 | string / number / object | —      | —      |
| label    | 选项的标签               | string                   | —      | —      |
| disabled | 是否禁用该选项           | boolean                  | —      | false  |
| children | 子选项列表，用于级联选择 | array                    | —      | —      |
| subLabel | 选项的副标签             | string                   | —      | —      |

### 事件

| 事件名         | 说明                         | 回调参数                    |
| -------------- | ---------------------------- | --------------------------- |
| change         | 选项变更时触发               | (option: `OptionsItemType`) |
| clear          | 点击清空按钮时触发           | —                           |
| visible-change | 下拉框显示状态变化时触发     | (visible: `boolean`)        |
| focus          | 获取焦点时触发               | (event: `FocusEvent`)       |
| blur           | 失去焦点时触发               | (event: `FocusEvent`)       |
| remove-tag     | 多选模式下移除标签时触发     | (value: `SingleValueType`)  |
| input          | 可过滤模式下输入值变化时触发 | (value: `string`)           |
| cascade-change | 级联菜单切换时触发           | (path: `OptionsItemType[]`) |

### 插槽

| 插槽名        | 说明                   | 作用域参数                                  |
| ------------- | ---------------------- | ------------------------------------------- |
| default       | 自定义选项内容         | { row: `OptionsItemType`, index: `number` } |
| prefix        | 选择器头部内容         | —                                           |
| multiple-view | 多选模式下的自定义视图 | { model: `ValueType` }                      |
| empty         | 自定义空状态内容       | —                                           |

### 样式变量

选择器组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明          |
| --------------------- | ------------- |
| $theme-color-primary  | 主题色-主要   |
| $border-color-default | 边框颜色-默认 |
| $font-size-small      | 字体大小-小   |
| $font-size-default    | 字体大小-默认 |
| $font-size-large      | 字体大小-大   |

</rewritten_file>
