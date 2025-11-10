<template>
  <div class="tabs-demo">
    <t-tabs-group v-model="activeTab">
      <t-tabs value="home">Home</t-tabs>
      <t-tabs value="profile">Profile</t-tabs>
      <t-tabs value="messages">Messages</t-tabs>
      <t-tabs value="settings">Settings</t-tabs>
    </t-tabs-group>
    <div class="content-box">
      <div v-if="activeTab === 'home'">Home Content</div>
      <div v-else-if="activeTab === 'profile'">Profile Content</div>
      <div v-else-if="activeTab === 'messages'">Messages Content</div>
      <div v-else-if="activeTab === 'settings'">Settings Content</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


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