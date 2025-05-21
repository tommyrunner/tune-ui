<template>
  <div class="image-demo">
    <div class="loading-container">
      <div class="loading-item">
        <div class="loading-title">默认占位</div>
        <t-image
          src="https://i.postimg.cc/C5k7W9GK/1.webp?loading=1"
          width="300px"
          height="200px"
        />
      </div>
      
      <div class="loading-item">
        <div class="loading-title">自定义加载中</div>
        <t-image
          src="https://i.postimg.cc/C5k7W9GK/1.webp?loading=1" 
          width="300px"
          height="200px"
        >
          <template #placeholder>
            <div class="image-slot">
              <div class="loading-icon"></div>
              <span>加载中...</span>
            </div>
          </template>
        </t-image>
      </div>

      <div class="loading-item">
        <div class="loading-title">加载失败</div>
        <t-image
          src="https://error-image-url.jpg"
          width="300px"
          height="200px"
        >
          <template #error>
            <div class="image-slot">
              <span>加载失败</span>
              <div class="retry-button">重试</div>
            </div>
          </template>
        </t-image>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-demo {
  width: 100%;
}

.loading-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.loading-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.loading-title {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.image-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 14px;
}

.loading-icon {
  width: 30px;
  height: 30px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  margin-bottom: 10px;
  animation: spin 1s linear infinite;
}

.retry-button {
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #409eff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 