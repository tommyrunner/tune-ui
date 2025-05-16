# 消息提示组件

![消息提示组件](/components/message.png)

消息提示组件用于在页面中展示操作反馈或系统提示，支持多种消息类型和样式，可以自动消失或手动关闭，是一种轻量级的反馈方式。

## 基础用法

基础的消息提示，包含成功、警告、信息和错误四种类型。

<demo component-name="message" examples="basic"></demo>

## 消息样式

可以自定义消息的宽度、内边距、图标和朴素样式。

<demo component-name="message" examples="style"></demo>

## 通知类型

支持四个方向的通知消息展示，可以包含标题和内容。

<demo component-name="message" examples="notification"></demo>

## 关闭配置

支持手动关闭、自动关闭和按ESC键关闭等多种关闭方式。

<demo component-name="message" examples="close"></demo>

## 自定义配置

可以自定义消息的挂载位置和显示位置。

<demo component-name="message" examples="custom"></demo>

## 事件处理

消息提示提供了关闭回调事件，支持多条消息堆叠展示。

<demo component-name="message" examples="events"></demo>

## 消息提示 API

### Message 方法

| 方法名称                    | 说明                   | 参数                                                                    | 返回值            |
| --------------------------- | ---------------------- | ----------------------------------------------------------------------- | ----------------- |
| `TMessage.message`          | 显示普通消息           | `(content: string, type?: string, options?: object) => string`          | 消息实例的唯一ID  |
| `TNotification.message`     | 显示通知消息           | `(title: string, content: string, type?: string, options?: object) => string` | 消息实例的唯一ID  |

### Message 配置项

| 属性名                      | 说明                       | 类型                                    | 可选值                                      | 默认值                |
| --------------------------- | -------------------------- | --------------------------------------- | ------------------------------------------- | --------------------- |
| `type`                      | 消息类型                   | `string`                                | `success` / `warning` / `info` / `danger`   | `info`                |
| `plain`                     | 是否使用朴素样式           | `boolean`                               | `true` / `false`                            | `false`               |
| `messageType`               | 消息展示方式               | `string`                                | `default` / `notice`                        | `default`             |
| `title`                     | 标题(通知模式可用)         | `string`                                | —                                           | —                     |
| `position`                  | 位置(通知模式可用)         | `string`                                | `topRight` / `bottomRight` / `bottomLeft` / `topLeft` | `topRight`         |
| `content`                   | 消息内容                   | `string`                                | —                                           | —                     |
| `icon`                      | 图标类型                   | `string`                                | —                                           | 根据type自动选择      |
| `duration`                  | 显示时间(毫秒)             | `number`                                | —                                           | `2600`                |
| `radius`                    | 圆角大小                   | `array` / `number`                      | —                                           | `[6, 6, 6, 6]`        |
| `padding`                   | 内边距大小                 | `array` / `number`                      | —                                           | `[8, 12, 8, 12]`      |
| `width`                     | 消息框宽度                 | `string`                                | —                                           | —                     |
| `appendTo`                  | 消息渲染的目标位置         | `string` / `element`                    | —                                           | `body`                |
| `custom`                    | 自定义位置坐标             | `object {x: string, y: string}`         | —                                           | `{x: "50%", y: "24px"}` |
| `maxLength`                 | 最大消息数量               | `number`                                | —                                           | `8`                   |
| `isClose`                   | 是否显示关闭按钮           | `boolean`                               | `true` / `false`                            | `false`               |
| `closeCallback`             | 关闭回调函数               | `function(id: string)`                  | —                                           | —                     |
| `closeOnPressEscape`        | 是否支持ESC键关闭          | `boolean`                               | `true` / `false`                            | `true`                |

### 样式变量

消息提示组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明           |
| --------------------- | -------------- |
| $theme-color-primary  | 主题色-主要    |
| $theme-color-success  | 主题色-成功    |
| $theme-color-info     | 主题色-信息    |
| $theme-color-warning  | 主题色-警告    |
| $theme-color-danger   | 主题色-危险    |
| $color-white          | 白色           |
| $bg-color-default     | 默认背景颜色   |
| $bg-color-model       | 模态背景颜色   |
| $text-color-default   | 默认文本颜色   |
| $z-index-up           | 上层层级       | 