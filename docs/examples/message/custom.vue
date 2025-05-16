<template>
  <div class="demo-container">
    <p class="demo-desc">消息提示组件支持自定义挂载容器和显示位置。</p>
    
    <div class="demo-block">
      <div class="custom-section">
        <h4>自定义挂载容器</h4>
        <p class="section-desc">通过设置 <code>appendTo</code> 属性指定消息挂载的DOM节点</p>
        <t-button type="primary" @click="showCustomAppendMessage">显示在指定容器</t-button>
        <div id="custom-append" class="custom-append">
          <p class="append-tip">自定义挂载容器，消息将显示在这里</p>
        </div>
      </div>
      
      <div class="custom-section">
        <h4>自定义显示位置</h4>
        <p class="section-desc">通过设置 <code>custom</code> 属性指定消息的显示坐标</p>
        <div class="position-options">
          <t-button type="primary" @click="showCustomPosition('10%', '50px')">左上角</t-button>
          <t-button type="primary" @click="showCustomPosition('90%', '50px')">右上角</t-button>
          <t-button type="primary" @click="showCustomPosition('90%', '90%')">右下角</t-button>
          <t-button type="primary" @click="showCustomPosition('10%', '90%')">左下角</t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TMessage, TButton } from "tune-ui";

/**
 * 显示自定义挂载消息
 */
const showCustomAppendMessage = () => {
  TMessage.message("我被挂载到了自定义容器中", "info", {
    appendTo: "#custom-append",
    isClose: true
  });
};

/**
 * 显示自定义位置消息
 */
const showCustomPosition = (x, y) => {
  TMessage.message(`我的位置是 x: ${x}, y: ${y}`, "info", {
    custom: { x, y },
    isClose: true
  });
};
</script>

<style scoped>
.demo-container {
  padding: 16px 0;
}

.demo-desc {
  margin: 0 0 16px;
  color: #606266;
  line-height: 1.6;
}

.demo-block {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.custom-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h4 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.section-desc {
  margin: 0 0 12px;
  color: #606266;
  font-size: 14px;
}

.section-desc code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: monospace;
}

.custom-append {
  margin-top: 16px;
  height: 100px;
  background-color: #f9fafb;
  border: 1px dashed #e5e7eb;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.append-tip {
  color: #909399;
  font-size: 14px;
}

.position-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style> 