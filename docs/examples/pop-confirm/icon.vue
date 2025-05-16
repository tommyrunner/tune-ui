<template>
  <div class="demo-container">
    <p class="demo-desc">通过设置 <code>icon</code> 和 <code>icon-color</code> 属性可以自定义气泡确认框的图标和颜色，使操作的语义更明确。</p>
    
    <div class="demo-block">
      <div class="block-item">
        <t-pop-confirm 
          content="确定要删除这条记录吗？" 
          icon="delete" 
          icon-color="#ff4d4f"
        >
          <t-button type="danger">删除操作</t-button>
        </t-pop-confirm>
        <span class="icon-desc">删除图标 - 红色</span>
      </div>
      
      <div class="block-item">
        <t-pop-confirm 
          content="确定要保存修改吗？" 
          icon="success-to" 
          icon-color="#52c41a"
        >
          <t-button type="success">保存操作</t-button>
        </t-pop-confirm>
        <span class="icon-desc">成功图标 - 绿色</span>
      </div>
      
      <div class="block-item">
        <t-pop-confirm 
          content="确定要执行此操作吗？" 
          icon="information" 
          icon-color="#1890ff"
        >
          <t-button type="primary">提示操作</t-button>
        </t-pop-confirm>
        <span class="icon-desc">信息图标 - 蓝色</span>
      </div>
      
      <div class="block-item">
        <t-pop-confirm 
          content="此操作可能存在风险，是否继续？" 
          icon="illustrate" 
          icon-color="#faad14"
        >
          <t-button type="warning">警告操作</t-button>
        </t-pop-confirm>
        <span class="icon-desc">警告图标 - 黄色</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TPopConfirm, TButton } from "tune-ui";
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

.demo-desc code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}

.demo-block {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.block-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.icon-desc {
  font-size: 12px;
  color: #909399;
}
</style> 