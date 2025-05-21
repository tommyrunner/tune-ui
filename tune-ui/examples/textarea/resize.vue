<template>
  <div class="textarea-demo">
    <div class="textarea-item">
      <div class="textarea-label">可调整大小（默认）：</div>
      <t-textarea placeholder="可以拖动右下角调整大小" />
    </div>

    <div class="textarea-item">
      <div class="textarea-label">禁止调整大小：</div>
      <t-textarea :isResize="false" placeholder="无法调整大小" />
    </div>
  </div>
</template>

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
