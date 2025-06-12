<template>
  <div class="t-menu-item" :class="menuItemClasses" @click.stop="handleItemClick">
    <!-- 对于折叠模式的一级菜单使用Popover -->
    <template v-if="isCollapseAndRootLevel">
      <t-popover
        position="right"
        :type="menuContext.popoverType"
        :padding="0"
        :width="menuContext.popoverWidth"
        class="t-menu-item__popover"
      >
        <div class="t-menu-item__content">
          <!-- 图标 -->
          <div class="t-menu-item__icon" v-if="menuItem.icon">
            <t-icon :icon="menuItem.icon" :size="iconSize" />
          </div>
          <!-- 标题 (始终渲染，但在折叠状态下通过CSS隐藏) -->
          <div class="t-menu-item__title">
            {{ menuItem.title }}
          </div>
        </div>
        <!-- 弹出内容 -->
        <template #content>
          <div class="t-menu-item__popup">
            <!-- 弹出菜单标题（根菜单项名称） -->
            <div class="t-menu-item__popup-header">{{ menuItem.title }}</div>

            <!-- 渲染子菜单，保持与展开模式下相同的结构 -->
            <div class="t-menu-item__popup-content" v-if="hasChildren">
              <template v-for="child in menuItem.children" :key="child.id">
                <t-menu-item :menu-item="child" :level="1" :popup-mode="true" />
              </template>
            </div>
          </div>
        </template>
      </t-popover>
    </template>

    <!-- 非折叠模式或非一级菜单 -->
    <template v-else>
      <div class="t-menu-item__content">
        <!-- 图标 -->
        <div class="t-menu-item__icon" v-if="menuItem.icon">
          <t-icon :icon="menuItem.icon" :size="iconSize" />
        </div>
        <!-- 标题 -->
        <div class="t-menu-item__title">
          {{ menuItem.title }}
        </div>
        <!-- 展开/收起图标 -->
        <div class="t-menu-item__arrow" v-if="hasChildren && showArrow">
          <t-icon icon="right" :size="13" />
        </div>
      </div>

      <!-- 子菜单 - 非折叠模式 -->
      <div class="t-menu-item__children" v-if="hasChildren && (!isCollapsedMode || popupMode)" :style="childrenStyle">
        <t-menu-item
          v-for="child in menuItem.children"
          :key="child.id"
          :menu-item="child"
          :level="level + 1"
          :popup-mode="popupMode"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import "./menu-item.scss";
import type { StyleValue } from "vue";
import type { MenuItemType, ModeType } from "../../menu";
import type { MenuContextType } from "../../constants";
import type { PropsType, ExposesType } from "./menu-item";
import { computed, inject, ref } from "vue";
import { TIcon } from "@/packages/icon";
import { TPopover } from "@/packages/popover";
import { menuContextKey } from "../../constants";

/**
 * @description 菜单项组件
 */
defineOptions({
  name: "TMenuItem"
});

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  level: 0,
  popupMode: false
});

/**
 * @description 注入菜单上下文
 */
const menuContext = inject<MenuContextType>(menuContextKey, {
  activeId: ref(""),
  expandKeys: ref<string[]>([]),
  mode: ref<ModeType>("expand"),
  accordion: false,
  autoExpand: false,
  popoverType: "hover",
  popoverWidth: "180px",
  handleSelect: (_menuItem: MenuItemType) => {},
  toggleExpand: (_id: string) => {}
});

/**
 * @description 是否有子菜单
 * @returns {boolean} 是否有子菜单
 */
const hasChildren = computed(() => {
  return props.menuItem.children && props.menuItem.children.length > 0;
});

/**
 * @description 是否为激活状态
 * @returns {boolean} 是否激活
 */
const isActive = computed(() => {
  return menuContext.activeId.value === props.menuItem.id;
});

/**
 * @description 是否为展开状态
 * @returns {boolean} 是否展开
 */
const isExpanded = computed(() => {
  return menuContext.expandKeys.value.includes(props.menuItem.id);
});

/**
 * @description 菜单项样式类
 * @returns {object} 样式类对象
 */
const menuItemClasses = computed(() => ({
  "t-menu-item--active": isActive.value,
  "t-menu-item--parent": hasChildren.value,
  "t-menu-item--expanded": isExpanded.value,
  "t-disabled": props.menuItem.disabled
}));

/**
 * @description 子菜单样式
 * @returns {StyleValue} 样式对象
 */
const childrenStyle = computed((): StyleValue => {
  if (!isExpanded.value) {
    return {
      maxHeight: "0",
      height: "0",
      display: "none",
      overflow: "hidden",
      paddingLeft: "0",
      borderLeft: "none"
    };
  }
  return {
    maxHeight: "none",
    height: "auto",
    display: "block",
    overflow: "visible",
    paddingLeft: "16px",
    borderLeft: "none"
  };
});

/**
 * @description 图标尺寸
 * @returns {number} 图标尺寸
 */
const iconSize = computed(() => {
  const mode = menuContext.mode.value;
  if (mode === "collapse" && props.level === 0) {
    return 24;
  }
  return 16;
});

/**
 * @description 是否显示箭头
 * @returns {boolean} 是否显示箭头
 */
const showArrow = computed(() => {
  if (menuContext.mode.value === "collapse" && props.level === 0) return false;
  return hasChildren.value;
});

/**
 * @description 是否为折叠模式
 * @returns {boolean} 是否折叠
 */
const isCollapsedMode = computed(() => {
  return menuContext.mode.value === "collapse";
});

/**
 * @description 是否为折叠模式下的一级菜单
 * @returns {boolean} 是否为折叠模式下的一级菜单
 */
const isCollapseAndRootLevel = computed(() => {
  return menuContext.mode.value === "collapse" && props.level === 0;
});

/**
 * @description 处理菜单项点击
 */
const handleItemClick = () => {
  if (props.menuItem.disabled) return;

  // 折叠模式下的一级菜单不触发展开/收起，由Popover处理
  if (isCollapseAndRootLevel.value) {
    if (!hasChildren.value) {
      menuContext.handleSelect(props.menuItem);
    }
    return;
  }

  if (hasChildren.value) {
    // 如果有子菜单，则展开/收起当前菜单
    menuContext.toggleExpand(props.menuItem.id);

    // 如果配置了自动展开所有子节点
    if (menuContext.autoExpand && isExpanded.value) {
      // 递归展开所有子节点
      expandAllChildren(props.menuItem);
    }
  } else {
    // 如果没有子菜单，则选中该菜单项
    menuContext.handleSelect(props.menuItem);
  }
};

/**
 * @description 递归展开所有子节点
 * @param {MenuItemType} item - 需要展开子节点的菜单项
 */
const expandAllChildren = (item: MenuItemType) => {
  if (!item.children || item.children.length === 0) return;

  item.children.forEach(child => {
    if (child.children && child.children.length > 0) {
      // 如果没有展开，则展开该节点
      if (!menuContext.expandKeys.value.includes(child.id)) {
        menuContext.toggleExpand(child.id);
      }
      // 递归展开子节点
      expandAllChildren(child);
    }
  });
};

defineExpose<ExposesType>({
  handleClick: handleItemClick
});
</script>
