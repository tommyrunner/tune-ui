<template>
  <div class="breadcrumb-demo">
    <div class="demo-row">
      <span class="label">默认间距 (gap=6)：</span>
      <t-breadcrumb :options="options" />
    </div>
    <div class="demo-row">
      <span class="label">大间距 (gap=16)：</span>
      <t-breadcrumb :options="options" :gap="16" />
    </div>
    <div class="demo-row">
      <span class="label">小间距 (gap=2)：</span>
      <t-breadcrumb :options="options" :gap="2" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const options = ref([
  { label: "首页", value: "home" },
  { label: "产品中心", value: "products" },
  { label: "电子设备", value: "electronics" }
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
