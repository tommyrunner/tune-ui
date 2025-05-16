# 弹出框组件

![弹出框组件](/components/popover.png)

弹出框组件用于在元素附近弹出一个轻量级的提示框，可以包含各种自定义内容。常用于展示提示信息、操作菜单、详细说明等。

## 基础用法

基础的弹出框，提供了hover和click两种触发方式。

<demo component-name="popover" examples="basic"></demo>

## 分组用法

可以将弹出框应用于一组元素，同时管理它们的弹出行为。

<demo component-name="popover" examples="group"></demo>

## 弹出位置

支持四个方向弹出：上、右、下、左，可以根据页面空间选择合适的弹出方向。

<demo component-name="popover" examples="position"></demo>

## 自定义样式

可以自定义弹出框的宽度、圆角、内边距、阴影等样式。

<demo component-name="popover" examples="style"></demo>

## 自定义内容

可以通过插槽自定义弹出框的内容，支持任意HTML结构。

<demo component-name="popover" examples="content"></demo>

## 触发配置

支持多种交互方式配置，如延迟隐藏、按ESC键关闭、点击其他区域关闭等。

<demo component-name="popover" examples="trigger"></demo>

## 遮罩层

可以为弹出框添加遮罩层，提供更聚焦的交互体验。

<demo component-name="popover" examples="modal"></demo>

## 事件处理

弹出框提供了多种事件，用于监听鼠标进入、离开、状态变化等。

<demo component-name="popover" examples="events"></demo>

## 弹出框 API

### TPopover 属性

| 属性名                  | 说明                       | 类型                                 | 可选值                      | 默认值        |
| ----------------------- | -------------------------- | ------------------------------------ | --------------------------- | ------------- |
| `width`                 | 弹出框宽度                 | `string / number`                    | —                           | —             |
| `disabled`              | 是否禁用                   | `boolean`                            | `true / false`              | `false`       |
| `type`                  | 触发方式                   | `string`                             | `hover / click / none`      | `hover`       |
| `content`               | 显示内容                   | `string`                             | —                           | —             |
| `radius`                | 圆角大小                   | `array / number`                     | —                           | `4`           |
| `padding`               | 内边距大小                 | `array / number`                     | —                           | `[8, 12, 8, 12]` |
| `box-shadow`            | 阴影配置                   | `array`                              | —                           | —             |
| `gap`                   | 弹出框与触发元素的间距     | `number`                             | —                           | `10`          |
| `hide-after`            | 隐藏延迟时间(毫秒)         | `number`                             | —                           | `0`           |
| `position`              | 弹出位置                   | `string`                             | `top / right / bottom / left` | `top`       |
| `append-to`             | 渲染的目标位置             | `string / element`                   | —                           | `body`        |
| `auto-position`         | 是否自动调整位置           | `boolean`                            | `true / false`              | `true`        |
| `show-arrow`            | 是否显示箭头               | `boolean`                            | `true / false`              | `true`        |
| `custom`                | 自定义位置坐标             | `object {x: number, y: number}`      | —                           | —             |
| `dialog-animation`      | 是否使用对话框动画         | `boolean`                            | `true / false`              | `false`       |
| `drawer-animation`      | 是否使用抽屉动画           | `boolean`                            | `true / false`              | `false`       |
| `close-on-press-escape` | 是否支持ESC键关闭          | `boolean`                            | `true / false`              | `false`       |
| `close-on-press-other`  | 是否点击其他区域关闭       | `boolean`                            | `true / false`              | `false`       |
| `is-modal`              | 是否显示遮罩层             | `boolean`                            | `true / false`              | `false`       |
| `is-modal-nest`         | 是否允许遮罩层嵌套         | `boolean`                            | `true / false`              | `false`       |

### 事件

| 事件名         | 说明                | 回调参数              |
| -------------- | ------------------- | --------------------- |
| `click-model`  | 点击遮罩层时触发    | —                     |
| `hover-enter`  | 鼠标进入时触发      | `(el: HTMLElement)`   |
| `hover-out`    | 鼠标离开时触发      | `(el: HTMLElement)`   |
| `model-change` | 显示状态改变时触发  | —                     |
| `open`         | 弹出框打开时触发    | —                     |
| `close`        | 弹出框关闭时触发    | —                     |

### 插槽

| 插槽名     | 说明                  | 作用域参数 |
| ---------- | --------------------- | ---------- |
| `default`  | 触发弹出框显示的元素  | —          |
| `content`  | 弹出框内容            | —          |

### 样式变量

| 变量名                   | 说明               |
| ------------------------ | ------------------ |
| `$popover-bg-color`      | 弹出框背景色       |
| `$popover-text-color`    | 弹出框文字颜色     |
| `$popover-border-radius` | 弹出框圆角         |
| `$popover-shadow`        | 弹出框阴影         |
| `$popover-arrow-size`    | 弹出框箭头大小     |
</rewritten_file> 