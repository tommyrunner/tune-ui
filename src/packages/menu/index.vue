<template>
  <div
    class="t-menu"
    :class="[`t-menu--${mode}`]"
    :style="{
      width: computedWidth
    }"
  >
    <div class="t-menu__inner">
      <slot></slot>

      <!-- 渲染根级菜单项 -->
      <template v-if="data && data.length > 0">
        <t-menu-item v-for="item in data" :key="item.id" :menu-item="item" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { ModeType, MenuItemType, PropsType, EmitsType, ExposesType } from "./menu";
import { computed, provide, watchEffect } from "vue";
import TMenuItem from "./components/menu-item/menu-item.vue";
import { menuContextKey } from "./constants";

/**
 * @description 菜单组件
 */
defineOptions({
  name: "TMenu"
});

/**
 * @description v-model定义
 */
const modelActive = defineModel<string>("active", { default: "" });
const modelExpandKeys = defineModel<string[]>("expandKeys", { default: () => [] });
const mode = defineModel<ModeType>("mode", { default: "expand" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<Omit<PropsType, "active" | "expandKeys" | "mode">>(), {
  data: () => [],
  accordion: false,
  autoExpand: false,
  popoverType: "hover",
  width: 240,
  collapseWidth: 60,
  popoverWidth: 180
});

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description 计算菜单宽度
 * @returns {string} 菜单宽度
 */
const computedWidth = computed(() => {
  if (mode.value === "expand") {
    return typeof props.width === "number" ? `${props.width}px` : props.width;
  } else if (mode.value === "collapse") {
    return typeof props.collapseWidth === "number" ? `${props.collapseWidth}px` : props.collapseWidth;
  }
  return "auto";
});

/**
 * @description 处理菜单项选中
 * @param {MenuItemType} menuItem - 菜单项数据
 */
const handleSelect = (menuItem: MenuItemType) => {
  if (menuItem.disabled) return;
  // 设置当前选中项
  modelActive.value = menuItem.id;
  // 确保所有父菜单保持展开状态
  ensureParentsExpanded(menuItem.id);
  emit("select", menuItem);
};

/**
 * @description 确保所有父菜单保持展开状态
 * @param {string} id - 当前菜单项ID
 */
const ensureParentsExpanded = (id: string) => {
  // 获取扁平化菜单数据
  const flatMenu = flattenMenu(props.data);
  // 查找当前菜单项
  const currentItem = flatMenu.find(item => item.id === id);
  if (!currentItem) return;
  // 递归查找并展开所有父菜单
  let parentId = currentItem.parent;
  while (parentId) {
    // 如果父菜单未展开，则展开它
    if (!modelExpandKeys.value.includes(parentId)) {
      modelExpandKeys.value = [...modelExpandKeys.value, parentId];
    }
    // 查找父菜单的父菜单
    const parentItem = flatMenu.find(item => item.id === parentId);
    parentId = parentItem ? parentItem.parent : null;
  }
};

/**
 * @description 切换菜单项展开状态
 * @param {string} id - 菜单项ID
 */
const toggleExpand = (id: string) => {
  if (props.accordion) {
    // 手风琴模式：同级菜单只能有一个展开
    const flatMenu = flattenMenu(props.data);
    const currentItem = flatMenu.find(item => item.id === id);
    // 如果找不到当前项，直接返回
    if (!currentItem) return;

    // 当前菜单已展开，则收起
    if (modelExpandKeys.value.includes(id)) {
      modelExpandKeys.value = modelExpandKeys.value.filter(key => key !== id);
    } else {
      // 获取当前项的父级
      const parentLevel = currentItem.parent;
      // 找出同级的其他已展开菜单（只有同一父级下的同级菜单需要互斥收起）
      const siblingExpandedKeys = modelExpandKeys.value.filter(key => {
        const keyItem = flatMenu.find(item => item.id === key);
        return keyItem && keyItem.parent === parentLevel && key !== id;
      });
      // 保留非同级的已展开菜单
      const keysToKeep = modelExpandKeys.value.filter(key => {
        const keyItem = flatMenu.find(item => item.id === key);
        return !keyItem || keyItem.parent !== parentLevel || key === id;
      });
      // 移除同级已展开菜单，添加当前菜单到展开列表
      modelExpandKeys.value = [...keysToKeep.filter(key => !siblingExpandedKeys.includes(key)), id];
    }
  } else {
    // 非手风琴模式：可以同时展开多个菜单
    if (modelExpandKeys.value.includes(id)) {
      modelExpandKeys.value = modelExpandKeys.value.filter(key => key !== id);
    } else {
      modelExpandKeys.value = [...modelExpandKeys.value, id];
    }
  }

  emit("expand", modelExpandKeys.value);
};

/**
 * @description 扁平化菜单数据，为每个项添加parent标识
 * @param {MenuItemType[]} items - 菜单项数组
 * @param {string | null} parent - 父级ID
 * @returns {(MenuItemType & { parent: string | null })[]} 扁平化的菜单数组
 */
const flattenMenu = (items: MenuItemType[], parent: string | null = null): (MenuItemType & { parent: string | null })[] => {
  return items.reduce(
    (acc, item) => {
      const itemWithParent = { ...item, parent };
      acc.push(itemWithParent);

      if (item.children && item.children.length > 0) {
        acc = [...acc, ...flattenMenu(item.children, item.id)];
      }

      return acc;
    },
    [] as (MenuItemType & { parent: string | null })[]
  );
};

/**
 * @description 展开所有菜单项
 */
const expandAll = () => {
  const flatMenu = flattenMenu(props.data);
  const allIds = flatMenu.filter(item => item.children && item.children.length > 0).map(item => item.id);
  modelExpandKeys.value = allIds;
  emit("expand", modelExpandKeys.value);
};

/**
 * @description 收起所有菜单项
 */
const collapseAll = () => {
  modelExpandKeys.value = [];
  emit("expand", modelExpandKeys.value);
};

/**
 * @description 切换菜单模式
 */
const toggleMode = () => {
  mode.value = mode.value === "expand" ? "collapse" : "expand";
  emit("modeChange", mode.value);
};

/**
 * @description 获取当前激活的菜单项
 * @returns {MenuItemType | undefined} 激活的菜单项
 */
const getActiveItem = (): MenuItemType | undefined => {
  const flatMenu = flattenMenu(props.data);
  return flatMenu.find(item => item.id === modelActive.value);
};

// 提供上下文
provide(menuContextKey, {
  activeId: modelActive,
  expandKeys: modelExpandKeys,
  mode: mode,
  accordion: props.accordion,
  autoExpand: props.autoExpand,
  popoverType: props.popoverType,
  popoverWidth: props.popoverWidth,
  handleSelect,
  toggleExpand
});

// 监听模式变化
watchEffect(() => {
  if (mode.value) {
    emit("modeChange", mode.value);
  }
});

defineExpose<ExposesType>({
  expandAll,
  collapseAll,
  toggleMode,
  getActiveItem
});
</script>
