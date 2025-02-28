<template>
  <div class="t-select">
    <t-popover
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
        <t-list-view :list-data="filteredOptions" class="_options" :style="dropdownStyles" :empty-text="emptyText">
          <!-- 选项列表 -->
          <template #default="{ row }: ListSlotParamsType<OptionsItemType>">
            <!-- 自定义插槽 -->
            <Option v-bind="row" @change="handleOptionSelect(row)">
              <slot :row="row" />
            </Option>
          </template>
        </t-list-view>
      </template>

      <!-- 文本模式显示 -->
      <div class="_text-content" v-if="type === 'text'">
        {{ selectedLabel }}
        <t-icon :size="iconSize" icon="caret-down" :color="ICON_COLOR" />
      </div>

      <!-- 输入框模式显示 -->
      <div :class="selectClassNames" v-else>
        <!-- 前缀插槽 -->
        <div class="_prefix">
          <slot name="prefix" />
        </div>

        <!-- 提示组件 -->
        <component :is="TipComponent" />

        <!-- 多选显示 -->
        <div class="_multiple-display" v-if="props.multiple && isValue(model)">
          <t-popover type="hover" position="top" :radius="DROPDOWN_RADIUS" :disabled="disabled">
            <template #content>
              <div class="_multiple-content">
                <t-tag v-for="(item, index) in model" :key="index" size="small" closable @close="handleDeleteOption(item)">
                  {{ renderLabel(item) }}
                </t-tag>
              </div>
            </template>
            <slot name="multiple-view" :model="model">
              <t-tag size="small" type="primary"> 选择 {{ (model as SingleValueType[]).length }} 项 </t-tag>
            </slot>
          </t-popover>
        </div>

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
          <t-icon v-if="showClearIcon" icon="close-to" :size="iconSize" :color="ICON_COLOR" @click.stop="handleClear" />
          <t-icon
            v-else
            :class="{ '_icon-active': !props.disabled && state.isDropdownVisible }"
            :size="iconSize"
            icon="caret-down"
            :color="ICON_COLOR"
          />
        </div>
      </div>
    </t-popover>
  </div>
</template>

<script lang="ts" setup>
import type { EmitsType, ValueType, OptionsItemType, PropsType, SingleValueType } from "./select";
import type { ListSlotParamsType } from "@/packages/listView/listView";
import type { TPopoverType } from "@/packages/popover";
import type { StyleValue } from "vue";
import { computed, reactive, ref, watch, provide, toRefs } from "vue";
import { configOptions } from "@/hooks/useOptions";
import { fromCssVal } from "@/utils";
import { useTip } from "@/hooks";
import { isEqual, isValue } from "@/utils/is";
import { bindDebounce } from "@/utils";
import { TPopover } from "@/packages/popover";
import { TIcon } from "@/packages/icon";
import { TListView } from "@/packages/listView";
import { TTag } from "@/packages/tag";
import Option from "./option.vue";
import { GroupContextType, selectGroupKey } from "./constants";
import { ICON_COLOR, DROPDOWN_RADIUS, ICON_SIZES, EMPTY_OPTION } from "./select";

// 组件名称定义
defineOptions({ name: "TSelect" });

// Props 和 Emits 定义
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  options: () => [],
  type: "input",
  placeholder: "请选择",
  emptyText: "暂无数据",
  isTip: true,
  clearable: true,
  size: configOptions.value.elSize,
  disabled: false,
  filterable: false,
  multiple: false
});

// v-model 定义
const model = defineModel<ValueType>({
  default: props => (props.multiple ? [] : "")
});
// 动态 loading 定义
const loading = defineModel<boolean>("loading", {
  default: false
});

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
  temModel: props.multiple ? [] : ("" as ValueType)
});

// 计算属性
const selectClassNames = computed(() => {
  const { size, clearable, disabled } = props;
  return ["_select-content", `t-select-size-${size}`, clearable && "t-select-clearable", disabled && "t-disabled"];
});

const showClearIcon = computed(() => props.clearable && isValue(model.value));

const iconSize = computed(() => ICON_SIZES[props.size]);

const selectedLabel = computed((): string => {
  if (props.type === "text" && !model.value) return props.placeholder;
  const selectedOption = props.options.find(option => isEqual(option.value, model.value));
  return selectedOption?.label;
});

const selectPlaceholder = computed((): string => {
  if (!isValue(state.temModel)) return props.placeholder;
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
  // 自定义过滤方法
  if (props.filterMethod) {
    return props.options.filter(option => props.filterMethod(option, state.filterText));
  }
  // 默认过滤方法
  return props.options.filter(option => {
    const label = String(option.label || "").toLowerCase();
    const filterText = state.filterText.toLowerCase();
    return label.includes(filterText);
  });
});

/**
 * 渲染标签
 * @param item 选项
 * @returns 标签
 */
const renderLabel = (item: SingleValueType) => {
  const selectedOption = props.options.find(option => isEqual(option.value, item));
  return selectedOption?.label;
};

/**
 * 删除选项
 * @param item 选项
 */
const handleDeleteOption = (item: SingleValueType) => {
  const values = (model.value as SingleValueType[]) || [];
  model.value = values.filter(value => value !== item);
};

/**
 * 输入框显示值
 */
const inputDisplayValue = computed(() => {
  // 控制多选时，输入框显示值
  if (props.multiple && isValue(model.value)) return " ";
  if (state.isFocused) {
    return state.filterText;
  }
  return selectedLabel.value;
});

/**
 * 获取空文本
 */
const emptyText = computed(() => {
  return loading.value ? "加载中..." : props.emptyText;
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
  if (props.remoteMethod) {
    props.remoteMethod(target.value);
  }
}, 200);

/**
 * 处理输入框聚焦
 */
const handleFocus = () => {
  if (!props.filterable) return;
  state.isFocused = true;
  state.filterText = "";
  state.temModel = model.value;
  model.value = props.multiple ? [] : "";
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
    model.value = props.multiple ? [] : "";
    state.selectedOption = { ...EMPTY_OPTION };
    return;
  } else {
    if (props.multiple) {
      const values = (model.value as SingleValueType[]) || [];
      const index = values.indexOf(option.value);

      if (index > -1) {
        values.splice(index, 1);
      } else {
        values.push(option.value);
      }
    } else {
      model.value = option.value;
      state.selectedOption = option;
    }
    state.isDropdownVisible = false;
  }
};

/**
 * 监听过滤选项, 更新下拉框位置
 */
watch([() => props.options, () => filteredOptions], () => {
  popoverRef.value?.updateView();
});

// Provide 注入
provide<GroupContextType>(selectGroupKey, reactive({ ...toRefs(props), model, ...toRefs(state) }));
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
