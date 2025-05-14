<template>
  <div class="checkbox-demo">
    <div class="checkbox-row">
      <t-checkbox disabled>禁用未选中</t-checkbox>
    </div>
    <div class="checkbox-row">
      <t-checkbox v-model="checked" disabled>禁用已选中</t-checkbox>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TCheckbox } from "tune-ui";

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
