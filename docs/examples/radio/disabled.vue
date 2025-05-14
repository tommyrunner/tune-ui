<template>
  <div class="radio-demo">
    <div class="radio-item">
      <t-radio disabled>禁用未选中</t-radio>
    </div>
    <div class="radio-item">
      <t-radio disabled v-model="radioValue" :value="true">禁用已选中</t-radio>
    </div>
    <div class="radio-item">
      <t-radio-group v-model="groupValue">
        <t-radio value="1">选项1</t-radio>
        <t-radio value="2">选项2</t-radio>
        <t-radio value="3" disabled>禁用选项</t-radio>
      </t-radio-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TRadio, TRadioGroup } from "tune-ui";

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
