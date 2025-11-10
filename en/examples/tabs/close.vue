<template>
  <div class="tabs-demo">
    <div class="demo-controller">
      <t-button @click="addTab">Add Tab</t-button>
    </div>
    <t-tabs-group v-model="activeTab" is-close @close="handleClose">
      <t-tabs v-for="tab in tabs" :key="tab.name" :value="tab.name">
        {{ tab.title }}
      </t-tabs>
    </t-tabs-group>
    <div class="content-box">
      <div v-if="tabs.length > 0">Current Tab: {{ activeTab }}</div>
      <div v-else>No tabs available, please click "Add Tab" button</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Initial tabs
const initialTabs = [
  { title: "Tab 1", name: "tab1" },
  { title: "Tab 2", name: "tab2" },
  { title: "Tab 3", name: "tab3" }
];

const tabs = ref([...initialTabs]);
const activeTab = ref("tab1");
let tabIndex = 4;

// Handle tab close
const handleClose = tabName => {
  const tabsValue = tabs.value;
  const activeValue = activeTab.value;
  if (activeValue === tabName) {
    tabsValue.forEach((tab, index) => {
      if (tab.name === tabName) {
        const nextTab = tabsValue[index + 1] || tabsValue[index - 1];
        if (nextTab) {
          activeTab.value = nextTab.name;
        }
      }
    });
  }

  tabs.value = tabsValue.filter(tab => tab.name !== tabName);
};

// Add tab
const addTab = () => {
  const newTabName = `tab${tabIndex++}`;
  tabs.value.push({
    title: `Tab ${tabIndex - 1}`,
    name: newTabName
  });
  activeTab.value = newTabName;
};
</script>

<style scoped>
.tabs-demo {
  padding: 16px 0;
}
.demo-controller {
  margin-bottom: 20px;
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
