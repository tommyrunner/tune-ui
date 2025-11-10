<template>
  <div class="breadcrumb-demo">
    <div class="demo-row">
      <span class="label">Default Separator:</span>
      <t-breadcrumb :options="options" />
    </div>
    <div class="demo-row">
      <span class="label">Custom Icon:</span>
      <t-breadcrumb :options="options" separated-icon="right" />
    </div>
    <div class="demo-row">
      <span class="label">Other Icon:</span>
      <t-breadcrumb :options="options" separated-icon="double-right" />
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
  width: 100px;
  font-size: 14px;
  color: #606266;
}
</style>
