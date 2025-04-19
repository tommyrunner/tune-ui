# 按钮 Button

常用的操作按钮，用于触发点击事件。

## 基础用法

使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

<demo component-name="button">
  <BasicButton />
  <template #code>

```vue
<template>
  <div class="button-row">
    <t-button>默认按钮</t-button>
    <t-button type="primary">主要按钮</t-button>
    <t-button type="success">成功按钮</t-button>
    <t-button type="info">信息按钮</t-button>
    <t-button type="warning">警告按钮</t-button>
    <t-button type="danger">危险按钮</t-button>
  </div>

  <div class="button-row">
    <t-button plain>朴素按钮</t-button>
    <t-button type="primary" plain>主要按钮</t-button>
    <t-button type="success" plain>成功按钮</t-button>
    <t-button type="info" plain>信息按钮</t-button>
    <t-button type="warning" plain>警告按钮</t-button>
    <t-button type="danger" plain>危险按钮</t-button>
  </div>

  <div class="button-row">
    <t-button round>圆角按钮</t-button>
    <t-button type="primary" round>主要按钮</t-button>
    <t-button type="success" round>成功按钮</t-button>
    <t-button type="info" round>信息按钮</t-button>
    <t-button type="warning" round>警告按钮</t-button>
    <t-button type="danger" round>危险按钮</t-button>
  </div>

  <div class="button-row">
    <t-button circle icon="search" />
    <t-button type="primary" circle icon="edit" />
    <t-button type="success" circle icon="check" />
    <t-button type="info" circle icon="message" />
    <t-button type="warning" circle icon="star" />
    <t-button type="danger" circle icon="delete" />
  </div>
</template>

<script setup>
import { TButton } from "tune-ui";
</script>
```

  </template>
</demo>

## 禁用状态

按钮的禁用状态。

<demo component-name="button">
  <DisabledButton />
  <template #code>

```vue
<template>
  <div class="button-row">
    <t-button disabled>默认按钮</t-button>
    <t-button type="primary" disabled>主要按钮</t-button>
    <t-button type="success" disabled>成功按钮</t-button>
    <t-button type="info" disabled>信息按钮</t-button>
    <t-button type="warning" disabled>警告按钮</t-button>
    <t-button type="danger" disabled>危险按钮</t-button>
  </div>

  <div class="button-row">
    <t-button plain disabled>朴素按钮</t-button>
    <t-button type="primary" plain disabled>主要按钮</t-button>
    <t-button type="success" plain disabled>成功按钮</t-button>
    <t-button type="info" plain disabled>信息按钮</t-button>
    <t-button type="warning" plain disabled>警告按钮</t-button>
    <t-button type="danger" plain disabled>危险按钮</t-button>
  </div>
</template>

<script setup>
import { TButton } from "tune-ui";
</script>
```

  </template>
</demo>

## 按钮尺寸

使用 `size` 属性设置按钮的大小。

<demo component-name="button">
  <SizeButton />
  <template #code>

```vue
<template>
  <div class="button-row">
    <t-button size="large">大型按钮</t-button>
    <t-button>默认按钮</t-button>
    <t-button size="small">小型按钮</t-button>
    <t-button size="mini">迷你按钮</t-button>
  </div>

  <div class="button-row">
    <t-button size="large" round>大型按钮</t-button>
    <t-button round>默认按钮</t-button>
    <t-button size="small" round>小型按钮</t-button>
    <t-button size="mini" round>迷你按钮</t-button>
  </div>
</template>

<script setup>
import { TButton } from "tune-ui";
</script>
```

  </template>
</demo>

## 加载状态

点击按钮后进行数据加载操作，在按钮上显示加载状态。

<demo component-name="button">
  <LoadingButton />
  <template #code>

```vue
<template>
  <t-button type="primary" loading>加载中</t-button>
  <t-button type="primary" loading-icon="loading" loading>加载中</t-button>
  <t-button type="primary" :loading="loading" @click="onClick">点击加载</t-button>
</template>

<script setup>
import { ref } from "vue";
import { TButton } from "tune-ui";

const loading = ref(false);

const onClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>
```

  </template>
</demo>

## 带图标的按钮

使用 `icon` 属性为按钮添加图标。

<demo component-name="button">
  <IconButton />
  <template #code>

```vue
<template>
  <t-button type="primary" icon="edit">编辑</t-button>
  <t-button type="primary" icon="share">分享</t-button>
  <t-button type="primary" icon="delete">删除</t-button>
  <t-button type="primary" icon="search">搜索</t-button>
  <t-button type="primary">上传<t-icon icon="upload-fill" /></t-button>
</template>

<script setup>
import { TButton, TIcon } from "tune-ui";
</script>
```

  </template>
</demo>

## 自定义颜色

可以通过 `color` 属性自定义按钮颜色。

<demo component-name="button">
  <CustomColorButton />
  <template #code>

```vue
<template>
  <div class="button-row">
    <t-button color="#626aef">自定义颜色</t-button>
    <t-button color="#626aef" plain>自定义颜色</t-button>
    <t-button color="#626aef" disabled>自定义颜色</t-button>
  </div>

  <div class="button-row">
    <t-button color="rgba(100, 108, 255, 0.8)">自定义颜色</t-button>
    <t-button color="rgba(100, 108, 255, 0.8)" plain>自定义颜色</t-button>
    <t-button color="rgba(100, 108, 255, 0.8)" disabled>自定义颜色</t-button>
  </div>
</template>

<script setup>
import { TButton } from "tune-ui";
</script>
```

  </template>
</demo>

## API

### 属性

| 属性         | 说明             | 类型                                                              | 默认值    |
| ------------ | ---------------- | ----------------------------------------------------------------- | --------- |
| type         | 按钮类型         | 'default' / 'primary' / 'success' / 'warning' / 'danger' / 'info' | 'default' |
| size         | 按钮尺寸         | 'large' / 'default' / 'small' / 'mini'                            | 'default' |
| plain        | 是否为朴素按钮   | boolean                                                           | false     |
| round        | 是否为圆角按钮   | boolean                                                           | false     |
| circle       | 是否为圆形按钮   | boolean                                                           | false     |
| loading      | 是否为加载中状态 | boolean                                                           | false     |
| loading-icon | 自定义加载图标   | string                                                            | 'loading' |
| disabled     | 是否禁用         | boolean                                                           | false     |
| icon         | 图标类名         | string                                                            | -         |
| color        | 自定义按钮颜色   | string                                                            | -         |
| native-type  | 原生 button 类型 | 'button' / 'submit' / 'reset'                                     | 'button'  |
| auto-focus   | 是否自动获取焦点 | boolean                                                           | false     |

### 插槽

| 插槽名  | 说明       |
| ------- | ---------- |
| default | 按钮的内容 |
| icon    | 自定义图标 |

### 事件

| 事件名     | 说明               | 回调参数                    |
| ---------- | ------------------ | --------------------------- |
| click      | 点击按钮时触发     | (event: MouseEvent) => void |
| mouseenter | 鼠标移入按钮时触发 | (event: MouseEvent) => void |
| mouseleave | 鼠标移出按钮时触发 | (event: MouseEvent) => void |

## 最佳实践

### 按钮类型选择

- **主要按钮（Primary）**：用于主要操作，一个页面通常只有一个主要按钮
- **默认按钮（Default）**：用于次要操作
- **成功按钮（Success）**：用于表示成功或确认操作
- **警告按钮（Warning）**：用于需要注意的操作
- **危险按钮（Danger）**：用于危险或不可逆的操作

### 按钮尺寸选择

- **大型按钮（Large）**：适用于页面主要操作按钮
- **默认尺寸**：适用于一般操作
- **小型按钮（Small）**：适用于表单内或空间有限的场景
- **迷你按钮（Mini）**：适用于需要大量按钮的紧凑型场景

<script setup>
import BasicButton from '../examples/button/BasicButton.vue'
import DisabledButton from '../examples/button/DisabledButton.vue'
import SizeButton from '../examples/button/SizeButton.vue'
import LoadingButton from '../examples/button/LoadingButton.vue'
import IconButton from '../examples/button/IconButton.vue'
import CustomColorButton from '../examples/button/CustomColorButton.vue'
</script>
