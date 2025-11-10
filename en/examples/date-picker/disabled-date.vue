<template>
  <div class="example-container">
    <div class="row">
      <div class="item">
        <p>Disable Past Dates:</p>
        <t-date-picker v-model="futureDatesOnly" :disabled-date="disablePastDates" placeholder="Can only select today and future dates" />
      </div>

      <div class="item">
        <p>Disable Future Dates:</p>
        <t-date-picker v-model="pastDatesOnly" :disabled-date="disableFutureDates" placeholder="Can only select today and past dates" />
      </div>
    </div>

    <div class="row">
      <div class="item">
        <p>Limit Date Range Selection:</p>
        <div class="date-range-container">
          <div class="date-label">Selection Range:</div>
          <div class="date-input-group">
            <t-date-picker
              v-model="rangeStartDate"
              placeholder="Range start date"
              :disabled-date="date => disableDateOutsideRange(date, null, rangeEndDate)"
              @change="handleStartDateChange"
            />
            <span class="date-separator">to</span>
            <t-date-picker
              v-model="rangeEndDate"
              placeholder="Range end date"
              :disabled-date="date => disableDateOutsideRange(date, rangeStartDate, null)"
              @change="handleEndDateChange"
            />
          </div>
        </div>
      </div>

      <div class="item">
        <p>Disable Specific Dates:</p>
        <t-date-picker v-model="specificDisabledDate" :disabled-date="disableSpecificDates" placeholder="Weekends and holidays not selectable" />
        <div class="hint">Hint: This example disables all weekends and 2023-06-20</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// Date data
const futureDatesOnly = ref(null);
const pastDatesOnly = ref(null);
const rangeStartDate = ref(null);
const rangeEndDate = ref(null);
const specificDisabledDate = ref(null);

// Disable past dates
const disablePastDates = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getTime() < today.getTime();
};

// Disable future dates
const disableFutureDates = (date: Date) => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return date.getTime() > today.getTime();
};

// Disable dates outside range
const disableDateOutsideRange = (date: Date, startDate: Date | null, endDate: Date | null) => {
  if (startDate && date.getTime() < startDate.getTime()) {
    return true;
  }

  if (endDate && date.getTime() > endDate.getTime()) {
    return true;
  }

  return false;
};

// Disable specific dates
const disableSpecificDates = (date: Date) => {
  // Disable weekends
  const day = date.getDay();
  if (day === 0 || day === 6) {
    return true;
  }

  // Disable specific date (e.g., 2023-06-20)
  const holidayDate = new Date("2023-06-20");
  holidayDate.setHours(0, 0, 0, 0);

  return date.getTime() === holidayDate.getTime();
};

// Start date change
const handleStartDateChange = () => {
  // If end date is less than start date, reset end date
  if (rangeEndDate.value && rangeStartDate.value && new Date(rangeEndDate.value) < new Date(rangeStartDate.value)) {
    rangeEndDate.value = null;
  }
};

// End date change
const handleEndDateChange = () => {
  // If start date is greater than end date, reset start date
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
