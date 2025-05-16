<template>
  <div class="tag-demo">
    <t-tag size="small">小型标签</t-tag>
    <t-tag>默认尺寸</t-tag>
    <t-tag size="large">大型标签</t-tag>
  </div>
</template>

<script setup>
import { TTag } from "tune-ui";
</script>

<style scoped>
.tag-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}
</style>
