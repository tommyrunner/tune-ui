<template>
  <div class="progress-demo">
    <div class="progress-row">
      <t-progress :percentage="0"></t-progress>
    </div>
    <div class="progress-row">
      <t-progress :percentage="25"></t-progress>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50"></t-progress>
    </div>
    <div class="progress-row">
      <t-progress :percentage="75"></t-progress>
    </div>
    <div class="progress-row">
      <t-progress :percentage="100"></t-progress>
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
