<template>
  <div class="upload-demo">
    <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" drag>
      <div class="upload-dragger-content">
        <t-icon icon="upload" size="28" />
        <div class="upload-text">Drag files here, or <em>click to upload</em></div>
        <div class="upload-hint">Support single or multiple file upload</div>
      </div>
    </t-upload>
  </div>
</template>

<style scoped>
.upload-demo {
  width: 100%;
}

.upload-dragger-content {
  padding: 30px 20px;
  text-align: center;
  color: #606266;
}

.upload-text {
  margin: 10px 0;
  font-size: 14px;
}

.upload-text em {
  color: var(--theme-color-primary);
  font-style: normal;
  font-weight: 500;
}

.upload-hint {
  font-size: 12px;
  color: #909399;
}
</style>
