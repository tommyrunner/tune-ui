<template>
  <div class="date-picker-demo">
    <!-- Small size -->
    <div class="demo-item">
      <h4>Small Size (small)</h4>
      <t-date-picker-multiple v-model="smallSizeDates" size="small" :is-range="true" />
    </div>

    <!-- Default size -->
    <div class="demo-item">
      <h4>Default Size (default)</h4>
      <t-date-picker-multiple v-model="defaultSizeDates" size="default" :is-range="true" />
    </div>

    <!-- Large size -->
    <div class="demo-item">
      <h4>Large Size (large)</h4>
      <t-date-picker-multiple v-model="largeSizeDates" size="large" :is-range="true" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// State data
const smallSizeDates = ref([]);
const defaultSizeDates = ref([]);
const largeSizeDates = ref([]);
</script>

<style scoped>
.date-picker-demo {
  padding: 16px 0;
}

.demo-item {
  margin-bottom: 20px;
}

h4 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 500;
}
</style>
