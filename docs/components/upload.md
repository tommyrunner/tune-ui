# 上传组件

![上传组件](/components/upload.png)

上传组件允许用户通过点击或者拖拽的方式上传文件。支持多种展示方式、自动/手动上传，以及丰富的自定义功能。

## 基础用法

通过点击上传按钮上传文件，使用 `action` 属性设置上传地址。

<demo component-name="upload" examples="basic"></demo>

## 列表类型

上传组件支持两种文件列表展示方式：文本列表和图片列表。使用 `list-type` 属性进行设置。

<demo component-name="upload" examples="list-type"></demo>

## 拖拽上传

设置 `drag` 属性可以启用拖拽上传模式，用户可以拖拽文件到特定区域以进行上传。

<demo component-name="upload" examples="drag"></demo>

## 手动上传

设置 `auto-upload` 为 `false` 可以禁用自动上传，需要调用 `submit` 方法手动开始上传。

<demo component-name="upload" examples="manual"></demo>

## 上传限制

可以使用 `accept`、`max-size` 和 `limit` 属性分别限制文件类型、大小和数量。

<demo component-name="upload" examples="limit"></demo>

## 自定义上传

通过 `http-request` 属性可以自定义上传行为，提供更灵活的上传实现方式。

<demo component-name="upload" examples="custom"></demo>

## 事件处理

上传组件提供了丰富的事件用于处理上传过程中的各种状态变化。

<demo component-name="upload" examples="events"></demo>

## 插槽使用

通过多种插槽可以自定义上传组件的不同部分，包括触发按钮、文件列表等。

<demo component-name="upload" examples="slots"></demo>

## 上传组件 API

### 属性

| 属性名             | 说明                     | 类型                                                    | 可选值             | 默认值  |
| ------------------ | ------------------------ | ------------------------------------------------------- | ------------------ | ------- |
| `action`           | 上传的地址               | `string`                                                | —                  | —       |
| `headers`          | 设置上传的请求头         | `object`                                                | —                  | —       |
| `multiple`         | 是否支持多选文件         | `boolean`                                               | —                  | `false` |
| `data`             | 上传时附带的额外参数     | `object`                                                | —                  | —       |
| `name`             | 上传的文件字段名         | `string`                                                | —                  | `file`  |
| `with-credentials` | 支持发送 cookie 凭证     | `boolean`                                               | —                  | `false` |
| `accept`           | 接受上传的文件类型       | `string`                                                | —                  | —       |
| `max-size`         | 文件大小限制，单位为MB   | `number`                                                | —                  | —       |
| `file-list`        | 上传的文件列表           | `UploadFile[]`                                          | —                  | `[]`    |
| `auto-upload`      | 是否在选取文件后立即上传 | `boolean`                                               | —                  | `true`  |
| `list-type`        | 文件列表的类型           | `string`                                                | `text` / `picture` | `text`  |
| `drag`             | 是否启用拖拽上传         | `boolean`                                               | —                  | `false` |
| `disabled`         | 是否禁用                 | `boolean`                                               | —                  | `false` |
| `show-file-list`   | 是否显示已上传文件列表   | `boolean`                                               | —                  | `true`  |
| `limit`            | 最大允许上传个数         | `number`                                                | —                  | —       |
| `before-upload`    | 上传文件之前的钩子       | `(file: File) => boolean \| Promise<any>`               | —                  | —       |
| `before-remove`    | 删除文件之前的钩子       | `(file: UploadFile, fileList: UploadFile[]) => boolean` | —                  | —       |
| `http-request`     | 覆盖默认的上传行为       | `(options: UploadRequestOptions) => Promise<any>`       | —                  | —       |

### UploadFile 类型

| 属性名       | 说明         | 类型               | 可选值                                     |
| ------------ | ------------ | ------------------ | ------------------------------------------ |
| `uid`        | 文件唯一标识 | `number \| string` | —                                          |
| `name`       | 文件名       | `string`           | —                                          |
| `size`       | 文件大小     | `number`           | —                                          |
| `type`       | 文件类型     | `string`           | —                                          |
| `status`     | 文件状态     | `string`           | `ready` / `uploading` / `success` / `fail` |
| `percentage` | 上传进度     | `number`           | `0-100`                                    |
| `url`        | 文件URL地址  | `string`           | —                                          |
| `response`   | 上传响应数据 | `any`              | —                                          |
| `error`      | 上传错误信息 | `Error`            | —                                          |
| `raw`        | 原始文件对象 | `File`             | —                                          |

### 事件

| 事件名     | 说明                       | 参数                                                 |
| ---------- | -------------------------- | ---------------------------------------------------- |
| `success`  | 文件上传成功时触发         | `(file: UploadFile, response: any)`                  |
| `error`    | 文件上传失败时触发         | `(file: UploadFile, error: Error)`                   |
| `progress` | 文件上传进度变化时触发     | `(file: UploadFile, percent: number)`                |
| `change`   | 文件状态改变时触发         | `(file: UploadFile \| null, fileList: UploadFile[])` |
| `exceed`   | 文件超出限制个数时触发     | `(files: File[], fileList: UploadFile[])`            |
| `remove`   | 文件被移除时触发           | `(file: UploadFile, fileList: UploadFile[])`         |
| `preview`  | 点击已上传的文件链接时触发 | `(file: UploadFile)`                                 |

### 方法

| 方法名       | 说明             | 参数                                                     |
| ------------ | ---------------- | -------------------------------------------------------- |
| `submit`     | 手动上传文件     | —                                                        |
| `clearFiles` | 清空已选择的文件 | `(status?: UploadStatus[])` 可选，指定清空的文件状态类型 |
| `abort`      | 取消上传请求     | `(file: UploadFile)` 文件                                |

### 插槽

| 插槽名      | 说明                 | 作用域参数             |
| ----------- | -------------------- | ---------------------- |
| `default`   | 触发文件选择框的内容 | —                      |
| `drag`      | 拖拽区域的内容       | —                      |
| `tip`       | 提示说明文字         | —                      |
| `file-item` | 自定义文件列表项     | `{ file: UploadFile }` |
| `prefix`    | 文件列表前内容       | —                      |
| `suffix`    | 文件列表后内容       | —                      |

### 样式变量

上传组件使用了以下样式变量，可通过 SCSS 变量进行自定义：

| 变量名                  | 说明         |
| ----------------------- | ------------ |
| `$theme-color-primary`  | 主题色       |
| `$text-color-default`   | 文本颜色     |
| `$border-color-default` | 边框颜色     |
| `$bg-color-default`     | 背景色       |
| `$font-size-default`    | 默认字体大小 |

</rewritten_file>
