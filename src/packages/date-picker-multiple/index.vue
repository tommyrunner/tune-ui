<template>
  <div class="t-date-picker-multiple">
    <t-popover
      v-model="isDropdownVisible"
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
        <div class="_date-picker-multiple-dropdown">
          <!-- 快捷选项列表 -->
          <div class="_shortcuts-wrapper" v-if="props.shortcuts && props.shortcuts.length > 0">
            <div
              v-for="(shortcut, index) in props.shortcuts"
              :key="index"
              class="_shortcut-item"
              @click="handleShortcutClick(shortcut)"
            >
              {{ shortcut.label }}
            </div>
          </div>

          <!-- 日历组件 -->
          <div class="_calendar-wrapper">
            <t-calendar
              :mode="props.mode"
              :disabled="props.disabled"
              :disabled-date="props.disabledDate"
              :is-select="false"
              :show-time="props.showTime"
              :disabled-time-view="false"
              :value-format="props.valueFormat"
              @panel-change="handlePanelChange"
              ref="calendarRef"
            >
              <!-- 自定义日期单元格 -->
              <template #date="slotProps">
                <div
                  :class="[
                    '_date-cell',
                    isDateSelected(slotProps.date) ? 'selected' : '',
                    isRangeStart(slotProps.date) ? 'range-start' : '',
                    isRangeEnd(slotProps.date) ? 'range-end' : '',
                    isInRange(slotProps.date) ? 'in-range' : '',
                    isDateDisabled(slotProps.date) ? 'disabled' : ''
                  ]"
                  @click.stop="handleDateCellClick(slotProps.date)"
                >
                  {{ slotProps.date.getDate() }}
                </div>
              </template>

              <!-- 自定义月份单元格 -->
              <template #month="slotProps">
                <div
                  :class="[
                    '_date-cell',
                    isMonthSelected(slotProps.index, currentYear) ? 'selected' : '',
                    isMonthRangeStart(slotProps.index, currentYear) ? 'range-start' : '',
                    isMonthRangeEnd(slotProps.index, currentYear) ? 'range-end' : '',
                    isMonthInRange(slotProps.index, currentYear) ? 'in-range' : '',
                    isMonthDisabled(slotProps.index, currentYear) ? 'disabled' : ''
                  ]"
                  @click.stop="handleMonthCellClick(slotProps.index)"
                >
                  {{ slotProps.month }}
                </div>
              </template>

              <!-- 自定义年份单元格 -->
              <template #year="slotProps">
                <div
                  :class="[
                    '_date-cell',
                    isYearSelected(slotProps.year) ? 'selected' : '',
                    isYearRangeStart(slotProps.year) ? 'range-start' : '',
                    isYearRangeEnd(slotProps.year) ? 'range-end' : '',
                    isYearInRange(slotProps.year) ? 'in-range' : '',
                    isYearDisabled(slotProps.year) ? 'disabled' : ''
                  ]"
                  @click.stop="handleYearCellClick(slotProps.year)"
                >
                  {{ slotProps.year }}
                </div>
              </template>

              <!-- 底部确认按钮 -->
              <template #footer>
                <div class="_footer">
                  <t-button size="small" type="text" @click="handleCancel">{{ TEXT_CANCEL }}</t-button>
                  <t-button size="small" type="primary" :disabled="isConfirmDisabled" @click="handleConfirm">{{
                    TEXT_CONFIRM
                  }}</t-button>
                </div>
              </template>
            </t-calendar>
          </div>
        </div>
      </template>

      <!-- 输入框显示区域 -->
      <div :class="datePickerMultipleClassNames">
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

import type { PropsType, EmitsType } from "./date-picker-multiple";
import type { DateType } from "@/packages/calendar/calendar";
import type { TPopoverType } from "@/packages/popover";

import { ref } from "vue";
import { TPopover } from "@/packages/popover";
import { TIcon } from "@/packages/icon";
import { TCalendar } from "@/packages/calendar";
import { TButton } from "@/packages/button";
import { ICON_COLOR, DROPDOWN_RADIUS } from "./date-picker-multiple";
import { useDatePickerMultiple, useMonthSelection, useYearSelection } from "./hooks";
import { useTip } from "@/hooks";
import { useI18nText } from "./i18n";

defineOptions({ name: "TDatePickerMultiple" });

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
  showTime: false,
  isRange: true
});

/**
 * @description 国际化文本
 */
const { TEXT_CANCEL, TEXT_CONFIRM, TEXT_DEFAULT_PLACEHOLDER } = useI18nText(props);

/**
 * @description v-model定义
 */
const model = defineModel<DateType[]>({ default: () => [] });

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
 * @description 使用核心日期选择器逻辑
 */
const {
  isDropdownVisible,
  tempSelectedDates,
  isDateSelected,
  isRangeStart,
  isRangeEnd,
  isInRange,
  isDateDisabled,
  handleDateCellClick,
  handleShortcutClick,
  handleConfirm,
  datePickerMultipleClassNames,
  showClearIcon,
  iconSize,
  isConfirmDisabled,
  displayValue,
  handlePanelChange,
  handleClear,
  handleFocus,
  handleBlur,
  handleOpen,
  handleClose,
  handleCancel
} = useDatePickerMultiple(props, emit, model, calendarRef);

/**
 * @description 使用月份选择逻辑
 */
const {
  currentYear,
  isMonthSelected,
  isMonthRangeStart,
  isMonthRangeEnd,
  isMonthInRange,
  isMonthDisabled,
  handleMonthCellClick
} = useMonthSelection(props, tempSelectedDates, calendarRef);

/**
 * @description 使用年份选择逻辑
 */
const { isYearSelected, isYearRangeStart, isYearRangeEnd, isYearInRange, isYearDisabled, handleYearCellClick } = useYearSelection(
  props,
  tempSelectedDates
);
</script>
