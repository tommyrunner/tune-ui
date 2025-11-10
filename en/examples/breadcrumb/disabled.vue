<template>
  <div class="breadcrumb-demo">
    <t-breadcrumb :options="options" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const options = ref([
  { label: "Home", value: "home" },
  { label: "Product Center", value: "products", disabled: true },
  { label: "Electronics", value: "electronics" },
  { label: "Smartphones", value: "smartphones" }
]);
</script>

<style scoped>
.breadcrumb-demo {
  padding: 16px 0;
}
</style>
