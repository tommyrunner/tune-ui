<template>
  <div class="collapse-demo">
    <div class="demo-block">
      <h4>手风琴模式（同时只能展开一个面板）</h4>
      <t-collapse-group v-model="activeName" :accordion="true">
        <t-collapse title="面板1" value="1">
          <div class="collapse-content">
            这是第一个面板的内容。手风琴模式下，一次只能展开一个面板。 展开当前面板时，其他已展开的面板会自动折叠。
          </div>
        </t-collapse>
        <t-collapse title="面板2" value="2">
          <div class="collapse-content">
            这是第二个面板的内容。手风琴模式适用于需要突出显示单个内容的场景， 例如FAQ列表或者分步骤指南。
          </div>
        </t-collapse>
        <t-collapse title="面板3" value="3">
          <div class="collapse-content">
            这是第三个面板的内容。在手风琴模式下，modelValue为字符串而不是数组， 表示当前激活的面板的value值。
          </div>
        </t-collapse>
      </t-collapse-group>
    </div>

    <div class="demo-block">
      <h4>对比：普通模式（可同时展开多个面板）</h4>
      <t-collapse-group v-model="activeNames">
        <t-collapse title="面板1" value="1">
          <div class="collapse-content">这是普通模式下的面板1。普通模式允许同时展开多个面板。</div>
        </t-collapse>
        <t-collapse title="面板2" value="2">
          <div class="collapse-content">这是普通模式下的面板2。普通模式更适合需要同时查看多个内容区域的场景。</div>
        </t-collapse>
        <t-collapse title="面板3" value="3">
          <div class="collapse-content">这是普通模式下的面板3。在普通模式下，modelValue为数组，包含所有激活面板的value。</div>
        </t-collapse>
      </t-collapse-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TCollapse, TCollapseGroup } from "tune-ui";

// 手风琴模式 - 当前激活的面板（字符串）
const activeName = ref("1");

// 普通模式 - 当前激活的面板（数组）
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
