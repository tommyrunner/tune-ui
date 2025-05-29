<template>
  <div class="textarea-demo">
    <div class="textarea-item">
      <div class="textarea-label">Small size:</div>
      <t-textarea size="small" placeholder="Small size textarea" />
    </div>
    <div class="textarea-item">
      <div class="textarea-label">Default size:</div>
      <t-textarea size="default" placeholder="Default size textarea" />
    </div>
    <div class="textarea-item">
      <div class="textarea-label">Large size:</div>
      <t-textarea size="large" placeholder="Large size textarea" />
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
