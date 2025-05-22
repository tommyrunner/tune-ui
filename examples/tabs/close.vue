<template>
  <div class="tabs-demo">
    <div class="demo-controller">
      <t-button @click="addTab">添加标签页</t-button>
    </div>
    <t-tabs-group
      v-model="activeTab"
      is-close
      @close="handleClose"
    >
      <t-tabs
        v-for="tab in tabs"
        :key="tab.name"
        :value="tab.name"
      >
        {{ tab.title }}
      </t-tabs>
    </t-tabs-group>
    <div class="content-box">
      <div v-if="tabs.length > 0">当前标签页: {{ activeTab }}</div>
      <div v-else>没有标签页，请点击"添加标签页"按钮</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


// 初始标签页
const initialTabs = [
  { title: "标签页 1", name: "tab1" },
  { title: "标签页 2", name: "tab2" },
  { title: "标签页 3", name: "tab3" }
];

const tabs = ref([...initialTabs]);
const activeTab = ref("tab1");
let tabIndex = 4;

// 处理关闭标签页
const handleClose = (tabName) => {
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

// 添加标签页
const addTab = () => {
  const newTabName = `tab${tabIndex++}`;
  tabs.value.push({
    title: `标签页 ${tabIndex - 1}`,
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