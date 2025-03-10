<template>
  <div class="test-container">
    <h2>DatePickerMultiple 多选日期选择器组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="date-picker-section">
        <!-- 范围选择模式 -->
        <div class="date-picker-block">
          <div class="date-picker-label">范围选择模式：</div>
          <t-date-picker-multiple
            v-model="state.dateRange"
            :is-range="true"
            placeholder="请选择日期范围"
            @change="handleRangeChange"
          />
          <div class="value-display">
            <div>选择的日期范围：{{ formatDisplayDates(state.dateRange) }}</div>
          </div>
        </div>

        <!-- 多选模式 -->
        <div class="date-picker-block">
          <div class="date-picker-label">多选模式：</div>
          <t-date-picker-multiple
            v-model="state.multipleDates"
            :is-range="false"
            placeholder="请选择多个日期"
            @change="handleMultipleChange"
          />
          <div class="value-display">
            <div>选择的多个日期：{{ formatDisplayDates(state.multipleDates) }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 不同模式 -->
    <test-section title="不同模式 (mode)">
      <div class="date-picker-section">
        <!-- 日期模式 -->
        <div class="date-picker-block">
          <div class="date-picker-label">日期模式 (date)：</div>
          <t-date-picker-multiple v-model="state.dateModeValues" mode="date" :is-range="true" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.dateModeValues) }}</div>
          </div>
        </div>

        <!-- 月份模式 -->
        <div class="date-picker-block">
          <div class="date-picker-label">月份模式 (month)：</div>
          <t-date-picker-multiple v-model="state.monthModeValues" mode="month" :is-range="true" />
          <div class="value-display">
            <div>选择的月份：{{ formatDisplayDates(state.monthModeValues) }}</div>
          </div>
        </div>

        <!-- 年份模式 -->
        <div class="date-picker-block">
          <div class="date-picker-label">年份模式 (year)：</div>
          <t-date-picker-multiple v-model="state.yearModeValues" mode="year" :is-range="true" />
          <div class="value-display">
            <div>选择的年份：{{ formatDisplayDates(state.yearModeValues) }}</div>
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
          <t-date-picker-multiple v-model="state.disabledDates" disabled :is-range="true" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.disabledDates) }}</div>
          </div>
        </div>

        <!-- 禁用日期 -->
        <div class="date-picker-block">
          <div class="date-picker-label">禁用日期 (disabledDate)：</div>
          <t-date-picker-multiple
            v-model="state.disabledBeforeTodayDates"
            :disabled-date="disableDateBeforeToday"
            :is-range="true"
          />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.disabledBeforeTodayDates) }}</div>
            <div class="disabled-info">今天之前的日期已被禁用</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 时间选择器 -->
    <test-section title="时间选择器 (showTime)">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">显示时间选择器：</div>
          <t-date-picker-multiple v-model="state.showTimeDates" :show-time="true" :is-range="true" format="YYYY-MM-DD HH:mm:ss" />
          <div class="value-display">
            <div>选择的日期时间：{{ formatDisplayDates(state.showTimeDates) }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 格式化 -->
    <test-section title="格式化 (format/valueFormat)">
      <div class="date-picker-section">
        <!-- 值格式化 -->
        <div class="date-picker-block">
          <div class="date-picker-label">值格式化 (valueFormat: YYYY/MM/DD)：</div>
          <t-date-picker-multiple v-model="state.formattedValueDates" value-format="YYYY/MM/DD" :is-range="true" />
          <div class="value-display">
            <div>格式化后的值：{{ state.formattedValueDates }}</div>
            <div>类型：{{ typeof state.formattedValueDates[0] }}</div>
          </div>
        </div>

        <!-- 显示格式化 -->
        <div class="date-picker-block">
          <div class="date-picker-label">显示格式化 (format: YYYY年MM月DD日)：</div>
          <t-date-picker-multiple v-model="state.formattedDisplayDates" format="YYYY年MM月DD日" :is-range="true" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.formattedDisplayDates) }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 占位符 -->
    <test-section title="占位符 (placeholder)">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">自定义占位符：</div>
          <t-date-picker-multiple v-model="state.placeholderDates" placeholder="请点击选择日期范围" :is-range="true" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.placeholderDates) }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 清空功能 -->
    <test-section title="清空功能 (clearable)">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">可清空：</div>
          <t-date-picker-multiple v-model="state.clearableDates" :clearable="true" :is-range="true" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.clearableDates) }}</div>
          </div>
        </div>
        <div class="date-picker-block">
          <div class="date-picker-label">不可清空：</div>
          <t-date-picker-multiple v-model="state.nonClearableDates" :clearable="false" :is-range="true" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.nonClearableDates) }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 弹出位置 -->
    <test-section title="弹出位置 (position)">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">顶部弹出 (top)：</div>
          <t-date-picker-multiple v-model="state.topPositionDates" position="top" :is-range="true" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.topPositionDates) }}</div>
          </div>
        </div>
        <div class="date-picker-block">
          <div class="date-picker-label">底部弹出 (bottom)：</div>
          <t-date-picker-multiple v-model="state.bottomPositionDates" position="bottom" :is-range="true" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.bottomPositionDates) }}</div>
          </div>
        </div>
        <div class="date-picker-block">
          <div class="date-picker-label">左侧弹出 (left)：</div>
          <t-date-picker-multiple v-model="state.leftPositionDates" position="left" :is-range="true" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.leftPositionDates) }}</div>
          </div>
        </div>
        <div class="date-picker-block">
          <div class="date-picker-label">右侧弹出 (right)：</div>
          <t-date-picker-multiple v-model="state.rightPositionDates" position="right" :is-range="true" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.rightPositionDates) }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 快捷选项 -->
    <test-section title="快捷选项 (shortcuts)">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">带快捷选项的范围选择：</div>
          <t-date-picker-multiple
            v-model="state.dateRangeWithShortcuts"
            :shortcuts="state.shortcuts"
            :is-range="true"
            placeholder="使用快捷选项选择日期范围"
          />
          <div class="value-display">
            <div>选择的日期范围：{{ formatDisplayDates(state.dateRangeWithShortcuts) }}</div>
            <div class="shortcuts-info">
              <div>可用快捷选项：</div>
              <div v-for="(shortcut, index) in state.shortcuts" :key="index">- {{ shortcut.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 不同尺寸 -->
    <test-section title="不同尺寸 (size)">
      <div class="date-picker-section">
        <!-- 小尺寸 -->
        <div class="date-picker-block">
          <div class="date-picker-label">小尺寸 (small)：</div>
          <t-date-picker-multiple v-model="state.smallSizeDates" size="small" :is-range="true" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.smallSizeDates) }}</div>
          </div>
        </div>

        <!-- 默认尺寸 -->
        <div class="date-picker-block">
          <div class="date-picker-label">默认尺寸 (default)：</div>
          <t-date-picker-multiple v-model="state.defaultSizeDates" size="default" :is-range="true" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.defaultSizeDates) }}</div>
          </div>
        </div>

        <!-- 大尺寸 -->
        <div class="date-picker-block">
          <div class="date-picker-label">大尺寸 (large)：</div>
          <t-date-picker-multiple v-model="state.largeSizeDates" size="large" :is-range="true" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDates(state.largeSizeDates) }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <div class="date-picker-section">
        <!-- 事件测试 -->
        <div class="date-picker-block">
          <div class="date-picker-label">事件测试：</div>
          <t-date-picker-multiple
            v-model="state.eventTestDates"
            :is-range="true"
            @change="handleChange"
            @panel-change="handlePanelChange"
            @clear="handleClear"
            @focus="handleFocus"
            @blur="handleBlur"
            @date-dialog-open="handleDialogOpen"
            @date-dialog-close="handleDialogClose"
          />
          <div class="value-display">
            <div>当前值：{{ formatDisplayDates(state.eventTestDates) }}</div>
            <div class="event-log">
              <div class="event-title">事件记录:</div>
              <div v-for="(log, index) in state.eventLogs" :key="index" class="event-item">{{ log }}</div>
            </div>
            <div class="buttons">
              <t-button size="small" @click="clearEventLogs">清空事件记录</t-button>
            </div>
          </div>
        </div>
      </div>
    </test-section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { TDatePickerMultiple } from "@/packages/date-picker-multiple";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";
import { formatDate } from "@/utils";
import type { ModeType } from "@/packages/calendar/calendar";

// 组件状态
const state = reactive({
  // 基础用法
  dateRange: [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))],
  multipleDates: [
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 3)),
    new Date(new Date().setDate(new Date().getDate() + 7))
  ],

  // 不同模式
  dateModeValues: [],
  monthModeValues: [],
  yearModeValues: [],

  // 禁用状态
  disabledDates: [],
  disabledBeforeTodayDates: [],

  // 时间选择器
  showTimeDates: [],

  // 格式化
  formattedValueDates: [],
  formattedDisplayDates: [],

  // 占位符
  placeholderDates: [],

  // 清空功能
  clearableDates: [new Date(), new Date(new Date().setDate(new Date().getDate() + 5))],
  nonClearableDates: [new Date(), new Date(new Date().setDate(new Date().getDate() + 5))],

  // 弹出位置
  topPositionDates: [],
  bottomPositionDates: [],
  leftPositionDates: [],
  rightPositionDates: [],

  // 快捷选项
  dateRangeWithShortcuts: [],
  shortcuts: [
    {
      label: "最近一周",
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        return [start, end];
      }
    },
    {
      label: "最近一个月",
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 1);
        return [start, end];
      }
    },
    {
      label: "最近三个月",
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 3);
        return [start, end];
      }
    }
  ],

  // 不同尺寸
  smallSizeDates: [],
  defaultSizeDates: [],
  largeSizeDates: [],

  // 事件测试
  eventTestDates: [],
  eventLogs: []
});

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
 * 格式化显示日期数组
 * @param dates 日期数组
 * @returns 格式化后的字符串
 */
const formatDisplayDates = (dates: any[]) => {
  if (!dates || dates.length === 0) return "未选择";

  return dates
    .map(date => {
      if (typeof date === "string") return date;
      if (date instanceof Date) return formatDate(date, "YYYY-MM-DD");
      return date;
    })
    .join(", ");
};

/**
 * 清空事件记录
 */
const clearEventLogs = () => {
  state.eventLogs = [];
};

// 事件处理函数
/**
 * 处理日期变化事件
 * @param value 变化后的值
 */
const handleChange = (value: any) => {
  state.eventLogs.unshift(`change 事件触发，值: ${formatDisplayDates(value)}`);
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理范围选择变化事件
 * @param value 变化后的值
 */
const handleRangeChange = (value: any) => {
  state.eventLogs.unshift(`范围选择 change 事件触发，值: ${formatDisplayDates(value)}`);
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理多选变化事件
 * @param value 变化后的值
 */
const handleMultipleChange = (value: any) => {
  state.eventLogs.unshift(`多选 change 事件触发，值: ${formatDisplayDates(value)}`);
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理面板变化事件
 * @param mode 面板模式
 */
const handlePanelChange = (mode: ModeType) => {
  state.eventLogs.unshift(`panel-change 事件触发，模式: ${mode}`);
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理清空事件
 */
const handleClear = () => {
  state.eventLogs.unshift("clear 事件触发");
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理聚焦事件
 */
const handleFocus = () => {
  state.eventLogs.unshift("focus 事件触发");
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理失焦事件
 */
const handleBlur = () => {
  state.eventLogs.unshift("blur 事件触发");
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理对话框打开事件
 */
const handleDialogOpen = () => {
  state.eventLogs.unshift("date-dialog-open 事件触发");
  if (state.eventLogs.length > 5) state.eventLogs.pop();
};

/**
 * 处理对话框关闭事件
 */
const handleDialogClose = () => {
  state.eventLogs.unshift("date-dialog-close 事件触发");
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

.shortcuts-info,
.disabled-info {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #ebeef5;
  font-size: 13px;
  color: #606266;
}
</style>
