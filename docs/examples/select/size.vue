<template>
  <div class="demo-select">
    <div class="size-row">
      <div class="size-item">
        <p class="size-label">小尺寸</p>
        <t-select v-model="value" :options="options" size="small" placeholder="请选择" />
      </div>

      <div class="size-item">
        <p class="size-label">默认尺寸</p>
        <t-select v-model="value" :options="options" size="default" placeholder="请选择" />
      </div>

      <div class="size-item">
        <p class="size-label">大尺寸</p>
        <t-select v-model="value" :options="options" size="large" placeholder="请选择" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TSelect } from "tune-ui";

const value = ref("");

const options = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" }
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
