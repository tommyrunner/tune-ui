<script setup lang="ts">
import drawerBasic from '../examples/drawer/basic.vue'
import drawerPosition from '../examples/drawer/position.vue'
import drawerStyle from '../examples/drawer/style.vue'
import drawerButton from '../examples/drawer/button.vue'
import drawerInteraction from '../examples/drawer/interaction.vue'
import drawerCustom from '../examples/drawer/custom.vue'
import drawerEvents from '../examples/drawer/events.vue'
</script>

# 抽屉组件

![抽屉组件](/components/drawer.png)

抽屉组件是一种从屏幕边缘滑出的浮层面板，用于展示临时的内容或操作区域，常用于侧边导航、设置面板、详情查看等场景，适合需要快速访问但不打断主页面浏览的内容展示。

## 基础用法

基础的抽屉组件用法，默认从左侧弹出，包含标题、内容和底部按钮区域。

<demo :component="drawerBasic" name="drawer" examples="basic" />

## 弹出方向

抽屉组件支持从四个方向弹出：左、右、上、下，适应不同的交互场景。

<demo :component="drawerPosition" name="drawer" examples="position" />

## 尺寸和样式

可以自定义抽屉的尺寸、内边距、阴影和偏移等样式属性。

<demo :component="drawerStyle" name="drawer" examples="style" />

## 按钮配置

可以自定义底部按钮的文本、类型、对齐方式，或者完全隐藏底部按钮区域和关闭图标。

<demo :component="drawerButton" name="drawer" examples="button" />

## 交互配置

抽屉组件提供了多种交互配置选项，如是否显示遮罩层、点击遮罩层是否关闭、按ESC键是否关闭、是否限制最大高度等。

<demo :component="drawerInteraction" name="drawer" examples="interaction" />

## 自定义内容

通过插槽可以自定义抽屉的标题、内容和底部区域，实现更灵活的布局和样式。

<demo :component="drawerCustom" name="drawer" examples="custom" />

## 事件处理

抽屉组件提供了一系列事件，用于监听抽屉的打开、关闭和交互状态。

<demo :component="drawerEvents" name="drawer" examples="events" />

## 抽屉 API

### TDrawer 属性

| 属性名                | 说明                   | 类型              | 可选值                              | 默认值     |
| --------------------- | ---------------------- | ----------------- | ----------------------------------- | ---------- |
| `modelValue`          | 是否显示抽屉(双向绑定) | `boolean`         | —                                   | `false`    |
| `title`               | 抽屉标题               | `string`          | —                                   | —          |
| `position`            | 抽屉弹出方向           | `string`          | `left`/`right`/`top`/`bottom`       | `left`     |
| `size`                | 抽屉尺寸               | `string`          | —                                   | `600px`    |
| `icon`                | 标题图标               | `string`          | —                                   | `inspiration` |
| `padding`             | 内边距                 | `array`/`number`  | —                                   | `[12, 16, 12, 16]` |
| `box-shadow`          | 阴影设置               | `array`           | —                                   | —          |
| `is-modal`            | 是否显示遮罩层         | `boolean`         | —                                   | `true`     |
| `close-on-press-model`| 点击遮罩是否关闭抽屉   | `boolean`         | —                                   | `true`     |
| `close-on-press-escape`| 按ESC是否关闭抽屉    | `boolean`         | —                                   | `true`     |
| `is-close-icon`       | 是否显示关闭图标       | `boolean`         | —                                   | `true`     |
| `is-foot`             | 是否显示底部按钮       | `boolean`         | —                                   | `true`     |
| `is-set-max-height`   | 是否设置最大高度       | `boolean`         | —                                   | `true`     |
| `confirm-text`        | 确认按钮文本           | `string`          | —                                   | `确定`     |
| `cancel-text`         | 取消按钮文本           | `string`          | —                                   | `取消`     |
| `confirm-type`        | 确认按钮类型           | `string`          | `primary`/`success`/`warning`/`danger`/`info` | `primary` |
| `cancel-type`         | 取消按钮类型           | `string`          | `primary`/`success`/`warning`/`danger`/`info` | `default` |
| `btn-align`           | 按钮对齐方式           | `string`          | `flex-start`/`center`/`flex-end`    | `flex-end` |
| `offset`              | 偏移位置               | `object`          | —                                   | `{ x: 0, y: 0 }` |

### 事件

| 事件名     | 说明                   | 回调参数 |
| ---------- | ---------------------- | -------- |
| `open`     | 抽屉打开时触发         | —        |
| `close`    | 抽屉关闭时触发         | —        |
| `confirm`  | 点击确认按钮时触发     | —        |
| `cancel`   | 点击取消按钮时触发     | —        |

### 插槽

| 插槽名    | 说明                   | 作用域参数 |
| --------- | ---------------------- | ---------- |
| `default` | 抽屉的内容             | —          |
| `title`   | 自定义标题区域内容     | —          |
| `footer`  | 抽屉底部操作区内容     | —          |

### 样式变量

| 变量名                      | 说明                |
| --------------------------- | ------------------- |
| `$drawer-bg-color`          | 抽屉背景色          |
| `$drawer-border-radius`     | 抽屉圆角            |
| `$drawer-header-height`     | 抽屉标题栏高度      |
| `$drawer-header-color`      | 抽屉标题文字颜色    |
| `$drawer-content-color`     | 抽屉内容文字颜色    |
| `$drawer-footer-height`     | 抽屉底部区域高度    |
| `$drawer-shadow`            | 抽屉阴影            |
</rewritten_file> 