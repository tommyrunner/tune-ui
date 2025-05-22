<template>
  <div class="textarea-demo">
    <div class="textarea-item">
      <div class="textarea-label">允许换行（默认）：</div>
      <t-textarea v-model="enterValue" placeholder="可以使用回车键换行" />
      <div class="value-display">当前值：{{ enterValue }}</div>
    </div>
    <div class="textarea-item">
      <div class="textarea-label">禁止换行：</div>
      <t-textarea v-model="noEnterValue" :isEnter="false" placeholder="无法使用回车键换行" />
      <div class="value-display">当前值：{{ noEnterValue }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const enterValue = ref("");
const noEnterValue = ref("");
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

.value-display {
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
  max-height: 120px;
  overflow: auto;
  white-space: pre-wrap;
}

.t-textarea {
  width: 320px;
}
</style>
