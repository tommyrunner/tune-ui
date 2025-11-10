<template>
  <div class="upload-demo">
    <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" :on-success="handleSuccess">
      <t-button type="primary">Click to Upload</t-button>
      <template #tip>
        <div class="upload-tip">Support jpg, png, gif format files, single file not exceeding 5MB</div>
      </template>
    </t-upload>
  </div>
</template>

<script setup>
const handleSuccess = (file, response) => {
  console.log("Upload successful", file, response);
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
</style>
