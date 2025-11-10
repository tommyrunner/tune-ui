<template>
  <div class="checkbox-demo">
    <div class="type-item">
      <div class="type-label">Default Type:</div>
      <t-checkbox-group v-model="checkedDefault" type="default">
        <t-checkbox value="apple">Apple</t-checkbox>
        <t-checkbox value="banana">Banana</t-checkbox>
        <t-checkbox value="orange">Orange</t-checkbox>
      </t-checkbox-group>
    </div>

    <div class="type-item">
      <div class="type-label">Text Type:</div>
      <t-checkbox-group v-model="checkedText" type="text">
        <t-checkbox value="apple">Apple</t-checkbox>
        <t-checkbox value="banana">Banana</t-checkbox>
        <t-checkbox value="orange">Orange</t-checkbox>
      </t-checkbox-group>
    </div>

    <div class="type-item">
      <div class="type-label">Border Type:</div>
      <t-checkbox-group v-model="checkedBorder" type="border">
        <t-checkbox value="apple">Apple</t-checkbox>
        <t-checkbox value="banana">Banana</t-checkbox>
        <t-checkbox value="orange">Orange</t-checkbox>
      </t-checkbox-group>
    </div>

    <div class="type-item">
      <div class="type-label">Button Type:</div>
      <t-checkbox-group v-model="checkedButton" type="button">
        <t-checkbox value="apple">Apple</t-checkbox>
        <t-checkbox value="banana">Banana</t-checkbox>
        <t-checkbox value="orange">Orange</t-checkbox>
      </t-checkbox-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const checkedDefault = ref(["apple"]);
const checkedText = ref(["banana"]);
const checkedBorder = ref(["orange"]);
const checkedButton = ref(["apple", "orange"]);
</script>

<style scoped>
.checkbox-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.type-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.type-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 4px;
}
</style>
