<template>
  <div class="collapse-demo">
    <h4>自定义样式</h4>
    <t-collapse-group v-model="activeNames" class="custom-collapse">
      <t-collapse title="自定义边框和背景" value="1">
        <div class="collapse-content">通过自定义CSS可以修改折叠面板的边框、背景色、间距等样式，使其更符合设计需求。</div>
      </t-collapse>
      <t-collapse title="自定义标题样式" value="2">
        <div class="collapse-content">可以通过修改标题区域的样式，实现不同的视觉效果，比如添加背景色、修改字体等。</div>
      </t-collapse>
      <t-collapse title="自定义内容区域" value="3">
        <div class="collapse-content">内容区域也可以进行自定义，例如添加内边距、背景色，或者其他装饰元素。</div>
      </t-collapse>
    </t-collapse-group>

    <h4 style="margin-top: 24px">无边框样式</h4>
    <t-collapse-group v-model="borderedNames" :border="false">
      <t-collapse title="无边框面板1" value="1">
        <div class="collapse-content">设置 border 属性为 false 可以移除折叠面板的边框，创建更简洁的视觉效果。</div>
      </t-collapse>
      <t-collapse title="无边框面板2" value="2">
        <div class="collapse-content">无边框样式适合用在背景已经有明显分隔的场景，或者需要更轻量化的界面设计。</div>
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

/* 自定义折叠面板样式 */
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
