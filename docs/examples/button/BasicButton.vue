<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button>默认按钮</t-button>
      <t-button type="primary">主要按钮</t-button>
      <t-button type="success">成功按钮</t-button>
      <t-button type="info">信息按钮</t-button>
      <t-button type="warning">警告按钮</t-button>
      <t-button type="danger">危险按钮</t-button>
    </div>

    <div class="button-row">
      <t-button plain>朴素按钮</t-button>
      <t-button type="primary" plain>主要按钮</t-button>
      <t-button type="success" plain>成功按钮</t-button>
      <t-button type="info" plain>信息按钮</t-button>
      <t-button type="warning" plain>警告按钮</t-button>
      <t-button type="danger" plain>危险按钮</t-button>
    </div>

    <div class="button-row">
      <t-button round>圆角按钮</t-button>
      <t-button type="primary" round>主要按钮</t-button>
      <t-button type="success" round>成功按钮</t-button>
      <t-button type="info" round>信息按钮</t-button>
      <t-button type="warning" round>警告按钮</t-button>
      <t-button type="danger" round>危险按钮</t-button>
    </div>

    <div class="button-row">
      <t-button circle icon="search" />
      <t-button type="primary" circle icon="edit" />
      <t-button type="success" circle icon="check" />
      <t-button type="info" circle icon="message" />
      <t-button type="warning" circle icon="star" />
      <t-button type="danger" circle icon="delete" />
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
