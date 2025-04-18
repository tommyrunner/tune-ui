<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button disabled>默认按钮</t-button>
      <t-button type="primary" disabled>主要按钮</t-button>
      <t-button type="success" disabled>成功按钮</t-button>
      <t-button type="info" disabled>信息按钮</t-button>
      <t-button type="warning" disabled>警告按钮</t-button>
      <t-button type="danger" disabled>危险按钮</t-button>
    </div>

    <div class="button-row">
      <t-button plain disabled>朴素按钮</t-button>
      <t-button type="primary" plain disabled>主要按钮</t-button>
      <t-button type="success" plain disabled>成功按钮</t-button>
      <t-button type="info" plain disabled>信息按钮</t-button>
      <t-button type="warning" plain disabled>警告按钮</t-button>
      <t-button type="danger" plain disabled>危险按钮</t-button>
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
