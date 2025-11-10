<template>
  <div class="breadcrumb-demo">
    <div class="demo-row">
      <span class="label">Default Gap (gap=6):</span>
      <t-breadcrumb :options="options" />
    </div>
    <div class="demo-row">
      <span class="label">Large Gap (gap=16):</span>
      <t-breadcrumb :options="options" :gap="16" />
    </div>
    <div class="demo-row">
      <span class="label">Small Gap (gap=2):</span>
      <t-breadcrumb :options="options" :gap="2" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const options = ref([
  { label: "Home", value: "home" },
  { label: "Product Center", value: "products" },
  { label: "Electronics", value: "electronics" }
]);
</script>

<style scoped>
.breadcrumb-demo {
  padding: 16px 0;
}
.demo-row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.label {
  width: 150px;
  font-size: 14px;
  color: #606266;
}
</style>
