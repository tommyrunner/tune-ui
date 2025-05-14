<template>
  <div class="tag-demo">
    <t-tag>默认标签</t-tag>
    <t-tag round>圆角标签</t-tag>
    <t-tag round type="primary">圆角主要标签</t-tag>
    <t-tag round type="success">圆角成功标签</t-tag>
    <t-tag round type="warning">圆角警告标签</t-tag>
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
}
</style>
