<template>
  <div class="example-container">
    <div class="row">
      <div class="item">
        <p>Small size:</p>
        <t-date-picker v-model="smallSize" size="small" placeholder="Small size" />
      </div>

      <div class="item">
        <p>Default size:</p>
        <t-date-picker v-model="defaultSize" placeholder="Default size" />
      </div>

      <div class="item">
        <p>Large size:</p>
        <t-date-picker v-model="largeSize" size="large" placeholder="Large size" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// Size example data
const smallSize = ref(new Date());
const defaultSize = ref(new Date());
const largeSize = ref(new Date());
</script>

<style lang="scss" scoped>
.example-container {
  width: 100%;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 20px;

  .item {
    flex: 1;
    min-width: 200px;

    p {
      margin-bottom: 8px;
      font-weight: 500;
    }
  }
}
</style>
