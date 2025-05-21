<template>
  <div class="color-picker-demo">
    <div class="demo-item">
      <t-color-picker v-model="color" disabled />
      <div class="demo-label">禁用状态</div>
    </div>
    
    <div class="demo-controls">
      <div class="demo-value">当前颜色值: {{ color }}</div>
      <t-button @click="toggleDisabled">
        {{ isDisabled ? '启用' : '禁用' }}
      </t-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


// 默认颜色值
const color = ref("#409EFF");
const isDisabled = ref(true);

// 切换禁用状态
const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};
</script>

<style scoped>
.color-picker-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.demo-label {
  font-size: 14px;
  color: #606266;
}

.demo-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.demo-value {
  font-size: 14px;
  color: #606266;
}
</style> 