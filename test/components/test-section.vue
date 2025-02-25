<template>
  <section class="test-section">
    <h3 class="test-section-title">{{ title }}</h3>
    <div class="test-section-content">
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  /** 测试区块标题 */
  title: string;
}>();
</script>

<style lang="scss" scoped>
.test-section {
  margin-bottom: 24px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);

  .test-section-title {
    margin: 0 0 16px;
    font-size: 16px;
    font-weight: 500;
    color: #1f2937;
  }

  .test-section-content {
    min-height: 32px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>
