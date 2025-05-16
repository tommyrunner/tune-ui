<template>
  <div class="example-container">
    <div class="row">
      <div class="item">
        <p>基础日期选择器：</p>
        <t-date-picker v-model="date" placeholder="请选择日期" />
        <div class="value-display">当前值: {{ date }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TDatePicker } from "tune-ui";

// 基础示例数据
const date = ref(new Date());
</script>

<style lang="scss" scoped>
.example-container {
  width: 100%;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 20px;

  .item {
    flex: 1;
    min-width: 250px;

    p {
      margin-bottom: 8px;
      font-weight: 500;
    }
  }
}

.value-display {
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  font-family: monospace;
}
</style>
