# 列表视图组件

![列表视图组件](/components/list-view.png)

列表视图组件用于展示大量数据，支持虚拟滚动、固定行和自定义布局。

## 基础用法

基础列表视图用于展示一组数据。

<demo component-name="list-view" examples="basic"></demo>

## 空数据展示

当列表数据为空时，会显示空状态提示。

<demo component-name="list-view" examples="empty"></demo>

## 虚拟滚动

当需要展示大量数据时，可以启用虚拟滚动以提高性能。

<demo component-name="list-view" examples="virtual"></demo>

## 固定项

通过 `itemFixed` 属性可以设置特定项固定不随滚动而移动。

<demo component-name="list-view" examples="fixed"></demo>

## 列表插槽

列表视图提供了头部和底部插槽，用于添加额外的内容。

<demo component-name="list-view" examples="slots"></demo>

## 列表视图 API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| listData | 列表数据源 | array | — | [] |
| height | 列表容器高度 | number | — | — |
| isVirtualized | 是否启用虚拟滚动 | boolean | — | false |
| itemHeight | 虚拟列表项固定高度 | number | — | — |
| itemFixed | 固定项判断函数 | function(index, row) | — | — |
| emptyText | 空数据提示文本 | string | — | 暂无数据 |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| scroll | 列表滚动时触发 | (element: `HTMLElement`) |
| update-view | 视图更新时触发 | (element: `HTMLElement`) |

### 插槽

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| default | 列表项内容 | { row: `any`, index: `number` } |
| head | 列表头部内容 | — |
| footer | 列表底部内容 | — |
| empty | 空状态内容 | — |

### 样式变量

列表视图组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名 | 说明 |
| --- | --- |
| $border-color-default | 边框颜色-默认 |
| $z-index-dropdown | 层级-下拉菜单 |
| $bg-color-overlay | 背景色-遮罩层 | 