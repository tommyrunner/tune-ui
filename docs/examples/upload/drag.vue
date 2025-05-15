<template>
  <div class="upload-demo">
    <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" drag>
      <div class="upload-dragger-content">
        <t-icon icon="upload" size="28" />
        <div class="upload-text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="upload-hint">支持单个或多个文件上传</div>
      </div>
    </t-upload>
  </div>
</template>

<script setup>
import { TUpload, TIcon } from "tune-ui";
</script>

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
