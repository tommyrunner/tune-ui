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
import type { ModeType, MenuItemType, PropsType, EmitsType } from "./menu";
import { computed, provide, watchEffect } from "vue";
import TMenuItem from "./components/menu-item/menu-item.vue";
import { menuContextKey } from "./constants";

defineOptions({
  name: "TMenu"
});

// 使用defineModel实现双向绑定
const modelActive = defineModel<string>("active", { default: "" });
const modelExpandKeys = defineModel<string[]>("expandKeys", { default: () => [] });
const mode = defineModel<ModeType>("mode", { default: "expand" });

// Props定义
const props = withDefaults(defineProps<Omit<PropsType, "active" | "expandKeys" | "mode">>(), {
  data: () => [],
  accordion: false,
  autoExpand: false,
  popoverType: "hover",
  width: 240,
  collapseWidth: 60,
  popoverWidth: 180
});

// Emits定义
const emit = defineEmits<EmitsType>();

// 计算属性
const computedWidth = computed(() => {
  if (mode.value === "expand") {
    return typeof props.width === "number" ? `${props.width}px` : props.width;
  } else if (mode.value === "collapse") {
    return typeof props.collapseWidth === "number" ? `${props.collapseWidth}px` : props.collapseWidth;
  }
  return "auto";
});

// 方法
const handleSelect = (menuItem: MenuItemType) => {
  if (menuItem.disabled) return;
  // 设置当前选中项
  modelActive.value = menuItem.id;
  // 确保所有父菜单保持展开状态
  ensureParentsExpanded(menuItem.id);
  emit("select", menuItem);
};

/**
 * 确保所有父菜单保持展开状态
 * @param id 当前菜单项ID
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

// 扁平化菜单数据，为每个项添加parent标识
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
</script>
