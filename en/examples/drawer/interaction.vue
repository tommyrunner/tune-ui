<template>
  <div class="drawer-demo">
    <div class="options-panel">
      <h3>Interaction Configuration Options</h3>

      <div class="option-item">
        <t-checkbox v-model="showModal">Show Modal Overlay</t-checkbox>
        <div class="option-desc">Control whether the drawer background shows a modal overlay</div>
      </div>

      <div class="option-item">
        <t-checkbox v-model="closeOnPressModel">Close on Modal Click</t-checkbox>
        <div class="option-desc">Control whether clicking the modal overlay can close the drawer</div>
      </div>

      <div class="option-item">
        <t-checkbox v-model="closeOnPressEscape">Close on ESC Press</t-checkbox>
        <div class="option-desc">Control whether pressing ESC key can close the drawer</div>
      </div>

      <div class="option-item">
        <t-checkbox v-model="setMaxHeight">Set Max Height</t-checkbox>
        <div class="option-desc">
          Control whether to limit the maximum height of the drawer (applies to left/right directions)
        </div>
      </div>

      <t-button type="primary" @click="openDrawer">Open Drawer</t-button>
    </div>

    <t-drawer
      v-model="interactionDrawerVisible"
      title="Interaction Configuration"
      :is-modal="showModal"
      :close-on-press-model="closeOnPressModel"
      :close-on-press-escape="closeOnPressEscape"
      :is-set-max-height="setMaxHeight"
    >
      <div class="drawer-content">
        <p>Current interaction configuration:</p>
        <div class="current-settings">
          <ul>
            <li>
              <span class="setting-name">Show Modal Overlay:</span>
              <span class="setting-value" :class="{ enabled: showModal }">{{ showModal ? "Yes" : "No" }}</span>
            </li>
            <li>
              <span class="setting-name">Close on Modal Click:</span>
              <span class="setting-value" :class="{ enabled: closeOnPressModel }">{{ closeOnPressModel ? "Yes" : "No" }}</span>
            </li>
            <li>
              <span class="setting-name">Close on ESC Press:</span>
              <span class="setting-value" :class="{ enabled: closeOnPressEscape }">{{ closeOnPressEscape ? "Yes" : "No" }}</span>
            </li>
            <li>
              <span class="setting-name">Set Max Height:</span>
              <span class="setting-value" :class="{ enabled: setMaxHeight }">{{ setMaxHeight ? "Yes" : "No" }}</span>
            </li>
          </ul>
        </div>
        <p>
          Through these configuration options, you can flexibly control the interaction behavior of the drawer to adapt to
          different usage scenarios.
        </p>
        <p class="tip">Try interacting with the drawer according to the current configuration.</p>
      </div>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref } from "vue";

const interactionDrawerVisible = ref(false);
const showModal = ref(true);
const closeOnPressModel = ref(true);
const closeOnPressEscape = ref(true);
const setMaxHeight = ref(true);

/**
 * Open drawer
 * @returns {void}
 */
const openDrawer = () => {
  interactionDrawerVisible.value = true;
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

.options-panel h3 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #409eff;
}

.option-item {
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #e4e7ed;
}

.option-desc {
  margin-top: 4px;
  margin-left: 24px;
  font-size: 12px;
  color: #909399;
}

.drawer-content {
  line-height: 1.6;
  color: #606266;
}

.drawer-content p {
  margin: 0 0 12px;
}

.current-settings {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 12px 16px;
  margin: 12px 0;
}

.current-settings ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.current-settings li {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.setting-name {
  flex: 1;
  color: #606266;
}

.setting-value {
  padding: 2px 8px;
  border-radius: 3px;
  background-color: #f5f5f5;
  color: #909399;
}

.setting-value.enabled {
  background-color: #ecf5ff;
  color: #409eff;
}

.tip {
  margin-top: 16px;
  padding: 8px 12px;
  background-color: #fff6e8;
  border-left: 3px solid #e6a23c;
  color: #c28135;
}
</style>
