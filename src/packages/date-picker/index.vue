<template>
  <div class="t-date-picker">
    <t-popover
      v-model="isDropdownVisible"
      type="click"
      :position="props.position"
      :padding="0"
      :radius="DROPDOWN_RADIUS"
      :disabled="disabled"
      @close="handleClose"
      ref="popoverRef"
    >
      <!-- 下拉日历面板 -->
      <template #content>
        <div class="_date-picker-dropdown">
          <!-- 日历组件 -->
          <t-calendar
            v-model="tempDate"
            :mode="props.mode"
            :disabled="props.disabled"
            :disabled-date="props.disabledDate"
            :show-time="props.showTime"
            :disabled-time-view="false"
            @change="handleDateChange"
            @panel-change="handlePanelChange"
            @jump-to-date="handleJumpToDate"
            @time-change="handleTimeChange"
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
        <div class="_input-wrapper">
          <input
            ref="inputRef"
            readonly
            :value="displayValue"
            :placeholder="props.placeholder"
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
import { computed, ref, watch } from "vue";
import type { EmitsType, PropsType } from "./date-picker";
import type { DateType, ModeType } from "../calendar/calendar";
import type { TPopoverType } from "@/packages/popover";
import { TPopover } from "@/packages/popover";
import { TIcon } from "@/packages/icon";
import { TCalendar } from "@/packages/calendar";
import { formatDate } from "@/utils/dateFormat";
import { isValue } from "@/utils/is";
import { configOptions } from "@/hooks/useOptions";
import { ICON_COLOR, DROPDOWN_RADIUS, ICON_SIZES } from "./date-picker";

// 组件名称定义
defineOptions({ name: "TDatePicker" });

// Props 和 Emits 定义
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  mode: "date",
  placeholder: "请选择日期",
  position: "bottom",
  size: configOptions.value.elSize,
  disabled: false,
  clearable: true,
  showTime: false
});

// v-model 定义
const model = defineModel<DateType>();

// refs
const inputRef = ref();
const popoverRef = ref<TPopoverType>();
const calendarRef = ref();

// 组件状态
const isDropdownVisible = ref(false);
const tempDate = ref<Date>(model.value ? new Date(model.value) : new Date());

// 计算属性
const datePickerClassNames = computed(() => {
  const { size, clearable, disabled } = props;
  return ["_date-picker-content", `t-date-picker-size-${size}`, clearable && "t-date-picker-clearable", disabled && "t-disabled"];
});

const showClearIcon = computed(() => props.clearable && isValue(model.value) && !props.disabled);

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

const displayValue = computed(() => {
  if (!model.value) return "";
  // 如果有显示格式化要求，使用显示格式化
  if (props.format) {
    return formatDate(new Date(model.value), props.format);
  }
  // 如果有值格式化要求，使用值格式化
  if (props.valueFormat) {
    // 对于不同模式，确保显示合适的格式
    const date = new Date(model.value);
    if (typeof model.value === "string") {
      // 如果是字符串格式，需要根据模式显示合适的格式
      return formatDate(date, getDefaultFormat());
    }
    return formatDate(date, props.valueFormat);
  }
  // 默认格式化 - 根据模式选择合适的格式
  const date = new Date(model.value);
  return formatDate(date, getDefaultFormat());
});

/**
 * @description 处理日期变化
 * @param date 选择的日期
 */
const handleDateChange = (date: DateType) => {
  model.value = props.valueFormat ? formatDate(date, props.valueFormat) : date;
  emit("change", model.value);

  // 如果不显示时间，选择日期后自动关闭下拉框
  if (!props.showTime) {
    isDropdownVisible.value = false;
  }
};

/**
 * @description 处理面板变化
 * @param mode 面板模式
 */
const handlePanelChange = (mode: ModeType) => {
  emit("panel-change", mode);
};

/**
 * @description 处理跳转到指定日期
 * @param date 日期对象
 */
const handleJumpToDate = (date: Date) => {
  model.value = props.valueFormat ? formatDate(date, props.valueFormat) : date;
  emit("change", model.value);
};

/**
 * @description 处理时间变化
 * @param date 日期对象
 */
const handleTimeChange = (date: Date) => {
  model.value = props.valueFormat ? formatDate(date, props.valueFormat) : date;
  emit("change", model.value);
};

/**
 * @description 处理清空
 */
const handleClear = (event: Event) => {
  event.stopPropagation();
  model.value = undefined;
  emit("clear");
};

/**
 * @description 处理关闭
 */
const handleClose = () => {
  // 如果没有选择，重置临时日期为当前选中值或当前日期
  if (!model.value) {
    tempDate.value = new Date();
  } else {
    tempDate.value = new Date(model.value);
  }
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
 * @description 跳转到指定日期
 * @param date 日期对象
 */
const jumpToDate = (date: Date) => {
  if (props.disabled) return;
  if (calendarRef.value) {
    calendarRef.value.jumpToDate(date);
  }
};

// 监听模型值变化，更新临时日期
watch(
  () => model.value,
  newVal => {
    if (newVal) {
      tempDate.value = new Date(newVal);
    }
  },
  { immediate: true }
);

// 暴露方法给父组件
defineExpose({
  jumpToDate
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
