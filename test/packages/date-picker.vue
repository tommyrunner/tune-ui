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
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { TDatePicker } from "@/packages/date-picker";
import { TIcon } from "@/packages/icon";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";
import type { ModeType } from "@/packages/calendar/calendar";

defineOptions({ name: "DatePickerTest" });

// 组件状态
const state = reactive({
  // 基础用法
  date: new Date(),
  dateWithPrefix: new Date(),

  // 格式化输出测试
  formattedDate: "2023-05-15",
  formattedDateTime: "2023-05-15 12:30:45",
  formattedChinese: "2023年05月15日",

  // 不同输入类型测试
  stringInput: "2023-05-15",
  dateInput: "2023-05-16",
  timestampInput: "2023-05-17",

  // 显示格式与值格式分离
  formatSeparation: "2023/05/15",

  // 不同模式
  modeDateFormatted: "2023-05-15",
  modeMonthFormatted: "2023-05",
  modeYearFormatted: "2023",

  // 时间选择器
  timeFormatted: "2023-05-15 12:30:45",

  // 事件测试
  eventDate: "2023-05-15 12:30:45",
  eventLogs: [] as string[],
  currentMode: "date" as ModeType
});

/**
 * 重置输入
 */
const resetInputs = () => {
  state.stringInput = "2023-05-15";
  state.dateInput = "2023-05-16";
  state.timestampInput = "2023-05-17";
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
