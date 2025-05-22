<template>
  <div class="image-demo">
    <div class="preview-container">
      <div class="preview-item">
        <div class="preview-title">点击查看大图</div>
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
        <button class="preview-button" @click="handlePreviewClick">手动预览</button>
      </div>
    </div>
    
    <div class="description">
      <h4>预览功能特点</h4>
      <ul>
        <li>点击图片可查看大图预览</li>
        <li>支持按ESC关闭预览</li>
        <li>支持键盘方向键切换图片</li>
        <li>支持鼠标滚轮缩放</li>
        <li>支持拖拽查看图片</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


// 预览图片列表
const previewImages = [
  "https://i.postimg.cc/MH2bbtCJ/77.webp",
  "https://i.postimg.cc/43y5JY6q/8.webp",
  "https://i.postimg.cc/C5k7W9GK/1.webp"
];

// 图片预览ref
const previewImageRef = ref();

// 处理预览显示
const handleShow = () => {
  console.log("预览显示");
};

// 处理预览关闭
const handleClose = () => {
  console.log("预览关闭");
};

// 手动显示预览
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