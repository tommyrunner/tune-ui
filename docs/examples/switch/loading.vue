<template>
  <div class="switch-demo">
    <div class="switch-row">
      <span class="label">加载中开启状态：</span>
      <t-switch v-model="switchOn" loading></t-switch>
    </div>
    <div class="switch-row">
      <span class="label">加载中关闭状态：</span>
      <t-switch v-model="switchOff" loading></t-switch>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TSwitch } from "tune-ui";

const switchOn = ref(true);
const switchOff = ref(false);
</script>

<style scoped>
.switch-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.switch-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.label {
  font-size: 14px;
  color: #4b5563;
  width: 120px;
}
</style>
