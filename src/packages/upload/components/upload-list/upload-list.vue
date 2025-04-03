<template>
  <ul class="t-upload-list">
    <li
      v-for="file in uploadContext.fileList"
      :key="file.uid"
      class="t-upload-list-item"
      :class="{
        't-upload-list-item--uploading': file.status === 'uploading',
        't-upload-list-item--success': file.status === 'success',
        't-upload-list-item--fail': file.status === 'fail',
        't-upload-list-item--disabled': uploadContext.disabled,
        't-upload-list-item--picture': uploadContext.listType === 'picture'
      }"
    >
      <slot :file="file">
        <div class="t-upload-list-item__info">
          <!-- 图标或缩略图 -->
          <div class="t-upload-list-item__preview">
            <!-- 进度条 -->
            <t-progress
              v-if="file.status === 'uploading' && file.percentage"
              :percentage="file.percentage || 0"
              :show-text="false"
              type="circle"
              :stroke-width="4"
              :width="24"
              class="t-upload-list-item__progress"
            />
            <!-- 文本模式显示图标 -->
            <template v-else-if="uploadContext.listType === 'text'">
              <t-icon :icon="getFileIcon(file.name)" class="t-upload-list-item__icon" />
            </template>

            <!-- 图片模式显示缩略图 -->
            <template v-else-if="uploadContext.listType === 'picture'">
              <!-- 显示图片缩略图 -->
              <template v-if="isImageFile(file)">
                <t-image
                  v-if="file.url"
                  class="t-upload-list-item__thumbnail"
                  :src="file.url"
                  :alt="file.name"
                  fit="cover"
                  :preview-src-list="getPreviewSrcList()"
                  :initial-index="getImageIndex(file)"
                  @click="uploadContext.handlePreview(file)"
                />
                <!-- 上传中或无URL时显示占位图标 -->
                <div v-else class="t-upload-list-item__image-placeholder">
                  <t-icon icon="file-image" class="t-upload-list-item__icon" />
                </div>
              </template>
              <!-- 非图片文件显示对应图标 -->
              <template v-else>
                <t-icon :icon="getFileIcon(file.name)" class="t-upload-list-item__icon" />
              </template>
            </template>
          </div>

          <!-- 文件信息 -->
          <div class="t-upload-list-item__content">
            <span class="t-upload-list-item__name">{{ file.name }}</span>
            <span v-if="file.status === 'fail'" class="t-upload-list-item__error">上传失败</span>
          </div>
        </div>
      </slot>
      <!-- 操作按钮 -->
      <div class="t-upload-list-item__actions">
        <t-icon
          v-if="!uploadContext.disabled"
          icon="close-to"
          class="t-upload-list-item__close"
          @click="uploadContext.handleRemove(file)"
        />
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import "./upload-list.scss";
import type { UploadFile, UploadContextType } from "../../upload";
import { inject } from "vue";
import { TIcon } from "@/packages/icon";
import { TProgress } from "@/packages/progress";
import { TImage } from "@/packages/image";
import { uploadKey } from "../../constants";

// 定义类型
type IconType =
  | "file-image"
  | "file-pdf"
  | "file-word"
  | "file-excel"
  | "file-ppt1"
  | "file-text"
  | "file-markdown"
  | "file-unknown";

defineOptions({
  name: "TUploadList"
});

// 注入上下文
const uploadContext = inject<UploadContextType>(uploadKey, {
  fileList: [],
  listType: "text",
  disabled: false,
  handleRemove: () => {},
  handlePreview: () => {}
});

// 判断是否为图片文件
const isImageFile = (file: UploadFile): boolean => {
  const ext = file.name.split(".").pop()?.toLowerCase();
  return ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext || "");
};

// 获取所有可预览图片的URL列表
const getPreviewSrcList = () => {
  return uploadContext.fileList
    .filter(isImageFile)
    .filter(file => file.url)
    .map(file => file.url as string);
};

// 获取当前图片在预览列表中的索引
const getImageIndex = (currentFile: UploadFile): number => {
  const imageList = getPreviewSrcList();
  const index = imageList.findIndex(url => url === currentFile.url);
  return index !== -1 ? index : 0;
};

// 获取文件图标
const getFileIcon = (fileName: string): IconType => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
      return "file-image";
    case "pdf":
      return "file-pdf";
    case "doc":
    case "docx":
      return "file-word";
    case "xls":
    case "xlsx":
      return "file-excel";
    case "ppt":
    case "pptx":
      return "file-ppt1";
    case "txt":
      return "file-text";
    case "md":
      return "file-markdown";
    default:
      return "file-unknown";
  }
};
</script>
