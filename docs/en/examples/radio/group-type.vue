<template>
  <div class="radio-demo">
    <div class="group-type">
      <div class="type-label">Default Type:</div>
      <t-radio-group v-model="defaultValue" type="default">
        <t-radio value="1">Option 1</t-radio>
        <t-radio value="2">Option 2</t-radio>
        <t-radio value="3">Option 3</t-radio>
      </t-radio-group>
    </div>

    <div class="group-type">
      <div class="type-label">Text Type:</div>
      <t-radio-group v-model="textValue" type="text">
        <t-radio value="1">Option 1</t-radio>
        <t-radio value="2">Option 2</t-radio>
        <t-radio value="3">Option 3</t-radio>
      </t-radio-group>
    </div>

    <div class="group-type">
      <div class="type-label">Border Type:</div>
      <t-radio-group v-model="borderValue" type="border">
        <t-radio value="1">Option 1</t-radio>
        <t-radio value="2">Option 2</t-radio>
        <t-radio value="3">Option 3</t-radio>
      </t-radio-group>
    </div>

    <div class="group-type">
      <div class="type-label">Button Type:</div>
      <t-radio-group v-model="buttonValue" type="button">
        <t-radio value="1">Option 1</t-radio>
        <t-radio value="2">Option 2</t-radio>
        <t-radio value="3">Option 3</t-radio>
      </t-radio-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const defaultValue = ref("1");
const textValue = ref("1");
const borderValue = ref("1");
const buttonValue = ref("1");
</script>

<style scoped>
.radio-demo {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.group-type {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.type-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 4px;
}
</style>
