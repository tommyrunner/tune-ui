<template>
  <div class="example-container">
    <div class="row">
      <div class="item">
        <p>Date Time Picker:</p>
        <t-date-picker v-model="dateTime" show-time placeholder="Select date and time" />
      </div>

      <div class="item">
        <p>With Default Time:</p>
        <t-date-picker
          v-model="dateTimeWithDefault"
          show-time
          :default-time="{ hours: 9, minutes: 30, seconds: 0 }"
          placeholder="Default time 09:30:00"
        />
      </div>
    </div>

    <div class="row">
      <div class="item">
        <p>With Formatting:</p>
        <t-date-picker
          v-model="formattedDateTime"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="Formatted date time"
        />
        <div class="value-display">Current value: {{ formattedDateTime }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// Date time picker example data
const dateTime = ref(new Date());
const dateTimeWithDefault = ref(null);
const formattedDateTime = ref("2023-06-15 09:30:00");
</script>

<style lang="scss" scoped>
.example-container {
  width: 100%;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 20px;

  .item {
    flex: 1;
    min-width: 250px;

    p {
      margin-bottom: 8px;
      font-weight: 500;
    }
  }
}

.value-display {
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  font-family: monospace;
}
</style>
