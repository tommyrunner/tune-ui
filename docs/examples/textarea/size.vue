<template>
  <div class="textarea-demo">
    <div class="textarea-item">
      <div class="textarea-label">小尺寸：</div>
      <t-textarea size="small" placeholder="小尺寸文本域" />
    </div>
    <div class="textarea-item">
      <div class="textarea-label">默认尺寸：</div>
      <t-textarea size="default" placeholder="默认尺寸文本域" />
    </div>
    <div class="textarea-item">
      <div class="textarea-label">大尺寸：</div>
      <t-textarea size="large" placeholder="大尺寸文本域" />
    </div>
  </div>
</template>

<script setup>
import { TTextarea } from "tune-ui";
</script>

<style scoped>
.textarea-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.textarea-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.textarea-label {
  font-size: 14px;
  color: #4b5563;
}

.t-textarea {
  width: 320px;
}
</style>
