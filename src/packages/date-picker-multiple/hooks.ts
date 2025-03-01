import { computed, ref, watch } from "vue";
import type { DateType, ModeType } from "@/packages/calendar/calendar";
import type { ShortcutType, PropsType } from "./date-picker-multiple";
import { formatDate, parseDate } from "@/utils/dateFormat";
import { ICON_SIZES } from "./date-picker-multiple";

/**
 * @description 日期选择器核心逻辑Hook
 * @param props 组件属性
 * @param emit 事件发射器
 * @param model 组件模型值
 * @param calendarRef 日历组件引用
 * @returns 日期选择器逻辑相关的状态和方法
 */
export const useDatePickerMultiple = (props: PropsType, emit: any, model: any, calendarRef: any) => {
  // 组件状态
  const isDropdownVisible = ref(false);
  const selectedDates = ref<Date[]>([]);
  const tempSelectedDates = ref<Date[]>([]);
  const tempMode = ref<ModeType>(null);

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
        const parsedDate = parseDate(value, props.valueFormat);
        if (isNaN(parsedDate.getTime())) {
          console.warn("日期格式解析失败，使用默认解析", value);
          return new Date(value);
        }
        return parsedDate;
      } catch (e) {
        console.warn("日期格式解析失败，使用默认解析", e);
        return new Date(value);
      }
    }
    // 其他情况直接创建Date对象
    return new Date(value);
  };

  // 监听model变化，更新selectedDates
  watch(
    model,
    newVal => {
      if (newVal && newVal.length > 0) {
        selectedDates.value = newVal.map(date => toDateObject(date));
      } else {
        selectedDates.value = [];
      }
      tempSelectedDates.value = [...selectedDates.value];
    },
    { immediate: true }
  );

  /**
   * @description 判断两个日期是否是同一天
   * @param date1 日期1
   * @param date2 日期2
   * @returns 是否是同一天
   */
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
    );
  };

  /**
   * @description 判断日期是否被选中
   * @param date 日期
   * @returns 是否被选中
   */
  const isDateSelected = (date: Date): boolean => {
    if (props.isRange) {
      return false; // 范围模式下使用其他样式
    }
    return tempSelectedDates.value.some(selectedDate => isSameDay(selectedDate, date));
  };

  /**
   * @description 判断日期是否是范围开始
   * @param date 日期
   * @returns 是否是范围开始
   */
  const isRangeStart = (date: Date): boolean => {
    if (!props.isRange || tempSelectedDates.value.length === 0) return false;
    return isSameDay(tempSelectedDates.value[0], date);
  };

  /**
   * @description 判断日期是否是范围结束
   * @param date 日期
   * @returns 是否是范围结束
   */
  const isRangeEnd = (date: Date): boolean => {
    if (!props.isRange || tempSelectedDates.value.length < 2) return false;
    return isSameDay(tempSelectedDates.value[tempSelectedDates.value.length - 1], date);
  };

  /**
   * @description 判断日期是否在范围内
   * @param date 日期
   * @returns 是否在范围内
   */
  const isInRange = (date: Date): boolean => {
    if (!props.isRange || tempSelectedDates.value.length < 2) return false;

    const start = tempSelectedDates.value[0];
    const end = tempSelectedDates.value[tempSelectedDates.value.length - 1];

    // 确保日期在范围内，但不包含开始日期和结束日期
    return date > start && date < end && !isSameDay(date, end);
  };

  /**
   * @description 判断日期是否被禁用
   * @param date 日期
   * @returns 是否被禁用
   */
  const isDateDisabled = (date: Date): boolean => {
    if (props.disabled) return true;
    if (props.disabledDate) return props.disabledDate(date);
    return false;
  };

  /**
   * @description 处理日期单元格点击
   * @param date 点击的日期
   */
  const handleDateCellClick = (date: Date) => {
    if (props.disabled || isDateDisabled(date)) return;
    if (props.isRange) {
      // 范围选择模式
      if (tempSelectedDates.value.length === 0 || tempSelectedDates.value.length === 2) {
        // 开始新的范围选择
        tempSelectedDates.value = [date];
      } else if (tempSelectedDates.value.length === 1) {
        // 完成范围选择
        const start = tempSelectedDates.value[0];
        if (date < start) {
          tempSelectedDates.value = [date, start];
        } else {
          tempSelectedDates.value = [start, date];
        }
      }
    } else {
      // 多选模式
      const index = tempSelectedDates.value.findIndex(selectedDate => isSameDay(selectedDate, date));
      if (index === -1) {
        // 添加日期
        tempSelectedDates.value.push(date);
      } else {
        // 移除日期
        tempSelectedDates.value.splice(index, 1);
      }
    }
  };

  /**
   * @description 处理快捷选项点击
   * @param shortcut 快捷选项
   */
  const handleShortcutClick = (shortcut: ShortcutType) => {
    let dates: DateType[];
    if (typeof shortcut.value === "function") {
      dates = shortcut.value();
    } else {
      dates = shortcut.value;
    }

    tempSelectedDates.value = dates.map(date => toDateObject(date));

    // 如果是范围选择模式，确保只有两个日期
    if (props.isRange && tempSelectedDates.value.length > 2) {
      tempSelectedDates.value = tempSelectedDates.value.slice(0, 2);
    }
  };

  /**
   * @description 处理确认按钮点击
   */
  const handleConfirm = () => {
    // 更新选中日期
    selectedDates.value = [...tempSelectedDates.value];

    // 格式化日期并更新model
    const formattedDates = selectedDates.value.map(date => {
      if (props.valueFormat) {
        return formatDate(date, props.valueFormat);
      }
      return date;
    });

    // 更新模型值并触发变更事件
    model.value = formattedDates;
    emit("change", formattedDates);

    // 处理面板切换逻辑
    if (!calendarRef.value) {
      isDropdownVisible.value = false;
      return;
    }

    // 如果当前面板模式已经是props.mode，则关闭下拉框
    if (tempMode.value === props.mode) {
      isDropdownVisible.value = false;
      return;
    }

    // 根据当前面板模式决定下一步操作
    switch (tempMode.value) {
      case "year":
        // 年份模式 -> 月份模式
        calendarRef.value.switchPanelMode("month");
        break;
      case "month":
        // 月份模式 -> 日期模式
        calendarRef.value.switchPanelMode("date");
        break;
      default:
        // 日期模式 -> 关闭下拉框
        isDropdownVisible.value = false;
    }
  };

  // 计算属性
  const datePickerClassNames = computed(() => {
    const { size, clearable, disabled } = props;
    return [
      "_date-picker-content",
      `t-date-picker-size-${size}`,
      clearable && "t-date-picker-clearable",
      disabled && "t-disabled"
    ];
  });

  const showClearIcon = computed(() => props.clearable && model.value.length > 0 && !props.disabled);

  const iconSize = computed(() => ICON_SIZES[props.size]);

  /**
   * @description 判断确认按钮是否禁用
   * 在范围选择模式下，如果只选择了一个日期，则禁用确认按钮
   */
  const isConfirmDisabled = computed(() => {
    if (props.isRange && tempSelectedDates.value.length === 1) {
      return true;
    }
    return false;
  });

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
   */
  const displayValue = computed(() => {
    if (!model.value || model.value.length === 0) return "";

    const format = props.format || getDefaultFormat();
    const formattedDates = model.value.map(date => formatDate(toDateObject(date), format));

    // 范围选择模式使用 "到" 分隔，多选模式使用 , 分隔
    const separator = props.isRange ? " 到 " : ", ";
    return formattedDates.join(separator);
  });

  /**
   * @description 处理面板变化
   * @param mode 面板模式
   */
  const handlePanelChange = (mode: ModeType) => {
    tempMode.value = mode;
    emit("panel-change", mode);
  };

  /**
   * @description 处理清空
   */
  const handleClear = () => {
    model.value = [];
    selectedDates.value = [];
    tempSelectedDates.value = [];
    emit("clear");
  };

  /**
   * @description 处理聚焦
   */
  const handleFocus = () => {
    emit("focus");
  };

  /**
   * @description 处理失焦
   */
  const handleBlur = () => {
    emit("blur");
  };

  /**
   * @description 处理下拉框打开
   */
  const handleOpen = () => {
    tempSelectedDates.value = [...selectedDates.value];
    emit("date-dialog-open");
  };

  /**
   * @description 处理下拉框关闭
   */
  const handleClose = () => {
    emit("date-dialog-close");
  };

  /**
   * @description 处理取消按钮点击
   */
  const handleCancel = () => {
    isDropdownVisible.value = false;
  };

  return {
    isDropdownVisible,
    selectedDates,
    tempSelectedDates,
    tempMode,
    toDateObject,
    isDateSelected,
    isRangeStart,
    isRangeEnd,
    isInRange,
    isDateDisabled,
    handleDateCellClick,
    handleShortcutClick,
    handleConfirm,
    datePickerClassNames,
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
  };
};

/**
 * @description 月份选择逻辑Hook
 * @param props 组件属性
 * @param tempSelectedDates 临时选中日期
 * @param calendarRef 日历组件引用
 * @returns 月份选择相关的状态和方法
 */
export const useMonthSelection = (props: PropsType, tempSelectedDates: any, calendarRef: any) => {
  // 当前年份（用于月份选择）
  const currentYear = computed(() => {
    if (calendarRef.value) {
      return calendarRef.value.currentYear;
    }
    return new Date().getFullYear();
  });

  /**
   * @description 判断月份是否被选中
   * @param month 月份索引（0-11）
   * @param year 年份
   * @returns 是否被选中
   */
  const isMonthSelected = (month: number, year: number): boolean => {
    if (props.isRange) {
      return false; // 范围模式下使用其他样式
    }

    return tempSelectedDates.value.some(date => {
      return date.getFullYear() === year && date.getMonth() === month;
    });
  };

  /**
   * @description 判断月份是否是范围开始
   * @param month 月份索引（0-11）
   * @param year 年份
   * @returns 是否是范围开始
   */
  const isMonthRangeStart = (month: number, year: number): boolean => {
    if (!props.isRange || tempSelectedDates.value.length === 0) return false;

    const startDate = tempSelectedDates.value[0];
    return startDate.getFullYear() === year && startDate.getMonth() === month;
  };

  /**
   * @description 判断月份是否是范围结束
   * @param month 月份索引（0-11）
   * @param year 年份
   * @returns 是否是范围结束
   */
  const isMonthRangeEnd = (month: number, year: number): boolean => {
    if (!props.isRange || tempSelectedDates.value.length < 2) return false;

    const endDate = tempSelectedDates.value[tempSelectedDates.value.length - 1];
    return endDate.getFullYear() === year && endDate.getMonth() === month;
  };

  /**
   * @description 判断月份是否在范围内
   * @param month 月份索引（0-11）
   * @param year 年份
   * @returns 是否在范围内
   */
  const isMonthInRange = (month: number, year: number): boolean => {
    if (!props.isRange || tempSelectedDates.value.length < 2) return false;

    const start = tempSelectedDates.value[0];
    const end = tempSelectedDates.value[tempSelectedDates.value.length - 1];
    const current = new Date(year, month, 1);

    // 确保月份在范围内，但不包含开始月份和结束月份
    return (
      current > start &&
      current < end &&
      !(start.getFullYear() === year && start.getMonth() === month) &&
      !(end.getFullYear() === year && end.getMonth() === month)
    );
  };

  /**
   * @description 判断月份是否被禁用
   * @param month 月份索引（0-11）
   * @param year 年份
   * @returns 是否被禁用
   */
  const isMonthDisabled = (month: number, year: number): boolean => {
    if (props.disabled) return true;
    if (props.disabledDate) {
      // 使用月份的第一天来判断是否禁用
      const date = new Date(year, month, 1);
      return props.disabledDate(date);
    }
    return false;
  };

  /**
   * @description 处理月份单元格点击
   * @param month 月份索引（0-11）
   */
  const handleMonthCellClick = (month: number) => {
    if (props.disabled) return;

    // 创建选中的日期（月份的第一天）
    const selectedDate = new Date(currentYear.value, month, 1);

    // 检查是否禁用
    if (isMonthDisabled(month, currentYear.value)) return;

    if (props.isRange) {
      // 范围选择模式
      if (tempSelectedDates.value.length === 0 || tempSelectedDates.value.length === 2) {
        // 开始新的范围选择
        tempSelectedDates.value = [selectedDate];
      } else if (tempSelectedDates.value.length === 1) {
        // 完成范围选择
        const start = tempSelectedDates.value[0];
        if (selectedDate < start) {
          tempSelectedDates.value = [selectedDate, start];
        } else {
          tempSelectedDates.value = [start, selectedDate];
        }
      }
    } else {
      // 多选模式
      const index = tempSelectedDates.value.findIndex(
        date => date.getFullYear() === currentYear.value && date.getMonth() === month
      );

      if (index === -1) {
        // 添加月份
        tempSelectedDates.value.push(selectedDate);
      } else {
        // 移除月份
        tempSelectedDates.value.splice(index, 1);
      }
    }
  };

  return {
    currentYear,
    isMonthSelected,
    isMonthRangeStart,
    isMonthRangeEnd,
    isMonthInRange,
    isMonthDisabled,
    handleMonthCellClick
  };
};

/**
 * @description 年份选择逻辑Hook
 * @param props 组件属性
 * @param tempSelectedDates 临时选中日期
 * @returns 年份选择相关的状态和方法
 */
export const useYearSelection = (props: PropsType, tempSelectedDates: any) => {
  /**
   * @description 判断年份是否被选中
   * @param year 年份
   * @returns 是否被选中
   */
  const isYearSelected = (year: number): boolean => {
    if (props.isRange) {
      return false; // 范围模式下使用其他样式
    }

    return tempSelectedDates.value.some(date => {
      return date.getFullYear() === year;
    });
  };

  /**
   * @description 判断年份是否是范围开始
   * @param year 年份
   * @returns 是否是范围开始
   */
  const isYearRangeStart = (year: number): boolean => {
    if (!props.isRange || tempSelectedDates.value.length === 0) return false;

    const startDate = tempSelectedDates.value[0];
    return startDate.getFullYear() === year;
  };

  /**
   * @description 判断年份是否是范围结束
   * @param year 年份
   * @returns 是否是范围结束
   */
  const isYearRangeEnd = (year: number): boolean => {
    if (!props.isRange || tempSelectedDates.value.length < 2) return false;

    const endDate = tempSelectedDates.value[tempSelectedDates.value.length - 1];
    return endDate.getFullYear() === year;
  };

  /**
   * @description 判断年份是否在范围内
   * @param year 年份
   * @returns 是否在范围内
   */
  const isYearInRange = (year: number): boolean => {
    if (!props.isRange || tempSelectedDates.value.length < 2) return false;

    const start = tempSelectedDates.value[0];
    const end = tempSelectedDates.value[tempSelectedDates.value.length - 1];

    // 确保年份在范围内，但不包含开始年份和结束年份
    return year > start.getFullYear() && year < end.getFullYear();
  };

  /**
   * @description 判断年份是否被禁用
   * @param year 年份
   * @returns 是否被禁用
   */
  const isYearDisabled = (year: number): boolean => {
    if (props.disabled) return true;
    if (props.disabledDate) {
      // 使用年份的第一天来判断是否禁用
      const date = new Date(year, 0, 1);
      return props.disabledDate(date);
    }
    return false;
  };

  /**
   * @description 处理年份单元格点击
   * @param year 年份
   */
  const handleYearCellClick = (year: number) => {
    if (props.disabled) return;

    // 创建选中的日期（年份的第一天）
    const selectedDate = new Date(year, 0, 1);

    // 检查是否禁用
    if (isYearDisabled(year)) return;

    if (props.isRange) {
      // 范围选择模式
      if (tempSelectedDates.value.length === 0 || tempSelectedDates.value.length === 2) {
        // 开始新的范围选择
        tempSelectedDates.value = [selectedDate];
      } else if (tempSelectedDates.value.length === 1) {
        // 完成范围选择
        const start = tempSelectedDates.value[0];
        if (selectedDate < start) {
          tempSelectedDates.value = [selectedDate, start];
        } else {
          tempSelectedDates.value = [start, selectedDate];
        }
      }
    } else {
      // 多选模式
      const index = tempSelectedDates.value.findIndex(date => date.getFullYear() === year);

      if (index === -1) {
        // 添加年份
        tempSelectedDates.value.push(selectedDate);
      } else {
        // 移除年份
        tempSelectedDates.value.splice(index, 1);
      }
    }
  };

  return {
    isYearSelected,
    isYearRangeStart,
    isYearRangeEnd,
    isYearInRange,
    isYearDisabled,
    handleYearCellClick
  };
};
