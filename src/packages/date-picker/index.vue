<template>
  <div class="t-date-picker">
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
        <div class="_date-picker-dropdown">
          <!-- 日历组件 -->
          <t-calendar
            v-model="model"
            :mode="props.mode"
            :disabled="props.disabled"
            :disabled-date="props.disabledDate"
            :show-time="props.showTime"
            :disabled-time-view="false"
            :value-format="props.valueFormat"
            @change="handleDateChange"
            @panel-change="handlePanelChange"
            @jump-to-date="handleJumpToDate"
            @time-change="handleTimeChange"
            @time-dialog-open="handleTimeDialogOpen"
            @time-dialog-close="handleTimeDialogClose"
            ref="calendarRef"
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
      </template>

      <!-- 输入框显示区域 -->
      <div :class="datePickerClassNames">
        <!-- 前缀插槽 -->
        <div class="_prefix" v-if="$slots.prefix">
          <slot name="prefix"></slot>
        </div>
        <component :is="TipComponent" />
        <div class="_input-wrapper">
          <input
            ref="inputRef"
            readonly
            :value="displayValue"
            :placeholder="TEXT_DEFAULT_PLACEHOLDER"
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
import "./index.scss";

import type { EmitsType, PropsType } from "./date-picker";
import type { DateType, ModeType } from "../calendar/calendar";
import type { TPopoverType } from "@/packages/popover";

import { computed, ref, onMounted } from "vue";
import { TPopover } from "@/packages/popover";
import { TIcon } from "@/packages/icon";
import { TCalendar } from "@/packages/calendar";
import { formatDate, parseDate } from "@/utils/dateFormat";
import { isValue } from "@/utils/is";
import { useOptions } from "@/hooks/useOptions";
import { ICON_COLOR, DROPDOWN_RADIUS, ICON_SIZES } from "./date-picker";
import { useTip } from "@/hooks";
import { useI18nText } from "./i18n";

defineOptions({ name: "TDatePicker" });

/**
 * @description Props和Emits定义
 */
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  mode: "date",
  position: "bottom",
  isTip: true,
  disabled: false,
  clearable: true,
  showTime: false
});

/**
 * @description 基础尺寸配置
 */
const { baseSize } = useOptions(props);

/**
 * @description 国际化文本
 */
const { TEXT_DEFAULT_PLACEHOLDER, TEXT_DATE_PARSE_ERROR, TEXT_YEAR, TEXT_MONTH } = useI18nText(props);

/**
 * @description v-model定义
 */
const model = defineModel<DateType>();

/**
 * @description 提示组件
 */
const TipComponent = useTip(props, model);

/**
 * @description DOM引用
 */
const inputRef = ref();
const popoverRef = ref<TPopoverType>();
const calendarRef = ref();

/**
 * @description 组件状态
 */
const isDropdownVisible = ref(false);
const isTimeDialogOpen = ref(false);

/**
 * @description 组件挂载时格式化初始值
 * @returns {void}
 */
onMounted(() => {
  if (model.value) {
    model.value = formatModelValue(model.value);
  }
});

/**
 * @description 将任意日期类型转换为Date对象
 * @param {DateType | null | undefined} value - 日期值（可以是Date对象、时间戳或日期字符串）
 * @returns {Date} Date对象
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
      console.warn(TEXT_DATE_PARSE_ERROR, e);
      return new Date(value);
    }
  }
  // 其他情况直接创建Date对象
  return new Date(value);
};

/**
 * @description 计算日期选择器类名
 * @returns {(string | boolean)[]} 类名数组
 */
const datePickerClassNames = computed(() => {
  const { clearable, disabled } = props;
  return [
    "_date-picker-content",
    `t-date-picker-size-${baseSize.value}`,
    clearable && "t-date-picker-clearable",
    disabled && "t-disabled"
  ];
});

/**
 * @description 计算是否显示清空图标
 * @returns {boolean} 是否显示清空图标
 */
const showClearIcon = computed((): boolean => props.clearable && isValue(model.value) && !props.disabled);

/**
 * @description 计算图标尺寸
 * @returns {number} 图标尺寸
 */
const iconSize = computed((): number => ICON_SIZES[baseSize.value]);

/**
 * @description 根据模式获取默认格式化字符串
 * @returns {string} 格式化字符串
 */
const getDefaultFormat = (): string => {
  if (props.showTime) return "YYYY-MM-DD HH:mm:ss";
  switch (props.mode) {
    case "year":
      return `YYYY${TEXT_YEAR}`;
    case "month":
      return `YYYY${TEXT_MONTH}`;
    default:
      return "YYYY-MM-DD";
  }
};

/**
 * @description 计算格式化显示值
 * @returns {string} 格式化后的显示值
 */
const displayValue = computed((): string => {
  if (!model.value) return "";
  // 如果有显示格式化要求，使用显示格式化
  if (props.format) {
    return formatDate(toDateObject(model.value), props.format);
  }
  // 默认格式化 - 根据模式选择合适的格式
  return formatDate(toDateObject(model.value), getDefaultFormat());
});

/**
 * @description 格式化模型值
 * @param {DateType} date - 日期对象或其他日期类型
 * @returns {DateType} 格式化后的值
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
 * @description 处理日期变化
 * @param {DateType} date - 选择的日期
 * @returns {void}
 */
const handleDateChange = (date: DateType): void => {
  // 确保按照valueFormat格式化
  emit("change", date);

  // 如果不显示时间，选择日期后自动关闭下拉框
  if (!props.showTime) {
    isDropdownVisible.value = false;
  }
};

/**
 * @description 处理面板变化
 * @param {ModeType} mode - 面板模式
 * @returns {void}
 */
const handlePanelChange = (mode: ModeType): void => {
  emit("panel-change", mode);
};

/**
 * @description 处理跳转到指定日期
 * @param {Date} date - 日期对象
 * @returns {void}
 */
const handleJumpToDate = (date: Date): void => {
  model.value = date;
  emit("change", model.value);
};

/**
 * @description 处理时间变化
 * @param {Date} date - 日期对象
 * @returns {void}
 */
const handleTimeChange = (date: Date): void => {
  emit("change", date);
};

/**
 * @description 处理时间对话框打开
 * @returns {void}
 */
const handleTimeDialogOpen = (): void => {
  isTimeDialogOpen.value = true;
  emit("time-dialog-open");
};

/**
 * @description 处理时间对话框关闭
 * @returns {void}
 */
const handleTimeDialogClose = (): void => {
  isTimeDialogOpen.value = false;
  emit("time-dialog-close");
};

/**
 * @description 处理清空
 * @param {Event} event - 事件对象
 * @returns {void}
 */
const handleClear = (event: Event): void => {
  event.stopPropagation();
  model.value = undefined;
  emit("clear");
  // 关闭下拉框
  isDropdownVisible.value = false;
};

/**
 * @description 处理聚焦
 * @returns {void}
 */
const handleFocus = (): void => {
  if (props.disabled) return;
  emit("focus");
};

/**
 * @description 处理失焦
 * @returns {void}
 */
const handleBlur = (): void => {
  if (props.disabled) return;
  emit("blur");
};

/**
 * @description 跳转到指定日期
 * @param {Date} date - 日期对象
 * @returns {void}
 */
const jumpToDate = (date: Date): void => {
  if (props.disabled) return;
  if (calendarRef.value) {
    calendarRef.value.jumpToDate(date);
  }
};

/**
 * @description 处理关闭
 * @returns {void}
 */
const handleClose = (): void => {
  emit("date-dialog-close");
};

/**
 * @description 处理打开
 * @returns {void}
 */
const handleOpen = (): void => {
  emit("date-dialog-open");
};

/**
 * @description 暴露方法给父组件
 */
defineExpose({
  jumpToDate
});
</script>
