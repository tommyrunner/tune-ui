<template>
  <div class="demo-container">
    <p class="demo-desc">气泡确认框常用于需要用户二次确认的操作场景，如删除、修改等。</p>
    
    <div class="demo-block">
      <div class="block-item">
        <t-pop-confirm content="确定要删除这条记录吗？">
          <t-button type="danger">删除</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="block-item">
        <t-pop-confirm content="确定要禁用此功能吗？" disabled>
          <t-button type="info">禁用状态</t-button>
        </t-pop-confirm>
        <span class="tip-text">禁用状态下不会触发气泡确认框</span>
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

.demo-block {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.block-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.tip-text {
  font-size: 12px;
  color: #909399;
}
</style> 