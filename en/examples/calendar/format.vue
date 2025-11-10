<template>
  <div class="example-container">
    <div class="format-item">
      <h4>Date Format (YYYY-MM-DD)</h4>
      <t-calendar v-model="formattedDate" value-format="YYYY-MM-DD" />
    </div>
    
    <div class="format-item">
      <h4>DateTime Format (YYYY-MM-DD HH:mm:ss)</h4>
      <t-calendar v-model="formattedDateTime" show-time value-format="YYYY-MM-DD HH:mm:ss" />
    </div>
    
    <div class="format-item">
      <h4>Custom Format (DD/MM/YYYY)</h4>
      <t-calendar v-model="formattedCustom" value-format="DD/MM/YYYY" />
    </div>
    
    <div class="value-display">
      <p>Date Format: {{ formattedDate }} <span class="type-info">(Type: {{ typeof formattedDate }})</span></p>
      <p>DateTime Format: {{ formattedDateTime }} <span class="type-info">(Type: {{ typeof formattedDateTime }})</span></p>
      <p>Custom Format: {{ formattedCustom }} <span class="type-info">(Type: {{ typeof formattedCustom }})</span></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";


// Initialize different format dates
const formattedDate = ref("2023-07-15");
const formattedDateTime = ref("2023-07-15 12:30:00");
const formattedCustom = ref("15/07/2023");
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.format-item {
  margin-bottom: 20px;
}

.format-item h4 {
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
}

.value-display {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
}

.type-info {
  color: #909399;
  font-size: 12px;
}
</style> 