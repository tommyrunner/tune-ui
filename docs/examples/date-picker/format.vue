<template>
  <div class="example-container">
    <div class="row">
      <div class="item">
        <p>默认日期格式：</p>
        <t-date-picker v-model="defaultDate" placeholder="默认显示格式" />
      </div>

      <div class="item">
        <p>自定义显示格式：</p>
        <t-date-picker v-model="formattedDisplayDate" format="YYYY年MM月DD日" placeholder="自定义显示格式" />
      </div>
    </div>

    <div class="row">
      <div class="item">
        <p>值格式化为字符串：</p>
        <t-date-picker v-model="stringValueDate" value-format="YYYY-MM-DD" placeholder="值格式化为字符串" />
        <div class="value-display">当前值: {{ typeof stringValueDate }} {{ stringValueDate }}</div>
      </div>

      <div class="item">
        <p>值格式化为时间戳：</p>
        <t-date-picker v-model="timestampValueDate" value-format="timestamp" placeholder="值格式化为时间戳" />
        <div class="value-display">当前值: {{ typeof timestampValueDate }} {{ timestampValueDate }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";


// 格式化示例数据
const defaultDate = ref(new Date());
const formattedDisplayDate = ref(new Date());
const stringValueDate = ref("2023-06-15");
const timestampValueDate = ref(1686816000000); // 对应2023-06-15
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
