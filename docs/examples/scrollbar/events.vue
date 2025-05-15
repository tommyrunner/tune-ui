<template>
  <div class="example-container">
    <div class="scrollbar-section">
      <h4>垂直滚动事件</h4>
      <t-scrollbar @scroll-y="handleScrollY">
        <div class="scrollbar-content vertical">
          <p v-for="item in 20" :key="item" class="scrollbar-item">{{ item }}. 垂直滚动示例</p>
        </div>
      </t-scrollbar>
      <div class="event-info">垂直滚动位置: {{ scrollYPosition }}px</div>
    </div>

    <div class="scrollbar-section">
      <h4>水平滚动事件</h4>
      <t-scrollbar @scroll-x="handleScrollX">
        <div class="scrollbar-content horizontal">
          <div class="horizontal-wrapper">
            <div v-for="item in 20" :key="item" class="horizontal-item">{{ item }}. 水平滚动示例</div>
          </div>
        </div>
      </t-scrollbar>
      <div class="event-info">水平滚动位置: {{ scrollXPosition }}px</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TScrollbar } from "tune-ui";

const scrollYPosition = ref(0);
const scrollXPosition = ref(0);

const handleScrollY = (element: HTMLElement) => {
  scrollYPosition.value = element.scrollTop;
};

const handleScrollX = (element: HTMLElement) => {
  scrollXPosition.value = element.scrollLeft;
};
</script>

<style scoped>
.example-container {
  width: 100%;
}

.scrollbar-section {
  margin-bottom: 20px;
}

h4 {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
}

.scrollbar-content {
  padding: 10px;
}

.scrollbar-content.vertical {
  height: 300px;
}

.scrollbar-item {
  padding: 10px;
  margin-bottom: 10px;
  background: #f6f8fa;
  border-radius: 4px;
}

.horizontal-wrapper {
  display: flex;
  width: 1500px;
}

.horizontal-item {
  flex: 0 0 auto;
  width: 200px;
  height: 100px;
  margin-right: 10px;
  padding: 10px;
  background: #f6f8fa;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.event-info {
  margin-top: 10px;
  padding: 8px 12px;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 14px;
  color: #4b5563;
}
</style>
