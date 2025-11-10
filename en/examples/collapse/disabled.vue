<template>
  <div class="collapse-demo">
    <h4>Partially Disabled Panels</h4>
    <t-collapse-group v-model="activeNames">
      <t-collapse title="Normal Panel" value="1">
        <div class="collapse-content">This is a normal panel that can be expanded and collapsed normally.</div>
      </t-collapse>
      <t-collapse title="Disabled Panel" value="2" disabled>
        <div class="collapse-content">This panel is disabled, clicking the title will not trigger expand/collapse operations.</div>
      </t-collapse>
      <t-collapse title="Normal Panel" value="3">
        <div class="collapse-content">This is another normal panel that can be expanded and collapsed normally.</div>
      </t-collapse>
    </t-collapse-group>

    <h4 style="margin-top: 24px">Toggle Disable Function</h4>
    <div class="controls">
      <t-button @click="toggleDisable" type="primary"> {{ allDisabled ? "Enable" : "Disable" }} All Panels </t-button>
    </div>
    <t-collapse-group v-model="dynamicActiveNames">
      <t-collapse v-for="i in 3" :key="i" :title="`Panel ${i}`" :value="String(i)" :disabled="allDisabled">
        <div class="collapse-content">Current Status: {{ allDisabled ? "Disabled" : "Normal" }}</div>
      </t-collapse>
    </t-collapse-group>

    <div class="tip">
      <p>You can disable specific panel items by setting the <code>disabled</code> attribute.</p>
      <p>Disabled panels cannot be expanded or collapsed by clicking, but their state can be controlled programmatically.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeNames = ref(["1", "3"]);
const dynamicActiveNames = ref(["1"]);
const allDisabled = ref(false);

const toggleDisable = () => {
  allDisabled.value = !allDisabled.value;
};
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

.controls {
  margin-bottom: 16px;
}

.tip {
  margin-top: 20px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
}

.tip p {
  margin: 0 0 8px;
  line-height: 1.6;
}

.tip p:last-child {
  margin-bottom: 0;
}

.tip code {
  background-color: #ecf5ff;
  color: #409eff;
  padding: 2px 5px;
  border-radius: 3px;
  font-family: Consolas, Monaco, monospace;
}
</style>
