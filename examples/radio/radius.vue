<template>
  <div class="radio-demo">
    <div class="radio-item">
      <div class="style-label">圆形样式 (默认):</div>
      <t-radio v-model="radioValue1" :value="true" radius="default">圆形单选框</t-radio>
    </div>
    <div class="radio-item">
      <div class="style-label">方形样式:</div>
      <t-radio v-model="radioValue2" :value="true" radius="square">方形单选框</t-radio>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const radioValue1 = ref(true);
const radioValue2 = ref(true);
</script>

<style scoped>
.radio-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.radio-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.style-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 4px;
}
</style>
