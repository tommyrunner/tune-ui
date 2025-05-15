<template>
  <div class="breadcrumb-demo">
    <div class="demo-row">
      <span class="label">默认分隔符：</span>
      <t-breadcrumb :options="options" />
    </div>
    <div class="demo-row">
      <span class="label">自定义图标：</span>
      <t-breadcrumb :options="options" separated-icon="right" />
    </div>
    <div class="demo-row">
      <span class="label">其他图标：</span>
      <t-breadcrumb :options="options" separated-icon="double-right" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TBreadcrumb } from "tune-ui";

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
  width: 100px;
  font-size: 14px;
  color: #606266;
}
</style> 