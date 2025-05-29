<template>
  <div class="radio-demo">
    <div class="radio-item">
      <t-radio disabled>Disabled Unchecked</t-radio>
    </div>
    <div class="radio-item">
      <t-radio disabled v-model="radioValue" :value="true">Disabled Checked</t-radio>
    </div>
    <div class="radio-item">
      <t-radio-group v-model="groupValue">
        <t-radio value="1">Option 1</t-radio>
        <t-radio value="2">Option 2</t-radio>
        <t-radio value="3" disabled>Disabled Option</t-radio>
      </t-radio-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const radioValue = ref(true);
const groupValue = ref("1");
</script>

<style scoped>
.radio-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.radio-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
