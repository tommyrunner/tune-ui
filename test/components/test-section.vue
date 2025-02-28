<template>
  <div class="test-section">
    <div class="test-section-title">{{ title }}</div>
    <div class="test-section-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  /** 测试区块标题 */
  title: string;
}>();
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";

.test-section {
  margin-bottom: 30px;
  border: 1px solid $border-color-default;
  border-radius: 4px;
  overflow: hidden;
}

.test-section-title {
  padding: 12px 16px;
  font-size: $font-size-large;
  font-weight: 500;
  background-color: $bg-color-hover;
  border-bottom: 1px solid $border-color-default;
}

.test-section-content {
  padding: 16px;
}
</style>
