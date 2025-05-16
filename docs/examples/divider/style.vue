<template>
  <div class="divider-demo">
    <p>实线分割线（默认）</p>
    <t-divider borderStyle="solid" />

    <p>虚线分割线</p>
    <t-divider borderStyle="dashed" />

    <p>点线分割线</p>
    <t-divider borderStyle="dotted" />

    <p>双线分割线</p>
    <t-divider borderStyle="double" />
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
