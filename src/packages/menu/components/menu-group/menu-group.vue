<template>
  <div class="t-menu-group">
    <div class="t-menu-group__title" v-if="props.title">{{ props.title }}</div>
    <div class="t-menu-group__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./menu-group.scss";
import type { PropsType } from "./menu-group";
const props = withDefaults(defineProps<PropsType>(), {});
/**
 * @description 菜单分组组件
 */
defineOptions({
  name: "TMenuGroup"
});
</script>
