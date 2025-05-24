<script setup lang="ts">
import imageBasic from '../examples/image/basic.vue'
import imageFit from '../examples/image/fit.vue'
import imageLoading from '../examples/image/loading.vue'
import imageLazy from '../examples/image/lazy.vue'
import imagePreview from '../examples/image/preview.vue'
import imagePreviewConfig from '../examples/image/preview-config.vue'
</script>

# 图片组件

![图片组件](/components/image.png)

图片组件用于展示图像，支持懒加载、错误处理、预览等功能。

## 基础用法

基础图片组件用于展示图像，设置宽高和替代文本。

<demo :component="imageBasic" name="image" examples="basic" />

## 适应容器方式

通过 `fit` 属性可以设置图片在容器中的适应方式。

<demo :component="imageFit" name="image" examples="fit" />

## 图片加载状态

组件提供了默认的加载中和加载失败状态，也可以通过插槽自定义。

<demo :component="imageLoading" name="image" examples="loading" />

## 懒加载

设置 `lazy` 属性可以实现图片懒加载，在滚动到可视区域时才会加载。

<demo :component="imageLazy" name="image" examples="lazy" />

## 图片预览

设置 `preview-src-list` 属性可以开启图片预览功能。

<demo :component="imagePreview" name="image" examples="preview" />

## 预览配置

可以配置预览的缩放比例、初始索引等。

<demo :component="imagePreviewConfig" name="image" examples="preview-config" />

## 图片组件 API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| src | 图片源地址 | string | — | — |
| fit | 图片适应容器方式 | string | fill / contain / cover / none / scale-down | — |
| alt | 图片替代文本 | string | — | — |
| referrerPolicy | 图片引用策略 | string | — | — |
| lazy | 是否懒加载 | boolean | — | false |
| width | 图片宽度 | string / number | — | — |
| height | 图片高度 | string / number | — | — |
| previewSrcList | 预览图片列表 | Array\<string\> | — | [] |
| initialIndex | 预览初始图片索引 | number | — | 0 |
| zIndex | 预览层级 | number | — | 2000 |
| infinite | 是否无限循环预览 | boolean | — | true |
| closeOnPressEscape | 是否按ESC关闭预览 | boolean | — | true |
| zoomRate | 缩放速率 | number | — | 1.2 |
| minScale | 最小缩放比例 | number | — | 0.2 |
| maxScale | 最大缩放比例 | number | — | 7 |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| load | 图片加载成功触发 | (e: Event) |
| error | 图片加载失败触发 | (e: Error) |
| switch | 预览图片切换时触发 | (index: number) |
| close | 预览关闭时触发 | — |
| show | 预览打开时触发 | — |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| placeholder | 图片加载中的占位内容 |
| error | 图片加载失败的内容 |

### 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| showPreview | 手动显示预览 | — |

### 样式变量

图片组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名 | 说明 |
| --- | --- |
| $image-placeholder-bg-color | 占位背景色 |
| $image-error-bg-color | 错误状态背景色 |
| $overlay-bg-color | 遮罩层背景色 | 