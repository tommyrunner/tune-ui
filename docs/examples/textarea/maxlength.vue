<template>
  <div class="textarea-demo">
    <div class="textarea-item">
      <div class="textarea-label">显示光标行数（默认）：</div>
      <t-textarea v-model="textValue" :maxLength="50" placeholder="最多输入50个字符" />
    </div>
    <div class="textarea-item">
      <div class="textarea-label">不显示光标行数：</div>
      <t-textarea v-model="textValue" :maxLength="50" :isCursor="false" placeholder="最多输入50个字符" />
    </div>
    <div class="value-display">当前长度：{{ textValue.length }}/50</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TTextarea } from "tune-ui";

const textValue = ref("");
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
}

.t-textarea {
  width: 320px;
}
</style>
