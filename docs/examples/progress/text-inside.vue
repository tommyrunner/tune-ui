<template>
  <div class="progress-demo">
    <div class="progress-row">
      <t-progress :percentage="50" text-inside :stroke-width="18"></t-progress>
    </div>
    <div class="progress-row">
      <t-progress :percentage="100" text-inside status="success" :stroke-width="18"></t-progress>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" text-inside status="warning" :stroke-width="18"></t-progress>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" text-inside status="exception" :stroke-width="18"></t-progress>
    </div>
  </div>
</template>

<script setup>
import { TProgress } from "tune-ui";
</script>

<style scoped>
.progress-demo {
  width: 100%;
}

.progress-row {
  margin-bottom: 15px;
}
</style> 