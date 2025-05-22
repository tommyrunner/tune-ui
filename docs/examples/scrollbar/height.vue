<template>
  <div class="example-container">
    <div class="scrollbar-row">
      <div class="scrollbar-column">
        <h4>高度: 200px</h4>
        <t-scrollbar :height="200">
          <div class="scrollbar-content">
            <p v-for="item in 20" :key="item" class="scrollbar-item">{{ item }}. 自定义高度示例</p>
          </div>
        </t-scrollbar>
      </div>

      <div class="scrollbar-column">
        <h4>高度: 400px</h4>
        <t-scrollbar :height="400">
          <div class="scrollbar-content">
            <p v-for="item in 20" :key="item" class="scrollbar-item">{{ item }}. 自定义高度示例</p>
          </div>
        </t-scrollbar>
      </div>
    </div>
  </div>
</template>

<style scoped>
.example-container {
  width: 100%;
}

.scrollbar-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.scrollbar-column {
  flex: 1;
}

h4 {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
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

.height-controller {
  margin-top: 30px;
}

.height-controller label {
  display: block;
  margin-bottom: 10px;
}

.height-controller input {
  width: 100%;
  margin-bottom: 15px;
}
</style>
