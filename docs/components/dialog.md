# 对话框组件

![对话框组件](/components/dialog.png)

对话框组件用于在不离开当前页面的情况下与用户进行交互，通常用于展示重要信息、请求用户确认或收集用户输入，适合需要强制用户注意的场景。

## 基础用法

基础的对话框用法，包含标题、内容和操作按钮区域。

<demo component-name="dialog" examples="basic"></demo>

## 标题配置

可以通过设置相关属性自定义对话框的标题，如添加图标、隐藏关闭按钮或使用自定义内容。

<demo component-name="dialog" examples="title"></demo>

## 按钮配置

可以自定义底部按钮的文本、类型、对齐方式，或者完全隐藏底部按钮区域。

<demo component-name="dialog" examples="button"></demo>

## 交互方式

对话框提供了多种交互方式和样式配置选项，如隐藏遮罩层、禁用默认关闭方式、自定义样式等。

<demo component-name="dialog" examples="interaction"></demo>

## 嵌套对话框

在一个对话框内可以嵌套另一个对话框，满足更复杂的交互需求。

<demo component-name="dialog" examples="nested"></demo>

## 可拖拽对话框

设置 `draggable` 属性为 `true` 可以实现对话框的拖拽功能。

<demo component-name="dialog" examples="draggable"></demo>

## 事件处理

对话框组件提供了丰富的事件，用于监听对话框的打开、关闭和交互状态。

<demo component-name="dialog" examples="events"></demo>

## 异步关闭

可以结合 `before-close` 回调实现异步关闭对话框的功能，适用于需要在关闭前执行特定操作的场景。

<demo component-name="dialog" examples="async-close"></demo>

## 对话框 API

### TDialog 属性

| 属性名                 | 说明                     | 类型              | 可选值                              | 默认值    |
| ---------------------- | ------------------------ | ----------------- | ----------------------------------- | --------- |
| `modelValue`           | 是否显示对话框(双向绑定) | `boolean`         | —                                   | `false`   |
| `title`                | 对话框标题               | `string`          | —                                   | —         |
| `width`                | 对话框宽度               | `string`/`number` | —                                   | `500px`   |
| `top`                  | 对话框距离顶部距离       | `string`/`number` | —                                   | `15vh`    |
| `center`               | 是否居中显示标题和底部   | `boolean`         | —                                   | `false`   |
| `append-to-body`       | 是否插入到body元素       | `boolean`         | —                                   | `false`   |
| `close-on-click-modal` | 点击遮罩是否关闭对话框   | `boolean`         | —                                   | `true`    |
| `close-on-press-escape`| 按ESC是否关闭对话框     | `boolean`         | —                                   | `true`    |
| `show-close`           | 是否显示关闭按钮         | `boolean`         | —                                   | `true`    |
| `draggable`            | 是否可拖拽               | `boolean`         | —                                   | `false`   |
| `fullscreen`           | 是否全屏显示             | `boolean`         | —                                   | `false`   |
| `before-close`         | 关闭前的回调函数         | `function`        | —                                   | —         |
| `destroy-on-close`     | 关闭时是否销毁组件       | `boolean`         | —                                   | `false`   |
| `z-index`              | 对话框层级               | `number`          | —                                   | `2000`    |
| `icon`                 | 标题图标                 | `string`          | —                                   | —         |
| `is-close-icon`        | 是否显示关闭图标         | `boolean`         | —                                   | `true`    |
| `is-modal`             | 是否显示遮罩层           | `boolean`         | —                                   | `true`    |
| `confirm-text`         | 确认按钮文本             | `string`          | —                                   | `确定`    |
| `cancel-text`          | 取消按钮文本             | `string`          | —                                   | `取消`    |
| `confirm-type`         | 确认按钮类型             | `string`          | `primary`/`success`/`warning`/`danger`/`info` | `primary` |
| `cancel-type`          | 取消按钮类型             | `string`          | `primary`/`success`/`warning`/`danger`/`info` | —         |
| `btn-align`            | 按钮对齐方式             | `string`          | `flex-start`/`center`/`flex-end`    | `flex-end`|
| `is-foot`              | 是否显示底部按钮         | `boolean`         | —                                   | `true`    |
| `padding`              | 内边距                   | `array`           | —                                   | `[16, 16, 16, 16]` |
| `box-shadow`           | 阴影设置                 | `array`           | —                                   | `[0, 2, 12, 'rgba(0, 0, 0, 0.1)']` |

### 事件

| 事件名      | 说明                      | 回调参数 |
| ----------- | ------------------------- | -------- |
| `open`      | 对话框打开时触发          | —        |
| `opened`    | 对话框打开动画结束时触发  | —        |
| `close`     | 对话框关闭时触发          | —        |
| `closed`    | 对话框关闭动画结束时触发  | —        |
| `confirm`   | 点击确认按钮时触发        | —        |
| `cancel`    | 点击取消按钮时触发        | —        |
| `drag-start`| 开始拖拽时触发            | `event`  |
| `drag`      | 拖拽时触发                | `event`  |
| `drag-end`  | 拖拽结束时触发            | `event`  |

### 插槽

| 插槽名    | 说明                   | 作用域参数 |
| --------- | ---------------------- | ---------- |
| `default` | 对话框的内容           | —          |
| `title`   | 自定义标题区域内容     | —          |
| `footer`  | 对话框底部操作区内容   | —          |

### 方法

| 方法名   | 说明          | 参数                |
| -------- | ------------- | ------------------- |
| `open`   | 打开对话框    | —                   |
| `close`  | 关闭对话框    | —                   |

### 样式变量

| 变量名                     | 说明                 |
| -------------------------- | -------------------- |
| `$dialog-bg-color`         | 对话框背景色         |
| `$dialog-border-radius`    | 对话框圆角           |
| `$dialog-padding`          | 对话框内边距         |
| `$dialog-header-height`    | 对话框标题栏高度     |
| `$dialog-header-color`     | 对话框标题文字颜色   |
| `$dialog-content-color`    | 对话框内容文字颜色   |
| `$dialog-footer-height`    | 对话框底部区域高度   |
| `$dialog-shadow`           | 对话框阴影           |
