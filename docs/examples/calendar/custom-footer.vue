<template>
  <div class="example-container">
    <t-calendar v-model="date" ref="calendarRef">
      <template #footer>
        <div class="calendar-footer">
          <t-button size="small" type="primary" @click="jumpToToday">今天</t-button>
          <t-button size="small" @click="jumpToNextMonth">下个月</t-button>
          <t-button size="small" @click="switchMode">切换视图</t-button>
          <t-button size="small" @click="jumpToRandomDate">随机日期</t-button>
        </div>
      </template>
    </t-calendar>
    
    <div class="value-display">
      <p>当前选中日期: {{ formatDate(date) }}</p>
      <p>当前面板模式: {{ currentMode }}</p>
      <div class="event-log">
        <div class="event-title">事件记录:</div>
        <div v-for="(event, index) in eventLogs" :key="index" class="event-item">{{ event }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { TCalendar, TButton } from "tune-ui";
import type { ModeType } from "@/packages/calendar/calendar";

const date = ref(new Date());
const calendarRef = ref();
const currentMode = ref("date");
const eventLogs = reactive([]);

/**
 * 格式化日期
 * @param date 日期对象
 * @returns 格式化后的日期字符串
 */
const formatDate = date => {
  if (!date) return "未选择";
  if (typeof date === "string") return date;
  if (typeof date === "number") return new Date(date).toLocaleString();
  return date.toLocaleString();
};

/**
 * 记录事件
 * @param event 事件描述
 */
const logEvent = event => {
  eventLogs.unshift(event);
  if (eventLogs.length > 3) eventLogs.pop();
};

/**
 * 跳转到今天
 */
const jumpToToday = () => {
  const today = new Date();
  calendarRef.value.jumpToDate(today);
  logEvent(`跳转到今天: ${formatDate(today)}`);
};

/**
 * 跳转到下个月
 */
const jumpToNextMonth = () => {
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  calendarRef.value.jumpToDate(nextMonth);
  logEvent(`跳转到下个月: ${formatDate(nextMonth)}`);
};

/**
 * 切换模式
 */
const switchMode = () => {
  const modes = ["date", "month", "year"];
  const currentIndex = modes.indexOf(currentMode.value);
  const nextIndex = (currentIndex + 1) % modes.length;
  const nextMode = modes[nextIndex];
  
  calendarRef.value.switchPanelMode(nextMode);
  currentMode.value = nextMode;
  logEvent(`切换视图模式: ${nextMode}`);
};

/**
 * 跳转到随机日期
 */
const jumpToRandomDate = () => {
  // 生成-182到182天之间的随机数，即前后半年范围内
  const randomDays = Math.floor(Math.random() * 365) - 182;
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() + randomDays);
  
  calendarRef.value.jumpToDate(randomDate);
  logEvent(`跳转到随机日期: ${formatDate(randomDate)}`);
};
</script>

<style scoped>
.example-container {
  margin-bottom: 20px;
}

.calendar-footer {
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  border-top: 1px solid #ebeef5;
}

.value-display {
  margin-top: 16px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
}

.event-log {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #e0e0e0;
}

.event-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.event-item {
  padding: 4px 0;
  border-bottom: 1px dashed #ebeef5;
  font-size: 13px;
}
</style> 