<template>
  <div class="upload-demo">
    <h4>Custom Upload Implementation (http-request)</h4>
    <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" :http-request="customUpload">
      <t-button type="primary">Custom Upload</t-button>
      <template #tip>
        <div class="upload-tip">Implement upload logic through custom uploadRequest method</div>
      </template>
    </t-upload>

    <h4>Custom Additional Data (data)</h4>
    <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" :data="{ type: 'custom', userId: 123 }">
      <t-button type="primary">Additional Data</t-button>
      <template #tip>
        <div class="upload-tip">Additional parameters will be attached during upload</div>
      </template>
    </t-upload>
  </div>
</template>

<script setup>
// Custom upload implementation
const customUpload = async options => {
  const { file, onProgress, onSuccess, onError } = options;

  try {
    // Simulate upload progress
    for (let percent = 0; percent <= 100; percent += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      onProgress(percent);
    }

    // Simulate upload success
    setTimeout(() => {
      onSuccess({
        url: URL.createObjectURL(file),
        name: file.name,
        status: "success"
      });
    }, 500);
  } catch (error) {
    onError(error);
  }
};
</script>

<style scoped>
.upload-demo {
  width: 100%;
}

h4 {
  margin: 16px 0 8px;
  font-weight: 500;
}

.upload-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #606266;
}
</style>
