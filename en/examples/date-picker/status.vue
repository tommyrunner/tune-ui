<template>
  <div class="example-container">
    <div class="row">
      <div class="item">
        <p>Disabled State:</p>
        <t-date-picker v-model="disabledDate" disabled placeholder="Disabled state" />
      </div>

      <div class="item">
        <p>Readonly State:</p>
        <t-date-picker v-model="readonlyDate" readonly placeholder="Readonly state" />
      </div>
    </div>

    <div class="row">
      <div class="item">
        <p>Not Clearable:</p>
        <t-date-picker v-model="unclearableDate" :clearable="false" placeholder="Not clearable" />
      </div>

      <div class="item">
        <p>With Prefix Icon:</p>
        <t-date-picker v-model="prefixIconDate" placeholder="With icon">
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

// Status example data
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
