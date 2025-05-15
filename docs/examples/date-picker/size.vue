<template>
  <div class="example-container">
    <div class="row">
      <div class="item">
        <p>小尺寸：</p>
        <t-date-picker v-model="smallSize" size="small" placeholder="小尺寸" />
      </div>

      <div class="item">
        <p>默认尺寸：</p>
        <t-date-picker v-model="defaultSize" placeholder="默认尺寸" />
      </div>

      <div class="item">
        <p>大尺寸：</p>
        <t-date-picker v-model="largeSize" size="large" placeholder="大尺寸" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TDatePicker } from "tune-ui";

// 尺寸示例数据
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
