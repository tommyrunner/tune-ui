<template>
  <div class="upload-demo">
    <t-upload ref="uploadRef" action="http://rap2api.taobao.org/app/mock/322878/upload" :auto-upload="false">
      <t-button type="primary">选择文件</t-button>
      <template #tip>
        <div class="upload-tip">请先选择文件，然后点击下方按钮开始上传</div>
      </template>
    </t-upload>
    <div class="upload-actions">
      <t-button type="success" @click="submitUpload">开始上传</t-button>
      <t-button @click="clearFiles">清空文件</t-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TUpload, TButton } from "tune-ui";

const uploadRef = ref();

const submitUpload = () => {
  uploadRef.value?.submit();
};

const clearFiles = () => {
  uploadRef.value?.clearFiles();
};
</script>

<style scoped>
.upload-demo {
  width: 100%;
}

.upload-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #606266;
}

.upload-actions {
  margin-top: 16px;
  display: flex;
  gap: 10px;
}
</style>
