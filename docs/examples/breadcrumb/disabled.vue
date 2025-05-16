<template>
  <div class="breadcrumb-demo">
    <t-breadcrumb :options="options" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TBreadcrumb } from "tune-ui";

const options = ref([
  { label: "首页", value: "home" },
  { label: "产品中心", value: "products", disabled: true },
  { label: "电子设备", value: "electronics" },
  { label: "智能手机", value: "smartphones" }
]);
</script>

<style scoped>
.breadcrumb-demo {
  padding: 16px 0;
}
</style> 