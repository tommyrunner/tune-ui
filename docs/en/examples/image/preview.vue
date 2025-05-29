<template>
  <div class="image-demo">
    <div class="preview-container">
      <div class="preview-item">
        <div class="preview-title">Click to View Large Image</div>
        <t-image
          ref="previewImageRef"
          src="https://i.postimg.cc/MH2bbtCJ/77.webp"
          width="300px"
          height="200px"
          :preview-src-list="previewImages"
          :initial-index="0"
          :close-on-press-escape="true"
          @show="handleShow"
          @close="handleClose"
        />
      </div>
      
      <div class="button-container">
        <button class="preview-button" @click="handlePreviewClick">Manual Preview</button>
      </div>
    </div>
    
    <div class="description">
      <h4>Preview Features</h4>
      <ul>
        <li>Click image to view large preview</li>
        <li>Support ESC key to close preview</li>
        <li>Support keyboard arrow keys to switch images</li>
        <li>Support mouse wheel to zoom</li>
        <li>Support drag to view images</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


// Preview image list
const previewImages = [
  "https://i.postimg.cc/MH2bbtCJ/77.webp",
  "https://i.postimg.cc/43y5JY6q/8.webp",
  "https://i.postimg.cc/C5k7W9GK/1.webp"
];

// Image preview ref
const previewImageRef = ref();

// Handle preview show
const handleShow = () => {
  console.log("Preview shown");
};

// Handle preview close
const handleClose = () => {
  console.log("Preview closed");
};

// Manually show preview
const handlePreviewClick = () => {
  previewImageRef.value?.showPreview();
};
</script>

<style scoped>
.image-demo {
  width: 100%;
}

.preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.preview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.preview-title {
  font-size: 16px;
  color: #303133;
  font-weight: 500;
}

.button-container {
  margin-top: 10px;
}

.preview-button {
  padding: 8px 16px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.preview-button:hover {
  background-color: #66b1ff;
}

.description {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
}

.description h4 {
  font-size: 16px;
  color: #303133;
  margin-top: 0;
  margin-bottom: 12px;
}

.description ul {
  margin: 0;
  padding-left: 20px;
  color: #606266;
}

.description li {
  margin-bottom: 8px;
  line-height: 1.5;
}
</style> 