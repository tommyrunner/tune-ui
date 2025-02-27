<template>
  <div class="test-container">
    <h2>DatePicker 日期选择器组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="date-picker-section">
        <!-- 默认日期选择器 -->
        <div class="date-picker-block">
          <div class="date-picker-label">默认日期选择器：</div>
          <t-date-picker v-model="state.date" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDate(state.date) }}</div>
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
            <div>选择的日期：{{ formatDisplayDate(state.dateWithPrefix) }}</div>
          </div>
        </div>

        <!-- 自定义日期单元格 -->
        <div class="date-picker-block">
          <div class="date-picker-label">自定义日期单元格：</div>
          <t-date-picker v-model="state.dateWithCustomCell">
            <template #date="{ date }">
              <div :class="{ 'custom-date': isSpecialDate(date) }">
                {{ date.getDate() }}
              </div>
            </template>
          </t-date-picker>
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDate(state.dateWithCustomCell) }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 自定义底部 -->
    <test-section title="自定义底部">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">自定义底部按钮：</div>
          <t-date-picker v-model="state.dateWithCustomFooter">
            <template #footer>
              <div class="custom-footer">
                <button @click="setToday">今天</button>
                <button @click="setYesterday">昨天</button>
                <button @click="setTomorrow">明天</button>
              </div>
            </template>
          </t-date-picker>
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDate(state.dateWithCustomFooter) }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 不同模式 -->
    <test-section title="不同模式">
      <div class="date-picker-section">
        <!-- 日期模式 -->
        <div class="date-picker-block">
          <div class="date-picker-label">日期模式：</div>
          <t-date-picker v-model="state.modeDate" mode="date" />
          <div class="value-display">
            <div>选择的日期：{{ formatDisplayDate(state.modeDate) }}</div>
          </div>
        </div>

        <!-- 月份模式 -->
        <div class="date-picker-block">
          <div class="date-picker-label">月份模式：</div>
          <t-date-picker v-model="state.modeMonth" mode="month" />
          <div class="value-display">
            <div>选择的月份：{{ formatDisplayDate(state.modeMonth) }}</div>
          </div>
        </div>

        <!-- 年份模式 -->
        <div class="date-picker-block">
          <div class="date-picker-label">年份模式：</div>
          <t-date-picker v-model="state.modeYear" mode="year" />
          <div class="value-display">
            <div>选择的年份：{{ formatDisplayDate(state.modeYear) }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 时间选择器 -->
    <test-section title="时间选择器">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">带时间选择：</div>
          <t-date-picker v-model="state.timeDate" :show-time="true" />
          <div class="value-display">
            <div>带时间值：{{ formatDisplayDate(state.timeDate) }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 格式化输出 -->
    <test-section title="格式化输出">
      <div class="date-picker-section">
        <!-- 显示格式化 format -->
        <div class="date-picker-block">
          <div class="date-picker-label">显示格式化 (format)：</div>
          <t-date-picker v-model="state.formattedDisplay" value-format="YYYY-M-D" format="YYYY年MM月DD日" />
          <div class="value-display">
            <div>值类型：{{ typeof state.formattedDisplay }}</div>
            <div>实际值：{{ state.formattedDisplay }}</div>
            <div>format：YYYY年MM月DD日</div>
            <div>valueFormat：YYYY-M-D</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <div class="date-picker-section">
        <!-- 完全禁用 -->
        <div class="date-picker-block">
          <div class="date-picker-label">完全禁用：</div>
          <t-date-picker v-model="state.disabledAll" disabled />
          <div class="value-display">
            <div>当前值：{{ formatDisplayDate(state.disabledAll) }}</div>
          </div>
        </div>

        <!-- 禁用特定日期 -->
        <div class="date-picker-block">
          <div class="date-picker-label">禁用特定日期：</div>
          <t-date-picker v-model="state.disabledDate" :disabled-date="disabledDate" />
          <div class="value-display">
            <div>禁用规则：不可选择周末</div>
            <div>当前值：{{ formatDisplayDate(state.disabledDate) }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 弹出位置 -->
    <test-section title="弹出位置">
      <div class="date-picker-section">
        <!-- 上方弹出 -->
        <div class="date-picker-block">
          <div class="date-picker-label">上方弹出：</div>
          <t-date-picker v-model="state.positionTop" position="top" />
          <div class="value-display">
            <div>当前值：{{ formatDisplayDate(state.positionTop) }}</div>
          </div>
        </div>

        <!-- 下方弹出 -->
        <div class="date-picker-block">
          <div class="date-picker-label">下方弹出：</div>
          <t-date-picker v-model="state.positionBottom" position="bottom" />
          <div class="value-display">
            <div>当前值：{{ formatDisplayDate(state.positionBottom) }}</div>
          </div>
        </div>

        <!-- 左侧弹出 -->
        <div class="date-picker-block">
          <div class="date-picker-label">左侧弹出：</div>
          <t-date-picker v-model="state.positionLeft" position="left" />
          <div class="value-display">
            <div>当前值：{{ formatDisplayDate(state.positionLeft) }}</div>
          </div>
        </div>

        <!-- 右侧弹出 -->
        <div class="date-picker-block">
          <div class="date-picker-label">右侧弹出：</div>
          <t-date-picker v-model="state.positionRight" position="right" />
          <div class="value-display">
            <div>当前值：{{ formatDisplayDate(state.positionRight) }}</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 尺寸 -->
    <test-section title="不同尺寸">
      <div class="date-picker-section">
        <!-- 小尺寸 -->
        <div class="date-picker-block">
          <div class="date-picker-label">小尺寸：</div>
          <t-date-picker v-model="state.sizeSmall" size="small" />
          <div class="value-display">
            <div>当前值：{{ formatDisplayDate(state.sizeSmall) }}</div>
          </div>
        </div>

        <!-- 默认尺寸 -->
        <div class="date-picker-block">
          <div class="date-picker-label">默认尺寸：</div>
          <t-date-picker v-model="state.sizeDefault" size="default" />
          <div class="value-display">
            <div>当前值：{{ formatDisplayDate(state.sizeDefault) }}</div>
          </div>
        </div>

        <!-- 大尺寸 -->
        <div class="date-picker-block">
          <div class="date-picker-label">大尺寸：</div>
          <t-date-picker v-model="state.sizeLarge" size="large" />
          <div class="value-display">
            <div>当前值：{{ formatDisplayDate(state.sizeLarge) }}</div>
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
            @change="handleChange"
            @panel-change="handlePanelChange"
            @clear="handleClear"
            @focus="handleFocus"
            @blur="handleBlur"
          />
          <div class="value-display">
            <div class="event-log">
              <div class="event-title">事件记录:</div>
              <div v-for="(event, index) in state.eventLogs" :key="index" class="event-item">{{ event }}</div>
            </div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 方法测试 -->
    <test-section title="方法测试">
      <div class="date-picker-section">
        <div class="date-picker-block">
          <div class="date-picker-label">跳转到指定日期：</div>
          <t-date-picker v-model="state.methodDate" ref="datePickerRef" />
          <div class="value-display">
            <div>当前值：{{ formatDisplayDate(state.methodDate) }}</div>
            <div class="method-buttons">
              <button @click="jumpToDate(new Date())">跳转到今天</button>
              <button @click="jumpToDate(new Date(2023, 0, 1))">跳转到2023年1月1日</button>
              <button @click="jumpToDate(new Date(2025, 11, 31))">跳转到2025年12月31日</button>
            </div>
          </div>
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { TDatePicker } from "@/packages/date-picker";
import { TIcon } from "@/packages/icon";
import TestSection from "../components/test-section.vue";
import type { ModeType } from "@/packages/calendar/calendar";
import { formatDate } from "@/utils/dateFormat";

defineOptions({ name: "DatePickerTest" });

// 组件状态
const state = reactive({
  // 基础用法
  date: new Date(),
  dateWithPrefix: new Date(),
  dateWithCustomCell: new Date(),
  dateWithCustomFooter: new Date(),

  // 不同模式
  modeDate: new Date(),
  modeMonth: new Date(),
  modeYear: new Date(),

  // 时间选择器
  timeDate: new Date(),
  timeDisabledView: new Date(),
  timeEnabledView: new Date(),

  // 格式化输出
  formattedDate: formatDate(new Date(), "YYYY-MM-DD"),
  formattedDisplay: formatDate(new Date(), "YYYY-M-D"),
  formattedBoth: formatDate(new Date(), "YYYY/MM/DD"),

  // 禁用状态
  disabledAll: new Date(),
  disabledDate: new Date(),

  // 弹出位置
  positionTop: new Date(),
  positionBottom: new Date(),
  positionLeft: new Date(),
  positionRight: new Date(),

  // 尺寸
  sizeSmall: new Date(),
  sizeDefault: new Date(),
  sizeLarge: new Date(),

  // 事件测试
  eventDate: new Date(),
  eventLogs: [] as string[],
  currentMode: "date" as ModeType,

  // 方法测试
  methodDate: new Date()
});

// 日期选择器引用
const datePickerRef = ref();

/**
 * 格式化显示日期
 */
const formatDisplayDate = (date: Date | string | number | null | undefined) => {
  if (!date) return "未选择";
  if (typeof date === "string") return date;
  if (typeof date === "number") return new Date(date).toLocaleString();
  return date.toLocaleString();
};

/**
 * 判断是否为特殊日期
 */
const isSpecialDate = (date: Date) => {
  const day = date.getDate();
  return day === 1 || day === 15;
};

/**
 * 禁用周末
 */
const disabledDate = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

/**
 * 设置为今天
 */
const setToday = () => {
  state.dateWithCustomFooter = new Date();
};

/**
 * 设置为昨天
 */
const setYesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  state.dateWithCustomFooter = yesterday;
};

/**
 * 设置为明天
 */
const setTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  state.dateWithCustomFooter = tomorrow;
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
 * 处理清空
 */
const handleClear = () => {
  addEventLog("clear事件: 已清空");
};

/**
 * 处理聚焦
 */
const handleFocus = () => {
  addEventLog("focus事件: 已聚焦");
};

/**
 * 处理失焦
 */
const handleBlur = () => {
  addEventLog("blur事件: 已失焦");
};

/**
 * 跳转到指定日期
 */
const jumpToDate = (date: Date) => {
  if (datePickerRef.value) {
    datePickerRef.value.jumpToDate(date);
  }
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

  .date-picker-section {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 16px;
  }

  .date-picker-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 400px;

    .date-picker-label {
      font-weight: 500;
      color: #4b5563;
    }

    .value-display {
      padding: 12px;
      background-color: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      color: #4b5563;
      font-size: 14px;
      width: 100%;
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

  .method-buttons {
    margin-top: 10px;
    display: flex;
    gap: 8px;

    button {
      padding: 6px 12px;
      background-color: #409eff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #66b1ff;
      }
    }
  }
}

.custom-date {
  color: red;
  font-weight: bold;
}

.custom-footer {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-top: 1px solid #ebeef5;

  button {
    padding: 4px 8px;
    background-color: #f5f7fa;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }
}
</style>
