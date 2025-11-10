<template>
  <div class="example-container">
    <t-scrollbar>
      <div class="scrollbar-content">
        <p v-for="item in 20" :key="item" class="scrollbar-item">
          {{ item }}. Scroll content example - This is sample text to demonstrate basic scrollbar usage.
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
