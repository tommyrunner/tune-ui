<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button prefixIcon="search">搜索</t-button>
      <t-button suffixIcon="left-arrow">返回</t-button>
      <t-button prefixIcon="edit" suffixIcon="delete">编辑</t-button>
    </div>
  </div>
</template>

<script setup>
import { TButton } from "tune-ui";
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
