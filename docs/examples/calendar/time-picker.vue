<template>
  <div class="example-container">
    <div class="time-item">
      <h4>带时间选择</h4>
      <t-calendar v-model="dateTime" show-time value-format="YYYY-MM-DD HH:mm:ss" />
    </div>
    
    <div class="time-item">
      <h4>禁用时间视图（自动同步当前时间）</h4>
      <t-calendar v-model="dateTimeDisabled" show-time :disabled-time-view="true" value-format="YYYY-MM-DD HH:mm:ss" />
    </div>
    
    <div class="time-item">
      <h4>启用时间视图（可手动选择时间）</h4>
      <t-calendar v-model="dateTimeEnabled" show-time :disabled-time-view="false" value-format="YYYY-MM-DD HH:mm:ss" />
    </div>
    
    <div class="value-display">
      <p>带时间选择: {{ dateTime }}</p>
      <p>禁用时间视图: {{ dateTimeDisabled }}</p>
      <p>启用时间视图: {{ dateTimeEnabled }}</p>
      <div class="time-tip">
        <div>说明：</div>
        <div>- 禁用时间视图：点击日期后不会显示时间选择面板，使用系统当前时间</div>
        <div>- 启用时间视图：点击日期后会显示时间选择面板，可以手动选择时间</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TCalendar } from "tune-ui";

// 使用当前时间初始化
const now = new Date();
const formatNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

const dateTime = ref(formatNow);
const dateTimeDisabled = ref(formatNow);
const dateTimeEnabled = ref(formatNow);
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.time-item {
  margin-bottom: 20px;
}

.time-item h4 {
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
}

.value-display {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
}

.time-tip {
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px dashed #e0e0e0;
  font-size: 12px;
  color: #909399;
}
</style> 