<template>
  <div class="example-container">
    <div class="row">
      <div class="item">
        <p>Default Date Format:</p>
        <t-date-picker v-model="defaultDate" placeholder="Default display format" />
      </div>

      <div class="item">
        <p>Custom Display Format:</p>
        <t-date-picker v-model="formattedDisplayDate" format="DD MMM YYYY" placeholder="Custom display format" />
      </div>
    </div>

    <div class="row">
      <div class="item">
        <p>Value Formatted as String:</p>
        <t-date-picker v-model="stringValueDate" value-format="YYYY-MM-DD" placeholder="Value formatted as string" />
        <div class="value-display">Current value: {{ typeof stringValueDate }} {{ stringValueDate }}</div>
      </div>

      <div class="item">
        <p>Value Formatted as Timestamp:</p>
        <t-date-picker v-model="timestampValueDate" value-format="timestamp" placeholder="Value formatted as timestamp" />
        <div class="value-display">Current value: {{ typeof timestampValueDate }} {{ timestampValueDate }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// Format example data
const defaultDate = ref(new Date());
const formattedDisplayDate = ref(new Date());
const stringValueDate = ref("2023-06-15");
const timestampValueDate = ref(1686816000000); // Corresponds to 2023-06-15
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
