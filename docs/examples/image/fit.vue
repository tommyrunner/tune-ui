<template>
  <div class="image-demo">
    <div class="fit-container">
      <div v-for="fit in fitTypes" :key="fit" class="fit-item">
        <span class="fit-title">{{ fit }}</span>
        <t-image 
          src="https://i.postimg.cc/C5k7W9GK/1.webp" 
          :fit="fit" 
          width="150px" 
          height="150px"
          class="fit-image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>


// 图片适应类型
const fitTypes = ["fill", "contain", "cover", "none", "scale-down"];
</script>

<style scoped>
.image-demo {
  width: 100%;
}

.fit-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.fit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.fit-title {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.fit-image {
  border: 1px solid #e4e7ed;
  background-color: #f5f7fa;
  border-radius: 4px;
}
</style> 