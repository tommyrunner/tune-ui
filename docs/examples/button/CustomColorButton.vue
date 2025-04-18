<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button color="#626aef">自定义颜色</t-button>
      <t-button color="#626aef" plain>自定义颜色</t-button>
      <t-button color="#626aef" disabled>自定义颜色</t-button>
    </div>

    <div class="button-row">
      <t-button color="rgba(100, 108, 255, 0.8)">自定义颜色</t-button>
      <t-button color="rgba(100, 108, 255, 0.8)" plain>自定义颜色</t-button>
      <t-button color="rgba(100, 108, 255, 0.8)" disabled>自定义颜色</t-button>
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
