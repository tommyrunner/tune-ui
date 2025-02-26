<template>
  <div class="t-calendar">
    <!-- 日历头部 -->
    <calendar-header
      :current-year="currentYear"
      :current-month="currentMonth"
      :mode="tempMode"
      :disabled="disabled"
      :show-time="props.showTime"
      @prev="handlePrev"
      @next="handleNext"
      @year-title-click="handleYearTitleClick"
      @month-title-click="handleMonthTitleClick"
    >
      <template #time-picker v-if="props.showTime && tempMode === 'date'">
        <calendar-time-picker :model-value="currentDate" :disabled="disabled" @change="handleTimeChange" />
      </template>
    </calendar-header>

    <!-- 日历主体 -->
    <div class="_body">
      <transition-group name="fade-mode" tag="div" class="mode-container">
        <!-- 年份模式 -->
        <calendar-year
          v-if="tempMode === 'year'"
          key="year-mode"
          :current-year="currentYear"
          :disabled="disabled"
          :disabled-date="props.disabledDate"
          :model-value="model"
          @select="handleYearSelect"
        />

        <!-- 月份模式 -->
        <calendar-month
          v-else-if="tempMode === 'month'"
          key="month-mode"
          :current-year="currentYear"
          :disabled="disabled"
          :disabled-date="props.disabledDate"
          :model-value="model"
          @select="handleMonthSelect"
        />

        <!-- 日期模式 -->
        <calendar-date
          v-else
          key="date-mode"
          :current-date="currentDate"
          :disabled="disabled"
          :disabled-date="props.disabledDate"
          :model-value="model"
          :show-time="props.showTime"
          @select="handleSelectDate"
        >
          <template #date="slotProps">
            <slot name="date" :date="slotProps.date">
              {{ slotProps.date.getDate() }}
            </slot>
          </template>
        </calendar-date>
      </transition-group>
    </div>

    <!-- 日历底部 -->
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import type { DateType, EmitsType, PropsType, ModeType } from "./calendar";
import { formatDate } from "@/utils/dateFormat";
import CalendarHeader from "./header/header.vue";
import CalendarYear from "./year/year.vue";
import CalendarMonth from "./month/month.vue";
import CalendarDate from "./date/date.vue";
import CalendarTimePicker from "./time-picker/time-picker.vue";

defineOptions({ name: "TCalendar" });

// Props 和 Emits 定义
const props = withDefaults(defineProps<PropsType>(), {
  mode: "date",
  disabled: false,
  showTime: false
});

const model = defineModel<DateType>();
const emit = defineEmits<EmitsType>();

// 当前显示的日期
const currentDate = ref(model.value ? new Date(model.value) : new Date());

// 临时模式（用于模式切换）
const tempMode = ref<ModeType>(props.mode);

// 当前年份
const currentYear = computed(() => currentDate.value.getFullYear());

// 当前月份
const currentMonth = computed(() => currentDate.value.getMonth() + 1);

/**
 * @description 更新模型值
 * @param date 日期对象
 */
const updateModelValue = (date: Date) => {
  if (props.valueFormat) {
    // 如果设置了格式化，则返回格式化后的字符串
    model.value = formatDate(date, props.valueFormat);
  } else {
    // 否则返回日期对象
    model.value = date;
  }
};

/**
 * @description 处理上一个时间段
 */
const handlePrev = () => {
  if (props.disabled) return;
  const date = new Date(currentDate.value);
  switch (tempMode.value) {
    case "year":
      date.setFullYear(date.getFullYear() - 10);
      break;
    case "month":
      date.setFullYear(date.getFullYear() - 1);
      break;
    default:
      date.setMonth(date.getMonth() - 1);
  }
  currentDate.value = date;
  emit("panel-change", tempMode.value);
};

/**
 * @description 处理下一个时间段
 */
const handleNext = () => {
  if (props.disabled) return;
  const date = new Date(currentDate.value);
  switch (tempMode.value) {
    case "year":
      date.setFullYear(date.getFullYear() + 10);
      break;
    case "month":
      date.setFullYear(date.getFullYear() + 1);
      break;
    default:
      date.setMonth(date.getMonth() + 1);
  }
  currentDate.value = date;
  emit("panel-change", tempMode.value);
};

/**
 * @description 处理年份标题点击
 */
const handleYearTitleClick = () => {
  if (props.disabled) return;
  tempMode.value = "year";
};

/**
 * @description 处理月份标题点击
 */
const handleMonthTitleClick = () => {
  if (props.disabled) return;
  tempMode.value = "month";
};

/**
 * @description 处理年份选择
 */
const handleYearSelect = (year: number) => {
  currentDate.value = new Date(year, currentDate.value.getMonth(), 1);

  // 根据原始模式决定选择年份后的行为
  if (props.mode === "date" || props.mode === "month") {
    // 如果原始模式是日期或月份，选择年份后回到月份模式
    tempMode.value = "month";
  } else {
    // 如果原始模式是年份，则直接更新值
    updateModelValue(currentDate.value);
    emit("change", currentDate.value);
  }
};

/**
 * @description 处理月份选择
 */
const handleMonthSelect = (month: number) => {
  currentDate.value = new Date(currentYear.value, month, 1);

  // 根据原始模式决定选择月份后的行为
  if (props.mode === "date") {
    // 如果原始模式是日期，选择月份后回到日期模式
    tempMode.value = "date";
  } else {
    // 如果原始模式是月份或年份，则直接更新值
    updateModelValue(currentDate.value);
    emit("change", currentDate.value);
  }
};

/**
 * @description 处理日期选择
 */
const handleSelectDate = (date: Date) => {
  currentDate.value = date;
  updateModelValue(date);
  emit("change", date);
};

/**
 * @description 处理时间变化
 */
const handleTimeChange = (date: Date) => {
  currentDate.value = date;
  updateModelValue(date);
  emit("time-change", date);
  emit("change", date);
};

/**
 * @description 跳转到指定日期
 */
const jumpToDate = (date: Date) => {
  if (props.disabled) return;
  const newDate = new Date(date);
  currentDate.value = newDate;
  updateModelValue(newDate);
  emit("jump-to-date", newDate);
  emit("change", newDate);
};

// 暴露方法给父组件
defineExpose({
  jumpToDate
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
