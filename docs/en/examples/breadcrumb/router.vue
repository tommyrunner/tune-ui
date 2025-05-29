<template>
  <div class="breadcrumb-demo">
    <t-breadcrumb :options="options" />
    <div class="demo-result">
      <p>Current clicked route: {{ currentRoute }}</p>
      <p class="tip">Note: Actual navigation is disabled in documentation</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentRoute = ref("Not clicked");

const options = ref([
  {
    label: "Home",
    value: "home",
    to: { path: "/" }
  },
  {
    label: "Product Center",
    value: "products",
    to: { path: "/products" }
  },
  {
    label: "Electronics",
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
