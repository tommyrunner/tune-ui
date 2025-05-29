<script setup lang="ts">
import uploadBasic from '../examples/upload/basic.vue'
import uploadListType from '../examples/upload/list-type.vue'
import uploadDrag from '../examples/upload/drag.vue'
import uploadManual from '../examples/upload/manual.vue'
import uploadLimit from '../examples/upload/limit.vue'
import uploadCustom from '../examples/upload/custom.vue'
import uploadEvents from '../examples/upload/events.vue'
import uploadSlots from '../examples/upload/slots.vue'
</script>

# Upload Component

![Upload Component](/components/upload.png)

Upload component allows users to upload files by clicking or dragging. It supports multiple display modes, automatic/manual upload, and rich customization features.

## Basic Usage

Upload files by clicking the upload button, use the `action` attribute to set the upload address.

<demo :component="uploadBasic" name="upload" examples="basic" />

## List Type

Upload component supports two file list display modes: text list and picture list. Use the `list-type` attribute to configure.

<demo :component="uploadListType" name="upload" examples="list-type" />

## Drag Upload

Setting the `drag` attribute enables drag upload mode, allowing users to drag files to a specific area for upload.

<demo :component="uploadDrag" name="upload" examples="drag" />

## Manual Upload

Setting `auto-upload` to `false` disables automatic upload, requiring the `submit` method to be called to manually start upload.

<demo :component="uploadManual" name="upload" examples="manual" />

## Upload Restrictions

You can use `accept`, `max-size`, and `limit` attributes to restrict file type, size, and quantity respectively.

<demo :component="uploadLimit" name="upload" examples="limit" />

## Custom Upload

Through the `http-request` attribute, you can customize upload behavior for more flexible upload implementation.

<demo :component="uploadCustom" name="upload" examples="custom" />

## Event Handling

Upload component provides rich events for handling various state changes during the upload process.

<demo :component="uploadEvents" name="upload" examples="events" />

## Slot Usage

Through multiple slots, you can customize different parts of the upload component, including trigger buttons, file lists, etc.

<demo :component="uploadSlots" name="upload" examples="slots" />

## Upload Component API

### Attributes

| Attribute          | Description                      | Type                                                    | Accepted Values    | Default |
| ------------------ | -------------------------------- | ------------------------------------------------------- | ------------------ | ------- |
| `action`           | Upload URL                       | `string`                                                | —                  | —       |
| `headers`          | Set upload request headers       | `object`                                                | —                  | —       |
| `multiple`         | Whether to support multiple file selection | `boolean`                                        | —                  | `false` |
| `data`             | Additional parameters for upload | `object`                                                | —                  | —       |
| `name`             | Upload file field name           | `string`                                                | —                  | `file`  |
| `with-credentials` | Support sending cookie credentials | `boolean`                                             | —                  | `false` |
| `accept`           | Accepted upload file types       | `string`                                                | —                  | —       |
| `max-size`         | File size limit in MB            | `number`                                                | —                  | —       |
| `file-list`        | Uploaded file list               | `UploadFile[]`                                          | —                  | `[]`    |
| `auto-upload`      | Whether to upload immediately after file selection | `boolean`                            | —                  | `true`  |
| `list-type`        | File list type                   | `string`                                                | `text` / `picture` | `text`  |
| `drag`             | Whether to enable drag upload    | `boolean`                                               | —                  | `false` |
| `disabled`         | Whether disabled                 | `boolean`                                               | —                  | `false` |
| `show-file-list`   | Whether to show uploaded file list | `boolean`                                             | —                  | `true`  |
| `limit`            | Maximum number of uploads allowed | `number`                                               | —                  | —       |
| `before-upload`    | Hook before uploading file       | `(file: File) => boolean \| Promise<any>`               | —                  | —       |
| `before-remove`    | Hook before removing file        | `(file: UploadFile, fileList: UploadFile[]) => boolean` | —                  | —       |
| `http-request`     | Override default upload behavior | `(options: UploadRequestOptions) => Promise<any>`       | —                  | —       |

### UploadFile Type

| Attribute    | Description      | Type               | Accepted Values                        |
| ------------ | ---------------- | ------------------ | -------------------------------------- |
| `uid`        | File unique identifier | `number \| string` | —                                   |
| `name`       | File name        | `string`           | —                                      |
| `size`       | File size        | `number`           | —                                      |
| `type`       | File type        | `string`           | —                                      |
| `status`     | File status      | `string`           | `ready` / `uploading` / `success` / `fail` |
| `percentage` | Upload progress  | `number`           | `0-100`                                |
| `url`        | File URL address | `string`           | —                                      |
| `response`   | Upload response data | `any`          | —                                      |
| `error`      | Upload error info | `Error`           | —                                      |
| `raw`        | Raw file object  | `File`             | —                                      |

### Events

| Event Name | Description                    | Parameters                                           |
| ---------- | ------------------------------ | ---------------------------------------------------- |
| `success`  | Triggered when file upload succeeds | `(file: UploadFile, response: any)`            |
| `error`    | Triggered when file upload fails | `(file: UploadFile, error: Error)`               |
| `progress` | Triggered when file upload progress changes | `(file: UploadFile, percent: number)`      |
| `change`   | Triggered when file status changes | `(file: UploadFile \| null, fileList: UploadFile[])` |
| `exceed`   | Triggered when file count exceeds limit | `(files: File[], fileList: UploadFile[])`    |
| `remove`   | Triggered when file is removed | `(file: UploadFile, fileList: UploadFile[])`         |
| `preview`  | Triggered when clicking uploaded file link | `(file: UploadFile)`                       |

### Methods

| Method Name  | Description          | Parameters                                               |
| ------------ | -------------------- | -------------------------------------------------------- |
| `submit`     | Manually upload file | —                                                        |
| `clearFiles` | Clear selected files | `(status?: UploadStatus[])` Optional, specify file status types to clear |
| `abort`      | Cancel upload request | `(file: UploadFile)` File                               |

### Slots

| Slot Name   | Description                  | Scope Parameters       |
| ----------- | ---------------------------- | ---------------------- |
| `default`   | Content that triggers file selection box | —             |
| `drag`      | Drag area content            | —                      |
| `tip`       | Tip description text         | —                      |
| `file-item` | Custom file list item        | `{ file: UploadFile }` |
| `prefix`    | Content before file list     | —                      |
| `suffix`    | Content after file list      | —                      |

### Style Variables

Upload component uses the following style variables, which can be customized through SCSS variables:

| Variable Name           | Description           |
| ----------------------- | --------------------- |
| `$theme-color-primary`  | Theme color           |
| `$text-color-default`   | Text color            |
| `$border-color-default` | Border color          |
| `$bg-color-default`     | Background color      |
| `$font-size-default`    | Default font size     |
