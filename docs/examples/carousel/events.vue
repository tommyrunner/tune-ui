<template>
  <div class="carousel-demo">
    <t-carousel-group @change="handleChange" @autoplay="handleAutoplay">
      <t-carousel v-for="item in 4" :key="item">
        <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
      </t-carousel>
    </t-carousel-group>

    <div class="event-log">
      <div class="event-title">事件记录:</div>
      <div v-for="(event, index) in eventLogs" :key="index" class="event-item">{{ event }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TCarousel, TCarouselGroup } from "tune-ui";

// 测试数据
const colors = ["#67C23A", "#E6A23C", "#F56C6C", "#909399"];
const eventLogs = ref([]);

/**
 * 处理切换事件
 */
const handleChange = index => {
  eventLogs.value.unshift(`切换到: ${index}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

/**
 * 处理自动播放事件
 */
const handleAutoplay = index => {
  eventLogs.value.unshift(`自动播放到: ${index}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};
</script>

<style scoped>
.carousel-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.event-log {
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.event-title {
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
}

.event-item {
  padding: 4px 0;
  color: #6b7280;
  font-family: monospace;
}

.carousel-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
</style>
