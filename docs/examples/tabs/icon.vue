<template>
  <div class="tabs-demo">
    <t-tabs-group v-model="activeTab">
      <t-tabs value="home" icon="home">首页</t-tabs>
      <t-tabs value="profile" icon="user">个人资料</t-tabs>
      <t-tabs value="messages" icon="message">消息中心</t-tabs>
      <t-tabs value="settings" icon="setting">系统设置</t-tabs>
    </t-tabs-group>
    <div class="content-box">
      <div v-if="activeTab === 'home'">首页内容</div>
      <div v-else-if="activeTab === 'profile'">个人资料内容</div>
      <div v-else-if="activeTab === 'messages'">消息中心内容</div>
      <div v-else-if="activeTab === 'settings'">系统设置内容</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TTabs, TTabsGroup } from "tune-ui";

const activeTab = ref("home");
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
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
</style> 