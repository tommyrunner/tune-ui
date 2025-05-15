# 折叠面板组件

![折叠面板组件](/components/collapse.png)

折叠面板组件用于将内容区域折叠/展开，节省页面空间，常用于分组展示信息、FAQ、设置项等内容，适合信息量较大且需要分组显示的场景。

## 基础用法

基础的折叠面板用法，点击面板标题切换内容区域的展开/折叠状态。

<demo component-name="collapse" examples="basic"></demo>

## 手风琴模式

设置 `accordion` 属性为 `true` 可以启用手风琴模式，同时只能展开一个面板。

<demo component-name="collapse" examples="accordion"></demo>

## 自定义样式

可以通过设置相关属性自定义折叠面板的样式，如背景颜色、边框等。

<demo component-name="collapse" examples="custom"></demo>

## 嵌套面板

折叠面板可以嵌套使用，实现多层级的内容组织。

<demo component-name="collapse" examples="nested"></demo>

## 禁用状态

通过在面板项上设置 `disabled` 属性可以禁用特定的面板项。

<demo component-name="collapse" examples="disabled"></demo>

## 自定义图标

设置 `rightIcon` 属性可以自定义展开/折叠的图标，还可以通过插槽完全自定义标题区域。

<demo component-name="collapse" examples="icon"></demo>

## 折叠面板 API

### TCollapseGroup 属性

| 属性名          | 说明                     | 类型             | 可选值 | 默认值  |
| --------------- | ------------------------ | ---------------- | ------ | ------- |
| `modelValue`    | 当前激活的面板(双向绑定) | `array`/`string` | —      | `[]`    |
| `accordion`     | 是否手风琴模式           | `boolean`        | —      | `false` |
| `border`        | 是否显示边框             | `boolean`        | —      | `true`  |
| `before-change` | 切换面板前的回调函数     | `function`       | —      | —       |

### TCollapse 属性

| 属性名      | 说明       | 类型              | 可选值 | 默认值        |
| ----------- | ---------- | ----------------- | ------ | ------------- |
| `value`     | 唯一标识符 | `string`/`number` | —      | 索引值        |
| `title`     | 面板标题   | `string`          | —      | —             |
| `disabled`  | 是否禁用   | `boolean`         | —      | `false`       |
| `rightIcon` | 自定义图标 | `string`          | —      | `arrow-right` |

### 事件

| 事件名   | 说明                   | 回调参数                          |
| -------- | ---------------------- | --------------------------------- |
| `change` | 当前激活面板改变时触发 | `(activeNames: `array`/`string`)` |

### 插槽

| 插槽名    | 说明                  | 作用域参数              |
| --------- | --------------------- | ----------------------- |
| `default` | TCollapseGroup 的内容 | —                       |
| `title`   | 自定义标题内容        | —                       |
| `icon`    | 自定义图标            | `{ isActive: boolean }` |

### 方法

| 方法名       | 说明                        | 参数                         |
| ------------ | --------------------------- | ---------------------------- |
| `toggleItem` | 切换指定面板的展开/折叠状态 | `(value: `string`/`number`)` |

### 样式变量

| 变量名                     | 说明             |
| -------------------------- | ---------------- |
| `$collapse-border-color`   | 边框颜色         |
| `$collapse-header-bg`      | 标题区域背景色   |
| `$collapse-content-bg`     | 内容区域背景色   |
| `$collapse-disabled-color` | 禁用状态文字颜色 |
| `$collapse-icon-color`     | 图标颜色         |

</rewritten_file>
