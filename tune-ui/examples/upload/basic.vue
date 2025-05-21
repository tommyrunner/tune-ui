<template>
  <div class="upload-demo">
    <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" :on-success="handleSuccess">
      <t-button type="primary">点击上传</t-button>
      <template #tip>
        <div class="upload-tip">支持 jpg、png、gif 格式文件，单个文件不超过 5MB</div>
      </template>
    </t-upload>
  </div>
</template>

<script setup>


const handleSuccess = (file, response) => {
  console.log("上传成功", file, response);
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
