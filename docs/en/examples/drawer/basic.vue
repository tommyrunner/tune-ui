<template>
  <div class="drawer-demo">
    <t-button type="primary" @click="basicDrawerVisible = true">Open Drawer</t-button>

    <t-drawer v-model="basicDrawerVisible" title="Basic Drawer">
      <div class="drawer-content">
        <p>This is a basic drawer component, a floating panel that slides out from the edge of the screen.</p>
        <p>Drawer components are commonly used in the following scenarios:</p>
        <ul>
          <li>Side navigation menu</li>
          <li>Detail page display</li>
          <li>Form filling</li>
          <li>Settings panel</li>
        </ul>
        <p>By default, the drawer component pops out from the left side, including a title bar, content area, and bottom action buttons.</p>
      </div>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref } from "vue";

const basicDrawerVisible = ref(false);
</script>

<style scoped>
.drawer-demo {
  padding: 16px 0;
}

.drawer-content {
  line-height: 1.6;
  color: #606266;
}

.drawer-content p {
  margin: 0 0 12px;
}

.drawer-content ul {
  margin: 0 0 12px;
  padding-left: 24px;
}

.drawer-content li {
  margin-bottom: 8px;
}
</style>
