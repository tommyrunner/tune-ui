<template>
  <div class="demo-rate">
    <div class="size-row">
      <div class="size-item">
        <p class="size-label">Small Size</p>
        <t-rate v-model="value" size="small" />
      </div>

      <div class="size-item">
        <p class="size-label">Default Size</p>
        <t-rate v-model="value" size="default" />
      </div>

      <div class="size-item">
        <p class="size-label">Large Size</p>
        <t-rate v-model="value" size="large" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const value = ref(3.5);
</script>

<style scoped>
.demo-rate {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.size-row {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.size-item {
  margin-bottom: 8px;
}

.size-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}
</style>
