<template>
  <div class="demo-select">
    <div class="size-row">
      <div class="size-item">
        <p class="size-label">Small Size</p>
        <t-select v-model="value" :options="options" size="small" placeholder="Please select" />
      </div>

      <div class="size-item">
        <p class="size-label">Default Size</p>
        <t-select v-model="value" :options="options" size="default" placeholder="Please select" />
      </div>

      <div class="size-item">
        <p class="size-label">Large Size</p>
        <t-select v-model="value" :options="options" size="large" placeholder="Please select" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" }
];
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.size-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.size-item {
  min-width: 200px;
}

.size-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}
</style>
