<template>
  <div class="upload-demo">
    <div class="slot-item">
      <h4>默认插槽（触发按钮）</h4>
      <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload">
        <template #default>
          <div class="custom-trigger">
            <t-icon icon="upload-to" size="24" />
            <span>点击上传文件</span>
          </div>
        </template>
      </t-upload>
    </div>

    <div class="slot-item">
      <h4>拖拽区域插槽（drag）</h4>
      <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" drag>
        <template #drag>
          <div class="custom-drag-area">
            <t-icon icon="cloud-upload" size="32" />
            <div class="drag-text">拖拽文件或点击此区域</div>
          </div>
        </template>
      </t-upload>
    </div>

    <div class="slot-item">
      <h4>文件列表项插槽（file-item）</h4>
      <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" :file-list="fileList">
        <t-button type="primary">上传文件</t-button>
        <template #file-item="{ file }">
          <div class="custom-file-item">
            <t-icon :icon="getFileIcon(file)" size="16" />
            <span class="file-name">{{ file.name }}</span>
            <t-tag size="small" :type="getTagType(file.status)">
              {{ file.status }}
            </t-tag>
          </div>
        </template>
      </t-upload>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TUpload, TButton, TIcon, TTag } from "tune-ui";

// 示例文件列表
const fileList = ref([
  {
    uid: "1",
    name: "文档1.docx",
    status: "success",
    size: 1024
  },
  {
    uid: "2",
    name: "文档2.xlsx",
    status: "uploading",
    size: 2048
  },
  {
    uid: "3",
    name: "文档3.pdf",
    status: "fail",
    error: new Error("上传失败"),
    size: 3072
  }
]);

// 根据文件类型返回对应图标
const getFileIcon = file => {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf")) return "pdf";
  if (name.endsWith(".docx") || name.endsWith(".doc")) return "word";
  if (name.endsWith(".xlsx") || name.endsWith(".xls")) return "excel";
  if (name.endsWith(".pptx") || name.endsWith(".ppt")) return "ppt";
  if (name.endsWith(".jpg") || name.endsWith(".png") || name.endsWith(".gif")) return "image";
  return "file";
};

// 根据状态返回标签类型
const getTagType = status => {
  switch (status) {
    case "success":
      return "success";
    case "uploading":
      return "info";
    case "fail":
      return "danger";
    default:
      return "default";
  }
};
</script>

<style scoped>
.upload-demo {
  width: 100%;
}

.slot-item {
  margin-bottom: 24px;
}

h4 {
  margin: 0 0 8px;
  font-weight: 500;
}

.custom-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.custom-trigger:hover {
  border-color: var(--theme-color-primary);
  color: var(--theme-color-primary);
}

.custom-drag-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #606266;
}

.drag-text {
  margin-top: 10px;
  font-size: 14px;
}

.custom-file-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.file-name {
  margin: 0 8px;
  flex: 1;
}
</style>
