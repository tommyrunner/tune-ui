<template>
  <div class="breadcrumb-demo">
    <t-breadcrumb :options="options" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const options = ref([
  { label: "首页", value: "home", icon: "home" },
  { label: "产品中心", value: "products", icon: "category" },
  { label: "电子设备", value: "electronics", icon: "device" },
  { label: "智能手机", value: "smartphones", icon: "mobile" }
]);
</script>

<style scoped>
.breadcrumb-demo {
  padding: 16px 0;
}
</style>
