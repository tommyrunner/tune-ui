<template>
  <div class="badge-demo">
    <div class="control-panel">
      <div class="control-value">当前数值: {{ count }}</div>
      <div class="control-buttons">
        <button class="control-button" @click="handleDecrease" :disabled="count <= 0">-</button>
        <button class="control-button" @click="handleIncrease">+</button>
      </div>
    </div>

    <div class="badge-row">
      <t-badge :value="count" :hiddenValue="0">
        <div class="badge-box">数值为0时隐藏</div>
      </t-badge>

      <t-badge :value="count" :hiddenValue="5">
        <div class="badge-box">数值为5时隐藏</div>
      </t-badge>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const count = ref(3);

const handleIncrease = () => {
  count.value++;
};

const handleDecrease = () => {
  if (count.value > 0) {
    count.value--;
  }
};
</script>

<style scoped>
.badge-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.control-panel {
  display: flex;
  align-items: center;
  gap: 16px;
}

.control-value {
  font-size: 16px;
  color: #606266;
  min-width: 100px;
}

.control-buttons {
  display: flex;
  gap: 8px;
}

.control-button {
  width: 32px;
  height: 32px;
  border: 1px solid #dcdfe6;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-button:hover {
  color: #409eff;
  border-color: #c6e2ff;
}

.control-button:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  border-color: #ebeef5;
}

.badge-row {
  display: flex;
  gap: 40px;
}

.badge-box {
  width: 100px;
  height: 100px;
  background: #f0f0f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #606266;
  text-align: center;
}
</style>
