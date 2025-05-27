<script setup lang="ts">
import loadingBasic from '../examples/loading/basic.vue'
import loadingText from '../examples/loading/text.vue'
import loadingBackground from '../examples/loading/background.vue'
import loadingFullscreen from '../examples/loading/fullscreen.vue'
import loadingMini from '../examples/loading/mini.vue'
</script>

# 加载组件

![加载组件](/components/loading.png)

加载组件用于在页面或元素加载过程中显示加载动画，提供了全屏加载、区域加载和迷你加载多种方式，可自定义文本和样式。

## 基础用法

最基本的用法是通过`v-loading`指令在任意元素上添加加载效果，当绑定值为`true`时显示加载动画。

<ClientOnly>
  <demo :component="loadingBasic" name="loading" examples="basic" />
</ClientOnly>

## 加载文本

可以添加加载文本说明正在进行的操作，通过`loading-text`属性设置。

<ClientOnly>
  <demo :component="loadingText" name="loading" examples="text" />
</ClientOnly>

## 自定义背景

通过设置背景色可以改变加载遮罩的颜色，适合在不同背景下使用。

<ClientOnly>
  <demo :component="loadingBackground" name="loading" examples="background" />
</ClientOnly>

## 全屏加载

全屏加载用于整个页面的加载过程，通过API调用方式使用。

<ClientOnly>
  <demo :component="loadingFullscreen" name="loading" examples="fullscreen" />
</ClientOnly>

## 迷你加载

迷你加载提供更轻量的加载提示，适合小区域或轻量级操作的加载状态展示。

<ClientOnly>
  <demo :component="loadingMini" name="loading" examples="mini" />
</ClientOnly>

## 加载组件 API

### 指令用法

| 指令名      | 说明             | 类型      | 默认值  |
| ----------- | ---------------- | --------- | ------- |
| `v-loading` | 是否显示加载动画 | `boolean` | `false` |

### 指令修饰符

| 修饰符名             | 说明                                   |
| -------------------- | -------------------------------------- |
| `loading-text`       | 加载提示文本                           |
| `loading-type`       | 加载动画类型，可选值: `bounce`、`spin` |
| `loading-background` | 加载背景颜色                           |

### API 方法

| 方法名                 | 说明         | 参数                          |
| ---------------------- | ------------ | ----------------------------- |
| `fullLoading(options)` | 显示全屏加载 | `options: LoadingOptionsType` |
| `miniLoading(options)` | 显示迷你加载 | `options: LoadingOptionsType` |

### 选项类型

```typescript
interface LoadingOptionsType {
  text?: string; // 加载文本
  bgColor?: string; // 背景颜色，默认为半透明白色
  model?: "ring" | "bean"; // 加载动画类型
  delay?: number; // 延迟显示时间(毫秒)
}
```

### 样式变量

加载组件使用了以下CSS变量，可通过样式覆盖自定义：

| 变量名                      | 说明           | 默认值                     |
| --------------------------- | -------------- | -------------------------- |
| `--t-loading-bg-color`      | 加载遮罩背景色 | `rgba(255, 255, 255, 0.9)` |
| `--t-loading-text-color`    | 加载文本颜色   | `#606266`                  |
| `--t-loading-spinner-color` | 加载图标颜色   | `#1890ff`                  |
