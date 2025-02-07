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
    <div v-if="slots.foot" class="_card-footer">
      <slot name="foot" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropsType } from "./card";
import { computed, useSlots } from "vue";
import { TIcon } from "@/packages/icon";

defineOptions({ name: "TCard" });

const slots = useSlots();
const props = withDefaults(defineProps<PropsType>(), {
  shadow: "always"
});

/**
 * 计算卡片类名
 */
const cardClasses = computed(() => {
  const { shadow } = props;
  return ["t-card", `t-card-shadow-${shadow}`];
});

/**
 * 判断是否显示头部
 */
const showHeader = computed(() => {
  return props.title || slots.headLeft;
});
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
