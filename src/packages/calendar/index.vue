<template>
  <div class="t-calendar">
    <!-- 日历头部 -->
    <div class="_header">
      <div class="_nav" :class="{ '_with-time': props.showTime }">
        <div class="_date-nav" :class="{ _centered: !props.showTime }">
          <div class="_nav-btn" :class="{ 't-disabled': disabled }" @click="handlePrev">
            <t-icon icon="left" />
          </div>
          <div class="_title">
            <span class="year-text" :class="{ active: tempMode === 'year' }" @click="handleYearTitleClick">
              {{ currentYear }}年
            </span>
            <template v-if="tempMode !== 'year'">
              <span class="month-text" :class="{ active: tempMode === 'month' }" @click="handleMonthTitleClick">
                {{ currentMonth }}月
              </span>
            </template>
          </div>
          <div class="_nav-btn" :class="{ 't-disabled': disabled }" @click="handleNext">
            <t-icon icon="right" />
          </div>
        </div>

        <!-- 时间选择器 -->
        <div class="_time-picker" v-if="props.showTime && tempMode === 'date'">
          <t-popover
            v-model="timeSelectVisible"
            type="click"
            position="bottom"
            :padding="8"
            :radius="4"
            :disabled="disabled"
            width="280px"
            @open="handleTimePopoverOpen"
          >
            <!-- 时间显示触发区域 -->
            <div class="_time-display">
              <span>{{ formatTime }}</span>
              <t-icon icon="caret-down" :size="14" />
            </div>

            <!-- 时间选择面板 -->
            <template #content>
              <div class="_time-panel-wrapper">
                <!-- 时间列表容器 -->
                <div class="_time-lists-container">
                  <!-- 小时列表 -->
                  <div class="_time-list-column">
                    <div class="_time-column-title">时</div>
                    <t-list-view ref="hourListViewRef" :list-data="hoursList" class="_time-list" :height="200">
                      <template #default="{ row }">
                        <div class="_time-item" :class="{ _selected: tempTimeHour === row }" @click="handleHourSelect(row)">
                          {{ row.toString().padStart(2, "0") }}
                        </div>
                      </template>
                    </t-list-view>
                  </div>

                  <!-- 分钟列表 -->
                  <div class="_time-list-column">
                    <div class="_time-column-title">分</div>
                    <t-list-view ref="minuteListViewRef" :list-data="minutesList" class="_time-list" :height="200">
                      <template #default="{ row }">
                        <div class="_time-item" :class="{ _selected: tempTimeMinute === row }" @click="handleMinuteSelect(row)">
                          {{ row.toString().padStart(2, "0") }}
                        </div>
                      </template>
                    </t-list-view>
                  </div>

                  <!-- 秒列表 -->
                  <div class="_time-list-column">
                    <div class="_time-column-title">秒</div>
                    <t-list-view ref="secondListViewRef" :list-data="secondsList" class="_time-list" :height="200">
                      <template #default="{ row }">
                        <div class="_time-item" :class="{ _selected: tempTimeSecond === row }" @click="handleSecondSelect(row)">
                          {{ row.toString().padStart(2, "0") }}
                        </div>
                      </template>
                    </t-list-view>
                  </div>
                </div>

                <div class="_time-actions">
                  <button class="_time-btn _confirm" @click="confirmTimeSelect">确定</button>
                  <button class="_time-btn _cancel" @click="cancelTimeSelect">取消</button>
                </div>
              </div>
            </template>
          </t-popover>
        </div>
      </div>
    </div>

    <!-- 日历主体 -->
    <div class="_body">
      <transition-group name="fade-mode" tag="div" class="mode-container">
        <!-- 年份模式 -->
        <div v-if="tempMode === 'year'" class="_years" key="year-mode">
          <div
            v-for="year in yearList"
            :key="year"
            class="_year"
            :class="{
              _selected: isSelectedYear(year),
              't-disabled': isDisabled(new Date(year, 0, 1))
            }"
            @click="handleYearSelect(year)"
          >
            {{ year }}
          </div>
        </div>

        <!-- 月份模式 -->
        <div v-else-if="tempMode === 'month'" class="_months" key="month-mode">
          <div
            v-for="(month, index) in MONTH_NAMES"
            :key="month"
            class="_month"
            :class="{
              _selected: isSelectedMonth(index),
              't-disabled': isDisabled(new Date(currentYear, index, 1))
            }"
            @click="handleMonthSelect(index)"
          >
            {{ month }}
          </div>
        </div>

        <!-- 日期模式 -->
        <div v-else class="_dates" key="date-mode">
          <!-- 星期标题 -->
          <div class="_weekdays">
            <div v-for="day in WEEK_DAYS" :key="day">{{ day }}</div>
          </div>

          <!-- 日期网格 -->
          <div class="_days">
            <div
              v-for="(date, index) in calendarDays"
              :key="index"
              class="_day"
              :class="{
                _today: isToday(date),
                _selected: isSelected(date),
                't-disabled': isDisabled(date),
                '_other-month': !isSameMonth(date, currentDate)
              }"
              @click="handleSelectDate(date)"
            >
              <slot name="date" :date="date">
                {{ date.getDate() }}
              </slot>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- 日历底部 -->
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, nextTick } from "vue";
import type { TListViewType } from "@/packages/listView";
import type { DateType, EmitsType, PropsType, ModeType } from "./calendar";
import { WEEK_DAYS, MONTH_NAMES, HOURS, MINUTES, SECONDS } from "./calendar";
import { TIcon } from "@/packages/icon";
import { TPopover } from "@/packages/popover";
import { TListView } from "@/packages/listView";
import { formatDate } from "@/utils/dateFormat";

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

// 时间选择相关状态
const timeSelectVisible = ref(false);
const tempTime = ref<Date | null>(null);

// 当前年份
const currentYear = computed(() => currentDate.value.getFullYear());

// 当前月份
const currentMonth = computed(() => currentDate.value.getMonth() + 1);

// 当前小时
const currentHour = computed(() => currentDate.value.getHours());

// 当前分钟
const currentMinute = computed(() => currentDate.value.getMinutes());

// 当前秒
const currentSecond = computed(() => currentDate.value.getSeconds());

// 临时时间的小时
const tempTimeHour = computed(() => (tempTime.value ? tempTime.value.getHours() : currentHour.value));

// 临时时间的分钟
const tempTimeMinute = computed(() => (tempTime.value ? tempTime.value.getMinutes() : currentMinute.value));

// 临时时间的秒
const tempTimeSecond = computed(() => (tempTime.value ? tempTime.value.getSeconds() : currentSecond.value));

// 格式化的时间字符串
const formatTime = computed(() => {
  // 时间显示始终使用时分秒格式
  const hours = currentDate.value.getHours().toString().padStart(2, "0");
  const minutes = currentDate.value.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.value.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
});

// 年份列表
const yearList = computed(() => {
  const year = currentYear.value;
  const startYear = Math.floor(year / 10) * 10;
  return Array.from({ length: 12 }, (_, i) => startYear + i);
});

// 时间列表数据
const hoursList = computed(() => HOURS);
const minutesList = computed(() => MINUTES);
const secondsList = computed(() => SECONDS);

// 添加ListView组件的ref引用
const hourListViewRef = ref<TListViewType>(null);
const minuteListViewRef = ref<TListViewType>(null);
const secondListViewRef = ref<TListViewType>(null);

/**
 * 选择小时
 */
const handleHourSelect = (hour: number) => {
  if (!tempTime.value) tempTime.value = new Date(currentDate.value);
  tempTime.value.setHours(hour);
  // 强制更新视图
  tempTime.value = new Date(tempTime.value);
};

/**
 * 选择分钟
 */
const handleMinuteSelect = (minute: number) => {
  if (!tempTime.value) tempTime.value = new Date(currentDate.value);
  tempTime.value.setMinutes(minute);
  // 强制更新视图
  tempTime.value = new Date(tempTime.value);
};

/**
 * 选择秒
 */
const handleSecondSelect = (second: number) => {
  if (!tempTime.value) tempTime.value = new Date(currentDate.value);
  tempTime.value.setSeconds(second);
  // 强制更新视图
  tempTime.value = new Date(tempTime.value);
};

/**
 * 确认时间选择
 */
const confirmTimeSelect = () => {
  if (tempTime.value) {
    currentDate.value = tempTime.value;
    updateModelValue(tempTime.value);
    emit("time-change", tempTime.value);
    emit("change", tempTime.value);
  }
  timeSelectVisible.value = false;
};

/**
 * 取消时间选择
 */
const cancelTimeSelect = () => {
  timeSelectVisible.value = false;
};

/**
 * 更新模型值
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

// 监听时间选择器显示状态变化
watch(timeSelectVisible, visible => {
  if (visible) {
    // 打开时初始化临时时间
    tempTime.value = new Date(currentDate.value);
  }
});

/**
 * 处理年份标题点击
 */
const handleYearTitleClick = () => {
  if (props.disabled) return;
  tempMode.value = "year";
};

/**
 * 处理月份标题点击
 */
const handleMonthTitleClick = () => {
  if (props.disabled) return;
  tempMode.value = "month";
};

/**
 * 判断是否是选中的年份
 */
const isSelectedYear = (year: number) => {
  if (!model.value) return false;
  return new Date(model.value).getFullYear() === year;
};

/**
 * 判断是否是选中的月份
 */
const isSelectedMonth = (month: number) => {
  if (!model.value) return false;
  const date = new Date(model.value);
  return date.getFullYear() === currentYear.value && date.getMonth() === month;
};

/**
 * 获取当月的所有日期（包括上月和下月的部分日期）
 */
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 获取当月第一天是星期几
  const firstDayWeek = firstDay.getDay();
  // 获取当月最后一天是几号
  const lastDate = lastDay.getDate();

  const days: Date[] = [];

  // 添加上月的日期
  for (let i = 0; i < firstDayWeek; i++) {
    const date = new Date(year, month, -i);
    days.unshift(date);
  }

  // 添加当月的日期
  for (let i = 1; i <= lastDate; i++) {
    days.push(new Date(year, month, i));
  }

  // 添加下月的日期，补满 42 个格子（6行7列）
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
});

/**
 * 判断是否是今天
 */
const isToday = (date: Date) => {
  const today = new Date();
  return isSameDay(date, today);
};

/**
 * 判断是否是选中日期
 */
const isSelected = (date: Date) => {
  if (!model.value) return false;
  return isSameDay(date, new Date(model.value));
};

/**
 * 判断是否禁用
 */
const isDisabled = (date: Date) => {
  if (props.disabled) return true;
  if (props.disabledDate) return props.disabledDate(date);
  return false;
};

/**
 * 判断是否是同一天
 */
const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
  );
};

/**
 * 判断是否是同一月
 */
const isSameMonth = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
};

/**
 * 跳转到指定日期
 */
const jumpToDate = (date: Date) => {
  if (props.disabled) return;
  const newDate = new Date(date);
  currentDate.value = newDate;
  updateModelValue(newDate);
  emit("jump-to-date", newDate);
  emit("change", newDate);
};

/**
 * 处理年份选择
 */
const handleYearSelect = (year: number) => {
  if (isDisabled(new Date(year, 0, 1))) return;
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
 * 处理月份选择
 */
const handleMonthSelect = (month: number) => {
  if (isDisabled(new Date(currentYear.value, month, 1))) return;
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
 * 处理日期选择
 */
const handleSelectDate = (date: Date) => {
  if (isDisabled(date)) return;

  // 保留原时间部分
  if (props.showTime && model.value) {
    const selectedDate = new Date(date);
    const currentTime = new Date(model.value);
    selectedDate.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
    date = selectedDate;
  }

  currentDate.value = date;
  updateModelValue(date);
  emit("change", date);
};

/**
 * 处理上一个时间段
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
 * 处理下一个时间段
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
 * 处理时间选择弹出框打开事件
 * 初始化临时时间并滚动到当前时间位置
 */
const handleTimePopoverOpen = () => {
  // 初始化临时时间为当前选中时间
  tempTime.value = new Date(currentDate.value);
  // 使用nextTick确保DOM已更新
  nextTick(() => {
    // 计算每个时间项的高度为36px
    const itemHeight = 36;
    // 滚动到对应位置
    if (hourListViewRef.value) {
      hourListViewRef.value.scrollToItem(currentHour.value * itemHeight);
    }
    if (minuteListViewRef.value) {
      minuteListViewRef.value.scrollToItem(currentMinute.value * itemHeight);
    }
    if (secondListViewRef.value) {
      secondListViewRef.value.scrollToItem(currentSecond.value * itemHeight);
    }
  });
};

// 暴露方法给父组件
defineExpose({
  jumpToDate
});
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
