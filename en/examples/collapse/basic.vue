<template>
  <div class="collapse-demo">
    <t-collapse-group v-model="activeNames">
      <t-collapse title="Title 1" value="1">
        <div class="collapse-content">
          This is the content area of the first panel. Collapse panels can expand or collapse content areas by clicking the title
          bar, which is a common way of organizing information and can effectively save page space.
        </div>
      </t-collapse>
      <t-collapse title="Title 2" value="2">
        <div class="collapse-content">
          This is the content area of the second panel. You can place any content here, including text, images, forms and other
          elements. Collapse panels are particularly suitable for content that needs to be displayed in groups, such as FAQ and
          settings.
        </div>
      </t-collapse>
      <t-collapse title="Title 3" value="3">
        <div class="collapse-content">
          This is the content area of the third panel. By default, multiple panels can be expanded at the same time. If you need
          accordion mode (only one panel can be expanded at a time), please set the accordion attribute.
        </div>
      </t-collapse>
    </t-collapse-group>

    <div class="result-container">
      <p>Currently active panels: {{ activeNames }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Expand the first panel by default
const activeNames = ref(["1"]);
</script>

<style scoped>
.collapse-demo {
  padding: 16px 0;
}

.collapse-content {
  line-height: 1.6;
  color: #606266;
}

.result-container {
  margin-top: 20px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
}
</style>
