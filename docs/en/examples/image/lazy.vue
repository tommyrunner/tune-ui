<template>
  <div class="image-demo">
    <div class="description">
      <p>Scroll the container to see lazy loading effect (images load only when scrolled into view)</p>
    </div>
    
    <div class="lazy-container">
      <div v-for="(src, index) in lazyImages" :key="index" class="lazy-item">
        <div class="lazy-number">Image {{ index + 1 }}</div>
        <t-image
          :src="src"
          lazy
          width="300px"
          height="200px"
        />
      </div>
    </div>
  </div>
</template>

<script setup>


// Lazy loading image list
const lazyImages = [
  "https://i.postimg.cc/C5k7W9GK/1.webp",
  "https://i.postimg.cc/43y5JY6q/8.webp",
  "https://i.postimg.cc/MH2bbtCJ/77.webp",
  "https://i.postimg.cc/C5k7W9GK/1.webp",
  "https://i.postimg.cc/43y5JY6q/8.webp",
  "https://i.postimg.cc/MH2bbtCJ/77.webp"
];
</script>

<style scoped>
.image-demo {
  width: 100%;
}

.description {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #ecf8ff;
  border-radius: 4px;
  color: #409eff;
  line-height: 1.5;
}

.lazy-container {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 20px;
}

.lazy-item {
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lazy-number {
  margin-bottom: 10px;
  font-size: 14px;
  color: #606266;
}
</style> 