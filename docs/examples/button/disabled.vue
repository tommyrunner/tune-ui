<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button disabled>禁用按钮</t-button>
      <t-button type="primary" disabled>禁用主要按钮</t-button>
      <t-button type="success" disabled>禁用成功按钮</t-button>
      <t-button type="info" disabled>禁用信息按钮</t-button>
      <t-button type="warning" disabled>禁用警告按钮</t-button>
      <t-button type="danger" disabled>禁用危险按钮</t-button>
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
