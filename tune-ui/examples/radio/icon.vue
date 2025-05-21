<template>
  <div class="radio-demo">
    <div class="radio-row">
      <t-radio v-model="radio1" :value="true" icon="check">使用"check"图标</t-radio>
    </div>
    <div class="radio-row">
      <t-radio v-model="radio2" :value="true" icon="heart">使用"heart"图标</t-radio>
    </div>
    <div class="radio-row">
      <t-radio v-model="radio3" :value="true" icon="star">使用"star"图标</t-radio>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const radio1 = ref(true);
const radio2 = ref(true);
const radio3 = ref(true);
</script>

<style scoped>
.radio-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.radio-row {
  display: flex;
  align-items: center;
}
</style>
