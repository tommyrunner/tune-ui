<template>
  <div class="collapse-demo">
    <t-collapse-group v-model="activeNames">
      <t-collapse title="标题1" value="1">
        <div class="collapse-content">
          这是第一个面板的内容区域。折叠面板通过点击标题栏可以展开或折叠内容区域，
          是一种常见的信息组织方式，可以有效节省页面空间。
        </div>
      </t-collapse>
      <t-collapse title="标题2" value="2">
        <div class="collapse-content">
          这是第二个面板的内容区域。你可以在这里放置任何内容，包括文本、图片、表单等元素。
          折叠面板特别适合FAQ、设置项等需要分组展示的内容。
        </div>
      </t-collapse>
      <t-collapse title="标题3" value="3">
        <div class="collapse-content">
          这是第三个面板的内容区域。默认情况下，可以同时展开多个面板，
          如果需要手风琴模式（同时只能展开一个面板），请设置accordion属性。
        </div>
      </t-collapse>
    </t-collapse-group>

    <div class="result-container">
      <p>当前激活的面板: {{ activeNames }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


// 默认展开第一个面板
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
