<template>
  <div class="test-container">
    <h2>Calendar 日历组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="calendar-wrapper">
        <t-calendar v-model="state.date" :default-select-today="false" />
        <div class="value-display">
          <div>当前选中日期：{{ formatDisplayDate(state.date) }}</div>
          <div>类型：{{ typeof state.date }}</div>
        </div>
      </div>
    </test-section>

    <!-- 自定义日期单元格 -->
    <test-section title="自定义日期单元格">
      <div class="calendar-wrapper">
        <t-calendar v-model="state.customCellDate">
          <template #date="{ date }">
            <div :class="['custom-date', isSelected(date) && 'is-selected']">
              {{ date.getDate() }}
              <div v-if="isHoliday(date)" class="holiday-mark">休</div>
            </div>
          </template>
        </t-calendar>
        <div class="value-display">
          <div>当前选中日期：{{ formatDisplayDate(state.customCellDate) }}</div>
          <div class="cell-info">
            <div>自定义单元格样式说明：</div>
            <div>- 周末显示为蓝色</div>
            <div>- 假日标记为"休"</div>
            <div>- 选中日期使用自定义背景色</div>
          </div>
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
        <div class="value-display">
          <div>日期模式：{{ formatDisplayDate(state.modeDate) }}</div>
          <div>月份模式：{{ formatDisplayDate(state.modeMonth) }}</div>
          <div>年份模式：{{ formatDisplayDate(state.modeYear) }}</div>
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

    <!-- 禁用日期 -->
    <test-section title="禁用日期">
      <div class="calendar-wrapper">
        <div class="calendar-item">
          <div class="calendar-label">禁用今天之前的日期：</div>
          <t-calendar v-model="state.disabledBeforeTodayDate" :disabled-date="disableDateBeforeToday" />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">禁用周末：</div>
          <t-calendar v-model="state.disabledWeekendDate" :disabled-date="disableWeekend" />
        </div>
        <div class="value-display">
          <div>禁用今天之前：{{ formatDisplayDate(state.disabledBeforeTodayDate) }}</div>
          <div>禁用周末：{{ formatDisplayDate(state.disabledWeekendDate) }}</div>
          <div class="disabled-info">
            <div>禁用规则说明：</div>
            <div>- 今天之前的日期已被禁用</div>
            <div>- 周末（周六和周日）已被禁用</div>
          </div>
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

    <!-- 时间选择器(禁用时间视图) -->
    <test-section title="时间选择器(禁用时间视图)">
      <div class="calendar-wrapper">
        <div class="calendar-item">
          <div class="calendar-label">带时间选择 + 禁用时间视图：</div>
          <t-calendar v-model="state.timeFormattedTime" :disabled-time-view="true" show-time value-format="YYYY-MM-DD HH:mm:ss" />
        </div>
        <div class="calendar-item">
          <div class="calendar-label">带时间选择 + 启用时间视图：</div>
          <t-calendar
            v-model="state.timeFormattedTimeEnabled"
            :disabled-time-view="false"
            show-time
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </div>
        <div class="value-display">
          <div>禁用时间视图：{{ state.timeFormattedTime }}</div>
          <div>启用时间视图：{{ state.timeFormattedTimeEnabled }}</div>
          <div class="time-tip">
            <div>说明：</div>
            <div>- 禁用时间视图：点击日期后不会显示时间选择面板</div>
            <div>- 启用时间视图：点击日期后会显示时间选择面板</div>
          </div>
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
          <div class="buttons">
            <t-button size="small" @click="clearEventLogs">清空事件记录</t-button>
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
import { formatDate } from "@/utils";
import type { ModeType } from "@/packages/calendar/calendar";

defineOptions({ name: "CalendarTest" });

// 组件状态
const state = reactive({
  // 基础用法
  date: new Date(),

  // 自定义单元格
  customCellDate: new Date(),

  // 不同模式
  modeDate: new Date(),
  modeMonth: new Date(),
  modeYear: new Date(),

  // 格式化输出测试
  formattedDate: new Date(),
  formattedDateTime: new Date(),
  formattedChinese: new Date(),

  // 不同输入类型测试
  stringInput: "2023-05-15",
  dateInput: new Date(),
  timestampInput: Date.now(),

  // 禁用日期
  disabledBeforeTodayDate: new Date(),
  disabledWeekendDate: new Date(),

  // 时间选择器
  timeFormatted: new Date(),
  timeFormattedTime: new Date(),
  timeFormattedTimeEnabled: new Date(),

  // 事件测试
  eventDate: new Date(),
  eventLogs: [] as string[],
  currentMode: "date" as ModeType
});

// 日历组件引用
const eventCalendarRef = ref();

/**
 * 格式化显示日期
 * @param date 日期值
 * @returns 格式化后的日期字符串
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
 * 清空事件记录
 */
const clearEventLogs = () => {
  state.eventLogs = [];
};

/**
 * 判断日期是否为周末
 * @param date 日期对象
 * @returns 是否为周末
 */
const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

/**
 * 判断日期是否为假期（示例）
 * @param date 日期对象
 * @returns 是否为假期
 */
const isHoliday = (date: Date) => {
  // 这里只是示例，实际应用中可以根据节假日列表判断
  const holidays = [
    "2023-01-01", // 元旦
    "2023-01-22", // 春节
    "2023-04-05", // 清明节
    "2023-05-01", // 劳动节
    "2023-06-22", // 端午节
    "2023-09-29", // 中秋节
    "2023-10-01" // 国庆节
  ];

  const dateStr = formatDate(date, "YYYY-MM-DD");
  return holidays.includes(dateStr) || isWeekend(date);
};

/**
 * 判断日期是否被选中
 * @param date 日期对象
 * @returns 是否被选中
 */
const isSelected = (date: Date) => {
  if (!state.customCellDate) return false;
  return isSameDay(date, new Date(state.customCellDate));
};

/**
 * 判断是否是同一天
 * @param date1 日期1
 * @param date2 日期2
 */
const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
  );
};

/**
 * 禁用今天之前的日期
 * @param date 日期对象
 * @returns 是否禁用
 */
const disableDateBeforeToday = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * 禁用周末
 * @param date 日期对象
 * @returns 是否禁用
 */
const disableWeekend = (date: Date) => {
  return isWeekend(date);
};

/**
 * 处理日期变化事件
 * @param value 变化后的值
 */
const handleChange = (value: any) => {
  state.eventLogs.unshift(`change: ${formatDisplayDate(value)}`);
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理面板变化事件
 * @param mode 面板模式
 */
const handlePanelChange = (mode: ModeType) => {
  state.currentMode = mode;
  state.eventLogs.unshift(`panel-change: ${mode}`);
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理跳转到指定日期事件
 * @param date 日期对象
 */
const handleJumpToDate = (date: Date) => {
  state.eventLogs.unshift(`jump-to-date: ${formatDisplayDate(date)}`);
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理时间变化事件
 * @param date 日期对象
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

.buttons {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}

.time-tip,
.cell-info,
.disabled-info {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #ebeef5;
  font-size: 12px;
  color: #909399;
}

/* 自定义日期单元格样式 */
:deep(.custom-date) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;

  &.is-selected {
    color: white;
  }

  .holiday-mark {
    position: absolute;
    right: 2px;
    top: 2px;
    font-size: 10px;
    color: #f56c6c;
    line-height: 1;
  }
}

:deep(.weekend-cell) {
  color: #409eff;
}

:deep(.holiday-cell) {
  color: #f56c6c;
}
</style>
