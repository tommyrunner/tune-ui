<template>
  <div class="checkbox-demo">
    <div class="type-item">
      <div class="type-label">默认类型：</div>
      <t-checkbox-group v-model="checkedDefault" type="default">
        <t-checkbox value="apple">苹果</t-checkbox>
        <t-checkbox value="banana">香蕉</t-checkbox>
        <t-checkbox value="orange">橙子</t-checkbox>
      </t-checkbox-group>
    </div>

    <div class="type-item">
      <div class="type-label">文本类型：</div>
      <t-checkbox-group v-model="checkedText" type="text">
        <t-checkbox value="apple">苹果</t-checkbox>
        <t-checkbox value="banana">香蕉</t-checkbox>
        <t-checkbox value="orange">橙子</t-checkbox>
      </t-checkbox-group>
    </div>

    <div class="type-item">
      <div class="type-label">边框类型：</div>
      <t-checkbox-group v-model="checkedBorder" type="border">
        <t-checkbox value="apple">苹果</t-checkbox>
        <t-checkbox value="banana">香蕉</t-checkbox>
        <t-checkbox value="orange">橙子</t-checkbox>
      </t-checkbox-group>
    </div>

    <div class="type-item">
      <div class="type-label">按钮类型：</div>
      <t-checkbox-group v-model="checkedButton" type="button">
        <t-checkbox value="apple">苹果</t-checkbox>
        <t-checkbox value="banana">香蕉</t-checkbox>
        <t-checkbox value="orange">橙子</t-checkbox>
      </t-checkbox-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TCheckbox, TCheckboxGroup } from "tune-ui";

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
