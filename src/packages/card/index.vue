<template>
  <div :class="cardClasses">
    <div v-if="showHeader" class="_card-header">
      <slot name="headLeft">
        <div>
          <t-icon v-if="titleIcon" :icon="titleIcon" />
          {{ title }}
        </div>
      </slot>
      <slot name="headRight" />
    </div>
    <div class="_card-body">
      <slot />
    </div>
    <div v-if="slots.footer" class="_card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";

import type { PropsType } from "./card";

import { computed, useSlots } from "vue";
import { TIcon } from "@/packages/icon";

defineOptions({ name: "TCard" });

const slots = useSlots();
const props = withDefaults(defineProps<PropsType>(), {
  shadow: "always"
});

/**
 * @description 计算卡片类名
 * @returns {string[]} 类名数组
 */
const cardClasses = computed((): string[] => {
  const { shadow } = props;
  return ["t-card", `t-card-shadow-${shadow}`];
});

/**
 * @description 判断是否显示头部
 * @returns {boolean} 是否显示头部
 */
const showHeader = computed((): boolean => {
  return !!(props.title || slots.headLeft);
});
</script>
