<template>
  <div class="example-container">
    <div class="row">
      <div class="item">
        <p>日期模式（默认）：</p>
        <t-date-picker v-model="dateValue" mode="date" />
      </div>

      <div class="item">
        <p>月份模式：</p>
        <t-date-picker v-model="monthValue" mode="month" />
      </div>
    </div>

    <div class="row">
      <div class="item">
        <p>年份模式：</p>
        <t-date-picker v-model="yearValue" mode="year" />
      </div>

      <div class="item">
        <p>值格式化示例：</p>
        <t-date-picker v-model="formattedValue" mode="month" format="YYYY年MM月" value-format="YYYY-MM" />
        <div class="value-display">当前值: {{ formattedValue }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TDatePicker } from "tune-ui";

// 日期模式数据
const dateValue = ref(new Date());
const monthValue = ref(new Date());
const yearValue = ref(new Date());
const formattedValue = ref("2023-06");
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
