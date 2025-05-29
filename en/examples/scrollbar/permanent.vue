<template>
  <div class="example-container">
    <t-scrollbar :permanent="true">
      <div class="scrollbar-content">
        <p v-for="item in 20" :key="item" class="scrollbar-item">
          {{ item }}. Permanent scrollbar example - Setting the permanent attribute to true makes the scrollbar always visible.
        </p>
      </div>
    </t-scrollbar>
  </div>
</template>

<style scoped>
.example-container {
  width: 100%;
}

.scrollbar-content {
  padding: 10px;
}

.scrollbar-item {
  padding: 10px;
  margin-bottom: 10px;
  background: #f6f8fa;
  border-radius: 4px;
}
</style>
