<template>
  <div class="checkbox-demo">
    <div class="direction-item">
      <div class="direction-label">Horizontal Layout (Default):</div>
      <t-checkbox-group v-model="checkedRow" direction="row">
        <t-checkbox value="option1">Option 1</t-checkbox>
        <t-checkbox value="option2">Option 2</t-checkbox>
        <t-checkbox value="option3">Option 3</t-checkbox>
      </t-checkbox-group>
    </div>

    <div class="direction-item">
      <div class="direction-label">Vertical Layout:</div>
      <t-checkbox-group v-model="checkedColumn" direction="column">
        <t-checkbox value="option1">Option 1</t-checkbox>
        <t-checkbox value="option2">Option 2</t-checkbox>
        <t-checkbox value="option3">Option 3</t-checkbox>
      </t-checkbox-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const checkedRow = ref(["option1", "option2"]);
const checkedColumn = ref(["option2", "option3"]);
</script>

<style scoped>
.checkbox-demo {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.direction-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.direction-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 4px;
}
</style>
