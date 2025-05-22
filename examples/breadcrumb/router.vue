<template>
  <div class="breadcrumb-demo">
    <t-breadcrumb :options="options" />
    <div class="demo-result">
      <p>当前点击的路由: {{ currentRoute }}</p>
      <p class="tip">注：实际跳转功能在文档中被禁用</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentRoute = ref("未点击");

const options = ref([
  {
    label: "首页",
    value: "home",
    to: { path: "/" }
  },
  {
    label: "产品中心",
    value: "products",
    to: { path: "/products" }
  },
  {
    label: "电子设备",
    value: "electronics",
    to: { path: "/products/electronics" }
  }
]);

const handleChange = item => {
  currentRoute.value = JSON.stringify(item.to);
};
</script>

<style scoped>
.breadcrumb-demo {
  padding: 16px 0;
}
.demo-result {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
}
.tip {
  font-size: 12px;
  color: #909399;
  font-style: italic;
}
</style>
