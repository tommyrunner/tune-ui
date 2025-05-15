<template>
  <div class="demo-rate">
    <div class="icon-item">
      <p class="icon-label">自定义图标示例1</p>
      <t-rate
        v-model="value1"
        :icon="{
          empty: 'plus-circle',
          half: 'message',
          show: 'star'
        }"
      />
    </div>

    <div class="icon-item">
      <p class="icon-label">自定义图标示例2</p>
      <t-rate
        v-model="value2"
        :icon="{
          empty: 'alert',
          half: 'upload-to',
          show: 'success'
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TRate } from "tune-ui";

const value1 = ref(2.5);
const value2 = ref(3);
</script>

<style scoped>
.demo-rate {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.icon-item {
  margin-bottom: 16px;
}

.icon-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}
</style>
