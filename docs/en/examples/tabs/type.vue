<template>
  <div class="tabs-demo">
    <div class="tabs-row">
      <div class="type-label">Line Style:</div>
      <t-tabs-group v-model="lineType" type="line">
        <t-tabs value="tab1">Option 1</t-tabs>
        <t-tabs value="tab2">Option 2</t-tabs>
        <t-tabs value="tab3">Option 3</t-tabs>
      </t-tabs-group>
    </div>

    <div class="tabs-row">
      <div class="type-label">Block Style:</div>
      <t-tabs-group v-model="blockType" type="block">
        <t-tabs value="tab1">Option 1</t-tabs>
        <t-tabs value="tab2">Option 2</t-tabs>
        <t-tabs value="tab3">Option 3</t-tabs>
      </t-tabs-group>
    </div>

    <div class="tabs-row">
      <div class="type-label">Border Style:</div>
      <t-tabs-group v-model="borderType" type="border">
        <t-tabs value="tab1">Option 1</t-tabs>
        <t-tabs value="tab2">Option 2</t-tabs>
        <t-tabs value="tab3">Option 3</t-tabs>
      </t-tabs-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const lineType = ref("tab1");
const blockType = ref("tab1");
const borderType = ref("tab1");
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
  width: 100px;
  font-size: 14px;
  color: #606266;
}
</style> 