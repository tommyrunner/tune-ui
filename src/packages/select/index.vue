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
      @open="handleDropdownShow"
      ref="popoverRef"
    >
      <!-- 下拉选项列表 -->
      <template #content>
        <!-- 级联选择面板 -->
        <div v-if="state.showCascadePanel" class="t-select-cascade">
          <div v-for="(menuOptions, menuIndex) in state.cascadePanels" :key="menuIndex" class="t-cascade-menu">
            <t-list-view :list-data="menuOptions" class="_options" :style="dropdownStyles" :empty-text="emptyText">
              <!-- 选项列表 -->
              <template #default="{ row }: ListSlotParamsType<OptionsItemType>">
                <!-- 自定义插槽 -->
                <Option v-bind="row" @change="option => handleCascadeItemClick(option, menuIndex)">
                  <slot :row="row" />
                </Option>
              </template>
            </t-list-view>
          </div>
        </div>

        <!-- 普通选项列表 -->
        <t-list-view v-else :list-data="filteredOptions" class="_options" :style="dropdownStyles" :empty-text="emptyText">
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
        <t-icon :size="ICON_SIZES[baseSize]" icon="caret-down" :color="ICON_COLOR" />
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
          :readonly="!filterable || state.showCascadePanel"
          :value="inputDisplayValue"
          :placeholder="selectPlaceholder"
          :disabled="disabled"
          @input="handleFilter"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- 右侧图标 -->
        <div class="_right-icon">
          <t-icon
            v-if="showClearIcon"
            icon="close-to"
            :size="ICON_SIZES[baseSize]"
            :color="ICON_COLOR"
            @click.stop="handleClear"
          />
          <t-icon
            v-else
            :class="{ '_icon-active': !props.disabled && state.isDropdownVisible }"
            :size="ICON_SIZES[baseSize]"
            icon="caret-down"
            :color="ICON_COLOR"
          />
        </div>
      </div>
    </t-popover>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { StyleValue } from "vue";
import type { EmitsType, ValueType, OptionsItemType, PropsType, SingleValueType } from "./select";
import type { ListSlotParamsType } from "@/packages/list-view/list-view";
import type { TPopoverType } from "@/packages/popover";
import type { PropsType as OptionPropsType } from "./option";
import { computed, reactive, ref, watch, provide, toRefs } from "vue";
import { TPopover } from "@/packages/popover";
import { TIcon } from "@/packages/icon";
import { TListView } from "@/packages/list-view";
import { TTag } from "@/packages/tag";
import Option from "./option.vue";
import { configOptions, useOptions } from "@/hooks/useOptions";
import { useTip } from "@/hooks";
import { fromCssVal } from "@/utils";
import { isEqual, isValue } from "@/utils/is";
import { bindDebounce } from "@/utils";
import { GroupContextType, selectGroupKey } from "./constants";
import { ICON_COLOR, DROPDOWN_RADIUS, ICON_SIZES, EMPTY_OPTION } from "./select";
import { TEXT_PLACEHOLDER_SELECT, TEXT_EMPTY } from "./i18n";

/**
 * @description 选择器组件
 */
defineOptions({ name: "TSelect" });

// 基础尺寸
const { baseSize } = useOptions();

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  options: () => [],
  type: "input",
  placeholder: TEXT_PLACEHOLDER_SELECT,
  emptyText: TEXT_EMPTY,
  isTip: true,
  clearable: true,
  disabled: false,
  filterable: false,
  multiple: false,
  showAllLevels: true,
  checkStrictly: true,
  selectParent: false
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
  temModel: props.multiple ? [] : ("" as ValueType),
  /** 级联路径 */
  cascadePath: [] as OptionPropsType[],
  /** 级联菜单列表 */
  cascadePanels: [] as OptionPropsType[][],
  /** 是否显示级联面板 */
  showCascadePanel: false,
  /** 当前激活的级联菜单索引 */
  activeMenuIndex: 0
});

/**
 * @description 计算选择器类名
 * @returns {string[]} 类名数组
 */
const selectClasses = computed((): string[] => {
  const { clearable, disabled } = props;
  return ["_select-content", `t-select-size-${baseSize.value}`, clearable && "t-select-clearable", disabled && "t-disabled"];
});

/**
 * @description 是否显示清除图标
 * @returns {boolean} 是否显示
 */
const showClearIcon = computed((): boolean => props.clearable && isValue(model.value));

/**
 * @description 计算选中标签
 * @returns {string} 标签文本
 */
const selectedLabel = computed((): string => {
  if (props.type === "text" && !model.value) return props.placeholder;

  // 如果有级联路径且路径不为空
  if (state.cascadePath.length > 0) {
    if (props.showAllLevels) {
      // 只显示最后一级
      return state.cascadePath[state.cascadePath.length - 1].label;
    } else {
      // 显示完整路径
      return state.cascadePath.map(option => option.label).join(" / ");
    }
  }

  // 普通选择逻辑
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

// ================ 方法定义 ================

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
  emit("remove-tag", item);
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
  state.cascadePath = [];
  state.cascadePanels = [];
  state.showCascadePanel = false;
  emit("clear");
};

/**
 * @description 处理选项选择
 * @param {OptionsItemType} option - 选中的选项
 * @returns {void}
 */
const handleOptionSelect = (option: OptionsItemType): void => {
  if (option.disabled) return;

  // 处理有子选项的情况
  if (Array.isArray(option.children) && option.children.length > 0) {
    initCascadeView(option);
    return;
  }

  // 普通选择处理
  updateModelValue(option);
  emit("change", option);
};

/**
 * @description 初始化级联视图
 * @param {OptionsItemType} option - 选项
 * @returns {void}
 */
const initCascadeView = (option: OptionsItemType): void => {
  // 如果选项没有子选项，不处理
  if (!Array.isArray(option.children) || option.children.length === 0) {
    return;
  }

  // 更新级联路径和菜单
  state.cascadePath = [option];
  state.cascadePanels = [];

  // 更新模型值，确保选中的父级选项高亮
  model.value = option.value;

  // 添加子选项到级联菜单
  if (Array.isArray(option.children) && option.children.length > 0) {
    state.cascadePanels = [props.options, option.children];
  }

  // 显示级联面板
  state.showCascadePanel = true;
  state.activeMenuIndex = 1;

  // 清空过滤文本
  state.filterText = null;
};

/**
 * @description 处理级联菜单项点击
 * @param {OptionsItemType} option - 选项
 * @param {number} menuIndex - 菜单索引
 * @returns {void}
 */
const handleCascadeItemClick = (option: OptionsItemType, menuIndex: number): void => {
  // 禁用状态下不处理
  if (option.disabled) return;

  // 更新激活的菜单索引
  state.activeMenuIndex = menuIndex;

  // 更新级联路径 - 保留当前菜单索引之前的路径，替换当前菜单索引的选项
  state.cascadePath = state.cascadePath.slice(0, menuIndex);
  state.cascadePath.push(option);

  // 触发级联菜单变化事件
  emit("cascade-change", [...state.cascadePath]);

  // 更新模型值，确保当前选中的选项高亮
  model.value = option.value;

  // 如果选项有子选项，更新级联菜单
  if (Array.isArray(option.children) && option.children.length > 0) {
    // 保留当前菜单索引之前的菜单，替换后续菜单
    state.cascadePanels = state.cascadePanels.slice(0, menuIndex + 1);
    state.cascadePanels.push(option.children);
    state.activeMenuIndex = menuIndex + 1;
    return;
  }

  // 如果选项没有子选项，关闭级联面板
  state.showCascadePanel = false;
  state.isDropdownVisible = false;
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
  // 级联模式下不进行过滤
  if (state.showCascadePanel) return;

  const target = event.target as HTMLInputElement;
  state.filterText = target.value;

  // 触发input事件
  emit("input", state.filterText);

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
 * @param {FocusEvent} event - 聚焦事件
 * @returns {void}
 */
const handleFocus = (event: FocusEvent): void => {
  state.isFocused = true;
  emit("focus", event);
};

/**
 * @description 处理输入框失焦
 * @param {FocusEvent} event - 失焦事件
 * @returns {void}
 */
const handleBlur = (event: FocusEvent): void => {
  state.isFocused = false;
  emit("blur", event);
};

/**
 * @description 处理下拉框显示
 * @returns {void}
 */
const handleDropdownShow = (): void => {
  emit("visible-change", true);
  handleOpen();
};

/**
 * @description 处理下拉框关闭
 * @returns {void}
 */
const handleClose = (): void => {
  state.filterText = null;
  emit("visible-change", false);

  // 如果级联面板处于打开状态且启用严格选择模式，且不允许选择父级
  if (state.showCascadePanel && props.checkStrictly && !props.selectParent) {
    // 检查当前选中值是否为父节点
    const hasLeafNodeSelected = checkHasSelectedLeafNode();

    // 如果没有选择叶子节点，则清空值
    if (!hasLeafNodeSelected) {
      // 使用类型断言而不是修改SingleValueType定义
      if (props.multiple) {
        model.value = [] as unknown as SingleValueType[];
      } else {
        model.value = "";
      }
      state.cascadePath = [];
    }
  }

  state.showCascadePanel = false;
};

/**
 * @description 检查是否选择了叶子节点
 * @returns {boolean} 是否选择了叶子节点
 */
const checkHasSelectedLeafNode = (): boolean => {
  // 如果没有级联路径，返回false
  if (!state.cascadePath.length) return false;

  // 获取最后选择的节点
  const lastNode = state.cascadePath[state.cascadePath.length - 1];

  // 检查是否为叶子节点（没有子节点或子节点为空数组）
  return !Array.isArray(lastNode.children) || lastNode.children.length === 0;
};

/**
 * @description 根据当前选中值查找级联路径
 * @returns {void}
 */
const buildCascadePathFromValue = (): void => {
  // 如果没有选中值，不进行处理
  if (!isValue(model.value)) return;

  // 存储找到的路径和对应的菜单
  const path: OptionsItemType[] = [];
  const menus: OptionsItemType[][] = [];

  // 递归查找选中值的路径
  const findPathRecursive = (options: OptionsItemType[], targetValue: ValueType): boolean => {
    // 将当前选项列表添加到菜单中
    if (!menus.includes(options)) {
      menus.push(options);
    }

    // 在当前级别查找匹配的选项
    for (const option of options) {
      // 检查当前选项是否匹配目标值
      if (isEqual(option.value, targetValue)) {
        path.push(option);
        return true;
      }

      // 如果当前选项有子选项，递归查找
      if (Array.isArray(option.children) && option.children.length > 0) {
        // 先递归查找子选项
        if (findPathRecursive(option.children, targetValue)) {
          // 如果在子选项中找到了目标值，将当前选项添加到路径中
          path.unshift(option);
          return true;
        }
      }
    }

    // 如果在当前级别没有找到匹配的选项，移除该级别的菜单
    menus.pop();
    return false;
  };

  // 从顶层选项开始查找
  findPathRecursive(props.options, model.value);

  // 如果找到了路径，设置级联状态
  if (path.length > 0) {
    // 确保菜单列表是正确的
    const correctMenus: OptionsItemType[][] = [props.options];
    // 根据路径构建正确的菜单列表
    for (let i = 0; i < path.length - 1; i++) {
      if (Array.isArray(path[i].children) && path[i].children.length > 0) {
        correctMenus.push(path[i].children);
      }
    }

    // 更新状态
    state.cascadePath = path;
    state.cascadePanels = correctMenus;
    state.showCascadePanel = true;
    state.activeMenuIndex = path.length - 1;
  }
};

/**
 * @description 处理下拉框打开
 * @returns {void}
 */
const handleOpen = (): void => {
  // 如果有选中值且是级联选择，自动展开到选中项
  if (isValue(model.value) && props.options.some(opt => Array.isArray(opt.children) && opt.children.length > 0)) {
    // 保存原始选中值
    const originalValue = model.value;
    // 构建级联路径
    buildCascadePathFromValue();
    // 确保选中值被恢复，以便高亮最后一级
    model.value = originalValue;
    // 在级联模式下清空过滤文本
    state.filterText = null;
  }
};

// ================ 监听器 ================

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

// 监听下拉框显示状态变化
watch(
  () => state.isDropdownVisible,
  isVisible => {
    if (isVisible) {
      handleOpen();
    }
  }
);

// 提供选择器组上下文
provide(
  selectGroupKey,
  reactive({
    ...toRefs(props),
    model,
    groupState: state
  }) as GroupContextType
);
</script>
