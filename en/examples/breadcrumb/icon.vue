<template>
  <div class="breadcrumb-demo">
    <t-breadcrumb :options="options" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const options = ref([
  { label: "Home", value: "home", icon: "home" },
  { label: "Product Center", value: "products", icon: "category" },
  { label: "Electronics", value: "electronics", icon: "device" },
  { label: "Smartphones", value: "smartphones", icon: "mobile" }
]);
</script>

<style scoped>
.breadcrumb-demo {
  padding: 16px 0;
}
</style>
