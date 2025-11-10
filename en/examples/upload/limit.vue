<template>
  <div class="upload-demo">
    <div class="limit-item">
      <h4>File Type Restriction (accept)</h4>
      <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" accept="image/*">
        <t-button type="primary">Images Only</t-button>
        <template #tip>
          <div class="upload-tip">Only jpg, png, gif and other image formats are allowed</div>
        </template>
      </t-upload>
    </div>

    <div class="limit-item">
      <h4>File Size Restriction (max-size)</h4>
      <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" :max-size="2" @exceed-size="handleExceedSize">
        <t-button type="primary">2MB Limit</t-button>
        <template #tip>
          <div class="upload-tip">Single file size cannot exceed 2MB</div>
        </template>
      </t-upload>
    </div>

    <div class="limit-item">
      <h4>Quantity Restriction (limit)</h4>
      <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" :limit="3" multiple @exceed="handleExceed">
        <t-button type="primary">Max 3 Files</t-button>
        <template #tip>
          <div class="upload-tip">Maximum 3 files can be uploaded</div>
        </template>
      </t-upload>
    </div>
  </div>
</template>

<script setup>
const handleExceedSize = file => {
  alert(`File ${file.name} exceeds 2MB limit`);
};

const handleExceed = files => {
  alert(`Maximum 3 files allowed, ${files.length} files selected`);
};
</script>

<style scoped>
.upload-demo {
  width: 100%;
}

.limit-item {
  margin-bottom: 20px;
}

h4 {
  margin: 0 0 8px;
  font-weight: 500;
}

.upload-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #606266;
}
</style>
