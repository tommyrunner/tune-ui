# Flex 弹性布局

![Flex 弹性布局](/components/flex.png)

Flex 组件是一个基于 Flexbox 布局模型的容器组件，用于创建灵活、响应式的布局结构。组件提供了10栏栅格系统，支持响应式布局，并且可以控制元素间距、排序和对齐方式。

## 基础用法

使用 `t-flex` 和 `t-flex-group` 组件创建简单的弹性布局。

<demo component-name="flex" examples="basic"></demo>

## 栅格配置

通过 `span` 和 `offset` 属性创建栅格布局，总栅格数为10。

<demo component-name="flex" examples="grid"></demo>

## 排序

使用 `sort` 属性控制元素的显示顺序。

<demo component-name="flex" examples="sort"></demo>

## 对齐方式

通过 `justify` 和 `align` 属性设置弹性容器内元素的对齐方式。

<demo component-name="flex" examples="align"></demo>

## 间距设置

使用 `gap` 属性设置元素之间的间距。

<demo component-name="flex" examples="gap"></demo>

## 响应式布局

Flex 组件支持响应式布局，可以根据不同屏幕尺寸自动调整布局。

<demo component-name="flex" examples="responsive"></demo>

## Flex API

### Flex 属性

| 属性名   | 说明           | 类型           | 可选值                | 默认值 |
| -------- | -------------- | -------------- | --------------------- | ------ |
| span     | 栅格占据的列数 | number         | 0-10                  | -      |
| offset   | 栅格左侧的间隔 | number         | 0-10                  | 0      |
| sort     | 元素的排序     | number         | -                     | -      |
| xs       | <768px 响应式栅格数 | number    | 0-10                  | -      |
| sm       | ≥768px 响应式栅格数 | number    | 0-10                  | -      |
| md       | ≥992px 响应式栅格数 | number    | 0-10                  | -      |
| lg       | ≥1200px 响应式栅格数 | number   | 0-10                  | -      |
| xl       | ≥1920px 响应式栅格数 | number   | 0-10                  | -      |

### FlexGroup 属性

| 属性名   | 说明                 | 类型           | 可选值                                                  | 默认值  |
| -------- | -------------------- | -------------- | ------------------------------------------------------- | ------- |
| justify  | 主轴对齐方式         | string         | start/end/center/space-around/space-between/space-evenly | start   |
| align    | 交叉轴对齐方式       | string         | start/center/end                                         | -       |
| gap      | 元素间距(px)         | number         | -                                                        | 12      |

### 插槽

| 插槽名  | 说明                       |
| ------- | -------------------------- |
| default | 默认插槽，放置子元素       |

### 样式变量

Flex 组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                | 说明           |
| --------------------- | -------------- |
| $bg-color-default     | 默认背景颜色   |
| $border-color-default | 默认边框颜色   |
| $text-color-default   | 默认文本颜色   |
