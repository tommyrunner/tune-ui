<template>
  <div class="image-demo">
    <div class="config-form">
      <div class="form-item">
        <label>缩放速率:</label>
        <input type="number" v-model.number="zoomRate" min="1" max="3" step="0.1" />
      </div>
      <div class="form-item">
        <label>最小缩放比例:</label>
        <input type="number" v-model.number="minScale" min="0.1" max="0.9" step="0.1" />
      </div>
      <div class="form-item">
        <label>最大缩放比例:</label>
        <input type="number" v-model.number="maxScale" min="1" max="10" step="1" />
      </div>
      <div class="form-item">
        <label>无限循环:</label>
        <input type="checkbox" v-model="infinite" />
      </div>
    </div>
    
    <div class="preview-images">
      <div v-for="(src, index) in previewImages" :key="index" class="preview-item">
        <t-image
          :src="src"
          width="200px"
          height="150px"
          :preview-src-list="previewImages"
          :initial-index="index"
          :zoom-rate="zoomRate"
          :min-scale="minScale"
          :max-scale="maxScale"
          :infinite="infinite"
          :z-index="2000"
          @switch="handleSwitch"
        />
        <div class="image-label">图片 {{ index + 1 }}</div>
      </div>
    </div>
    
    <div v-if="switchInfo" class="switch-info">
      已切换到图片 {{ switchInfo + 1 }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TImage } from "tune-ui";

// 预览图片列表
const previewImages = [
  "https://i.postimg.cc/MH2bbtCJ/77.webp",
  "https://i.postimg.cc/43y5JY6q/8.webp",
  "https://i.postimg.cc/C5k7W9GK/1.webp"
];

// 预览配置
const zoomRate = ref(1.2);
const minScale = ref(0.2);
const maxScale = ref(7);
const infinite = ref(true);

// 切换信息
const switchInfo = ref(null);

// 处理图片切换
const handleSwitch = (index) => {
  switchInfo.value = index;
  setTimeout(() => {
    switchInfo.value = null;
  }, 2000);
};
</script>

<style scoped>
.image-demo {
  width: 100%;
}

.config-form {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-item label {
  font-size: 14px;
  color: #606266;
  min-width: 110px;
}

.form-item input[type="number"] {
  width: 60px;
  padding: 5px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  text-align: center;
}

.preview-images {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.preview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.image-label {
  font-size: 14px;
  color: #606266;
}

.switch-info {
  padding: 10px 15px;
  background-color: #ecf8ff;
  color: #409eff;
  border-radius: 4px;
  margin-top: 20px;
  font-size: 14px;
  animation: fadeOut 2s forwards;
}

@keyframes fadeOut {
  0% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; }
}
</style> 