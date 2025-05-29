<template>
  <div class="demo-select">
    <div class="multiple-example">
      <t-select v-model="value" :options="options" multiple placeholder="Please select multiple options" />
      <div class="value-display">Current value: {{ value }}</div>
    </div>

    <div class="multiple-features">
      <div class="feature-item">
        <p class="feature-label">Filterable Multiple</p>
        <t-select v-model="filterValue" :options="options" filterable multiple placeholder="Type to filter" />
      </div>

      <div class="feature-item">
        <p class="feature-label">Custom View</p>
        <t-select v-model="customValue" :options="options" multiple placeholder="Custom multiple view">
          <template #multiple-view="{ model }">
            <t-tag size="small" type="info">Selected {{ Array.isArray(model) ? model.length : 0 }} items</t-tag>
          </template>
        </t-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref([]);
const filterValue = ref([]);
const customValue = ref([]);

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" },
  { label: "Option 5", value: "5" },
  { label: "Option 6", value: "6" }
];
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.multiple-example {
  margin-bottom: 16px;
}

.multiple-features {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.feature-item {
  min-width: 200px;
}

.feature-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}

.value-display {
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}
</style>
