<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button loading>加载中</t-button>
      <t-button type="primary" loading>加载中</t-button>
      <t-button type="success" loading>加载中</t-button>
      <t-button type="info" loading>加载中</t-button>
    </div>
    <div class="button-row">
      <t-button :loading="loading" @click="startLoading">点击加载</t-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TButton } from "tune-ui";

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
