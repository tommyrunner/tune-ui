<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button size="large">大型按钮</t-button>
      <t-button>默认按钮</t-button>
      <t-button size="small">小型按钮</t-button>
      <t-button size="mini">迷你按钮</t-button>
    </div>

    <div class="button-row">
      <t-button size="large" round>大型按钮</t-button>
      <t-button round>默认按钮</t-button>
      <t-button size="small" round>小型按钮</t-button>
      <t-button size="mini" round>迷你按钮</t-button>
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
