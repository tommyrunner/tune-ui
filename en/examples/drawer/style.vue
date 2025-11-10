<template>
  <div class="drawer-demo">
    <div class="options-panel">
      <div class="option-group">
        <h4>Size Settings</h4>
        <div class="option-buttons">
          <t-button size="small" @click="updateSize('300px')">Narrow</t-button>
          <t-button size="small" @click="updateSize('500px')">Medium</t-button>
          <t-button size="small" @click="updateSize('800px')">Wide</t-button>
        </div>
      </div>

      <div class="option-group">
        <h4>Padding</h4>
        <div class="option-buttons">
          <t-button size="small" @click="updatePadding([8, 8, 8, 8])">Small</t-button>
          <t-button size="small" @click="updatePadding([16, 16, 16, 16])">Medium</t-button>
          <t-button size="small" @click="updatePadding([24, 24, 24, 24])">Large</t-button>
        </div>
      </div>

      <div class="option-group">
        <h4>Offset Settings</h4>
        <div class="option-buttons">
          <t-button size="small" @click="updateOffset({ x: 0, y: 0 })">No Offset</t-button>
          <t-button size="small" @click="updateOffset({ x: 20, y: 20 })">Medium Offset</t-button>
          <t-button size="small" @click="updateOffset({ x: 40, y: 40 })">Large Offset</t-button>
        </div>
      </div>

      <t-button type="primary" class="apply-button" @click="openDrawer">Apply and Open Drawer</t-button>
    </div>

    <t-drawer
      v-model="styleDrawerVisible"
      title="Custom Style Drawer"
      :size="settings.size"
      :padding="settings.padding"
      :offset="settings.offset"
      :box-shadow="settings.boxShadow"
    >
      <div class="drawer-content">
        <p>The drawer component provides various style configuration options:</p>
        <div class="settings-info">
          <h3>Current Settings</h3>
          <ul>
            <li><strong>Size:</strong> {{ settings.size }}</li>
            <li><strong>Padding:</strong> [{{ settings.padding.join(", ") }}]</li>
            <li><strong>Offset:</strong> x={{ settings.offset.x }}, y={{ settings.offset.y }}</li>
            <li><strong>Shadow:</strong> [{{ settings.boxShadow.join(", ") }}]</li>
          </ul>
        </div>
        <p>
          Through these properties, you can customize the appearance and size of the drawer according to different business
          requirements.
        </p>
      </div>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const styleDrawerVisible = ref(false);

const settings = reactive({
  size: "500px",
  padding: [16, 16, 16, 16],
  offset: { x: 0, y: 0 },
  boxShadow: [0, 4, 12, "rgba(0, 0, 0, 0.1)"]
});

/**
 * Update size settings
 * @param {string} size - Size value
 * @returns {void}
 */
const updateSize = size => {
  settings.size = size;
};

/**
 * Update padding settings
 * @param {Array} padding - Padding array
 * @returns {void}
 */
const updatePadding = padding => {
  settings.padding = padding;
};

/**
 * Update offset settings
 * @param {Object} offset - Offset object
 * @returns {void}
 */
const updateOffset = offset => {
  settings.offset = offset;
};

/**
 * Open drawer
 * @returns {void}
 */
const openDrawer = () => {
  styleDrawerVisible.value = true;
};
</script>

<style scoped>
.drawer-demo {
  padding: 16px 0;
}

.options-panel {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.option-group {
  margin-bottom: 16px;
}

.option-group h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #606266;
}

.option-buttons {
  display: flex;
  gap: 8px;
}

.apply-button {
  margin-top: 16px;
}

.drawer-content {
  line-height: 1.6;
  color: #606266;
}

.drawer-content p {
  margin: 0 0 12px;
}

.settings-info {
  background-color: #ecf5ff;
  border-radius: 4px;
  padding: 12px 16px;
  margin: 12px 0;
}

.settings-info h3 {
  margin: 0 0 8px;
  font-size: 16px;
  color: #409eff;
}

.settings-info ul {
  margin: 0;
  padding-left: 20px;
}

.settings-info li {
  margin-bottom: 4px;
}

.settings-info strong {
  font-weight: 500;
  color: #303133;
}
</style>
