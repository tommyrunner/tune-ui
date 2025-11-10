<template>
  <div class="checkbox-demo">
    <div class="checkbox-item">
      <div class="style-label">Default Indeterminate Icon:</div>
      <t-checkbox v-model="checked1" indeterminate>Indeterminate State</t-checkbox>
    </div>
    <div class="checkbox-item">
      <div class="style-label">Custom Indeterminate Icon:</div>
      <t-checkbox v-model="checked2" indeterminate indeterminateIcon="remove">Custom Indeterminate Icon</t-checkbox>
    </div>
    <div class="checkbox-item">
      <div class="style-label">Practical Example:</div>
      <t-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange"> Select All </t-checkbox>
      <div class="sub-item">
        <t-checkbox v-model="checkedItems" value="A" @change="handleCheckedChange">Option A</t-checkbox>
        <t-checkbox v-model="checkedItems" value="B" @change="handleCheckedChange">Option B</t-checkbox>
        <t-checkbox v-model="checkedItems" value="C" @change="handleCheckedChange">Option C</t-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const checked1 = ref(true);
const checked2 = ref(true);

// Select all example
const checkAll = ref(false);
const checkedItems = ref([]);
const options = ["A", "B", "C"];

// Calculate indeterminate state
const indeterminate = computed(() => {
  return checkedItems.value.length > 0 && checkedItems.value.length < options.length;
});

// Handle select all change
const handleCheckAllChange = val => {
  checkedItems.value = val ? [...options] : [];
};

// Handle option change
const handleCheckedChange = () => {
  checkAll.value = checkedItems.value.length === options.length;
};
</script>

<style scoped>
.checkbox-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.checkbox-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.style-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 4px;
}

.sub-item {
  margin-left: 24px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
