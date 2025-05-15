<template>
  <div class="card-demo">
    <t-card>
      <template #headLeft>
        <div class="custom-header">
          <t-icon icon="home" />
          <span>自定义头部左侧</span>
        </div>
      </template>

      <template #headRight>
        <t-button size="small">设置</t-button>
      </template>

      <div class="card-content">
        <p>这是卡片的主体内容区域</p>
        <p>使用默认插槽展示内容</p>
      </div>

      <template #footer>
        <div class="custom-footer">
          <span>自定义底部内容</span>
          <div class="footer-buttons">
            <t-button size="small">取消</t-button>
            <t-button type="primary" size="small">确认</t-button>
          </div>
        </div>
      </template>
    </t-card>
  </div>
</template>

<script setup>
import { TCard, TIcon, TButton } from "tune-ui";
</script>

<style scoped>
.card-demo {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 6px;
}

.custom-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-content p {
  margin: 0;
  line-height: 1.6;
  color: #606266;
}

.custom-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.footer-buttons {
  display: flex;
  gap: 8px;
}
</style>
