<template>
  <div class="collapse-demo">
    <h4>部分禁用的面板</h4>
    <t-collapse-group v-model="activeNames">
      <t-collapse title="正常面板" value="1">
        <div class="collapse-content">这是一个正常的面板，可以正常展开和折叠。</div>
      </t-collapse>
      <t-collapse title="禁用面板" value="2" disabled>
        <div class="collapse-content">这个面板被禁用了，点击标题不会触发展开/折叠操作。</div>
      </t-collapse>
      <t-collapse title="正常面板" value="3">
        <div class="collapse-content">这是另一个正常的面板，可以正常展开和折叠。</div>
      </t-collapse>
    </t-collapse-group>

    <h4 style="margin-top: 24px">禁用切换功能</h4>
    <div class="controls">
      <t-button @click="toggleDisable" type="primary"> {{ allDisabled ? "启用" : "禁用" }}所有面板 </t-button>
    </div>
    <t-collapse-group v-model="dynamicActiveNames">
      <t-collapse v-for="i in 3" :key="i" :title="`面板${i}`" :value="String(i)" :disabled="allDisabled">
        <div class="collapse-content">当前状态: {{ allDisabled ? "已禁用" : "正常" }}</div>
      </t-collapse>
    </t-collapse-group>

    <div class="tip">
      <p>通过设置 <code>disabled</code> 属性可以禁用特定的面板项。</p>
      <p>禁用的面板无法通过点击展开或折叠，但可以通过程序控制其状态。</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TCollapse, TCollapseGroup, TButton } from "tune-ui";

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
