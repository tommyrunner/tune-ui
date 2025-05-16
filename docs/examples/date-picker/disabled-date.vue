<template>
  <div class="example-container">
    <div class="row">
      <div class="item">
        <p>禁用过去的日期：</p>
        <t-date-picker v-model="futureDatesOnly" :disabled-date="disablePastDates" placeholder="只能选择今天及以后的日期" />
      </div>

      <div class="item">
        <p>禁用未来的日期：</p>
        <t-date-picker v-model="pastDatesOnly" :disabled-date="disableFutureDates" placeholder="只能选择今天及以前的日期" />
      </div>
    </div>

    <div class="row">
      <div class="item">
        <p>限制选择日期范围：</p>
        <div class="date-range-container">
          <div class="date-label">选择范围：</div>
          <div class="date-input-group">
            <t-date-picker
              v-model="rangeStartDate"
              placeholder="范围开始日期"
              :disabled-date="date => disableDateOutsideRange(date, null, rangeEndDate)"
              @change="handleStartDateChange"
            />
            <span class="date-separator">至</span>
            <t-date-picker
              v-model="rangeEndDate"
              placeholder="范围结束日期"
              :disabled-date="date => disableDateOutsideRange(date, rangeStartDate, null)"
              @change="handleEndDateChange"
            />
          </div>
        </div>
      </div>

      <div class="item">
        <p>禁用特定日期：</p>
        <t-date-picker v-model="specificDisabledDate" :disabled-date="disableSpecificDates" placeholder="周末、节假日不可选" />
        <div class="hint">提示：本示例中禁用了所有周末和 2023-06-20</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TDatePicker } from "tune-ui";

// 日期数据
const futureDatesOnly = ref(null);
const pastDatesOnly = ref(null);
const rangeStartDate = ref(null);
const rangeEndDate = ref(null);
const specificDisabledDate = ref(null);

// 禁用过去的日期
const disablePastDates = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getTime() < today.getTime();
};

// 禁用未来的日期
const disableFutureDates = (date: Date) => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return date.getTime() > today.getTime();
};

// 禁用范围外的日期
const disableDateOutsideRange = (date: Date, startDate: Date | null, endDate: Date | null) => {
  if (startDate && date.getTime() < startDate.getTime()) {
    return true;
  }

  if (endDate && date.getTime() > endDate.getTime()) {
    return true;
  }

  return false;
};

// 禁用特定日期
const disableSpecificDates = (date: Date) => {
  // 禁用周末
  const day = date.getDay();
  if (day === 0 || day === 6) {
    return true;
  }

  // 禁用特定日期 (例如 2023-06-20)
  const holidayDate = new Date("2023-06-20");
  holidayDate.setHours(0, 0, 0, 0);

  return date.getTime() === holidayDate.getTime();
};

// 开始日期变更
const handleStartDateChange = () => {
  // 如果结束日期小于开始日期，重置结束日期
  if (rangeEndDate.value && rangeStartDate.value && new Date(rangeEndDate.value) < new Date(rangeStartDate.value)) {
    rangeEndDate.value = null;
  }
};

// 结束日期变更
const handleEndDateChange = () => {
  // 如果开始日期大于结束日期，重置开始日期
  if (rangeStartDate.value && rangeEndDate.value && new Date(rangeStartDate.value) > new Date(rangeEndDate.value)) {
    rangeStartDate.value = null;
  }
};
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
    min-width: 300px;

    p {
      margin-bottom: 8px;
      font-weight: 500;
    }
  }
}

.date-range-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.date-label {
  font-size: 14px;
  color: #606266;
}

.date-input-group {
  display: flex;
  align-items: center;
  gap: 8px;

  .t-date-picker {
    flex: 1;
  }

  .date-separator {
    color: #909399;
  }
}

.hint {
  margin-top: 8px;
  font-size: 12px;
  color: #909399;
  line-height: 1.4;
}
</style>
