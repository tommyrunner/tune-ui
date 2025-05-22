<template>
  <div class="switch-demo">
    <div class="switch-item">
      <div class="style-label">默认圆形样式：</div>
      <t-switch v-model="switchDefault" radius="default"></t-switch>
    </div>
    <div class="switch-item">
      <div class="style-label">方形样式：</div>
      <t-switch v-model="switchSquare" radius="square"></t-switch>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const switchDefault = ref(true);
const switchSquare = ref(true);
</script>

<style scoped>
.switch-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.switch-item {
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
