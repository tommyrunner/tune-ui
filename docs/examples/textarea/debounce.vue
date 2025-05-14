<template>
  <div class="textarea-demo">
    <t-textarea v-model="textValue" :debounce="handleDebounce" :debounceDelay="1000" placeholder="输入后延迟1秒触发回调" />
    <div class="value-display">
      <div>实时值：{{ textValue }}</div>
      <div>防抖值（延迟1秒）：{{ debounceValue }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TTextarea } from "tune-ui";

const textValue = ref("");
const debounceValue = ref("");

/**
 * 处理防抖回调
 * @param {string} value - 输入值
 */
const handleDebounce = value => {
  debounceValue.value = value;
};
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
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.t-textarea {
  width: 320px;
}
</style>
