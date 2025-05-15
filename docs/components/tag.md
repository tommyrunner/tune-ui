# 标签组件

![标签组件](/components/tag.png)

标签用于标记、分类和选择，方便用户快速识别不同类型的信息。

## 基础用法

标签有多种类型：默认、主要、成功、信息、警告和危险。

<demo component-name="tag" examples="basic"></demo>

## 不同尺寸

标签提供三种尺寸：small、default 和 large。

<demo component-name="tag" examples="size"></demo>

## 可关闭标签

设置 `closable` 属性可以让标签显示关闭按钮，点击关闭按钮会触发 `close` 事件。

<demo component-name="tag" examples="closable"></demo>

## 圆角标签

设置 `round` 属性可以让标签变成圆角形状。

<demo component-name="tag" examples="round"></demo>

## 禁用状态

设置 `disabled` 属性可以禁用标签交互功能。

<demo component-name="tag" examples="disabled"></demo>

## 标签 API

### 属性

| 属性名   | 说明           | 类型    | 可选值                                              | 默认值  |
| -------- | -------------- | ------- | --------------------------------------------------- | ------- |
| type     | 标签类型       | string  | default / primary / success / info / warning / danger | default |
| size     | 标签尺寸       | string  | small / default / large                             | default |
| closable | 是否可关闭     | boolean | -                                                   | false   |
| round    | 是否圆角       | boolean | -                                                   | false   |
| disabled | 是否禁用       | boolean | -                                                   | false   |

### 事件

| 事件名 | 说明                   | 回调参数 |
| ------ | ---------------------- | -------- |
| close  | 关闭标签时触发         | (event: `MouseEvent`) |
| click  | 点击标签时触发         | (event: `MouseEvent`) |

### 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 标签的内容     |

### 样式变量

标签组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名               | 说明        |
| -------------------- | ----------- |
| $theme-color-primary | 主题色-主要 |
| $theme-color-success | 主题色-成功 |
| $theme-color-info    | 主题色-信息 |
| $theme-color-warning | 主题色-警告 |
| $theme-color-danger  | 主题色-危险 |
| $font-size-small     | 字体大小-小 |
| $font-size-default   | 字体大小-默认 |
| $font-size-large     | 字体大小-大 |
