<template>
  <div class="tabs-demo">
    <t-tabs-group v-model="activeTab">
      <t-tabs value="tab1">Option 1</t-tabs>
      <t-tabs value="tab2" disabled>Option 2 (Disabled)</t-tabs>
      <t-tabs value="tab3">Option 3</t-tabs>
      <t-tabs value="tab4" disabled>Option 4 (Disabled)</t-tabs>
      <t-tabs value="tab5">Option 5</t-tabs>
    </t-tabs-group>
    <div class="content-box">
      <div>Currently Selected: {{ activeTab }}</div>
      <div class="tip">Option 2 and Option 4 are disabled and cannot be selected</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const activeTab = ref("tab1");
</script>

<style scoped>
.tabs-demo {
  padding: 16px 0;
}
.content-box {
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.tip {
  margin-top: 8px;
  font-size: 14px;
  color: #909399;
}
</style> 