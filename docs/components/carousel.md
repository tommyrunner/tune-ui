# 轮播组件

![轮播组件](/components/carousel.png)

轮播组件用于在有限空间内循环展示多个内容项，支持自动播放、切换动画和指示器控制。

## 基础用法

轮播组件由 `TCarouselGroup` 容器和多个 `TCarousel` 项组成，默认展示水平方向轮播。

<demo component-name="carousel" examples="basic"></demo>

## 尺寸与初始位置

通过 `width` 和 `height` 属性设置轮播容器尺寸，`initIndex` 属性设置初始显示项的索引。

<demo component-name="carousel" examples="size"></demo>

## 自动播放

设置 `autoplay` 属性启用自动播放，`delay` 控制间隔时间，`autoplayBack` 控制播放方向，`pauseOnHover` 控制鼠标悬停是否暂停。

<demo component-name="carousel" examples="autoplay"></demo>

## 切换效果

通过 `toggle` 属性配置不同的切换效果，包括视觉差（vision）、重复（repeat）、反复（repeatedly）和不循环（none）模式，`animation` 属性控制是否启用动画。

<demo component-name="carousel" examples="toggle"></demo>

## 指示器与箭头

`trigger` 属性配置指示器触发方式（hover、click、none），`arrow` 属性控制切换箭头的显示时机（always、hover、none）。

<demo component-name="carousel" examples="indicator"></demo>

## 垂直方向轮播

设置 `direction` 属性为 `vertical` 可实现垂直方向轮播，默认为 `horizontal`。

<demo component-name="carousel" examples="vertical"></demo>

## 事件处理

轮播组件支持 `change` 事件（轮播切换时触发）和 `autoplay` 事件（自动播放切换时触发）。

<demo component-name="carousel" examples="events"></demo>

## 轮播组件 API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| width | 容器宽度 | number | — | 300 |
| height | 容器高度 | number | — | 200 |
| delay | 轮播间隔时间(ms) | number | — | 2200 |
| initIndex | 初始化下标 | number | — | 0 |
| autoplay | 是否自动播放 | boolean | — | false |
| autoplayBack | 轮播方向(true:前进,false:后退) | boolean | — | false |
| pauseOnHover | 鼠标悬停是否暂停 | boolean | — | true |
| animation | 是否开启切换动画 | boolean | — | true |
| trigger | 指示器触发方式 | string | hover / click / none | hover |
| arrow | 切换箭头显示时机 | string | always / hover / none | hover |
| direction | 轮播方向 | string | horizontal / vertical | horizontal |
| toggle | 内容轮播方式 | string | vision / repeat / repeatedly / none | vision |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 轮播切换时触发 | (index: `number`) |
| autoplay | 自动播放切换时触发 | (index: `number`) |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 轮播项内容，通常放置 `TCarousel` 组件 |

### 样式变量

轮播组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名 | 说明 |
| --- | --- |
| $z-index-show | 显示层级 |
| $bg-color-hover | 背景色-悬停 |
| $border-color-default | 边框颜色-默认 |