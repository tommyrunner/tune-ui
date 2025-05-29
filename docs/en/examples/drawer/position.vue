<template>
  <div class="drawer-demo">
    <div class="button-group">
      <t-button type="primary" @click="openDrawer('left')">Left Slide</t-button>
      <t-button type="primary" @click="openDrawer('right')">Right Slide</t-button>
      <t-button type="primary" @click="openDrawer('top')">Top Slide</t-button>
      <t-button type="primary" @click="openDrawer('bottom')">Bottom Slide</t-button>
    </div>

    <t-drawer v-model="positionDrawerVisible" :title="positionTitle" :position="position">
      <div class="drawer-content">
        <p>
          The current drawer slides out from the <strong>{{ positionText }}</strong>.
        </p>
        <p>
          The drawer component supports sliding out from four directions of the screen, you can choose the appropriate slide
          direction based on different interaction scenarios:
        </p>
        <ul>
          <li><strong>Left Slide</strong>: Suitable for navigation menus, filter conditions, etc.</li>
          <li><strong>Right Slide</strong>: Suitable for settings panels, detail displays, etc.</li>
          <li><strong>Top Slide</strong>: Suitable for notification reminders, brief information displays, etc.</li>
          <li><strong>Bottom Slide</strong>: Suitable for mobile operation panels, selectors, etc.</li>
        </ul>
        <p>You can control the drawer slide direction by setting the <code>position</code> property.</p>
      </div>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const positionDrawerVisible = ref(false);
const position = ref("left");

const positionMap = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom"
};

const positionText = computed(() => positionMap[position.value] || "left");
const positionTitle = computed(() => `${positionText.value.charAt(0).toUpperCase() + positionText.value.slice(1)} Drawer`);

/**
 * Open drawer in specified direction
 */
const openDrawer = pos => {
  position.value = pos;
  positionDrawerVisible.value = true;
};
</script>

<style scoped>
.drawer-demo {
  padding: 16px 0;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
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

.drawer-content strong {
  color: #409eff;
}

.drawer-content code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}
</style>
