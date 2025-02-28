<template>
  <div class="_time-picker">
    <t-popover
      v-model="timeSelectVisible"
      type="click"
      position="bottom"
      :padding="8"
      :radius="4"
      :disabled="disabled || disabledTimeView"
      width="280px"
      @open="handleTimePopoverOpen"
      @close="handleTimePopoverClose"
    >
      <!-- 时间显示触发区域 -->
      <div class="_time-display" :class="{ '_view-only': disabledTimeView }">
        <span>{{ disabledTimeView ? realTimeDisplay : formatTime }}</span>
        <t-icon v-if="!disabledTimeView" icon="caret-down" :size="14" />
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
</template>

<script lang="ts" setup>
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";
import type { TListViewType } from "@/packages/listView";
import { TIcon } from "@/packages/icon";
import { TPopover } from "@/packages/popover";
import { TListView } from "@/packages/listView";
import { HOURS, MINUTES, SECONDS } from "../calendar";

defineOptions({ name: "TCalendarTimePicker" });

/**
 * @description 组件属性
 */
interface PropsType {
  /** 当前日期 */
  modelValue: Date;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否禁用时间选择视图（只显示时间，不可点击） */
  disabledTimeView?: boolean;
}

const props = withDefaults(defineProps<PropsType>(), {
  disabled: false,
  disabledTimeView: false
});

/**
 * @description 组件事件
 */
const emit = defineEmits<{
  /** 时间变化 */
  (e: "change", date: Date): void;
  /** 时间对话框打开 */
  (e: "dialog-open"): void;
  /** 时间对话框关闭 */
  (e: "dialog-close"): void;
}>();

// 时间选择相关状态
const timeSelectVisible = ref(false);
const tempTime = ref<Date | null>(null);
const currentRealTime = ref(new Date());
let timerInterval: number | null = null;

// 当前小时
const currentHour = computed(() => props.modelValue.getHours());

// 当前分钟
const currentMinute = computed(() => props.modelValue.getMinutes());

// 当前秒
const currentSecond = computed(() => props.modelValue.getSeconds());

// 临时时间的小时
const tempTimeHour = computed(() => (tempTime.value ? tempTime.value.getHours() : currentHour.value));

// 临时时间的分钟
const tempTimeMinute = computed(() => (tempTime.value ? tempTime.value.getMinutes() : currentMinute.value));

// 临时时间的秒
const tempTimeSecond = computed(() => (tempTime.value ? tempTime.value.getSeconds() : currentSecond.value));

// 格式化的时间字符串
const formatTime = computed(() => {
  // 时间显示始终使用时分秒格式
  const hours = props.modelValue.getHours().toString().padStart(2, "0");
  const minutes = props.modelValue.getMinutes().toString().padStart(2, "0");
  const seconds = props.modelValue.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
});

// 实时时间显示
const realTimeDisplay = computed(() => {
  const hours = currentRealTime.value.getHours().toString().padStart(2, "0");
  const minutes = currentRealTime.value.getMinutes().toString().padStart(2, "0");
  const seconds = currentRealTime.value.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
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
 * @description 选择小时
 * @param hour 小时
 */
const handleHourSelect = (hour: number) => {
  if (!tempTime.value) tempTime.value = new Date(props.modelValue);
  tempTime.value.setHours(hour);
  // 强制更新视图
  tempTime.value = new Date(tempTime.value);
};

/**
 * @description 选择分钟
 * @param minute 分钟
 */
const handleMinuteSelect = (minute: number) => {
  if (!tempTime.value) tempTime.value = new Date(props.modelValue);
  tempTime.value.setMinutes(minute);
  // 强制更新视图
  tempTime.value = new Date(tempTime.value);
};

/**
 * @description 选择秒
 * @param second 秒
 */
const handleSecondSelect = (second: number) => {
  if (!tempTime.value) tempTime.value = new Date(props.modelValue);
  tempTime.value.setSeconds(second);
  // 强制更新视图
  tempTime.value = new Date(tempTime.value);
};

/**
 * @description 处理时间选择弹出框打开事件
 * 初始化临时时间并滚动到当前时间位置
 */
const handleTimePopoverOpen = () => {
  // 初始化临时时间为当前选中时间
  tempTime.value = new Date(props.modelValue);
  // 触发对话框打开事件
  emit("dialog-open");
  // 使用nextTick确保DOM已更新
  nextTick(() => {
    // 计算每个时间项的高度为36px
    const itemHeight = 36;
    // 滚动到对应位置
    if (hourListViewRef.value) {
      hourListViewRef.value.scrollToItem(currentHour.value * itemHeight, "instant");
    }
    if (minuteListViewRef.value) {
      minuteListViewRef.value.scrollToItem(currentMinute.value * itemHeight, "instant");
    }
    if (secondListViewRef.value) {
      secondListViewRef.value.scrollToItem(currentSecond.value * itemHeight, "instant");
    }
  });
};

/**
 * @description 处理时间选择弹出框关闭事件
 */
const handleTimePopoverClose = () => {
  emit("dialog-close");
};

/**
 * @description 更新实时时间
 */
const updateRealTime = () => {
  currentRealTime.value = new Date();
};

/**
 * @description 启动实时时间更新定时器
 */
const startRealTimeTimer = () => {
  if (timerInterval) return;
  updateRealTime(); // 立即更新一次
  timerInterval = window.setInterval(updateRealTime, 1000);
};

/**
 * @description 停止实时时间更新定时器
 */
const stopRealTimeTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

/**
 * @description 确认时间选择
 */
const confirmTimeSelect = () => {
  if (tempTime.value) {
    emit("change", tempTime.value);
  }
  timeSelectVisible.value = false;
};

/**
 * @description 取消时间选择
 */
const cancelTimeSelect = () => {
  timeSelectVisible.value = false;
};

// 监听时间选择器显示状态变化
watch(timeSelectVisible, visible => {
  if (visible) {
    // 打开时初始化临时时间
    tempTime.value = new Date(props.modelValue);
  }
});

// 监听disabledTimeView属性变化
watch(
  () => props.disabledTimeView,
  newVal => {
    if (newVal) {
      startRealTimeTimer();
    } else {
      stopRealTimeTimer();
    }
  },
  { immediate: true }
);

// 组件挂载时
onMounted(() => {
  if (props.disabledTimeView) {
    startRealTimeTimer();
  }
});

// 组件卸载前
onBeforeUnmount(() => {
  stopRealTimeTimer();
});
</script>

<style lang="scss" scoped>
@import "./time-picker.scss";
</style>
