<template>
  <div class="test-container">
    <h2>Calendar 日历组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="calendar-wrapper">
        <t-calendar v-model="state.date" />
        <div class="value-display">
          <div>默认日期对象：{{ state.date?.toLocaleDateString() }}</div>
        </div>
      </div>
    </test-section>

    <!-- 不同模式 -->
    <test-section title="不同模式">
      <div class="calendar-wrapper">
        <div class="calendar-item">
          <div class="calendar-label">日期模式：</div>
          <t-calendar v-model="state.modeDate" mode="date" />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">月份模式：</div>
          <t-calendar v-model="state.modeMonth" mode="month" />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">年份模式：</div>
          <t-calendar v-model="state.modeYear" mode="year" />
        </div>
      </div>
    </test-section>

    <!-- 时间选择器 -->
    <test-section title="时间选择器">
      <div class="calendar-wrapper">
        <div class="calendar-item">
          <div class="calendar-label">带时间选择（可修改）：</div>
          <t-calendar v-model="state.timeDate" show-time />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">带时间选择（禁用）：</div>
          <t-calendar v-model="state.timeDisabledDate" show-time disabled />
        </div>
        <div class="value-display">
          <div>可修改时间值：{{ formatDisplayDate(state.timeDate) }}</div>
          <div>禁用时间值：{{ formatDisplayDate(state.timeDisabledDate) }}</div>
          <div class="time-tip">点击时间可打开时分秒选择面板</div>
        </div>
      </div>
    </test-section>

    <!-- 时间选择器视图模式 -->
    <test-section title="时间选择器视图模式">
      <div class="calendar-wrapper">
        <div class="calendar-item">
          <div class="calendar-label">可编辑时间：</div>
          <t-calendar v-model="state.timeEditableDate" show-time :disabled-time-view="false" />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">只读时间：</div>
          <t-calendar v-model="state.timeReadonlyDate" show-time :disabled-time-view="true" />
        </div>
        <div class="value-display">
          <div>可编辑时间值：{{ formatDisplayDate(state.timeEditableDate) }}</div>
          <div>只读时间值：{{ formatDisplayDate(state.timeReadonlyDate) }}</div>
          <div class="time-tip">只读模式下时间显示但不可点击修改</div>
        </div>
      </div>
    </test-section>

    <!-- 格式化输出 -->
    <test-section title="格式化输出">
      <div class="calendar-wrapper">
        <div class="calendar-item">
          <div class="calendar-label">日期格式化：</div>
          <t-calendar v-model="state.formattedDate" value-format="YYYY-MM-DD" />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">日期时间格式化：</div>
          <t-calendar v-model="state.formattedDateTime" show-time value-format="YYYY-MM-DD HH:mm:ss" />
        </div>
        <div class="value-display">
          <div>日期格式化：{{ state.formattedDate }}</div>
          <div>日期时间格式化：{{ state.formattedDateTime }}</div>
        </div>
      </div>
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <div class="calendar-wrapper">
        <div class="calendar-item">
          <div class="calendar-label">完全禁用：</div>
          <t-calendar v-model="state.disabledAll" disabled />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">禁用特定日期：</div>
          <t-calendar v-model="state.disabledDate" :disabled-date="handleDisabledDate" />
        </div>
        <div class="value-display">
          <div>禁用规则：不可选择过去的日期</div>
          <div>当前值：{{ formatDisplayDate(state.disabledDate) }}</div>
        </div>
      </div>
    </test-section>

    <!-- 自定义日期内容 -->
    <test-section title="自定义日期内容">
      <div class="calendar-wrapper">
        <t-calendar v-model="state.customDate">
          <template #date="{ date }">
            <div class="custom-date" :class="{ 'is-special': isSpecialDay(date) }">
              <template v-if="isFirstOrLastDay(date)">
                {{ isFirstDay(date) ? "开始" : "结束" }}
              </template>
              <template v-else-if="isToday(date)">
                今天
              </template>
              <template v-else>
                {{ date.getDate() }}
              </template>
            </div>
          </template>
        </t-calendar>
        <div class="value-display">
          <div>自定义规则：</div>
          <div>- 每月第一天显示"开始"</div>
          <div>- 每月最后一天显示"结束"</div>
          <div>- 今天显示"今天"</div>
          <div>- 周末日期显示特殊样式</div>
        </div>
      </div>
    </test-section>

    <!-- 自定义底部 -->
    <test-section title="自定义底部">
      <div class="calendar-wrapper">
        <t-calendar v-model="state.footerDate" ref="calendarRef">
          <template #footer>
            <div class="calendar-footer">
              <t-button size="small" @click="handleJumpToYesterday">昨天</t-button>
              <t-button size="small" @click="handleJumpToToday">今天</t-button>
              <t-button size="small" @click="handleJumpToTomorrow">明天</t-button>
              <t-button size="small" @click="handleJumpToNextWeek">下周</t-button>
            </div>
          </template>
        </t-calendar>
        <div class="value-display">
          <div>点击按钮可快速跳转日期</div>
          <div>当前值：{{ formatDisplayDate(state.footerDate) }}</div>
        </div>
      </div>
    </test-section>

    <!-- 事件监听 -->
    <test-section title="事件监听">
      <div class="calendar-wrapper">
        <t-calendar
          v-model="state.eventDate"
          show-time
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
  
  // 不同模式
  modeDate: new Date(),
  modeMonth: new Date(),
  modeYear: new Date(),
  
  // 时间选择器
  timeDate: new Date(),
  timeDisabledDate: new Date(),
  timeEditableDate: new Date(),
  timeReadonlyDate: new Date(),
  time24Format: formatDate(new Date(), "YYYY-MM-DD HH:mm:ss"),
  timeCustomFormat: formatDate(new Date(), "YYYY年MM月DD日 HH时mm分ss秒"),
  timeEventDate: new Date(),
  timeChangeLogs: [] as string[],
  
  // 格式化输出
  formattedDate: formatDate(new Date(), "YYYY-MM-DD"),
  formattedDateTime: formatDate(new Date(), "YYYY-MM-DD HH:mm:ss"),
  
  // 禁用状态
  disabledAll: new Date(),
  disabledDate: new Date(),
  
  // 自定义内容
  customDate: new Date(),
  footerDate: new Date(),
  
  // 事件测试
  eventDate: new Date(),
  eventLogs: [] as string[],
  currentMode: "date" as ModeType
});

// 日历组件引用
const calendarRef = ref();
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
 * 处理禁用日期
 */
const handleDisabledDate = (date: Date) => {
  return date < new Date(new Date().setHours(0, 0, 0, 0));
};

/**
 * 判断是否是今天
 */
const isToday = (date: Date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && 
         date.getMonth() === today.getMonth() && 
         date.getFullYear() === today.getFullYear();
};

/**
 * 判断是否是周末
 */
const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

/**
 * 判断是否是特殊日期
 */
const isSpecialDay = (date: Date) => {
  return isWeekend(date);
};

/**
 * 判断是否是每月第一天
 */
const isFirstDay = (date: Date) => {
  return date.getDate() === 1;
};

/**
 * 判断是否是每月最后一天
 */
const isLastDay = (date: Date) => {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return date.getDate() === lastDay.getDate();
};

/**
 * 判断是否是每月第一天或最后一天
 */
const isFirstOrLastDay = (date: Date) => {
  return isFirstDay(date) || isLastDay(date);
};

/**
 * 处理跳转到昨天
 */
const handleJumpToYesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  calendarRef.value?.jumpToDate(yesterday);
};

/**
 * 处理跳转到今天
 */
const handleJumpToToday = () => {
  const calendar = calendarRef.value || eventCalendarRef.value;
  calendar?.jumpToDate(new Date());
};

/**
 * 处理跳转到明天
 */
const handleJumpToTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  calendarRef.value?.jumpToDate(tomorrow);
};

/**
 * 处理跳转到下周
 */
const handleJumpToNextWeek = () => {
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  calendarRef.value?.jumpToDate(nextWeek);
};

/**
 * 处理跳转到随机日期
 */
const handleJumpToRandomDate = () => {
  const randomDays = Math.floor(Math.random() * 365) - 182; // -182 到 182 之间的随机数
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() + randomDays);
  eventCalendarRef.value?.jumpToDate(randomDate);
};

/**
 * 处理切换面板
 */
const handleSwitchPanel = () => {
  const modes: ModeType[] = ["date", "month", "year"];
  const currentIndex = modes.indexOf(state.currentMode);
  const nextIndex = (currentIndex + 1) % modes.length;
  state.currentMode = modes[nextIndex];
  
  // 记录事件
  addEventLog(`手动切换面板到: ${state.currentMode}`);
};

/**
 * 添加事件日志
 */
const addEventLog = (message: string) => {
  state.eventLogs.unshift(message);
  if (state.eventLogs.length > 5) {
    state.eventLogs.pop();
  }
};

/**
 * 处理日期变化
 */
const handleChange = (date: Date | string | number) => {
  addEventLog(`change事件: ${formatDisplayDate(date)}`);
};

/**
 * 处理面板变化
 */
const handlePanelChange = (mode: ModeType) => {
  state.currentMode = mode;
  addEventLog(`panel-change事件: ${mode}`);
};

/**
 * 处理日期跳转
 */
const handleJumpToDate = (date: Date) => {
  addEventLog(`jump-to-date事件: ${formatDisplayDate(date)}`);
};

/**
 * 处理时间变化
 */
const handleTimeChange = (date: Date) => {
  addEventLog(`time-change事件: ${formatDisplayDate(date)}`);
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 32px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;

  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
  }

  .calendar-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: flex-start;
    margin-bottom: 16px;

    .calendar-item {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .calendar-label {
        font-weight: 500;
        color: #4b5563;
      }
    }

    .value-display {
      padding: 12px;
      background-color: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      color: #4b5563;
      font-size: 14px;
      min-width: 200px;
    }

    .calendar-footer {
      display: flex;
      gap: 8px;
      justify-content: center;
      padding: 8px;
      border-top: 1px solid #e5e7eb;
    }
  }

  .custom-date {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.is-special {
      color: #ef4444;
      font-weight: 500;
    }
  }

  .event-log {
    width: 100%;

    .event-title {
      margin-bottom: 8px;
      font-weight: 500;
      color: #374151;
    }

    .event-item {
      padding: 4px 0;
      color: #666;
      font-size: 14px;
      font-family: monospace;
      border-bottom: 1px dashed #e5e7eb;
    }
  }

  .time-tip {
    margin-top: 8px;
    font-size: 12px;
    color: #666;
  }
}
</style>
