<template>
  <div class="button-demo">
    <t-button type="primary" loading>加载中</t-button>
    <t-button type="primary" loading-icon="loading" loading>加载中</t-button>
    <t-button type="primary" :loading="loading" @click="onClick">点击加载</t-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TButton } from "tune-ui";

const loading = ref(false);

const onClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<style scoped>
.button-demo {
  padding: 16px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
