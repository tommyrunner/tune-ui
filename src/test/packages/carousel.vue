<template>
  <div class="test-container">
    <h2>Carousel 轮播组件</h2>

    <!-- 基础配置 -->
    <test-section title="基础配置">
      <div class="carousel-group">
        <div class="carousel-item-box">
          <div class="carousel-label">自定义尺寸：</div>
          <t-carousel-group :width="400" :height="250">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
        <div class="carousel-item-box">
          <div class="carousel-label">初始下标：</div>
          <t-carousel-group :initIndex="2">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
      </div>
    </test-section>

    <!-- 自动播放 -->
    <test-section title="自动播放">
      <div class="carousel-group">
        <div class="carousel-item-box">
          <div class="carousel-label">自动播放(2s)：</div>
          <t-carousel-group :autoplay="true" :delay="2000">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
        <div class="carousel-item-box">
          <div class="carousel-label">反向播放：</div>
          <t-carousel-group :autoplay="true" :autoplayBack="true">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
        <div class="carousel-item-box">
          <div class="carousel-label">悬停暂停：</div>
          <t-carousel-group :autoplay="true" :pauseOnHover="true">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
      </div>
    </test-section>

    <!-- 切换效果 -->
    <test-section title="切换效果">
      <div class="carousel-group">
        <!-- 动画效果 -->
        <div class="carousel-item-box">
          <div class="carousel-label">无动画：</div>
          <t-carousel-group :animation="false">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
        <div class="carousel-item-box">
          <div class="carousel-label">有动画：</div>
          <t-carousel-group :animation="true">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>

        <!-- 切换模式 -->
        <div class="carousel-item-box">
          <div class="carousel-label">视觉差：</div>
          <t-carousel-group toggle="vision">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
        <div class="carousel-item-box">
          <div class="carousel-label">重复：</div>
          <t-carousel-group toggle="repeat">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
        <div class="carousel-item-box">
          <div class="carousel-label">反复：</div>
          <t-carousel-group toggle="repeatedly">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
        <div class="carousel-item-box">
          <div class="carousel-label">不循环：</div>
          <t-carousel-group toggle="none">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
      </div>
    </test-section>

    <!-- 指示器 -->
    <test-section title="指示器">
      <div class="carousel-group">
        <div class="carousel-item-box">
          <div class="carousel-label">悬停触发：</div>
          <t-carousel-group trigger="hover">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
        <div class="carousel-item-box">
          <div class="carousel-label">点击触发：</div>
          <t-carousel-group trigger="click">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
        <div class="carousel-item-box">
          <div class="carousel-label">不显示：</div>
          <t-carousel-group trigger="none">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
      </div>
    </test-section>

    <!-- 切换箭头 -->
    <test-section title="切换箭头">
      <div class="carousel-group">
        <div class="carousel-item-box">
          <div class="carousel-label">总是显示：</div>
          <t-carousel-group arrow="always">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
        <div class="carousel-item-box">
          <div class="carousel-label">悬停显示：</div>
          <t-carousel-group arrow="hover">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
        <div class="carousel-item-box">
          <div class="carousel-label">不显示：</div>
          <t-carousel-group arrow="none">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
      </div>
    </test-section>

    <!-- 切换方向 -->
    <test-section title="切换方向">
      <div class="carousel-group">
        <div class="carousel-item-box">
          <div class="carousel-label">水平方向：</div>
          <t-carousel-group direction="horizontal">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
        <div class="carousel-item-box">
          <div class="carousel-label">垂直方向：</div>
          <t-carousel-group direction="vertical">
            <t-carousel v-for="item in 4" :key="item">
              <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
            </t-carousel>
          </t-carousel-group>
        </div>
      </div>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-carousel-group @change="handleChange" @autoplay="handleAutoplay">
        <t-carousel v-for="item in 4" :key="item">
          <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
        </t-carousel>
      </t-carousel-group>
      <div class="event-log">
        <div class="event-title">事件记录:</div>
        <div v-for="(event, index) in eventLogs" :key="index" class="event-item">{{ event }}</div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TCarousel, TCarouselGroup } from "@/packages/carousel";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "CarouselTest" });

// 测试数据
const colors = ["#67C23A", "#E6A23C", "#F56C6C", "#909399"];
const eventLogs = ref<string[]>([]);

/**
 * 处理切换事件
 */
const handleChange = (index?: number) => {
  eventLogs.value.unshift(`切换到: ${index}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

/**
 * 处理自动播放事件
 */
const handleAutoplay = (index?: number) => {
  eventLogs.value.unshift(`自动播放到: ${index}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
  }

  .carousel-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .carousel-item-box {
    display: flex;
    align-items: center;
    gap: 12px;

    .carousel-label {
      min-width: 100px;
      color: #666;
    }
  }

  .carousel-item {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
  }

  .event-log {
    margin-top: 16px;
    padding: 12px;
    background-color: #f9fafb;
    border-radius: 4px;

    .event-title {
      margin-bottom: 8px;
      font-weight: 500;
      color: #374151;
    }

    .event-item {
      padding: 4px 0;
      color: #666;
      font-size: 14px;
      font-family: monospace;
    }
  }
}
</style>
