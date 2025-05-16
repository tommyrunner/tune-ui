# 气泡确认框组件

![气泡确认框组件](/components/pop-confirm.png)

气泡确认框组件用于操作需要二次确认的场景，点击元素会弹出气泡式的确认框，常用于删除、修改等需要用户进行二次确认的危险操作，相比模态对话框更为轻量和简洁。

## 基础用法

基础的气泡确认框，包含确认、取消按钮，并支持禁用状态。

<demo component-name="pop-confirm" examples="basic"></demo>

## 自定义图标

可以通过设置`icon`和`icon-color`属性来自定义气泡确认框的图标类型和颜色，使操作语义更加明确。

<demo component-name="pop-confirm" examples="icon"></demo>

## 自定义按钮

可以自定义确认和取消按钮的文本和类型，使其更符合业务场景需求。

<demo component-name="pop-confirm" examples="button"></demo>

## 弹出位置

支持四个方向弹出：上、右、下、左，可以根据页面空间选择合适的弹出方向。

<demo component-name="pop-confirm" examples="position"></demo>

## 自定义样式

可以通过设置`padding`、`box-shadow`和`max-width`等属性自定义气泡确认框的样式。

<demo component-name="pop-confirm" examples="style"></demo>

## 触发配置

支持多种交互方式配置，如按ESC键关闭、点击其他区域关闭等。

<demo component-name="pop-confirm" examples="trigger"></demo>

## 事件处理

气泡确认框提供了`confirm`和`cancel`事件，用于处理用户的确认和取消操作。

<demo component-name="pop-confirm" examples="events"></demo>

## 气泡确认框 API

### TPopConfirm 属性

| 属性名                  | 说明                         | 类型             | 可选值                                               | 默认值         |
| ----------------------- | ---------------------------- | ---------------- | ---------------------------------------------------- | -------------- |
| `modelValue`            | 是否显示气泡确认框(双向绑定) | `boolean`        | —                                                    | `false`        |
| `content`               | 确认框内容                   | `string`         | —                                                    | —              |
| `icon`                  | 图标类型                     | `string`         | —                                                    | `illustrate`   |
| `icon-color`            | 图标颜色                     | `string`         | —                                                    | `#999`         |
| `confirm-text`          | 确认按钮文本                 | `string`         | —                                                    | `确定`         |
| `cancel-text`           | 取消按钮文本                 | `string`         | —                                                    | `取消`         |
| `confirm-type`          | 确认按钮类型                 | `string`         | `primary`/`success`/`warning`/`danger`/`info`/`text` | `text`         |
| `cancel-type`           | 取消按钮类型                 | `string`         | `primary`/`success`/`warning`/`danger`/`info`/`text` | `text`         |
| `position`              | 弹出位置                     | `string`         | `top`/`right`/`bottom`/`left`                        | `top`          |
| `disabled`              | 是否禁用                     | `boolean`        | —                                                    | `false`        |
| `padding`               | 内边距                       | `array`/`number` | —                                                    | `[8, 6, 8, 6]` |
| `box-shadow`            | 阴影设置                     | `array`          | —                                                    | —              |
| `max-width`             | 最大宽度                     | `string`         | —                                                    | —              |
| `close-on-press-escape` | 按ESC是否关闭                | `boolean`        | —                                                    | `false`        |
| `close-on-press-other`  | 点击其他区域是否关闭         | `boolean`        | —                                                    | `false`        |

### 事件

| 事件名    | 说明               | 回调参数 |
| --------- | ------------------ | -------- |
| `confirm` | 点击确认按钮时触发 | —        |
| `cancel`  | 点击取消按钮时触发 | —        |

### 插槽

| 插槽名    | 说明                     | 作用域参数 |
| --------- | ------------------------ | ---------- |
| `default` | 触发气泡确认框显示的元素 | —          |
| `content` | 自定义气泡确认框内容     | —          |

### 样式变量

| 变量名                      | 说明               |
| --------------------------- | ------------------ |
| `$popconfirm-bg-color`      | 气泡确认框背景色   |
| `$popconfirm-text-color`    | 气泡确认框文字颜色 |
| `$popconfirm-border-radius` | 气泡确认框圆角     |
| `$popconfirm-shadow`        | 气泡确认框阴影     |
