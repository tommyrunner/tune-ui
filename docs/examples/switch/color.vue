<template>
  <div class="switch-demo">
    <div class="switch-item">
      <div class="style-label">自定义开启颜色：</div>
      <t-switch v-model="switchOn" onBgColor="#8B5CF6"></t-switch>
    </div>
    <div class="switch-item">
      <div class="style-label">自定义关闭颜色：</div>
      <t-switch v-model="switchOff" offBgColor="#F59E0B"></t-switch>
    </div>
    <div class="switch-item">
      <div class="style-label">同时自定义开启和关闭颜色：</div>
      <t-switch v-model="switchCustom" onBgColor="#10B981" offBgColor="#F43F5E"></t-switch>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TSwitch } from "tune-ui";

const switchOn = ref(true);
const switchOff = ref(false);
const switchCustom = ref(true);
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
