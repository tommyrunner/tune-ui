<template>
  <div class="checkbox-demo">
    <div class="checkbox-item">
      <div class="style-label">默认方形样式：</div>
      <t-checkbox v-model="checked1" radius="square">方形复选框</t-checkbox>
    </div>
    <div class="checkbox-item">
      <div class="style-label">圆形样式：</div>
      <t-checkbox v-model="checked2" radius="default">圆形复选框</t-checkbox>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TCheckbox } from "tune-ui";

const checked1 = ref(true);
const checked2 = ref(true);
</script>

<style scoped>
.checkbox-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.checkbox-item {
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
