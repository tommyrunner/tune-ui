<template>
  <div class="divider-demo">
    <p>默认居中</p>
    <t-divider>文本内容</t-divider>

    <p>左对齐</p>
    <t-divider contentPosition="left">文本内容</t-divider>

    <p>右对齐</p>
    <t-divider contentPosition="right">文本内容</t-divider>
  </div>
</template>

<script setup>
import { TDivider } from "tune-ui";
</script>

<style scoped>
.divider-demo {
  padding: 16px 0;
}
</style>
