<template>
  <div class="collapse-demo">
    <div class="demo-block">
      <h4>Accordion Mode (Only one panel can be expanded at a time)</h4>
      <t-collapse-group v-model="activeName" :accordion="true">
        <t-collapse title="Panel 1" value="1">
          <div class="collapse-content">
            This is the content of the first panel. In accordion mode, only one panel can be expanded at a time. When the current
            panel is expanded, other expanded panels will automatically collapse.
          </div>
        </t-collapse>
        <t-collapse title="Panel 2" value="2">
          <div class="collapse-content">
            This is the content of the second panel. Accordion mode is suitable for scenarios that need to highlight a single
            content, such as FAQ lists or step-by-step guides.
          </div>
        </t-collapse>
        <t-collapse title="Panel 3" value="3">
          <div class="collapse-content">
            This is the content of the third panel. In accordion mode, modelValue is a string rather than an array, representing
            the value of the currently active panel.
          </div>
        </t-collapse>
      </t-collapse-group>
    </div>

    <div class="demo-block">
      <h4>Comparison: Normal Mode (Multiple panels can be expanded simultaneously)</h4>
      <t-collapse-group v-model="activeNames">
        <t-collapse title="Panel 1" value="1">
          <div class="collapse-content">This is panel 1 in normal mode. Normal mode allows multiple panels to be expanded simultaneously.</div>
        </t-collapse>
        <t-collapse title="Panel 2" value="2">
          <div class="collapse-content">This is panel 2 in normal mode. Normal mode is more suitable for scenarios that need to view multiple content areas simultaneously.</div>
        </t-collapse>
        <t-collapse title="Panel 3" value="3">
          <div class="collapse-content">This is panel 3 in normal mode. In normal mode, modelValue is an array containing the values of all active panels.</div>
        </t-collapse>
      </t-collapse-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Accordion mode - currently active panel (string)
const activeName = ref("1");

// Normal mode - currently active panels (array)
const activeNames = ref(["1"]);
</script>

<style scoped>
.collapse-demo {
  padding: 16px 0;
}

.demo-block {
  margin-bottom: 24px;
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
</style>
