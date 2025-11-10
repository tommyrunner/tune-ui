<template>
  <div class="upload-demo">
    <t-upload ref="uploadRef" action="http://rap2api.taobao.org/app/mock/322878/upload" :auto-upload="false">
      <t-button type="primary">Select Files</t-button>
      <template #tip>
        <div class="upload-tip">Please select files first, then click the button below to start uploading</div>
      </template>
    </t-upload>
    <div class="upload-actions">
      <t-button type="success" @click="submitUpload">Start Upload</t-button>
      <t-button @click="clearFiles">Clear Files</t-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


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
