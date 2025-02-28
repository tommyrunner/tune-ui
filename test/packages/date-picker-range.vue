<template>
  <div class="test-container">
    <h2>DatePickerRange 日期范围选择器组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="date-picker-section">
        <!-- 默认日期范围选择器 -->
        <div class="date-picker-block">
          <div class="date-picker-label">默认日期范围选择器：</div>
          <t-date-picker-range v-model="state.dateRange" value-format="YYYY-MM-DD" />
          <div class="value-display">
            <div>选择的日期范围：{{ state.dateRange }}</div>
            <div>类型：{{ typeof state.dateRange }}</div>
          </div>
        </div>

        <!-- 带前缀插槽 -->
        <div class="date-picker-block">
          <div class="date-picker-label">带前缀插槽：</div>
          <t-date-picker-range v-model="state.dateRangeWithPrefix">
            <template #prefix>
              <t-icon icon="calendar" :size="14" color="#409eff" />
            </template>
          </t-date-picker-range>
          <div class="value-display">
            <div>选择的日期范围：{{ state.dateRangeWithPrefix }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- valueFormat格式化 -->
    <test-section title="valueFormat格式化">
      <div class="date-picker-section">
        <!-- 日期格式化 -->
        <div class="date-picker-block">
          <div class="date-picker-label">日期格式化 (YYYY-MM-DD)：</div>
          <t-date-picker-range v-model="state.formattedDateRange" value-format="YYYY-MM-DD" />
          <div class="value-display">
            <div>值类型：{{ typeof state.formattedDateRange }}</div>
            <div>开始日期：{{ state.formattedDateRange?.[0] }}</div>
            <div>结束日期：{{ state.formattedDateRange?.[1] }}</div>
          </div>
        </div>

        <!-- 日期时间格式化 -->
        <div class="date-picker-block">
          <div class="date-picker-label">日期时间格式化 (YYYY-MM-DD HH:mm:ss)：</div>
          <t-date-picker-range v-model="state.formattedDateTimeRange" show-time value-format="YYYY-MM-DD HH:mm:ss" />
          <div class="value-display">
            <div>值类型：{{ typeof state.formattedDateTimeRange }}</div>
            <div>开始日期时间：{{ state.formattedDateTimeRange?.[0] }}</div>
            <div>结束日期时间：{{ state.formattedDateTimeRange?.[1] }}</div>
          </div>
        </div>

        <!-- 中文格式化 -->
        <div class="date-picker-block">
          <div class="date-picker-label">中文格式化 (YYYY年MM月DD日)：</div>
          <t-date-picker-range v-model="state.formattedChineseRange" value-format="YYYY年MM月DD日" />
          <div class="value-display">
            <div>值类型：{{ typeof state.formattedChineseRange }}</div>
            <div>开始日期：{{ state.formattedChineseRange?.[0] }}</div>
            <div>结束日期：{{ state.formattedChineseRange?.[1] }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 显示格式与值格式分离 -->
    <test-section title="显示格式与值格式分离">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">显示格式与值格式分离：</div>
          <t-date-picker-range v-model="state.formatSeparationRange" format="YYYY年MM月DD日" value-format="YYYY/MM/DD" />
          <div class="value-display">
            <div>显示格式：YYYY年MM月DD日</div>
            <div>值格式：YYYY/MM/DD</div>
            <div>开始日期：{{ state.formatSeparationRange?.[0] }}</div>
            <div>结束日期：{{ state.formatSeparationRange?.[1] }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 不同输入类型测试 -->
    <test-section title="不同输入类型测试">
      <div class="date-picker-section">
        <!-- 字符串输入 -->
        <div class="date-picker-block">
          <div class="date-picker-label">字符串输入 + 格式化输出：</div>
          <t-date-picker-range v-model="state.stringInputRange" value-format="YYYY-MM-DD" />
          <div class="value-display">
            <div>值类型：{{ typeof state.stringInputRange }}</div>
            <div>开始日期：{{ state.stringInputRange?.[0] }}</div>
            <div>结束日期：{{ state.stringInputRange?.[1] }}</div>
          </div>
        </div>

        <!-- Date对象输入 -->
        <div class="date-picker-block">
          <div class="date-picker-label">Date对象输入 + 格式化输出：</div>
          <t-date-picker-range v-model="state.dateInputRange" value-format="YYYY-MM-DD" />
          <div class="value-display">
            <div>值类型：{{ typeof state.dateInputRange }}</div>
            <div>开始日期：{{ state.dateInputRange?.[0] }}</div>
            <div>结束日期：{{ state.dateInputRange?.[1] }}</div>
          </div>
        </div>

        <!-- 重置按钮 -->
        <div class="date-picker-block">
          <div class="date-picker-label">重置输入：</div>
          <div class="buttons">
            <t-button size="small" @click="resetInputs">重置输入</t-button>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 不同模式 -->
    <test-section title="不同模式">
      <div class="date-picker-section">
        <!-- 日期模式 -->
        <div class="date-picker-block">
          <div class="date-picker-label">日期模式 + 格式化：</div>
          <t-date-picker-range v-model="state.modeDateFormattedRange" mode="date" value-format="YYYY-MM-DD" />
          <div class="value-display">
            <div>开始日期：{{ state.modeDateFormattedRange?.[0] }}</div>
            <div>结束日期：{{ state.modeDateFormattedRange?.[1] }}</div>
          </div>
        </div>

        <!-- 月份模式 -->
        <div class="date-picker-block">
          <div class="date-picker-label">月份模式 + 格式化：</div>
          <t-date-picker-range v-model="state.modeMonthFormattedRange" mode="month" value-format="YYYY-MM" />
          <div class="value-display">
            <div>开始月份：{{ state.modeMonthFormattedRange?.[0] }}</div>
            <div>结束月份：{{ state.modeMonthFormattedRange?.[1] }}</div>
          </div>
        </div>

        <!-- 年份模式 -->
        <div class="date-picker-block">
          <div class="date-picker-label">年份模式 + 格式化：</div>
          <t-date-picker-range v-model="state.modeYearFormattedRange" mode="year" value-format="YYYY" />
          <div class="value-display">
            <div>开始年份：{{ state.modeYearFormattedRange?.[0] }}</div>
            <div>结束年份：{{ state.modeYearFormattedRange?.[1] }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 时间选择器 -->
    <test-section title="时间选择器">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">带时间选择 + 格式化：</div>
          <t-date-picker-range v-model="state.timeFormattedRange" show-time value-format="YYYY-MM-DD HH:mm:ss" />
          <div class="value-display">
            <div>开始日期时间：{{ state.timeFormattedRange?.[0] }}</div>
            <div>结束日期时间：{{ state.timeFormattedRange?.[1] }}</div>
            <div>类型：{{ typeof state.timeFormattedRange }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 快捷选择 -->
    <test-section title="快捷选择">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">快捷选择：</div>
          <t-date-picker-range v-model="state.shortcutsRange" :shortcuts="shortcuts" value-format="YYYY-MM-DD" />
          <div class="value-display">
            <div>开始日期：{{ state.shortcutsRange?.[0] }}</div>
            <div>结束日期：{{ state.shortcutsRange?.[1] }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 事件监听 -->
    <test-section title="事件监听">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">事件测试：</div>
          <t-date-picker-range
            v-model="state.eventDateRange"
            value-format="YYYY-MM-DD HH:mm:ss"
            show-time
            @change="handleChange"
            @panel-change="handlePanelChange"
            @clear="handleClear"
            @focus="handleFocus"
            @blur="handleBlur"
            @time-dialog-open="handleTimeDialogOpen"
            @time-dialog-close="handleTimeDialogClose"
            @date-dialog-open="handleDateDialogOpen"
            @date-dialog-close="handleDateDialogClose"
          />
          <div class="value-display">
            <div>开始日期：{{ state.eventDateRange?.[0] }}</div>
            <div>结束日期：{{ state.eventDateRange?.[1] }}</div>
            <div class="event-log">
              <div class="event-title">事件记录:</div>
              <div v-for="(event, index) in state.eventLogs" :key="index" class="event-item">{{ event }}</div>
            </div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 时间对话框事件测试 -->
    <test-section title="时间对话框事件测试">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">时间对话框事件测试：</div>
          <t-date-picker-range
            v-model="state.timeDialogDateRange"
            value-format="YYYY-MM-DD HH:mm:ss"
            show-time
            @time-dialog-open="handleTimeDialogOpen"
            @time-dialog-close="handleTimeDialogClose"
          />
          <div class="value-display">
            <div>开始日期：{{ state.timeDialogDateRange?.[0] }}</div>
            <div>结束日期：{{ state.timeDialogDateRange?.[1] }}</div>
            <div>时间对话框状态：{{ state.timeDialogOpen ? "打开" : "关闭" }}</div>
            <div class="event-log">
              <div class="event-title">时间对话框事件记录:</div>
              <div v-for="(event, index) in state.timeDialogLogs" :key="index" class="event-item">{{ event }}</div>
            </div>
          </div>
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { TDatePickerRange } from "@/packages/date-picker-range";
import { TIcon } from "@/packages/icon";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";
import type { ModeType } from "@/packages/calendar/calendar";
import type { ShortcutType } from "@/packages/date-picker-range/date-picker-range";
import { formatDate } from "@/utils";

defineOptions({ name: "DatePickerRangeTest" });

// 获取当前日期和未来日期
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

const nextMonth = new Date(today);
nextMonth.setMonth(nextMonth.getMonth() + 1);

const nextYear = new Date(today);
nextYear.setFullYear(nextYear.getFullYear() + 1);

// 快捷选择项
const shortcuts: ShortcutType[] = [
  {
    label: "最近一周",
    value: [today, nextWeek]
  },
  {
    label: "最近一个月",
    value: [today, nextMonth]
  },
  {
    label: "最近一年",
    value: [today, nextYear]
  },
  {
    label: "未来一周",
    value: [tomorrow, nextWeek]
  },
  {
    label: "未来一个月",
    value: [tomorrow, nextMonth]
  },
  {
    label: "未来一年",
    value: [tomorrow, nextYear]
  },
  {
    label: "本周",
    value: [getWeekStart(today), getWeekEnd(today)]
  },
  {
    label: "本月",
    value: [getMonthStart(today), getMonthEnd(today)]
  },
  {
    label: "上个月",
    value: [getMonthStart(getPrevMonth(today)), getMonthEnd(getPrevMonth(today))]
  },
  {
    label: "下个月",
    value: [getMonthStart(getNextMonth(today)), getMonthEnd(getNextMonth(today))]
  },
  {
    label: "今年至今",
    value: [getYearStart(today), today]
  },
  {
    label: "去年全年",
    value: [getYearStart(getPrevYear(today)), getYearEnd(getPrevYear(today))]
  }
];

// 辅助函数 - 获取周开始日期
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 调整为周一开始
  return new Date(d.setDate(diff));
}

// 辅助函数 - 获取周结束日期
function getWeekEnd(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() + (day === 0 ? 0 : 7 - day); // 调整为周日结束
  return new Date(d.setDate(diff));
}

// 辅助函数 - 获取月开始日期
function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

// 辅助函数 - 获取月结束日期
function getMonthEnd(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// 辅助函数 - 获取年开始日期
function getYearStart(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1);
}

// 辅助函数 - 获取年结束日期
function getYearEnd(date: Date): Date {
  return new Date(date.getFullYear(), 11, 31);
}

// 辅助函数 - 获取上个月的日期
function getPrevMonth(date: Date): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() - 1);
  return d;
}

// 辅助函数 - 获取下个月的日期
function getNextMonth(date: Date): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  return d;
}

// 辅助函数 - 获取上一年的日期
function getPrevYear(date: Date): Date {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() - 1);
  return d;
}

// 组件状态
const state = reactive({
  // 基础用法
  dateRange: [today, tomorrow],
  dateRangeWithPrefix: [today, tomorrow],

  // 格式化输出测试
  formattedDateRange: [today, tomorrow],
  formattedDateTimeRange: [today, tomorrow],
  formattedChineseRange: [today, tomorrow],

  // 不同输入类型测试
  stringInputRange: [formatDate(today, "YYYY-MM-DD"), formatDate(tomorrow, "YYYY-MM-DD")],
  dateInputRange: [today, tomorrow],

  // 显示格式与值格式分离
  formatSeparationRange: ["2023/05/15", "2023/05/16"],

  // 不同模式
  modeDateFormattedRange: [today, tomorrow],
  modeMonthFormattedRange: [today, nextMonth],
  modeYearFormattedRange: [today, nextYear],

  // 时间选择器
  timeFormattedRange: [today, tomorrow],

  // 快捷选择
  shortcutsRange: [today, nextWeek],

  // 事件测试
  eventDateRange: [today, tomorrow],
  eventLogs: [] as string[],
  currentMode: "date" as ModeType,

  // 时间对话框事件测试
  timeDialogDateRange: [today, tomorrow],
  timeDialogOpen: false,
  timeDialogLogs: [] as string[]
});

/**
 * 重置输入
 */
const resetInputs = () => {
  state.stringInputRange = [formatDate(today, "YYYY-MM-DD"), formatDate(tomorrow, "YYYY-MM-DD")];
  state.dateInputRange = [today, tomorrow];
};

/**
 * 处理日期变化事件
 */
const handleChange = (value: [Date | string, Date | string]) => {
  state.eventLogs.unshift(`change: ${value[0]} - ${value[1]}`);
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
 * 处理清空事件
 */
const handleClear = () => {
  state.eventLogs.unshift("clear: 已清空");
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理聚焦事件
 */
const handleFocus = () => {
  state.eventLogs.unshift("focus: 获得焦点");
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理失焦事件
 */
const handleBlur = () => {
  state.eventLogs.unshift("blur: 失去焦点");
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理时间对话框打开事件
 */
const handleTimeDialogOpen = () => {
  state.timeDialogOpen = true;
  state.eventLogs.unshift("time-dialog-open: 时间对话框已打开");
  state.timeDialogLogs.unshift("time-dialog-open: 时间对话框已打开");
  if (state.eventLogs.length > 5) state.eventLogs.pop();
  if (state.timeDialogLogs.length > 5) state.timeDialogLogs.pop();
};

/**
 * 处理时间对话框关闭事件
 */
const handleTimeDialogClose = () => {
  state.timeDialogOpen = false;
  state.eventLogs.unshift("time-dialog-close: 时间对话框已关闭");
  state.timeDialogLogs.unshift("time-dialog-close: 时间对话框已关闭");
  if (state.eventLogs.length > 5) state.eventLogs.pop();
  if (state.timeDialogLogs.length > 5) state.timeDialogLogs.pop();
};

/**
 * 处理日期对话框打开事件
 */
const handleDateDialogOpen = () => {
  state.eventLogs.unshift("date-dialog-open: 日期对话框已打开");
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理日期对话框关闭事件
 */
const handleDateDialogClose = () => {
  state.eventLogs.unshift("date-dialog-close: 日期对话框已关闭");
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;
}

.date-picker-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.date-picker-block {
  flex: 1;
  min-width: 300px;
  margin-bottom: 16px;
}

.date-picker-label {
  margin-bottom: 8px;
  font-weight: 500;
}

.value-display {
  margin-top: 12px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
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
</style> 