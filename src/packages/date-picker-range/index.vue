<template>
  <div class="t-date-picker-range">
    <t-popover
      v-model="isDropdownVisible"
      :close-on-press-other="!isTimeDialogOpen"
      type="click"
      :position="props.position"
      :padding="0"
      :radius="DROPDOWN_RADIUS"
      :disabled="disabled"
      @close="handleClose"
      @open="handleOpen"
      ref="popoverRef"
    >
      <!-- 下拉日历面板 -->
      <template #content>
        <div class="_date-picker-range-dropdown">
          <!-- 日历容器 -->
          <div class="_calendars-container">
            <!-- 开始日期日历 -->
            <div class="_calendar-wrapper">
              <t-calendar
                v-model="startDate"
                :mode="props.mode"
                :disabled="props.disabled"
                :disabled-date="handleStartDateDisabled"
                :show-time="props.showTime"
                :disabled-time-view="false"
                :value-format="props.valueFormat"
                @change="handleStartDateChange"
                @panel-change="handlePanelChange"
                @time-dialog-open="handleTimeDialogOpen"
                @time-dialog-close="handleTimeDialogClose"
                ref="startCalendarRef"
              >
                <!-- 传递日期单元格插槽 -->
                <template #date="slotProps" v-if="$slots.date">
                  <slot name="date" :date="slotProps.date"></slot>
                </template>

                <!-- 传递底部插槽 -->
                <template #footer>
                  <slot name="footer" />
                </template>
              </t-calendar>
            </div>

            <!-- 结束日期日历 -->
            <div class="_calendar-wrapper">
              <t-calendar
                v-model="endDate"
                :mode="props.mode"
                :disabled="props.disabled"
                :disabled-date="handleEndDateDisabled"
                :show-time="props.showTime"
                :disabled-time-view="false"
                :value-format="props.valueFormat"
                @change="handleEndDateChange"
                @panel-change="handlePanelChange"
                @time-dialog-open="handleTimeDialogOpen"
                @time-dialog-close="handleTimeDialogClose"
                ref="endCalendarRef"
              >
                <!-- 传递日期单元格插槽 -->
                <template #date="slotProps" v-if="$slots.date">
                  <slot name="date" :date="slotProps.date"></slot>
                </template>

                <!-- 传递底部插槽 -->
                <template #footer>
                  <slot name="footer" />
                </template>
              </t-calendar>
            </div>
          </div>

          <!-- 快捷选择区域 -->
          <div class="_shortcuts-wrapper" v-if="props.shortcuts && props.shortcuts.length > 0">
            <t-list-view :list-data="props.shortcuts" class="_shortcuts-list" :height="272">
              <template #default="{ row, index }">
                <div class="_shortcut-item" :class="{ _active: isShortcutActive(row) }" @click="handleShortcutSelect(row, index)">
                  {{ row.label }}
                </div>
              </template>
            </t-list-view>
          </div>
        </div>
      </template>

      <!-- 输入框显示区域 -->
      <div :class="datePickerRangeClassNames">
        <!-- 前缀插槽 -->
        <div class="_prefix" v-if="$slots.prefix">
          <slot name="prefix"></slot>
        </div>

        <!-- 开始日期输入框 -->
        <div class="_input-wrapper">
          <input
            ref="startInputRef"
            readonly
            :value="startDisplayValue"
            :placeholder="props.startPlaceholder"
            :disabled="props.disabled"
            @focus="handleFocus"
            @blur="handleBlur"
          />
        </div>

        <!-- 分隔符 -->
        <div class="_separator">{{ props.separator }}</div>

        <!-- 结束日期输入框 -->
        <div class="_input-wrapper">
          <input
            ref="endInputRef"
            readonly
            :value="endDisplayValue"
            :placeholder="props.endPlaceholder"
            :disabled="props.disabled"
            @focus="handleFocus"
            @blur="handleBlur"
          />
        </div>

        <!-- 右侧清空图标 -->
        <div class="_right-icon" v-if="showClearIcon">
          <t-icon icon="close-to" :size="iconSize" :color="ICON_COLOR" @click.stop="handleClear" />
        </div>
      </div>
    </t-popover>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch } from "vue";
import type { EmitsType, PropsType, ShortcutType } from "./date-picker-range";
import type { DateType, ModeType } from "../calendar/calendar";
import type { TPopoverType } from "@/packages/popover";
import { TPopover } from "@/packages/popover";
import { TIcon } from "@/packages/icon";
import { TCalendar } from "@/packages/calendar";
import { formatDate, parseDate } from "@/utils/dateFormat";
import { isValue } from "@/utils/is";
import { configOptions } from "@/hooks/useOptions";
import { ICON_COLOR, DROPDOWN_RADIUS, ICON_SIZES } from "./date-picker-range";
import { TListView } from "@/packages/listView";

// 组件名称定义
defineOptions({ name: "TDatePickerRange" });

// Props 和 Emits 定义
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  mode: "date",
  startPlaceholder: "开始日期",
  endPlaceholder: "结束日期",
  position: "bottom",
  size: configOptions.value.elSize,
  disabled: false,
  clearable: true,
  showTime: false,
  separator: "-",
  shortcuts: () => []
});

// v-model 定义 - 数组类型 [开始日期, 结束日期]
const model = defineModel<[DateType, DateType]>();

// refs
const startInputRef = ref();
const endInputRef = ref();
const popoverRef = ref<TPopoverType>();
const startCalendarRef = ref();
const endCalendarRef = ref();

// 组件状态
const isDropdownVisible = ref(false);
const isTimeDialogOpen = ref(false);
const startDate = ref<DateType>();
const endDate = ref<DateType>();

// 在组件初始化时对model值进行格式化
onMounted(() => {
  if (model.value) {
    // 确保model是一个包含两个元素的数组
    if (Array.isArray(model.value) && model.value.length === 2) {
      startDate.value = model.value[0];
      endDate.value = model.value[1];
    } else {
      // 如果model不是有效的数组，初始化为当前日期和后一天
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      startDate.value = today;
      endDate.value = tomorrow;

      // 更新model值
      updateModelValue();
    }
  } else {
    // 如果model为空，初始化为当前日期和后一天
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    startDate.value = today;
    endDate.value = tomorrow;

    // 更新model值
    updateModelValue();
  }
});

// 监听model值的变化
watch(
  () => model.value,
  newValue => {
    if (newValue && Array.isArray(newValue) && newValue.length === 2) {
      startDate.value = newValue[0];
      endDate.value = newValue[1];
    }
  },
  { deep: true }
);

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

// 计算属性
const datePickerRangeClassNames = computed(() => {
  const { size, clearable, disabled } = props;
  return [
    "_date-picker-range-content",
    `t-date-picker-range-size-${size}`,
    clearable && "t-date-picker-range-clearable",
    disabled && "t-disabled"
  ];
});

const showClearIcon = computed(() => {
  return props.clearable && isValue(startDate.value) && isValue(endDate.value) && !props.disabled;
});

const iconSize = computed(() => ICON_SIZES[props.size]);

/**
 * @description 根据模式获取默认格式化字符串
 */
const getDefaultFormat = () => {
  if (props.showTime) return "YYYY-MM-DD HH:mm:ss";
  switch (props.mode) {
    case "year":
      return "YYYY年";
    case "month":
      return "YYYY年MM月";
    default:
      return "YYYY-MM-DD";
  }
};

/**
 * @description 格式化显示值
 * @param date 日期值
 */
const formatDisplayValue = (date: DateType | null | undefined) => {
  if (!date) return "";
  // 如果有显示格式化要求，使用显示格式化
  if (props.format) {
    return formatDate(toDateObject(date), props.format);
  }
  // 默认格式化 - 根据模式选择合适的格式
  return formatDate(toDateObject(date), getDefaultFormat());
};

/**
 * @description 开始日期显示值
 */
const startDisplayValue = computed(() => formatDisplayValue(startDate.value));

/**
 * @description 结束日期显示值
 */
const endDisplayValue = computed(() => formatDisplayValue(endDate.value));

/**
 * @description 格式化模型值
 * @param date 日期对象或其他日期类型
 * @returns 格式化后的值
 */
const formatModelValue = (date: DateType): DateType => {
  if (!date) return date;

  // 先确保是Date对象
  const dateObj = date instanceof Date ? date : toDateObject(date);

  // 如果设置了valueFormat，则返回格式化后的字符串
  if (props.valueFormat) {
    return formatDate(dateObj, props.valueFormat);
  }

  // 否则返回Date对象
  return dateObj;
};

/**
 * @description 更新模型值
 */
const updateModelValue = () => {
  if (startDate.value && endDate.value) {
    model.value = [formatModelValue(startDate.value), formatModelValue(endDate.value)];

    // 触发change事件
    emit("change", model.value);
  }
};

/**
 * @description 处理开始日期变化
 * @param date 选择的日期
 */
const handleStartDateChange = (date: DateType) => {
  startDate.value = date;

  // 如果开始日期大于结束日期，更新结束日期
  const startDateObj = toDateObject(date);
  const endDateObj = toDateObject(endDate.value);

  if (startDateObj > endDateObj) {
    // 设置结束日期为开始日期后一天
    const newEndDate = new Date(startDateObj);
    newEndDate.setDate(newEndDate.getDate() + 1);
    endDate.value = formatModelValue(newEndDate);
  }

  // 更新模型值
  updateModelValue();
};

/**
 * @description 处理结束日期变化
 * @param date 选择的日期
 */
const handleEndDateChange = (date: DateType) => {
  endDate.value = date;

  // 如果结束日期小于开始日期，更新开始日期
  const startDateObj = toDateObject(startDate.value);
  const endDateObj = toDateObject(date);

  if (endDateObj < startDateObj) {
    // 设置开始日期为结束日期前一天
    const newStartDate = new Date(endDateObj);
    newStartDate.setDate(newStartDate.getDate() - 1);
    startDate.value = formatModelValue(newStartDate);
  }

  // 更新模型值
  updateModelValue();

  // 如果不显示时间，选择日期后自动关闭下拉框
  if (!props.showTime) {
    isDropdownVisible.value = false;
  }
};

/**
 * @description 处理开始日期禁用逻辑
 * @param date 日期对象
 */
const handleStartDateDisabled = (date: Date) => {
  // 首先应用用户自定义的禁用逻辑
  if (props.disabledDate && props.disabledDate(date)) {
    return true;
  }

  return false;
};

/**
 * @description 处理结束日期禁用逻辑
 * @param date 日期对象
 */
const handleEndDateDisabled = (date: Date) => {
  // 首先应用用户自定义的禁用逻辑
  if (props.disabledDate && props.disabledDate(date)) {
    return true;
  }

  // 禁用小于开始日期的日期
  if (startDate.value) {
    const startDateObj = toDateObject(startDate.value);
    // 对于日期模式，禁用小于开始日期的日期
    if (props.mode === "date") {
      return date < new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate());
    }
    // 对于月份模式，禁用小于开始月份的月份
    else if (props.mode === "month") {
      return (
        date.getFullYear() < startDateObj.getFullYear() ||
        (date.getFullYear() === startDateObj.getFullYear() && date.getMonth() < startDateObj.getMonth())
      );
    }
    // 对于年份模式，禁用小于开始年份的年份
    else if (props.mode === "year") {
      return date.getFullYear() < startDateObj.getFullYear();
    }
  }

  return false;
};

/**
 * @description 处理面板变化
 * @param mode 面板模式
 */
const handlePanelChange = (mode: ModeType) => {
  emit("panel-change", mode);
};

/**
 * @description 处理时间对话框打开
 */
const handleTimeDialogOpen = () => {
  isTimeDialogOpen.value = true;
  emit("time-dialog-open");
};

/**
 * @description 处理时间对话框关闭
 */
const handleTimeDialogClose = () => {
  isTimeDialogOpen.value = false;
  emit("time-dialog-close");
};

/**
 * @description 处理清空
 */
const handleClear = (event: Event) => {
  event.stopPropagation();
  startDate.value = undefined;
  endDate.value = undefined;
  model.value = [undefined, undefined] as unknown as [DateType, DateType];
  emit("clear");
  // 关闭下拉框
  isDropdownVisible.value = false;
};

/**
 * @description 处理聚焦
 */
const handleFocus = () => {
  if (props.disabled) return;
  emit("focus");
};

/**
 * @description 处理失焦
 */
const handleBlur = () => {
  if (props.disabled) return;
  emit("blur");
};

/**
 * @description 判断快捷选择项是否处于激活状态
 * @param shortcut 快捷选择项
 * @returns 是否激活
 */
const isShortcutActive = (shortcut: ShortcutType): boolean => {
  if (!startDate.value || !endDate.value || !shortcut.value) return false;

  const startDateObj = toDateObject(startDate.value);
  const endDateObj = toDateObject(endDate.value);
  const shortcutStartObj = toDateObject(shortcut.value[0]);
  const shortcutEndObj = toDateObject(shortcut.value[1]);

  // 比较日期是否相同（忽略时分秒）
  const isSameDate = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
    );
  };

  return isSameDate(startDateObj, shortcutStartObj) && isSameDate(endDateObj, shortcutEndObj);
};

/**
 * @description 处理快捷选择
 * @param shortcut 快捷选择项
 */
const handleShortcutSelect = (shortcut: ShortcutType) => {
  if (Array.isArray(shortcut.value) && shortcut.value.length === 2) {
    startDate.value = shortcut.value[0];
    endDate.value = shortcut.value[1];
    updateModelValue();

    // 如果不显示时间，选择日期后自动关闭下拉框
    if (!props.showTime) {
      isDropdownVisible.value = false;
    }
  }
};

/**
 * @description 处理关闭
 */
const handleClose = () => {
  emit("date-dialog-close");
};

/**
 * @description 处理打开
 */
const handleOpen = () => {
  emit("date-dialog-open");
};

/**
 * @description 跳转到指定日期范围
 * @param dateRange 日期范围 [开始日期, 结束日期]
 */
const jumpToDateRange = (dateRange: [Date, Date]) => {
  if (props.disabled) return;

  if (startCalendarRef.value && endCalendarRef.value) {
    startCalendarRef.value.jumpToDate(dateRange[0]);
    endCalendarRef.value.jumpToDate(dateRange[1]);
  }

  startDate.value = dateRange[0];
  endDate.value = dateRange[1];
  updateModelValue();
};

// 暴露方法给父组件
defineExpose({
  jumpToDateRange
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
