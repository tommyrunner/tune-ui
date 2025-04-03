<template>
  <div class="t-menu-group">
    <div class="t-menu-group__title" v-if="title">{{ title }}</div>
    <div class="t-menu-group__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./menu-group.scss";
import type { PropsType } from "./menu-group";

defineOptions({
  name: "TMenuGroup"
});

defineProps<PropsType>();
</script>
