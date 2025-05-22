<template>
  <div class="tabs-demo">
    <div class="tabs-row">
      <div class="type-label">默认间距 (gap=8)：</div>
      <t-tabs-group v-model="defaultTab">
        <t-tabs value="tab1">选项一</t-tabs>
        <t-tabs value="tab2">选项二</t-tabs>
        <t-tabs value="tab3">选项三</t-tabs>
      </t-tabs-group>
    </div>

    <div class="tabs-row">
      <div class="type-label">大间距 (gap=20)：</div>
      <t-tabs-group v-model="largeTab" :gap="20">
        <t-tabs value="tab1">选项一</t-tabs>
        <t-tabs value="tab2">选项二</t-tabs>
        <t-tabs value="tab3">选项三</t-tabs>
      </t-tabs-group>
    </div>

    <div class="tabs-row">
      <div class="type-label">充满容器 (gap=0)：</div>
      <t-tabs-group v-model="fullTab" :gap="0">
        <t-tabs value="tab1">选项一</t-tabs>
        <t-tabs value="tab2">选项二</t-tabs>
        <t-tabs value="tab3">选项三</t-tabs>
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