<template>
  <div class="test-container">
    <h2>Calendar 日历组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="calendar-wrapper">
        <t-calendar v-model="state.date" />
        <div class="value-display">
          <div>默认日期对象：{{ formatDisplayDate(state.date) }}</div>
          <div>类型：{{ typeof state.date }}</div>
        </div>
      </div>
    </test-section>

    <!-- 格式化输出测试 -->
    <test-section title="格式化输出测试">
      <div class="calendar-wrapper">
        <div class="calendar-item">
          <div class="calendar-label">日期格式化 (YYYY-MM-DD)：</div>
          <t-calendar v-model="state.formattedDate" value-format="YYYY-MM-DD" />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">日期时间格式化 (YYYY-MM-DD HH:mm:ss)：</div>
          <t-calendar v-model="state.formattedDateTime" show-time value-format="YYYY-MM-DD HH:mm:ss" />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">中文格式化 (YYYY年MM月DD日)：</div>
          <t-calendar v-model="state.formattedChinese" value-format="YYYY年MM月DD日" />
        </div>
        <div class="value-display">
          <div>日期格式化：{{ state.formattedDate }} (类型: {{ typeof state.formattedDate }})</div>
          <div>日期时间格式化：{{ state.formattedDateTime }} (类型: {{ typeof state.formattedDateTime }})</div>
          <div>中文格式化：{{ state.formattedChinese }} (类型: {{ typeof state.formattedChinese }})</div>
        </div>
      </div>
    </test-section>

    <!-- 不同输入类型测试 -->
    <test-section title="不同输入类型测试">
      <div class="calendar-wrapper">
        <div class="calendar-item">
          <div class="calendar-label">字符串输入 + 格式化输出：</div>
          <t-calendar v-model="state.stringInput" value-format="YYYY-MM-DD" />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">Date对象输入 + 格式化输出：</div>
          <t-calendar v-model="state.dateInput" value-format="YYYY-MM-DD" />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">时间戳输入 + 格式化输出：</div>
          <t-calendar v-model="state.timestampInput" value-format="YYYY-MM-DD" />
        </div>
        <div class="value-display">
          <div>字符串输入：{{ state.stringInput }} (类型: {{ typeof state.stringInput }})</div>
          <div>Date对象输入：{{ state.dateInput }} (类型: {{ typeof state.dateInput }})</div>
          <div>时间戳输入：{{ state.timestampInput }} (类型: {{ typeof state.timestampInput }})</div>
          <div class="buttons">
            <t-button size="small" @click="resetInputs">重置输入</t-button>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 不同模式 -->
    <test-section title="不同模式">
      <div class="calendar-wrapper">
        <div class="calendar-item">
          <div class="calendar-label">日期模式 + 格式化：</div>
          <t-calendar v-model="state.modeDateFormatted" mode="date" value-format="YYYY-MM-DD" />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">月份模式 + 格式化：</div>
          <t-calendar v-model="state.modeMonthFormatted" mode="month" value-format="YYYY-MM" />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">年份模式 + 格式化：</div>
          <t-calendar v-model="state.modeYearFormatted" mode="year" value-format="YYYY" />
        </div>
        <div class="value-display">
          <div>日期模式：{{ state.modeDateFormatted }}</div>
          <div>月份模式：{{ state.modeMonthFormatted }}</div>
          <div>年份模式：{{ state.modeYearFormatted }}</div>
        </div>
      </div>
    </test-section>

    <!-- 时间选择器 -->
    <test-section title="时间选择器">
      <div class="calendar-wrapper">
        <div class="calendar-item">
          <div class="calendar-label">带时间选择 + 格式化：</div>
          <t-calendar v-model="state.timeFormatted" show-time value-format="YYYY-MM-DD HH:mm:ss" />
        </div>
        <div class="value-display">
          <div>时间值：{{ state.timeFormatted }}</div>
          <div>类型：{{ typeof state.timeFormatted }}</div>
        </div>
      </div>
    </test-section>
    <!-- 时间选择器(修改) -->
    <test-section title="时间选择器(修改)">
      <div class="calendar-wrapper">
        <div class="calendar-item">
          <div class="calendar-label">带时间选择 + 格式化：</div>
          <t-calendar
            v-model="state.timeFormattedTime"
            :disabled-time-view="false"
            show-time
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </div>
        <div class="value-display">
          <div>时间值：{{ state.timeFormattedTime }}</div>
          <div>类型：{{ typeof state.timeFormattedTime }}</div>
        </div>
      </div>
    </test-section>

    <!-- 事件监听 -->
    <test-section title="事件监听">
      <div class="calendar-wrapper">
        <t-calendar
          v-model="state.eventDate"
          show-time
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="handleChange"
          @panel-change="handlePanelChange"
          @jump-to-date="handleJumpToDate"
          @time-change="handleTimeChange"
          ref="eventCalendarRef"
        >
          <template #footer>
            <div class="calendar-footer">
              <t-button size="small" type="info" @click="handleJumpToRandomDate">随机日期</t-button>
              <t-button size="small" type="info" @click="handleSwitchPanel">切换面板</t-button>
            </div>
          </template>
        </t-calendar>
        <div class="value-display">
          <div>当前值：{{ state.eventDate }}</div>
          <div class="event-log">
            <div class="event-title">事件记录:</div>
            <div v-for="(event, index) in state.eventLogs" :key="index" class="event-item">{{ event }}</div>
          </div>
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { TCalendar } from "@/packages/calendar";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";
import type { ModeType } from "@/packages/calendar/calendar";
import { formatDate } from "@/utils/dateFormat";

defineOptions({ name: "CalendarTest" });

// 组件状态
const state = reactive({
  // 基础用法
  date: new Date(),

  // 格式化输出测试
  formattedDate: formatDate(new Date(), "YYYY-MM-DD"),
  formattedDateTime: formatDate(new Date(), "YYYY-MM-DD HH:mm:ss"),
  formattedChinese: formatDate(new Date(), "YYYY年MM月DD日"),

  // 不同输入类型测试
  stringInput: "2023-05-15",
  dateInput: new Date(),
  timestampInput: Date.now(),

  // 不同模式
  modeDateFormatted: formatDate(new Date(), "YYYY-MM-DD"),
  modeMonthFormatted: formatDate(new Date(), "YYYY-MM"),
  modeYearFormatted: formatDate(new Date(), "YYYY"),

  // 时间选择器
  timeFormatted: formatDate(new Date(), "YYYY-MM-DD HH:mm:ss"),
  timeFormattedTime: formatDate(new Date(), "YYYY-MM-DD HH:mm:ss"),

  // 事件测试
  eventDate: formatDate(new Date(), "YYYY-MM-DD HH:mm:ss"),
  eventLogs: [] as string[],
  currentMode: "date" as ModeType
});

// 日历组件引用
const eventCalendarRef = ref();

/**
 * 格式化显示日期
 */
const formatDisplayDate = (date: Date | string | number | null) => {
  if (!date) return "未选择";
  if (typeof date === "string") return date;
  if (typeof date === "number") return new Date(date).toLocaleString();
  return date.toLocaleString();
};

/**
 * 重置输入
 */
const resetInputs = () => {
  state.stringInput = "2023-05-15";
  state.dateInput = new Date();
  state.timestampInput = Date.now();
};

/**
 * 处理日期变化事件
 */
const handleChange = (value: any) => {
  state.eventLogs.unshift(`change: ${formatDisplayDate(value)}`);
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理面板变化事件
 */
const handlePanelChange = (mode: ModeType) => {
  state.currentMode = mode;
  state.eventLogs.unshift(`panel-change: ${mode}`);
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理跳转到指定日期事件
 */
const handleJumpToDate = (date: Date) => {
  state.eventLogs.unshift(`jump-to-date: ${formatDisplayDate(date)}`);
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理时间变化事件
 */
const handleTimeChange = (date: Date) => {
  state.eventLogs.unshift(`time-change: ${formatDisplayDate(date)}`);
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 跳转到随机日期
 */
const handleJumpToRandomDate = () => {
  if (!eventCalendarRef.value) return;
  const randomDays = Math.floor(Math.random() * 365) - 182; // -182 to 182 days
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() + randomDays);
  eventCalendarRef.value.jumpToDate(randomDate);
};

/**
 * 切换面板
 */
const handleSwitchPanel = () => {
  const modes: ModeType[] = ["date", "month", "year"];
  const currentIndex = modes.indexOf(state.currentMode);
  const nextIndex = (currentIndex + 1) % modes.length;
  state.currentMode = modes[nextIndex];
  state.eventLogs.unshift(`手动切换面板: ${state.currentMode}`);
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;
}

.calendar-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.calendar-item {
  flex: 1;
  min-width: 300px;
}

.calendar-label {
  margin-bottom: 8px;
  font-weight: 500;
}

.value-display {
  margin-top: 16px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
}

.calendar-footer {
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  border-top: 1px solid #ebeef5;
}

.event-log {
  margin-top: 8px;
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

.custom-date {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;

  &.is-special {
    background-color: rgba(64, 158, 255, 0.1);
    color: #409eff;
  }
}

.buttons {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}

.time-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #909399;
}
</style>
