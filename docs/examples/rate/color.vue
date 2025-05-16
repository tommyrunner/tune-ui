<template>
  <div class="demo-rate">
    <div class="color-item">
      <p class="color-label">默认颜色</p>
      <t-rate v-model="value1" />
    </div>

    <div class="color-item">
      <p class="color-label">自定义颜色</p>
      <t-rate
        v-model="value2"
        :color="{
          1: '#ff4d4f',
          2: '#faad14',
          3: '#52c41a',
          4: '#1890ff',
          5: '#722ed1'
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TRate } from "tune-ui";

const value1 = ref(3);
const value2 = ref(3);
</script>

<style scoped>
.demo-rate {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.color-item {
  margin-bottom: 16px;
}

.color-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}
</style>
