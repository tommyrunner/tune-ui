<template>
  <div class="checkbox-demo">
    <div class="checkbox-row">
      <t-checkbox disabled>Disabled Unchecked</t-checkbox>
    </div>
    <div class="checkbox-row">
      <t-checkbox v-model="checked" disabled>Disabled Checked</t-checkbox>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const checked = ref(true);
</script>

<style scoped>
.checkbox-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.checkbox-row {
  display: flex;
  align-items: center;
}
</style>
