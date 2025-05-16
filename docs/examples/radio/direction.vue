<template>
  <div class="radio-demo">
    <div class="direction-example">
      <div class="direction-label">水平排列 (row):</div>
      <t-radio-group v-model="rowValue" direction="row" type="border">
        <t-radio value="1">选项1</t-radio>
        <t-radio value="2">选项2</t-radio>
        <t-radio value="3">选项3</t-radio>
      </t-radio-group>
    </div>

    <div class="direction-example">
      <div class="direction-label">垂直排列 (column):</div>
      <t-radio-group v-model="columnValue" direction="column" type="border">
        <t-radio value="1">选项1</t-radio>
        <t-radio value="2">选项2</t-radio>
        <t-radio value="3">选项3</t-radio>
      </t-radio-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TRadio, TRadioGroup } from "tune-ui";

const rowValue = ref("1");
const columnValue = ref("1");
</script>

<style scoped>
.radio-demo {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.direction-example {
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
