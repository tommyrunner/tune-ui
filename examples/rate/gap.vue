<template>
  <div class="demo-rate">
    <div class="gap-item">
      <p class="gap-label">小间距 (2px)</p>
      <t-rate v-model="value" :gap="2" />
    </div>

    <div class="gap-item">
      <p class="gap-label">默认间距 (5px)</p>
      <t-rate v-model="value" :gap="5" />
    </div>

    <div class="gap-item">
      <p class="gap-label">大间距 (15px)</p>
      <t-rate v-model="value" :gap="15" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const value = ref(3);
</script>

<style scoped>
.demo-rate {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.gap-item {
  margin-bottom: 16px;
}

.gap-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}
</style>
