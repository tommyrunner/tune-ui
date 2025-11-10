<template>
  <div class="demo-select">
    <div class="custom-row">
      <div class="custom-item">
        <p class="custom-label">Custom Prefix Icon</p>
        <t-select v-model="value" :options="options" placeholder="Please select user">
          <template #prefix>
            <t-icon icon="search" />
          </template>
        </t-select>
      </div>

      <div class="custom-item">
        <p class="custom-label">Custom Option Content</p>
        <t-select v-model="customValue" :options="userOptions" placeholder="Select user">
          <template #default="data">
            <div class="user-option">
              <t-icon icon="user" />
              <span class="user-name">{{ data?.row?.label }}</span>
              <span class="user-id">ID: {{ data?.row?.value }}</span>
            </div>
          </template>
        </t-select>
      </div>
    </div>

    <div class="custom-item">
      <p class="custom-label">Custom Empty State</p>
      <t-select v-model="emptyValue" :options="[]" empty-text="No options available" placeholder="Empty state example">
        <template #empty>
          <div class="empty-content">
            <t-icon icon="alert" color="#f59e0b" :size="18" />
            <span>No data available, please add options</span>
          </div>
        </template>
      </t-select>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
const customValue = ref("");
const emptyValue = ref("");

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" }
];

const userOptions = [
  { label: "John Doe", value: "johndoe" },
  { label: "Jane Smith", value: "janesmith" },
  { label: "Bob Johnson", value: "bobjohnson" },
  { label: "Alice Brown", value: "alicebrown" }
];
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.custom-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.custom-item {
  min-width: 220px;
  margin-bottom: 12px;
}

.custom-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}

.user-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  font-weight: 500;
}

.user-id {
  color: #9ca3af;
  font-size: 12px;
  margin-left: auto;
}

.empty-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 0;
  color: #6b7280;
  font-size: 14px;
}
</style>
