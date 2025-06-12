<template>
  <div :class="optionClasses" @click="handleChange">
    <div class="_option-content">
      <slot>{{ props.label }}</slot>
      <span v-if="props.subLabel" class="_sub-label">{{ props.subLabel }}</span>
    </div>
    <!-- 有子选项时显示箭头图标 -->
    <t-icon v-if="hasChildren" class="_arrow-icon" icon="caret-right" :size="12" />
  </div>
</template>

<script lang="ts" setup>
import "./option.scss";
import type { EmitsType, PropsType } from "./option";
import type { GroupContextType } from "./constants";
import type { SingleValueType } from "./select";
import { computed, inject } from "vue";
import { selectGroupKey } from "./constants";
import { isEqual, isValue } from "@/utils/is";
import { TIcon } from "@/packages/icon";

/**
 * @description 选项组件
 */
defineOptions({ name: "TSelectOption" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {});

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

// 注入选择器组上下文
const groupContext = inject<GroupContextType | undefined>(selectGroupKey, void 0);

/**
 * @description 判断是否有子选项
 * @returns {boolean} 是否有子选项
 */
const hasChildren = computed((): boolean => {
  return Array.isArray(props.children) && props.children.length > 0;
});

/**
 * @description 处理点击事件
 */
const handleChange = () => {
  // 禁用状态下不触发点击事件
  if (props.disabled) return;
  emit("change", props);
};

/**
 * @description 计算选项类名
 * @returns {string[]} 类名数组
 */
const optionClasses = computed((): string[] => {
  const { disabled, value } = props;
  const { model, groupState } = groupContext;
  const groupValue = isValue(model) ? model : groupState?.temModel;
  let isActive = false;

  // 判断常规选中状态
  if (groupContext.multiple) {
    isActive = (groupValue as SingleValueType[]).includes(value);
  } else {
    isActive = isEqual(groupValue, value);
  }

  // 在级联模式下判断高亮状态
  let isInCascadePath = false;
  if (groupState?.showCascadePanel && groupState?.cascadePath?.length > 0) {
    // 获取当前菜单索引和当前选项所在的菜单索引
    const activeMenuIndex = groupState.activeMenuIndex || 0;
    // 遍历级联面板，找到当前选项所在的菜单索引
    let currentOptionMenuIndex = -1;
    if (groupState.cascadePanels) {
      for (let i = 0; i < groupState.cascadePanels.length; i++) {
        const panel = groupState.cascadePanels[i];
        if (panel.some(opt => isEqual(opt.value, value))) {
          currentOptionMenuIndex = i;
          break;
        }
      }
    }
    // 检查是否在级联路径中
    const pathIndex = groupState.cascadePath.findIndex(option => isEqual(option.value, value));
    // 如果在级联路径中，则高亮显示
    if (pathIndex !== -1) {
      isInCascadePath = true;
    } else if (currentOptionMenuIndex === activeMenuIndex) {
      // 如果是当前激活菜单中的选项，但不在级联路径中，则不高亮
      isInCascadePath = false;
    }
  }

  return ["t-option", (isActive || isInCascadePath) && "_active", disabled && "t-disabled", hasChildren.value && "_has-children"];
});
</script>
