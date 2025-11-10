<template>
  <div class="example-container">
    <t-scrollbar>
      <div class="scrollbar-horizontal-content">
        <div class="month-wrapper">
          <div v-for="month in 12" :key="month" class="month-item">
            <div class="month-title">Month {{ month }}</div>
            <div class="days-grid">
              <div v-for="day in 30" :key="day" class="day-cell">
                {{ day }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </t-scrollbar>
  </div>
</template>

<style scoped>
.example-container {
  width: 100%;
}

.scrollbar-horizontal-content {
  padding: 10px;
}

.month-wrapper {
  display: flex;
  flex-wrap: nowrap;
  width: 1800px;
}

.month-item {
  flex: 0 0 auto;
  width: 150px;
  margin-right: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.month-title {
  padding: 8px;
  font-weight: 500;
  text-align: center;
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.days-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 4px;
}

.day-cell {
  width: 28px;
  height: 28px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  border-radius: 4px;
  font-size: 12px;
}
</style>
