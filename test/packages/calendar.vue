<template>
  <div class="test-container">
    <h2>Calendar 日历组件</h2>

    <test-section title="基础用法">
      <div class="calendar-wrapper">
        <t-calendar v-model="state.date" />
        <div class="value-display">当前值：{{ state.date?.toLocaleDateString() }}</div>
      </div>
    </test-section>

    <test-section title="不同模式">
      <div class="calendar-wrapper">
        <t-calendar v-model="state.date" mode="date" />
        <t-calendar v-model="state.date" mode="month" />
        <t-calendar v-model="state.date" mode="year" />
      </div>
    </test-section>

    <test-section title="禁用状态">
      <div class="calendar-wrapper">
        <t-calendar v-model="state.date" disabled />
      </div>
    </test-section>

    <test-section title="不可选择日期">
      <div class="calendar-wrapper">
        <t-calendar v-model="state.disabledDate" :disabled-date="handleDisabledDate" />
        <div class="value-display">不可选择过去的日期</div>
      </div>
    </test-section>

    <test-section title="自定义日期内容">
      <div class="calendar-wrapper">
        <t-calendar v-model="state.customDate">
          <template #date="{ date }">
            <div class="custom-date">
              <template v-if="isFirstOrLastDay(date)">
                {{ isFirstDay(date) ? "开始" : "结束" }}
              </template>
              <template v-else>
                {{ date.getDate() }}
              </template>
            </div>
          </template>
        </t-calendar>
        <div class="value-display">每月第一天显示"开始"，最后一天显示"结束"</div>
      </div>
    </test-section>

    <test-section title="自定义底部">
      <div class="calendar-wrapper">
        <t-calendar v-model="state.footerDate" ref="calendarRef">
          <template #footer>
            <div class="calendar-footer">
              <t-button size="small" @click="handleJumpToYesterday">昨天</t-button>
              <t-button size="small" @click="handleJumpToToday">今天</t-button>
              <t-button size="small" @click="handleJumpToTomorrow">明天</t-button>
            </div>
          </template>
        </t-calendar>
        <div class="value-display">
          <div>点击按钮可快速跳转日期</div>
          <div>当前值：{{ state.footerDate?.toLocaleDateString() }}</div>
        </div>
      </div>
    </test-section>

    <test-section title="事件监听">
      <div class="calendar-wrapper">
        <t-calendar
          v-model="state.eventDate"
          @change="handleChange"
          @panel-change="handlePanelChange"
          @jump-to-date="handleJumpToDate"
          ref="eventCalendarRef"
        >
          <template #footer>
            <div class="calendar-footer">
              <t-button size="small" type="info" @click="handleJumpToToday">跳转到今天</t-button>
            </div>
          </template>
        </t-calendar>
        <div class="value-display">
          <div>change事件：{{ state.changeCount }} 次</div>
          <div>panel-change事件：{{ state.panelChangeCount }} 次</div>
          <div>jump-to-date事件：{{ state.jumpCount }} 次</div>
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

defineOptions({ name: "CalendarTest" });

// 组件状态
const state = reactive({
  date: new Date(),
  disabledDate: new Date(),
  customDate: new Date(),
  footerDate: new Date(),
  eventDate: new Date(),
  changeCount: 0,
  panelChangeCount: 0,
  jumpCount: 0
});

// 日历组件引用
const calendarRef = ref();
const eventCalendarRef = ref();

/**
 * 处理禁用日期
 */
const handleDisabledDate = (date: Date) => {
  return date < new Date(new Date().setHours(0, 0, 0, 0));
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
 * 处理日期变化
 */
const handleChange = () => {
  state.changeCount++;
};

/**
 * 处理面板变化
 */
const handlePanelChange = (mode: ModeType) => {
  state.panelChangeCount++;
  console.log("当前模式:", mode);
};

/**
 * 处理日期跳转
 */
const handleJumpToDate = (date: Date) => {
  state.jumpCount++;
  console.log("跳转到:", date.toLocaleDateString());
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
    gap: 24px;
    align-items: flex-start;

    .value-display {
      padding: 8px 12px;
      background-color: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      color: #4b5563;
      font-size: 14px;
    }

    .calendar-footer {
      display: flex;
      gap: 8px;
      justify-content: center;
      padding: 8px;
      border-top: 1px solid #e5e7eb;
    }

    .custom-date {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
  }
}
</style>
