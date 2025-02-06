<template>
  <div class="t-select">
    <TPopover v-model="state.isDropdownVisible" type="click" position="bottom" :padding="0" :radius="DROPDOWN_RADIUS">
      <!-- 下拉选项列表 -->
      <template #content>
        <TListView :list-data="options" class="_options" :style="dropdownStyles" height="auto">
          <template #default="{ row }: ListSlotParamsType<OptionsItemType>">
            <TListViewItem>
              <Option :label="row.label" :value="row.value" @change="handleOptionSelect(row)" />
            </TListViewItem>
          </template>
        </TListView>
      </template>

      <!-- 文本模式显示 -->
      <div class="_text-content" v-if="type === 'text'">
        {{ textLabel }}
        <TIcon :size="iconSize" icon="caret-down" :color="ICON_COLOR" />
      </div>

      <!-- 输入框模式显示 -->
      <div :class="selectClassNames" v-else>
        <!-- 前缀插槽 -->
        <div class="_prefix">
          <slot name="prefix" />
        </div>

        <!-- 提示组件 -->
        <component :is="TipComponent" />

        <!-- 输入框 -->
        <input readonly ref="inputRef" :value="selectedLabel" :placeholder="placeholder" :disabled="disabled" />

        <!-- 右侧图标 -->
        <div class="_right-icon">
          <TIcon v-if="showClearIcon" icon="close-to" :size="iconSize" :color="ICON_COLOR" @click.stop="handleClear" />
          <TIcon
            v-else
            :class="{ '_icon-active': state.isDropdownVisible }"
            :size="iconSize"
            icon="caret-down"
            :color="ICON_COLOR"
          />
        </div>
      </div>
    </TPopover>
  </div>
</template>

<script lang="ts" setup>
import { type EmitsType, type ValueType, OptionsItemType, type PropsType, contentRadius } from "./select";
import type { ListSlotParamsType } from "@/packages/listView/listView";
import type { ElSizeType } from "@/types";
import { configOptions } from "@/hooks/useOptions";
import { TPopover } from "@/packages/popover";
import { type StyleValue, computed, reactive, ref, watch, provide, toRefs } from "vue";
import { TIcon } from "@/packages/icon";
import Option from "./option.vue";
import { TListView, TListViewItem } from "@/packages/listView";
import { fromCssVal } from "@/utils";
import { useTip } from "@/hooks";
import { GroupContextType } from "./constants";
import { selectKey } from "element-plus";
import { isEqual } from "@/utils/is";

// 组件名称定义
defineOptions({ name: "TSelect" });

// 常量定义
const ICON_COLOR = "#656a6e56";
const DROPDOWN_RADIUS = contentRadius;
const ICON_SIZES: Record<ElSizeType, number> = {
  default: 14,
  small: 14,
  large: 18
};
const EMPTY_OPTION: OptionsItemType = { label: "", value: "" };

// Props 和 Emits 定义
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  options: () => [],
  type: "input",
  textLabel: "请选择",
  debounce: undefined,
  isTip: true,
  clearable: true,
  size: configOptions.value.elSize,
  disabled: false
});

// v-model 定义
const model = defineModel<ValueType>();

// refs
const inputRef = ref();

// 组件状态
const state = reactive({
  selectedOption: { ...EMPTY_OPTION },
  isDropdownVisible: false
});

// 计算属性
const selectClassNames = computed(() => {
  const { size, clearable, disabled } = props;
  return ["_select-content", `t-select-size-${size}`, clearable && "t-select-clearable", disabled && "t-disabled"];
});

const showClearIcon = computed(() => props.clearable && model.value);

const iconSize = computed(() => ICON_SIZES[props.size]);

const selectedLabel = computed(() => {
  const selectedOption = props.options.find(option => isEqual(option.value, model.value));
  return selectedOption?.label;
});

const dropdownStyles = computed(
  (): StyleValue => ({
    borderRadius: fromCssVal(DROPDOWN_RADIUS)
  })
);

// 提示组件
const TipComponent = useTip(props, model);

// 方法定义
/**
 * 清空选择
 * @param event 事件对象
 */
const handleClear = (event: Event) => {
  event.stopPropagation();
  if (!props.clearable) return;
  updateModelValue();
  emit("clear");
};

/**
 * 处理选项选择
 * @param option 选中的选项
 */
const handleOptionSelect = (option: OptionsItemType) => {
  updateModelValue(option);
};

/**
 * 更新组件值
 * @param option 选中的选项，不传则清空
 */
const updateModelValue = (option?: OptionsItemType) => {
  if (!option) {
    state.selectedOption = { ...EMPTY_OPTION };
    model.value = "";
    return;
  }
  state.selectedOption = option;
  state.isDropdownVisible = false;
  model.value = option.value;
};

// 监听器
watch(
  () => model.value,
  () => {
    const selectedOption = props.options.find(option => isEqual(option.value, model.value));
    if (!selectedOption) {
      updateModelValue();
    }
  }
);

// Provide 注入
provide<GroupContextType>(selectKey, reactive({ ...toRefs(props), model }));
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
