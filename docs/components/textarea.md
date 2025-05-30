<script setup lang="ts">
import textareaBasic from '../examples/textarea/basic.vue'
import textareaDisabled from '../examples/textarea/disabled.vue'
import textareaResize from '../examples/textarea/resize.vue'
import textareaEnter from '../examples/textarea/enter.vue'
import textareaMaxlength from '../examples/textarea/maxlength.vue'
import textareaDebounce from '../examples/textarea/debounce.vue'
import textareaSize from '../examples/textarea/size.vue'
import textareaEvents from '../examples/textarea/events.vue'
</script>

# 文本域组件

![文本域组件](/components/textarea.png)

文本域组件，用于多行文本输入，支持自适应高度、字数限制、换行控制等功能。

## 基础用法

基础的文本域用法，通过`v-model`绑定文本域的值。

<demo :component="textareaBasic" name="textarea" examples="basic" />

## 禁用状态

添加`disabled`属性可以禁用文本域。

<demo :component="textareaDisabled" name="textarea" examples="disabled" />

## 大小调整

文本域默认可以调整大小，通过`isResize`属性可以控制是否允许调整大小。

<demo :component="textareaResize" name="textarea" examples="resize" />

## 换行控制

文本域默认允许换行，通过`isEnter`属性可以控制是否允许换行。

<demo :component="textareaEnter" name="textarea" examples="enter" />

## 字数限制

设置`maxLength`属性可以限制文本域的最大输入长度，默认会显示当前光标所在行数和字数统计，可以通过`isCursor`属性控制是否显示光标行数。

<demo :component="textareaMaxlength" name="textarea" examples="maxlength" />

## 防抖输入

设置`debounce`属性可以实现防抖输入，延迟触发输入事件。

<demo :component="textareaDebounce" name="textarea" examples="debounce" />

## 不同尺寸

文本域支持三种尺寸：small、default 和 large。

<demo :component="textareaSize" name="textarea" examples="size" />

## 事件处理

文本域提供了多种事件：focus、blur、enter、input。

<demo :component="textareaEvents" name="textarea" examples="events" />

## 文本域 API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model | 绑定值 | string | — | — |
| size | 尺寸 | string | small / default / large | default |
| placeholder | 占位文本 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| maxLength | 最大输入长度 | number | — | — |
| isCursor | 是否显示当前光标所在行数 | boolean | — | true |
| isResize | 是否允许调整大小 | boolean | — | true |
| isEnter | 是否允许换行输入 | boolean | — | true |
| isTip | 是否显示提示文本 | boolean | — | true |
| tip | 自定义提示文本 | string | — | — |
| tipClass | 提示文本类名 | string | — | — |
| debounce | 防抖事件回调 | (data?: string) => void | — | — |
| debounceDelay | 防抖延迟时间(ms) | number | — | 1000 |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| focus | 获得焦点时触发 | (value: `string`) |
| blur | 失去焦点时触发 | (value: `string`) |
| input | 输入值变化时触发 | (value: `string`) |
| enter | 按下回车键时触发 | (value: `string`) |
| clear | 点击清空按钮时触发 | — |

### 样式变量

文本域组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名 | 说明 |
| --- | --- |
| $theme-color-primary | 主题色-主要 |
| $border-color-default | 边框颜色-默认 |
| $font-size-default | 字体大小-默认 | 