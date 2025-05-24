<template>
  <div class="test-container">
    <h2>DatePicker 日期选择器组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="date-picker-section">
        <!-- 默认日期选择器 -->
        <div class="date-picker-block">
          <div class="date-picker-label">默认日期选择器：</div>
          <t-date-picker v-model="state.date" value-format="YYYY-MM-DD" />
          <div class="value-display">
            <div>选择的日期：{{ state.date }}</div>
            <div>类型：{{ typeof state.date }}</div>
          </div>
        </div>

        <!-- 带前缀插槽 -->
        <div class="date-picker-block">
          <div class="date-picker-label">带前缀插槽：</div>
          <t-date-picker v-model="state.dateWithPrefix">
            <template #prefix>
              <t-icon icon="calendar" :size="14" color="#409eff" />
            </template>
          </t-date-picker>
          <div class="value-display">
            <div>选择的日期：{{ state.dateWithPrefix }}</div>
          </div>
        </div>
      </div>
    </test-section>
    <!-- 不同尺寸 -->
    <test-section title="不同尺寸">
      <div class="date-picker-section">
        <!-- 默认日期选择器 -->
        <t-date-picker v-model="state.date" size="small" placeholder="小尺寸" />
        <t-date-picker v-model="state.date" size="default" placeholder="默认尺寸" />
        <t-date-picker v-model="state.date" size="large" placeholder="大尺寸" />
      </div>
    </test-section>

    <!-- valueFormat格式化 -->
    <test-section title="valueFormat格式化">
      <div class="date-picker-section">
        <!-- 日期格式化 -->
        <div class="date-picker-block">
          <div class="date-picker-label">日期格式化 (YYYY-MM-DD)：</div>
          <t-date-picker v-model="state.formattedDate" value-format="YYYY-MM-DD" />
          <div class="value-display">
            <div>值类型：{{ typeof state.formattedDate }}</div>
            <div>实际值：{{ state.formattedDate }}</div>
          </div>
        </div>

        <!-- 日期时间格式化 -->
        <div class="date-picker-block">
          <div class="date-picker-label">日期时间格式化 (YYYY-MM-DD HH:mm:ss)：</div>
          <t-date-picker v-model="state.formattedDateTime" show-time value-format="YYYY-MM-DD HH:mm:ss" />
          <div class="value-display">
            <div>值类型：{{ typeof state.formattedDateTime }}</div>
            <div>实际值：{{ state.formattedDateTime }}</div>
          </div>
        </div>

        <!-- 中文格式化 -->
        <div class="date-picker-block">
          <div class="date-picker-label">中文格式化 (YYYY年MM月DD日)：</div>
          <t-date-picker v-model="state.formattedChinese" value-format="YYYY年MM月DD日" />
          <div class="value-display">
            <div>值类型：{{ typeof state.formattedChinese }}</div>
            <div>实际值：{{ state.formattedChinese }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 显示格式与值格式分离 -->
    <test-section title="显示格式与值格式分离">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">显示格式与值格式分离：</div>
          <t-date-picker v-model="state.formatSeparation" format="YYYY年MM月DD日" value-format="YYYY/MM/DD" />
          <div class="value-display">
            <div>显示格式：YYYY年MM月DD日</div>
            <div>值格式：YYYY/MM/DD</div>
            <div>实际值：{{ state.formatSeparation }}</div>
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
          <t-date-picker v-model="state.stringInput" value-format="YYYY-MM-DD" />
          <div class="value-display">
            <div>值类型：{{ typeof state.stringInput }}</div>
            <div>实际值：{{ state.stringInput }}</div>
          </div>
        </div>

        <!-- Date对象输入 -->
        <div class="date-picker-block">
          <div class="date-picker-label">Date对象输入 + 格式化输出：</div>
          <t-date-picker v-model="state.dateInput" value-format="YYYY-MM-DD" />
          <div class="value-display">
            <div>值类型：{{ typeof state.dateInput }}</div>
            <div>实际值：{{ state.dateInput }}</div>
          </div>
        </div>

        <!-- 时间戳输入 -->
        <div class="date-picker-block">
          <div class="date-picker-label">时间戳输入 + 格式化输出：</div>
          <t-date-picker v-model="state.timestampInput" value-format="YYYY-MM-DD" />
          <div class="value-display">
            <div>值类型：{{ typeof state.timestampInput }}</div>
            <div>实际值：{{ state.timestampInput }}</div>
            <div class="buttons">
              <t-button size="small" @click="resetInputs">重置输入</t-button>
            </div>
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
          <t-date-picker v-model="state.modeDateFormatted" mode="date" value-format="YYYY-MM-DD" />
          <div class="value-display">
            <div>实际值：{{ state.modeDateFormatted }}</div>
          </div>
        </div>

        <!-- 月份模式 -->
        <div class="date-picker-block">
          <div class="date-picker-label">月份模式 + 格式化：</div>
          <t-date-picker v-model="state.modeMonthFormatted" mode="month" value-format="YYYY-MM" />
          <div class="value-display">
            <div>实际值：{{ state.modeMonthFormatted }}</div>
          </div>
        </div>

        <!-- 年份模式 -->
        <div class="date-picker-block">
          <div class="date-picker-label">年份模式 + 格式化：</div>
          <t-date-picker v-model="state.modeYearFormatted" mode="year" value-format="YYYY" />
          <div class="value-display">
            <div>实际值：{{ state.modeYearFormatted }}</div>
          </div>
        </div>
      </div>
    </test-section>
    <!-- 禁用状态 -->
    <test-section title="禁用状态 (disabled)">
      <div class="date-picker-section">
        <!-- 禁用状态 -->
        <div class="date-picker-block">
          <div class="date-picker-label">禁用状态：</div>
          <t-date-picker v-model="state.disabledDate" disabled />
          <div class="value-display">
            <div>选择的日期：{{ state.disabledDate }}</div>
          </div>
        </div>

        <!-- 禁用日期 -->
        <div class="date-picker-block">
          <div class="date-picker-label">禁用日期 (disabledDate)：</div>
          <t-date-picker v-model="state.disabledBeforeTodayDate" :disabled-date="disableDateBeforeToday" />
          <div class="value-display">
            <div>选择的日期：{{ state.disabledBeforeTodayDate }}</div>
            <div class="disabled-info">今天之前的日期已被禁用</div>
          </div>
        </div>
      </div>
    </test-section>
    <!-- 时间选择器 -->
    <test-section title="时间选择器">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">带时间选择 + 格式化：</div>
          <t-date-picker v-model="state.timeFormatted" show-time value-format="YYYY-MM-DD HH:mm:ss" />
          <div class="value-display">
            <div>实际值：{{ state.timeFormatted }}</div>
            <div>类型：{{ typeof state.timeFormatted }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 事件监听 -->
    <test-section title="事件监听">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">事件测试：</div>
          <t-date-picker
            v-model="state.eventDate"
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
            <div>当前值：{{ state.eventDate }}</div>
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
          <t-date-picker
            v-model="state.timeDialogDate"
            value-format="YYYY-MM-DD HH:mm:ss"
            show-time
            @time-dialog-open="handleTimeDialogOpen"
            @time-dialog-close="handleTimeDialogClose"
          />
          <div class="value-display">
            <div>当前值：{{ state.timeDialogDate }}</div>
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
import { TDatePicker } from "@/packages/date-picker";
import { TIcon } from "@/packages/icon";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";
import type { ModeType } from "@/packages/calendar/calendar";
import { formatDate } from "@/utils";

defineOptions({ name: "DatePickerTest" });

// 组件状态
const state = reactive({
  // 基础用法
  date: new Date(),
  dateWithPrefix: new Date(),

  // 格式化输出测试
  formattedDate: new Date(),
  formattedDateTime: new Date(),
  formattedChinese: new Date(),

  // 不同输入类型测试
  stringInput: new Date(),
  dateInput: new Date(),
  timestampInput: formatDate(new Date("2023-05-17"), "YYYY-MM-DD"),

  // 显示格式与值格式分离
  formatSeparation: "2023/05/15",

  // 不同模式
  modeDateFormatted: new Date(),
  modeMonthFormatted: new Date(),
  modeYearFormatted: new Date(),

  // 时间选择器
  timeFormatted: new Date(),

  // 事件测试
  eventDate: new Date(),
  eventLogs: [] as string[],
  currentMode: "date" as ModeType,

  // 时间对话框事件测试
  timeDialogDate: new Date(),
  timeDialogOpen: false,
  timeDialogLogs: [] as string[],

  // 禁用状态
  disabledDate: new Date(),
  disabledBeforeTodayDate: new Date()
});

/**
 * 重置输入
 */
const resetInputs = () => {
  state.stringInput = new Date();
  state.dateInput = new Date();
  state.timestampInput = formatDate(new Date("2023-05-17"), "YYYY-MM-DD");
};

/**
 * 禁用今天之前的日期
 */
const disableDateBeforeToday = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * 处理日期变化事件
 */
const handleChange = (value: any) => {
  state.eventLogs.unshift(`change: ${value}`);
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

.disabled-info {
  color: #f56c6c;
  font-size: 13px;
  margin-top: 4px;
}
</style>
