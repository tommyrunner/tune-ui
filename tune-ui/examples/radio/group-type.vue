<template>
  <div class="radio-demo">
    <div class="group-type">
      <div class="type-label">默认类型 (default):</div>
      <t-radio-group v-model="defaultValue" type="default">
        <t-radio value="1">选项1</t-radio>
        <t-radio value="2">选项2</t-radio>
        <t-radio value="3">选项3</t-radio>
      </t-radio-group>
    </div>

    <div class="group-type">
      <div class="type-label">文本类型 (text):</div>
      <t-radio-group v-model="textValue" type="text">
        <t-radio value="1">选项1</t-radio>
        <t-radio value="2">选项2</t-radio>
        <t-radio value="3">选项3</t-radio>
      </t-radio-group>
    </div>

    <div class="group-type">
      <div class="type-label">边框类型 (border):</div>
      <t-radio-group v-model="borderValue" type="border">
        <t-radio value="1">选项1</t-radio>
        <t-radio value="2">选项2</t-radio>
        <t-radio value="3">选项3</t-radio>
      </t-radio-group>
    </div>

    <div class="group-type">
      <div class="type-label">按钮类型 (button):</div>
      <t-radio-group v-model="buttonValue" type="button">
        <t-radio value="1">选项1</t-radio>
        <t-radio value="2">选项2</t-radio>
        <t-radio value="3">选项3</t-radio>
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
