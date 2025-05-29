<template>
  <div class="collapse-demo">
    <h4>Custom Styles</h4>
    <t-collapse-group v-model="activeNames" class="custom-collapse">
      <t-collapse title="Custom Border and Background" value="1">
        <div class="collapse-content">
          You can modify the border, background color, spacing and other styles of collapse panels through custom CSS to make them
          more in line with design requirements.
        </div>
      </t-collapse>
      <t-collapse title="Custom Title Style" value="2">
        <div class="collapse-content">
          You can achieve different visual effects by modifying the style of the title area, such as adding background color,
          modifying fonts, etc.
        </div>
      </t-collapse>
      <t-collapse title="Custom Content Area" value="3">
        <div class="collapse-content">
          The content area can also be customized, such as adding padding, background color, or other decorative elements.
        </div>
      </t-collapse>
    </t-collapse-group>

    <h4 style="margin-top: 24px">Borderless Style</h4>
    <t-collapse-group v-model="borderedNames" :border="false">
      <t-collapse title="Borderless Panel 1" value="1">
        <div class="collapse-content">
          Setting the border attribute to false can remove the border of the collapse panel, creating a cleaner visual effect.
        </div>
      </t-collapse>
      <t-collapse title="Borderless Panel 2" value="2">
        <div class="collapse-content">
          Borderless style is suitable for scenarios where the background already has obvious separation, or when a more
          lightweight interface design is needed.
        </div>
      </t-collapse>
    </t-collapse-group>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeNames = ref(["1"]);
const borderedNames = ref(["1"]);
</script>

<style scoped>
.collapse-demo {
  padding: 16px 0;
}

h4 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #606266;
}

.collapse-content {
  line-height: 1.6;
  color: #606266;
}

/* Custom collapse panel styles */
.custom-collapse :deep(.t-collapse) {
  margin-bottom: 8px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #e6e6e6;
}

.custom-collapse :deep(.t-collapse__header) {
  background-color: #f5f7fa;
  padding: 12px 16px;
  font-weight: 600;
  transition: background-color 0.3s;
}

.custom-collapse :deep(.t-collapse__header:hover) {
  background-color: #edf2fc;
}

.custom-collapse :deep(.t-collapse__content) {
  padding: 16px 20px;
  background-color: #ffffff;
}

.custom-collapse :deep(.t-collapse.is-active .t-collapse__header) {
  background-color: #ecf5ff;
  color: #409eff;
}
</style>
