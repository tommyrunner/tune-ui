<template>
  <div class="t-upload" :class="uploadClasses">
    <template v-if="drag">
      <upload-dragger @drag-click="handleDragClick">
        <slot name="drag">
          <!-- 自定义拖拽区域内容，通过named slot提供 -->
        </slot>
      </upload-dragger>
    </template>
    <template v-else>
      <div @click="handleClick">
        <slot></slot>
      </div>
    </template>

    <input
      ref="inputRef"
      class="t-upload-input"
      type="file"
      :name="name"
      :multiple="multiple"
      :accept="accept"
      :disabled="disabled"
      @change="handleChange"
    />

    <upload-list
      v-if="showFileList"
      class="t-upload-files"
      :files="fileList"
      :disabled="disabled"
      :list-type="listType"
      @remove="handleRemove"
      @preview="handlePreview"
    >
      <template #default="{ file }">
        <slot name="file-item" :file="file"></slot>
      </template>
    </upload-list>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { UploadFile, EmitsType, PropsType, UploadContextType, UploadDraggerContextType } from "./upload";
import { ref, computed, provide } from "vue";
import { generateId } from "@/utils/index";
import { useOptions } from "@/hooks/useOptions";
import UploadDragger from "./components/upload-dragger/upload-dragger.vue";
import UploadList from "./components/upload-list/upload-list.vue";
import { uploadKey, uploadDraggerKey } from "./constants";

defineOptions({
  name: "TUpload"
});

// 基础尺寸
const { baseSize } = useOptions();

// 使用defineModel实现fileList的双向绑定
const fileList = defineModel<UploadFile[]>("fileList", {
  default: () => []
});

// Props 定义
const props = withDefaults(defineProps<Omit<PropsType, "fileList">>(), {
  method: "post",
  name: "file",
  withCredentials: false,
  multiple: false,
  drag: false,
  disabled: false,
  autoUpload: true,
  listType: "text",
  showFileList: true
});

// 事件
const emit = defineEmits<EmitsType>();

// 内部状态
const inputRef = ref<HTMLInputElement | null>(null);

/**
 * 上传组件类名
 */
const uploadClasses = computed(() => ({
  "t-upload--drag": props.drag,
  "t-upload--disabled": props.disabled,
  [`t-upload--size-${baseSize.value}`]: true
}));

/**
 * 上传文件
 */
const uploadFile = (rawFile: File) => {
  if (props.disabled) return;

  // 检查文件数量限制
  if (props.limit && fileList.value.length >= props.limit) {
    emit("exceed", [rawFile], fileList.value);
    return;
  }

  // 创建上传文件对象
  const uid = generateId();
  const file: UploadFile = {
    uid,
    name: rawFile.name,
    size: rawFile.size,
    status: "ready",
    percentage: 0,
    raw: rawFile
  };

  // 添加文件到上传列表
  fileList.value.push(file);

  // 触发 change 事件
  emit("change", file, fileList.value);

  // 自动上传
  if (props.autoUpload) {
    upload(file);
  }
};

/**
 * 开始上传文件
 */
const upload = (file: UploadFile) => {
  if (!file.raw || file.status === "success") return;

  // 更新文件状态
  const updateFileStatus = (uid: number | string, status: "uploading" | "success" | "fail", data?: any) => {
    const fileIdx = fileList.value.findIndex(item => item.uid === uid);
    if (fileIdx > -1) {
      const targetFile = fileList.value[fileIdx];
      fileList.value[fileIdx] = {
        ...targetFile,
        status,
        ...data
      };
    }
  };

  // 设置上传中状态
  updateFileStatus(file.uid, "uploading");

  // 创建 FormData
  const formData = new FormData();
  formData.append(props.name, file.raw);

  // 添加额外数据
  if (props.data) {
    Object.keys(props.data).forEach(key => {
      formData.append(key, props.data![key]);
    });
  }

  // 创建 XHR 请求
  const xhr = new XMLHttpRequest();
  xhr.open("post", props.action, true);

  // 设置请求头
  if (props.headers) {
    Object.keys(props.headers).forEach(key => {
      xhr.setRequestHeader(key, props.headers![key]);
    });
  }

  // 跨域请求是否携带 cookie
  xhr.withCredentials = props.withCredentials;

  // 进度处理
  xhr.upload.addEventListener("progress", e => {
    if (e.total > 0) {
      const percentage = Math.round((e.loaded * 100) / e.total);
      updateFileStatus(file.uid, "uploading", { percentage });
      emit("progress", { ...file, percentage }, percentage);
    }
  });

  // 请求完成处理
  xhr.onload = function () {
    if (xhr.status < 200 || xhr.status >= 300) {
      // 请求失败
      const error = new Error(`Upload request failed with status code ${xhr.status}`);
      updateFileStatus(file.uid, "fail", { error });
      emit("error", { ...file, error }, error);
    } else {
      // 请求成功
      try {
        const response = JSON.parse(xhr.responseText);
        updateFileStatus(file.uid, "success", { response, url: response.url });
        emit("success", { ...file, response }, response);
        emit("change", { ...file, response }, fileList.value);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Upload failed with unknown error");
        updateFileStatus(file.uid, "fail", { error });
        emit("error", { ...file, error }, error);
      }
    }
  };

  // 请求错误处理
  xhr.onerror = function () {
    const error = new Error("Network error");
    updateFileStatus(file.uid, "fail", { error });
    emit("error", { ...file, error }, error);
  };

  // 发送请求
  xhr.send(formData);
};

/**
 * 提交所有待上传文件
 */
const submit = () => {
  if (props.disabled) return;

  fileList.value.filter(file => file.status === "ready").forEach(file => upload(file));
};

/**
 * 点击drag区域出发上次文件
 */
const handleDragClick = () => {
  if (!props.disabled) inputRef.value?.click();
};

/**
 * 清空文件列表
 */
const clearFiles = () => {
  if (props.disabled) return;
  fileList.value = [];
  emit("change", null, fileList.value);
};

/**
 * 处理点击上传
 */
const handleClick = () => {
  if (props.disabled) return;
  // 只有在非拖拽模式下才触发文件选择
  if (!props.drag) {
    inputRef.value?.click();
  }
};

/**
 * 处理文件选择变更
 */
const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = Array.from(target.files || []);

  if (files.length === 0) return;

  // 超出数量限制
  if (props.limit && fileList.value.length + files.length > props.limit) {
    emit("exceed", files, fileList.value);
    return;
  }

  // 上传所选文件
  files.forEach(file => uploadFile(file));

  // 重置 input
  if (inputRef.value) {
    inputRef.value.value = "";
  }
};

/**
 * 处理移除文件
 */
const handleRemove = (file: UploadFile) => {
  const fileIndex = fileList.value.findIndex(item => item.uid === file.uid);
  if (fileIndex > -1) {
    fileList.value.splice(fileIndex, 1);
    emit("remove", file, fileList.value);
  }
};

/**
 * 处理预览文件
 */
const handlePreview = (data: any) => {
  if (data.previewList && data.previewList.length > 0) {
    // 处理图片预览列表
    emit("preview", {
      file: data.file,
      previewSrcList: data.previewList,
      initialIndex: data.index
    });
  } else {
    // 直接预览单个文件
    emit("preview", data.file || data);
  }
};

/**
 * 处理拖拽上传
 */
const handleDrop = (files: FileList) => {
  if (props.disabled) return;
  const uploadFileList = Array.from(files);

  // 超出数量限制
  if (props.limit && fileList.value.length + uploadFileList.length > props.limit) {
    emit("exceed", uploadFileList, fileList.value);
    return;
  }

  // 上传所选文件
  uploadFileList.forEach(file => uploadFile(file));
};

// 提供外部方法
defineExpose({
  submit,
  clearFiles
});

// 提供上下文给子组件
provide<UploadContextType>(uploadKey, {
  fileList: fileList.value,
  listType: props.listType,
  disabled: props.disabled,
  handleRemove,
  handlePreview
});

// 提供上下文给拖拽组件
provide<UploadDraggerContextType>(uploadDraggerKey, {
  ...props,
  handleDrop
});
</script>
