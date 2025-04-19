# 按钮组件

按钮用于开始一个即时操作。

## 基础用法

按钮有五种类型：默认按钮、主要按钮、成功按钮、信息按钮、警告按钮和危险按钮。

<demo component-name="button" examples="BasicButton"></demo>

## 禁用状态按钮

禁用状态的按钮不可点击。

<demo component-name="button" examples="DisabledButton"></demo>

## 朴素按钮

朴素按钮通过设置 `plain` 属性实现。

```vue
<t-button plain>朴素按钮</t-button>
<t-button type="primary" plain>主要按钮</t-button>
<t-button type="success" plain>成功按钮</t-button>
<t-button type="info" plain>信息按钮</t-button>
<t-button type="warning" plain>警告按钮</t-button>
<t-button type="danger" plain>危险按钮</t-button>
```

## 圆角按钮

圆角按钮通过设置 `round` 属性实现。

<demo component-name="button" examples="SizeButton"></demo>

## 图标按钮

带图标的按钮可以添加图标增强按钮的可识别性。

<demo component-name="button" examples="IconButton"></demo>

## 加载状态

点击按钮后进行数据加载操作，在按钮上显示加载状态。

<demo component-name="button" examples="LoadingButton"></demo>

## 自定义颜色

你可以自定义按钮的颜色。

<demo component-name="button" examples="CustomColorButton"></demo>

## 按钮 API

### 属性

| 属性名   | 说明         | 类型    | 可选值                                     | 默认值  |
| -------- | ------------ | ------- | ------------------------------------------ | ------- |
| type     | 按钮类型     | string  | primary / success / warning / danger / info | default |
| plain    | 是否为朴素按钮 | boolean | true / false                               | false   |
| round    | 是否为圆角按钮 | boolean | true / false                               | false   |
| circle   | 是否为圆形按钮 | boolean | true / false                               | false   |
| disabled | 是否禁用     | boolean | true / false                               | false   |
| icon     | 图标类名     | string  | —                                          | —       |
| size     | 按钮尺寸     | string  | large / medium / small / mini              | medium  |
| loading  | 是否加载中   | boolean | true / false                               | false   |

### 事件

| 事件名 | 说明                   | 参数           |
| ------ | ---------------------- | -------------- |
| click  | 点击按钮时触发         | (event: Event) |

### 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 按钮的内容     |
| icon    | 自定义图标内容 |
