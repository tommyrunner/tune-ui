<template>
  <div class="example-container">
    <div class="row">
      <div class="item">
        <p>禁用状态：</p>
        <t-date-picker v-model="disabledDate" disabled placeholder="禁用状态" />
      </div>

      <div class="item">
        <p>只读状态：</p>
        <t-date-picker v-model="readonlyDate" readonly placeholder="只读状态" />
      </div>
    </div>

    <div class="row">
      <div class="item">
        <p>不可清除：</p>
        <t-date-picker v-model="unclearableDate" :clearable="false" placeholder="不可清除" />
      </div>

      <div class="item">
        <p>带图标前缀：</p>
        <t-date-picker v-model="prefixIconDate" placeholder="带图标">
          <template #prefix>
            <t-icon icon="calendar" :size="14" color="#409eff" />
          </template>
        </t-date-picker>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TDatePicker, TIcon } from "tune-ui";

// 状态示例数据
const disabledDate = ref(new Date());
const readonlyDate = ref(new Date());
const unclearableDate = ref(new Date());
const prefixIconDate = ref(new Date());
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
    min-width: 250px;

    p {
      margin-bottom: 8px;
      font-weight: 500;
    }
  }
}
</style>
