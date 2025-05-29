<template>
  <div class="switch-demo">
    <div class="switch-item">
      <div class="content-label">Custom Text Content:</div>
      <t-switch v-model="switchValue" class="custom-switch">
        <template #onContent>
          <span class="custom-text">ON</span>
        </template>
        <template #offContent>
          <span class="custom-text">OFF</span>
        </template>
      </t-switch>
    </div>
    <div class="switch-item">
      <div class="content-label">Custom Icon Content:</div>
      <t-switch v-model="switchIcon" class="custom-switch-icon">
        <template #onContent>
          <t-icon icon="success" :size="12" color="#fff"></t-icon>
        </template>
        <template #offContent>
          <t-icon icon="close" :size="12" color="#fff"></t-icon>
        </template>
      </t-switch>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const switchValue = ref(true);
const switchIcon = ref(true);
</script>

<style scoped>
.switch-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.switch-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.content-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 4px;
}

.custom-switch {
  width: 60px;
}

.custom-text {
  font-size: 12px;
  color: #ffffff;
  font-weight: bold;
}
</style>
