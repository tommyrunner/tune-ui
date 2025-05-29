<template>
  <div class="example-container">
    <div class="time-item">
      <h4>With Time Picker</h4>
      <t-calendar v-model="dateTime" show-time value-format="YYYY-MM-DD HH:mm:ss" />
    </div>
    
    <div class="time-item">
      <h4>Disabled Time View (Auto sync current time)</h4>
      <t-calendar v-model="dateTimeDisabled" show-time :disabled-time-view="true" value-format="YYYY-MM-DD HH:mm:ss" />
    </div>
    
    <div class="time-item">
      <h4>Enabled Time View (Manual time selection)</h4>
      <t-calendar v-model="dateTimeEnabled" show-time :disabled-time-view="false" value-format="YYYY-MM-DD HH:mm:ss" />
    </div>
    
    <div class="value-display">
      <p>With Time Picker: {{ dateTime }}</p>
      <p>Disabled Time View: {{ dateTimeDisabled }}</p>
      <p>Enabled Time View: {{ dateTimeEnabled }}</p>
      <div class="time-tip">
        <div>Description:</div>
        <div>- Disabled Time View: No time selection panel after clicking date, uses current system time</div>
        <div>- Enabled Time View: Shows time selection panel after clicking date, allows manual time selection</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";


// Initialize with current time
const now = new Date();
const formatNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

const dateTime = ref(formatNow);
const dateTimeDisabled = ref(formatNow);
const dateTimeEnabled = ref(formatNow);
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.time-item {
  margin-bottom: 20px;
}

.time-item h4 {
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

.time-tip {
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px dashed #e0e0e0;
  font-size: 12px;
  color: #909399;
}
</style> 