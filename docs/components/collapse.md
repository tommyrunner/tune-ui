<script setup lang="ts">
import collapseBasic from '../examples/collapse/basic.vue'
import collapseAccordion from '../examples/collapse/accordion.vue'
import collapseCustom from '../examples/collapse/custom.vue'
import collapseNested from '../examples/collapse/nested.vue'
import collapseDisabled from '../examples/collapse/disabled.vue'
import collapseIcon from '../examples/collapse/icon.vue'
</script>

# 折叠面板组件

![折叠面板组件](/components/collapse.png)

折叠面板组件用于将内容区域折叠/展开，节省页面空间，常用于分组展示信息、FAQ、设置项等内容，适合信息量较大且需要分组显示的场景。

## 基础用法

基础的折叠面板用法，点击面板标题切换内容区域的展开/折叠状态。

<demo :component="collapseBasic" name="collapse" examples="basic" />

## 手风琴模式

设置 `accordion` 属性为 `true` 可以启用手风琴模式，同时只能展开一个面板。

<demo :component="collapseAccordion" name="collapse" examples="accordion" />

## 自定义样式

可以通过设置相关属性自定义折叠面板的样式，如背景颜色、边框等。

<demo :component="collapseCustom" name="collapse" examples="custom" />

## 嵌套面板

折叠面板可以嵌套使用，实现多层级的内容组织。

<demo :component="collapseNested" name="collapse" examples="nested" />

## 禁用状态

通过在面板项上设置 `disabled` 属性可以禁用特定的面板项。

<demo :component="collapseDisabled" name="collapse" examples="disabled" />

## 自定义图标

设置 `rightIcon` 属性可以自定义展开/折叠的图标，还可以通过插槽完全自定义标题区域。

<demo :component="collapseIcon" name="collapse" examples="icon" />

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

折叠面板组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明           |
| --------------------- | -------------- |
| $border-color-default | 默认边框颜色   |
| $bg-color-default     | 默认背景颜色   |
| $bg-color-hover       | 悬停背景颜色   |
| $text-color-default   | 默认文本颜色   |
| $opacity-disabled     | 禁用状态透明度 |
| $font-size-default    | 默认字体大小   |
