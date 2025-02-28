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
        <calendar-time-picker
          :model-value="currentDate"
          :disabled="disabled"
          :disabled-time-view="props.disabledTimeView"
          @change="handleTimeChange"
          @dialog-open="handleTimeDialogOpen"
          @dialog-close="handleTimeDialogClose"
        />
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
          :model-value="internalValue"
          @select="handleYearSelect"
        />

        <!-- 月份模式 -->
        <calendar-month
          v-else-if="tempMode === 'month'"
          key="month-mode"
          :current-year="currentYear"
          :disabled="disabled"
          :disabled-date="props.disabledDate"
          :model-value="internalValue"
          @select="handleMonthSelect"
        />

        <!-- 日期模式 -->
        <calendar-date
          v-else
          key="date-mode"
          :current-date="currentDate"
          :disabled="disabled"
          :disabled-date="props.disabledDate"
          :model-value="internalValue"
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
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";
import type { DateType, EmitsType, PropsType, ModeType } from "./calendar";
import { formatDate, parseDate } from "@/utils/dateFormat";
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
  showTime: false,
  disabledTimeView: true
});

const model = defineModel<DateType>();
const emit = defineEmits<EmitsType>();

/**
 * @description 将任意日期类型转换为Date对象
 * @param value 日期值（可以是Date对象、时间戳或日期字符串）
 * @returns Date对象
 */
const toDateObject = (value: DateType | null | undefined): Date => {
  if (!value) return new Date();
  if (value instanceof Date) {
    return value;
  }
  // 如果是字符串且设置了valueFormat，尝试按照指定格式解析
  if (typeof value === "string" && props.valueFormat) {
    try {
      return parseDate(value, props.valueFormat);
    } catch (e) {
      console.warn("日期格式解析失败，使用默认解析", e);
      return new Date(value);
    }
  }
  // 其他情况直接创建Date对象
  return new Date(value);
};

// 内部日期值（始终为Date对象）
const internalValue = computed(() => toDateObject(model.value));

// 当前显示的日期
const currentDate = ref(toDateObject(model.value));

// 临时模式（用于模式切换）
const tempMode = ref<ModeType>(props.mode);

// 时间更新定时器
let timeUpdateInterval: number | null = null;

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
 * @description 更新当前时间（仅更新时分秒）
 */
const updateCurrentTime = () => {
  if (!props.showTime) return;

  const now = new Date();
  const updatedDate = new Date(currentDate.value);
  updatedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

  // 更新当前日期
  currentDate.value = updatedDate;

  // 更新模型值
  updateModelValue(updatedDate);
};

/**
 * @description 启动时间更新定时器
 */
const startTimeUpdateTimer = () => {
  // 如果已经有定时器或者disabledTimeView为false（用户可以手动修改时间），则不启动定时器
  if (timeUpdateInterval || !props.disabledTimeView) return;

  // 立即更新一次
  updateCurrentTime();

  // 每秒更新一次
  timeUpdateInterval = window.setInterval(updateCurrentTime, 1000);
};

/**
 * @description 停止时间更新定时器
 */
const stopTimeUpdateTimer = () => {
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval);
    timeUpdateInterval = null;
  }
};

// 初始化时确保model值符合valueFormat
onMounted(() => {
  if (model.value && props.valueFormat) {
    // 确保初始值按照valueFormat格式化
    updateModelValue(toDateObject(model.value));
  }

  // 如果开启了showTime且disabledTimeView为true，才启动时间更新定时器
  if (props.showTime && props.disabledTimeView) {
    startTimeUpdateTimer();
  }
});

// 组件卸载前停止定时器
onBeforeUnmount(() => {
  stopTimeUpdateTimer();
});

// 监听showTime和disabledTimeView属性变化
watch([() => props.showTime, () => props.disabledTimeView], ([showTime, disabledTimeView]) => {
  // 只有当showTime为true且disabledTimeView为true时才启动定时器
  if (showTime && disabledTimeView) {
    startTimeUpdateTimer();
  } else {
    stopTimeUpdateTimer();
  }
});

// 监听model值的变化，更新currentDate
watch(
  () => model.value,
  newValue => {
    if (newValue) {
      currentDate.value = toDateObject(newValue);
    }
  },
  { immediate: true }
);

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
    emit("change", model.value);
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
  console.log("handleSelectDate", model.value);
  emit("change", currentDate.value);
};

/**
 * @description 处理时间变化
 */
const handleTimeChange = (date: Date) => {
  currentDate.value = date;
  updateModelValue(date);
  emit("time-change", new Date(date));
  emit("change", currentDate.value);
};

/**
 * @description 跳转到指定日期
 */
const jumpToDate = (date: Date) => {
  if (props.disabled) return;
  currentDate.value = new Date(date);
  updateModelValue(currentDate.value);
  emit("jump-to-date", new Date(date));
  emit("change", currentDate.value);
};

/**
 * @description 处理时间对话框打开
 */
const handleTimeDialogOpen = () => {
  emit("time-dialog-open");
};

/**
 * @description 处理时间对话框关闭
 */
const handleTimeDialogClose = () => {
  emit("time-dialog-close");
};

// 暴露方法给父组件
defineExpose({
  jumpToDate
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
