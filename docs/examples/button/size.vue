<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button size="small">小型按钮</t-button>
      <t-button>默认按钮</t-button>
      <t-button size="large">大型按钮</t-button>
    </div>
    <div class="button-row">
      <t-button size="small" type="primary">小型按钮</t-button>
      <t-button type="primary">默认按钮</t-button>
      <t-button size="large" type="primary">大型按钮</t-button>
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
  align-items: center;
}
</style>
