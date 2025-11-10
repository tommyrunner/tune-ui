<template>
  <div class="tabs-demo">
    <div class="tabs-row">
      <div class="type-label">Default Height (height=42px):</div>
      <t-tabs-group v-model="defaultHeight">
        <t-tabs value="tab1">Option 1</t-tabs>
        <t-tabs value="tab2">Option 2</t-tabs>
        <t-tabs value="tab3">Option 3</t-tabs>
      </t-tabs-group>
    </div>

    <div class="tabs-row">
      <div class="type-label">Small Size (height=32px):</div>
      <t-tabs-group v-model="smallHeight" height="32px">
        <t-tabs value="tab1">Option 1</t-tabs>
        <t-tabs value="tab2">Option 2</t-tabs>
        <t-tabs value="tab3">Option 3</t-tabs>
      </t-tabs-group>
    </div>

    <div class="tabs-row">
      <div class="type-label">Large Size (height=56px):</div>
      <t-tabs-group v-model="largeHeight" height="56px">
        <t-tabs value="tab1">Option 1</t-tabs>
        <t-tabs value="tab2">Option 2</t-tabs>
        <t-tabs value="tab3">Option 3</t-tabs>
      </t-tabs-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const defaultHeight = ref("tab1");
const smallHeight = ref("tab1");
const largeHeight = ref("tab1");
</script>

<style scoped>
.tabs-demo {
  padding: 16px 0;
}
.tabs-row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.type-label {
  width: 200px;
  font-size: 14px;
  color: #606266;
}
</style> 