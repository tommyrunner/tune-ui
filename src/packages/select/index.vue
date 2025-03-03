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
      <div :class="selectClasses" v-else>
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
// Vue相关导入
import { computed, reactive, ref, watch, provide, toRefs } from "vue";

// 类型导入
import type { StyleValue } from "vue";
import type { EmitsType, ValueType, OptionsItemType, PropsType, SingleValueType } from "./select";
import type { ListSlotParamsType } from "@/packages/list-view/list-view";
import type { TPopoverType } from "@/packages/popover";

// 项目内导入
import { configOptions } from "@/hooks/useOptions";
import { fromCssVal } from "@/utils";
import { useTip } from "@/hooks";
import { isEqual, isValue } from "@/utils/is";
import { bindDebounce } from "@/utils";
import { TPopover } from "@/packages/popover";
import { TIcon } from "@/packages/icon";
import { TListView } from "@/packages/list-view";
import { TTag } from "@/packages/tag";
import Option from "./option.vue";
import { GroupContextType, selectGroupKey } from "./constants";
import { ICON_COLOR, DROPDOWN_RADIUS, ICON_SIZES, EMPTY_OPTION } from "./select";

/**
 * @description 选择器组件
 */
defineOptions({ name: "TSelect" });

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description 组件Props定义
 */
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

/**
 * @description v-model定义
 */
const model = defineModel<ValueType>({
  default: props => (props.multiple ? [] : "")
});

/**
 * @description 动态loading定义
 */
const loading = defineModel<boolean>("loading", {
  default: false
});

/**
 * @description 组件引用
 */
const inputRef = ref();
const popoverRef = ref<TPopoverType>();

/**
 * @description 组件状态
 */
const state = reactive({
  /** 选中值 */
  selectedOption: { ...EMPTY_OPTION },
  /** 下拉框是否显示 */
  isDropdownVisible: false,
  /** 过滤文本 */
  filterText: null,
  /** 是否聚焦 */
  isFocused: false,
  /** 临时模型值 */
  temModel: props.multiple ? [] : ("" as ValueType)
});

/**
 * @description 计算选择器类名
 * @returns {string[]} 类名数组
 */
const selectClasses = computed((): string[] => {
  const { size, clearable, disabled } = props;
  return ["_select-content", `t-select-size-${size}`, clearable && "t-select-clearable", disabled && "t-disabled"];
});

/**
 * @description 是否显示清除图标
 * @returns {boolean} 是否显示
 */
const showClearIcon = computed((): boolean => props.clearable && isValue(model.value));

/**
 * @description 计算图标尺寸
 * @returns {number} 图标尺寸
 */
const iconSize = computed((): number => ICON_SIZES[props.size]);

/**
 * @description 计算选中标签
 * @returns {string} 标签文本
 */
const selectedLabel = computed((): string => {
  if (props.type === "text" && !model.value) return props.placeholder;
  const selectedOption = props.options.find(option => isEqual(option.value, model.value));
  return selectedOption?.label;
});

/**
 * @description 计算选择框占位符
 * @returns {string} 占位符文本
 */
const selectPlaceholder = computed((): string => {
  if (!isValue(state.temModel)) return props.placeholder;
  const selectedOption = props.options.find(option => isEqual(option.value, state.temModel));
  return selectedOption?.label;
});

/**
 * @description 计算下拉框样式
 * @returns {StyleValue} 样式对象
 */
const dropdownStyles = computed((): StyleValue => {
  return {
    borderRadius: fromCssVal(DROPDOWN_RADIUS)
  };
});

/**
 * @description 提示组件
 */
const TipComponent = useTip(props, model);

/**
 * @description 计算过滤后的选项
 * @returns {OptionsItemType[]} 选项列表
 */
const filteredOptions = computed((): OptionsItemType[] => {
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
 * @description 计算空文本
 * @returns {string} 空文本
 */
const emptyText = computed((): string => {
  return loading.value ? "加载中..." : props.emptyText;
});

/**
 * @description 计算输入框显示值
 * @returns {string} 显示值
 */
const inputDisplayValue = computed((): string => {
  // 控制多选时，输入框显示值
  if (props.multiple && isValue(model.value)) return " ";
  if (state.isFocused && props.filterable) {
    return state.filterText;
  }
  return selectedLabel.value;
});

/**
 * @description 渲染标签
 * @param {SingleValueType} item - 选项值
 * @returns {string} 标签文本
 */
const renderLabel = (item: SingleValueType): string => {
  const selectedOption = props.options.find(option => isEqual(option.value, item));
  return selectedOption?.label;
};

/**
 * @description 删除选项
 * @param {SingleValueType} item - 要删除的选项
 * @returns {void}
 */
const handleDeleteOption = (item: SingleValueType): void => {
  const values = (model.value as SingleValueType[]) || [];
  model.value = values.filter(value => value !== item);
};

/**
 * @description 清空选择
 * @param {Event} event - 事件对象
 * @returns {void}
 */
const handleClear = (event: Event): void => {
  event.stopPropagation();
  if (!props.clearable) return;
  updateModelValue();
  emit("clear");
};

/**
 * @description 处理选项选择
 * @param {OptionsItemType} option - 选中的选项
 * @returns {void}
 */
const handleOptionSelect = (option: OptionsItemType): void => {
  if (option.disabled) return;
  updateModelValue(option);
};

/**
 * @description 更新模型值
 * @param {OptionsItemType} [option] - 选中的选项
 * @returns {void}
 */
const updateModelValue = (option?: OptionsItemType): void => {
  // 多选模式，追加选项
  if (props.multiple && option) {
    let values = (model.value as SingleValueType[]) || [];
    const index = values.findIndex(value => isEqual(value, option.value));

    // 如果已经存在，则移除
    if (index !== -1) {
      values = values.filter((_, i) => i !== index);
    } else {
      // 否则，添加
      values = [...values, option.value];
    }

    model.value = values;
    return;
  }

  // 单选模式或清空操作
  model.value = option ? option.value : props.multiple ? [] : "";

  // 关闭下拉框
  if (!props.multiple && option) {
    state.isDropdownVisible = false;
  }
};

/**
 * @description 处理输入过滤
 * @param {Event} event - 输入事件
 * @returns {void}
 */
const handleFilter = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  state.filterText = target.value;

  // 远程搜索方法
  if (props.remoteMethod) {
    loading.value = true;
    bindDebounce(() => {
      props.remoteMethod(state.filterText);
      loading.value = false;
    }, 300)();
  }
};

/**
 * @description 处理输入框聚焦
 * @returns {void}
 */
const handleFocus = (): void => {
  state.isFocused = true;
};

/**
 * @description 处理输入框失焦
 * @returns {void}
 */
const handleBlur = (): void => {
  setTimeout(() => {
    state.isFocused = false;
  }, 100);
};

/**
 * @description 处理下拉框关闭
 * @returns {void}
 */
const handleClose = (): void => {
  state.filterText = null;
};

// 监听选中值
watch(
  () => model.value,
  newVal => {
    state.temModel = newVal;
    const selectedOption = props.options.find(option => isEqual(option.value, newVal)) || { ...EMPTY_OPTION };
    state.selectedOption = selectedOption;
  },
  { immediate: true }
);

// 提供选择器组上下文
provide(
  selectGroupKey,
  reactive({
    ...toRefs(props),
    model,
    temModel: state.temModel
  }) as GroupContextType
);
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
