<template>
  <div class="tabs-demo">
    <t-tabs-group v-model="activeTab">
      <t-tabs value="tab1">选项一</t-tabs>
      <t-tabs value="tab2" disabled>选项二 (禁用)</t-tabs>
      <t-tabs value="tab3">选项三</t-tabs>
      <t-tabs value="tab4" disabled>选项四 (禁用)</t-tabs>
      <t-tabs value="tab5">选项五</t-tabs>
    </t-tabs-group>
    <div class="content-box">
      <div>当前选中: {{ activeTab }}</div>
      <div class="tip">选项二和选项四被禁用，无法选中</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TTabs, TTabsGroup } from "tune-ui";

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