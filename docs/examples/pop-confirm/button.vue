<template>
  <div class="demo-container">
    <p class="demo-desc">通过设置 <code>confirm-text</code>、<code>cancel-text</code>、<code>confirm-type</code> 和 <code>cancel-type</code> 属性可以自定义确认和取消按钮的文本和类型。</p>
    
    <div class="demo-block">
      <div class="block-section">
        <h4>默认按钮样式</h4>
        <t-pop-confirm content="确定要执行此操作吗？">
          <t-button type="primary">默认按钮</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="block-section">
        <h4>自定义按钮文本</h4>
        <t-pop-confirm 
          content="确定要执行此操作吗？"
          confirm-text="执行"
          cancel-text="返回"
        >
          <t-button type="primary">自定义文本</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="block-section">
        <h4>自定义按钮类型</h4>
        <t-pop-confirm 
          content="确定要执行此操作吗？"
          confirm-type="success"
          cancel-type="info"
        >
          <t-button type="primary">自定义类型</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="block-section">
        <h4>完全自定义</h4>
        <t-pop-confirm 
          content="此操作将永久删除该文件，是否继续？"
          confirm-text="确认删除"
          cancel-text="取消操作"
          confirm-type="danger"
          cancel-type="warning"
        >
          <t-button type="danger">删除文件</t-button>
        </t-pop-confirm>
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
  margin: 0 0 20px;
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
  gap: 36px;
}

.block-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.block-section h4 {
  margin: 0;
  font-size: 14px;
  color: #303133;
}
</style> 