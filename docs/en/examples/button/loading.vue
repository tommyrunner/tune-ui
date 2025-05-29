<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button loading>Loading</t-button>
      <t-button type="primary" loading>Loading</t-button>
      <t-button type="success" loading>Loading</t-button>
      <t-button type="info" loading>Loading</t-button>
    </div>
    <div class="button-row">
      <t-button :loading="loading" @click="startLoading">Click to Load</t-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const loading = ref(false);

const startLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<style scoped>
.button-demo {
  padding: 16px 0;
}
.button-row {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
