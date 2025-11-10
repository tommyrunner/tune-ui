<template>
  <div class="example-container">
    <div class="format-item">
      <h4>日期格式化 (YYYY-MM-DD)</h4>
      <t-calendar v-model="formattedDate" value-format="YYYY-MM-DD" />
    </div>
    
    <div class="format-item">
      <h4>日期时间格式化 (YYYY-MM-DD HH:mm:ss)</h4>
      <t-calendar v-model="formattedDateTime" show-time value-format="YYYY-MM-DD HH:mm:ss" />
    </div>
    
    <div class="format-item">
      <h4>中文格式化 (YYYY年MM月DD日)</h4>
      <t-calendar v-model="formattedChinese" value-format="YYYY年MM月DD日" />
    </div>
    
    <div class="value-display">
      <p>日期格式化：{{ formattedDate }} <span class="type-info">(类型: {{ typeof formattedDate }})</span></p>
      <p>日期时间格式化：{{ formattedDateTime }} <span class="type-info">(类型: {{ typeof formattedDateTime }})</span></p>
      <p>中文格式化：{{ formattedChinese }} <span class="type-info">(类型: {{ typeof formattedChinese }})</span></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";


// 初始化不同格式的日期
const formattedDate = ref("2023-07-15");
const formattedDateTime = ref("2023-07-15 12:30:00");
const formattedChinese = ref("2023年07月15日");
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.format-item {
  margin-bottom: 20px;
}

.format-item h4 {
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

.type-info {
  color: #909399;
  font-size: 12px;
}
</style> 