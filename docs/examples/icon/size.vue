<template>
  <div class="icon-demo">
    <div class="size-row">
      <div class="size-item">
        <t-icon icon="setting" :size="16" />
        <div class="size-label">16px</div>
      </div>
      <div class="size-item">
        <t-icon icon="setting" :size="24" />
        <div class="size-label">24px</div>
      </div>
      <div class="size-item">
        <t-icon icon="setting" :size="32" />
        <div class="size-label">32px</div>
      </div>
      <div class="size-item">
        <t-icon icon="setting" :size="48" />
        <div class="size-label">48px</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TIcon } from "tune-ui";
</script>

<style scoped>
.icon-demo {
  padding: 16px 0;
}

.size-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.size-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.size-label {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}
</style>
