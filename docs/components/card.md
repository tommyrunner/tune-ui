# 卡片

![卡片](/components/card.png)

卡片组件用于将信息内容分组，提供统一的外观样式和交互行为，常用于后台管理系统、信息展示等场景。

## 基础用法

最基本的卡片用法，包含内容区域，可以包含任意内容。

<demo component-name="card" examples="basic"></demo>

## 卡片标题

可以通过 `title` 属性设置卡片标题，或使用 `titleIcon` 属性添加标题图标。

<demo component-name="card" examples="title"></demo>

## 阴影效果

通过 `shadow` 属性可以设置卡片阴影的显示时机，有三种可选值：`always`（总是显示）、`hover`（悬浮时显示）和 `never`（从不显示）。

<demo component-name="card" examples="shadow"></demo>

## 插槽用法

卡片组件提供了多个插槽，包括默认插槽、头部左侧插槽、头部右侧插槽和底部插槽，可以实现各种自定义布局。

<demo component-name="card" examples="slots"></demo>

## 卡片 API

### 属性

| 属性名     | 说明           | 类型                            | 可选值                     | 默认值    |
| ---------- | -------------- | ------------------------------- | -------------------------- | --------- |
| `title`    | 卡片标题       | `string`                        | —                          | —         |
| `titleIcon`| 标题图标       | `IconTypes`                     | —                          | —         |
| `shadow`   | 阴影显示时机   | `string`                        | `always` / `hover` / `never` | `always`  |

### 插槽

| 插槽名      | 说明               |
| ----------- | ------------------ |
| `default`   | 卡片主体内容       |
| `headLeft`  | 卡片头部左侧内容   |
| `headRight` | 卡片头部右侧内容   |
| `footer`    | 卡片底部内容       |

### 样式变量

卡片组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名           | 说明               |
| ---------------- | ------------------ |
| `$shadow-color`  | 卡片阴影颜色       |
| `border-color()` | 卡片边框颜色函数   |
</rewritten_file> 