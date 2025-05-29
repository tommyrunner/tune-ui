<template>
  <div class="tabs-demo">
    <div class="tabs-row">
      <div class="type-label">Default Gap (gap=8):</div>
      <t-tabs-group v-model="defaultTab">
        <t-tabs value="tab1">Option 1</t-tabs>
        <t-tabs value="tab2">Option 2</t-tabs>
        <t-tabs value="tab3">Option 3</t-tabs>
      </t-tabs-group>
    </div>

    <div class="tabs-row">
      <div class="type-label">Large Gap (gap=20):</div>
      <t-tabs-group v-model="largeTab" :gap="20">
        <t-tabs value="tab1">Option 1</t-tabs>
        <t-tabs value="tab2">Option 2</t-tabs>
        <t-tabs value="tab3">Option 3</t-tabs>
      </t-tabs-group>
    </div>

    <div class="tabs-row">
      <div class="type-label">Full Width (gap=0):</div>
      <t-tabs-group v-model="fullTab" :gap="0">
        <t-tabs value="tab1">Option 1</t-tabs>
        <t-tabs value="tab2">Option 2</t-tabs>
        <t-tabs value="tab3">Option 3</t-tabs>
      </t-tabs-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const defaultTab = ref("tab1");
const largeTab = ref("tab1");
const fullTab = ref("tab1");
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
  width: 150px;
  font-size: 14px;
  color: #606266;
}
</style> 