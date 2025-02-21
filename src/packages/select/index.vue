<template>
  <div class="t-select">
    <TPopover
      v-model="state.isDropdownVisible"
      type="click"
      position="bottom"
      :padding="0"
      :radius="DROPDOWN_RADIUS"
      :disabled="disabled"
      @close="handleClose"
      ref="popoverRef"
    >
      <!-- 下拉选项列表 -->
      <template #content>
        <TListView :list-data="filteredOptions" class="_options" :style="dropdownStyles" :empty-text="props.emptyText">
          <!-- 选项列表 -->
          <template #default="{ row }: ListSlotParamsType<OptionsItemType>">
            <!-- 自定义插槽 -->
            <Option v-bind="row" @change="handleOptionSelect(row)">
              <slot :row="row" />
            </Option>
          </template>
        </TListView>
      </template>

      <!-- 文本模式显示 -->
      <div class="_text-content" v-if="type === 'text'">
        {{ selectedLabel }}
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
        <input
          ref="inputRef"
          :readonly="!filterable"
          :value="inputDisplayValue"
          :placeholder="selectPlaceholder"
          :disabled="disabled"
          @input="handleFilter"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- 右侧图标 -->
        <div class="_right-icon">
          <TIcon v-if="showClearIcon" icon="close-to" :size="iconSize" :color="ICON_COLOR" @click.stop="handleClear" />
          <TIcon
            v-else
            :class="{ '_icon-active': !props.disabled && state.isDropdownVisible }"
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
import type { TPopoverType } from "@/packages/popover";
import { TPopover } from "@/packages/popover";
import { type StyleValue, computed, reactive, ref, watch, provide, toRefs } from "vue";
import { TIcon } from "@/packages/icon";
import Option from "./option.vue";
import { TListView } from "@/packages/listView";
import { fromCssVal } from "@/utils";
import { useTip } from "@/hooks";
import { GroupContextType } from "./constants";
import { selectKey } from "element-plus";
import { isEqual } from "@/utils/is";
import { bindDebounce } from "@/utils";

// 组件名称定义
defineOptions({ name: "TSelect" });

// 常量定义
const ICON_COLOR = "#656a6e56";
const DROPDOWN_RADIUS = contentRadius;
const ICON_SIZES: Record<ElSizeType, number> = {
  default: 14,
  small: 14,
  large: 16
};
const EMPTY_OPTION: OptionsItemType = { label: "", value: "" };

// Props 和 Emits 定义
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  options: () => [],
  type: "input",
  placeholder: "请选择",
  emptyText: "暂无数据",
  debounce: undefined,
  isTip: true,
  clearable: true,
  size: configOptions.value.elSize,
  disabled: false,
  filterable: false
});

// v-model 定义
const model = defineModel<ValueType>();

// refs
const inputRef = ref();
const popoverRef = ref<TPopoverType>();

// 组件状态
const state = reactive({
  // 选中值
  selectedOption: { ...EMPTY_OPTION },
  // 下拉框是否显示
  isDropdownVisible: false,
  // 过滤文本
  filterText: null,
  // 是否聚焦
  isFocused: false,
  // 临时模型值
  temModel: null
});

// 计算属性
const selectClassNames = computed(() => {
  const { size, clearable, disabled } = props;
  return ["_select-content", `t-select-size-${size}`, clearable && "t-select-clearable", disabled && "t-disabled"];
});

const showClearIcon = computed(() => props.clearable && model.value);

const iconSize = computed(() => ICON_SIZES[props.size]);

const selectedLabel = computed((): string => {
  if (props.type === "text" && !model.value) return props.placeholder;
  const selectedOption = props.options.find(option => isEqual(option.value, model.value));
  return selectedOption?.label;
});

const selectPlaceholder = computed((): string => {
  if (!state.temModel) return props.placeholder;
  const selectedOption = props.options.find(option => isEqual(option.value, state.temModel));
  return selectedOption?.label;
});

const dropdownStyles = computed(
  (): StyleValue => ({
    borderRadius: fromCssVal(DROPDOWN_RADIUS)
  })
);

// 提示组件
const TipComponent = useTip(props, model);

const filteredOptions = computed(() => {
  if (!props.filterable || !state.filterText) return props.options;
  return props.options.filter(option => {
    const label = String(option.label || "").toLowerCase();
    const filterText = state.filterText.toLowerCase();
    return label.includes(filterText);
  });
});

/**
 * 输入框显示值
 */
const inputDisplayValue = computed(() => {
  if (state.isFocused) {
    return state.filterText;
  }
  return selectedLabel.value;
});

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
  if (option.disabled) return;
  updateModelValue(option);
};

/**
 * 处理输入过滤
 */
const handleFilter = bindDebounce((event: Event) => {
  const target = event.target as HTMLInputElement;
  state.filterText = target.value;
}, 200);

/**
 * 处理输入框聚焦
 */
const handleFocus = () => {
  if (!props.filterable) return;
  state.isFocused = true;
  state.filterText = "";
  state.temModel = model.value;
  model.value = "";
};

/**
 * 处理输入框失焦
 */
const handleBlur = () => {
  if (!props.filterable) return;
  state.isFocused = false;
  state.filterText = "";
  model.value = state.temModel;
};
/**
 * 关闭下拉框
 */
const handleClose = () => {
  inputRef.value?.blur();
};

/**
 * 更新组件值
 * @param option 选中的选项，不传则清空
 */
const updateModelValue = (option?: OptionsItemType) => {
  if (!option) {
    state.selectedOption = { ...EMPTY_OPTION };
    model.value = "";
    state.filterText = "";
    state.temModel = null;
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
/**
 * 监听过滤选项, 更新下拉框位置
 */
watch(filteredOptions, () => {
  popoverRef.value?.updateView();
});

// Provide 注入
provide<GroupContextType>(selectKey, reactive({ ...toRefs(props), model, ...toRefs(state) }));
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
