<template>
  <div class="textarea-demo">
    <t-textarea v-model="textValue" placeholder="请输入内容" />
    <div class="value-display">当前值: {{ textValue }}</div>
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
  gap: 16px;
}

.value-display {
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
  max-height: 200px;
  overflow: auto;
}

.t-textarea {
  width: 320px;
}
</style>
