<template>
  <div class="checkbox-demo">
    <div class="group-item">
      <t-checkbox-group v-model="checkedFruits">
        <t-checkbox value="apple">Apple</t-checkbox>
        <t-checkbox value="banana">Banana</t-checkbox>
        <t-checkbox value="orange">Orange</t-checkbox>
        <t-checkbox value="grape">Grape</t-checkbox>
      </t-checkbox-group>
      <div class="value-display">Selected Fruits: {{ checkedFruits.join(", ") }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const checkedFruits = ref(["apple", "orange"]);
</script>

<style scoped>
.checkbox-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.group-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.value-display {
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}
</style>
