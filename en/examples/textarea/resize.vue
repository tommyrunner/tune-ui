<template>
  <div class="textarea-demo">
    <div class="textarea-item">
      <div class="textarea-label">Resizable (default):</div>
      <t-textarea placeholder="Can drag bottom-right corner to resize" />
    </div>

    <div class="textarea-item">
      <div class="textarea-label">Disable resize:</div>
      <t-textarea :isResize="false" placeholder="Cannot resize" />
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
