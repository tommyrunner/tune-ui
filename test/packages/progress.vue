<template>
  <div class="test-container">
    <h2>Progress 进度条组件</h2>

    <!-- 基础线性进度条 -->
    <test-section title="基础线性进度条">
      <div class="progress-row">
        <t-progress :percentage="0"></t-progress>
      </div>
      <div class="progress-row">
        <t-progress :percentage="25"></t-progress>
      </div>
      <div class="progress-row">
        <t-progress :percentage="50"></t-progress>
      </div>
      <div class="progress-row">
        <t-progress :percentage="75"></t-progress>
      </div>
      <div class="progress-row">
        <t-progress :percentage="100"></t-progress>
      </div>
    </test-section>

    <!-- 进度条状态 -->
    <test-section title="进度条状态">
      <div class="progress-row">
        <t-progress :percentage="50"></t-progress>
      </div>
      <div class="progress-row">
        <t-progress :percentage="100" status="success"></t-progress>
      </div>
      <div class="progress-row">
        <t-progress :percentage="50" status="warning"></t-progress>
      </div>
      <div class="progress-row">
        <t-progress :percentage="50" status="exception"></t-progress>
      </div>
    </test-section>

    <!-- 文本内显 -->
    <test-section title="文本内显">
      <div class="progress-row">
        <t-progress :percentage="50" text-inside :stroke-width="18"></t-progress>
      </div>
      <div class="progress-row">
        <t-progress :percentage="100" text-inside status="success" :stroke-width="18"></t-progress>
      </div>
      <div class="progress-row">
        <t-progress :percentage="50" text-inside status="warning" :stroke-width="18"></t-progress>
      </div>
      <div class="progress-row">
        <t-progress :percentage="50" text-inside status="exception" :stroke-width="18"></t-progress>
      </div>
    </test-section>

    <!-- 自定义颜色 -->
    <test-section title="自定义颜色">
      <div class="progress-row">
        <t-progress :percentage="percentage" color="#8e44ad"></t-progress>
      </div>
      <div class="progress-row">
        <t-progress :percentage="percentage" color="#1abc9c"></t-progress>
      </div>
      <!-- 颜色区间 -->
      <div class="progress-row">
        <t-progress
          :percentage="percentage"
          :color="[
            { color: '#f56c6c', percentage: 20 },
            { color: '#e6a23c', percentage: 40 },
            { color: '#5cb87a', percentage: 60 },
            { color: '#1989fa', percentage: 80 },
            { color: '#6f7ad3', percentage: 100 }
          ]"
        ></t-progress>
      </div>
      <!-- 函数确定颜色 -->
      <div class="progress-row">
        <t-progress :percentage="percentage" :color="customColorMethod"></t-progress>
      </div>
      <div class="progress-controls">
        <t-button @click="decrease">-</t-button>
        <t-button @click="increase">+</t-button>
      </div>
    </test-section>

    <!-- 条纹效果 -->
    <test-section title="条纹效果">
      <div class="progress-row">
        <t-progress :percentage="50" striped></t-progress>
      </div>
      <div class="progress-row">
        <t-progress :percentage="100" striped striped-flow></t-progress>
      </div>
    </test-section>

    <!-- 线性进度条全属性测试 -->
    <test-section title="线性进度条全属性测试">
      <div class="progress-row">
        <div class="attribute-label">stroke-width: 12</div>
        <t-progress :percentage="50" :stroke-width="12"></t-progress>
      </div>
      <div class="progress-row">
        <div class="attribute-label">stroke-linecap: square</div>
        <t-progress :percentage="50" stroke-linecap="square"></t-progress>
      </div>
      <div class="progress-row">
        <div class="attribute-label">show-text: false</div>
        <t-progress :percentage="50" :show-text="false"></t-progress>
      </div>
      <div class="progress-row">
        <div class="attribute-label">全部组合：线性动画进度条</div>
        <t-progress
          :percentage="linearPercentage"
          :stroke-width="8"
          stroke-linecap="round"
          status="success"
          color="#1abc9c"
          text-inside
        ></t-progress>
        <div class="progress-controls">
          <t-button @click="startLinearProgress">开始动画</t-button>
          <t-button @click="resetLinearProgress">重置</t-button>
          <t-button @click="stopLinearProgress">停止</t-button>
        </div>
      </div>
    </test-section>

    <!-- 不确定进度 -->
    <test-section title="不确定进度">
      <div class="progress-row">
        <t-progress :percentage="50" indeterminate></t-progress>
      </div>
      <div class="progress-row">
        <t-progress :percentage="50" indeterminate :duration="5"></t-progress>
      </div>
    </test-section>

    <!-- 环形进度条 -->
    <test-section title="环形进度条">
      <div class="progress-circle-container">
        <div class="progress-circle-item">
          <t-progress :percentage="25" type="circle"></t-progress>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="50" type="circle"></t-progress>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="75" type="circle" status="success"></t-progress>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="100" type="circle" status="warning"></t-progress>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="50" type="circle" status="exception"></t-progress>
        </div>
      </div>
    </test-section>

    <!-- 环形进度条全属性测试 -->
    <test-section title="环形进度条全属性测试">
      <div class="progress-circle-container">
        <div class="progress-circle-item">
          <t-progress :percentage="50" type="circle" :stroke-width="3"></t-progress>
          <div class="attribute-label">stroke-width: 3</div>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="50" type="circle" stroke-linecap="square"></t-progress>
          <div class="attribute-label">stroke-linecap: square</div>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="50" type="circle" :show-text="false"></t-progress>
          <div class="attribute-label">show-text: false</div>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="circlePercentage" type="circle" color="#8e44ad"></t-progress>
          <div class="percentage-label">{{ circlePercentage }}%</div>
        </div>
        <div class="progress-controls circle-controls">
          <t-button @click="startCircleProgress">开始动画</t-button>
          <t-button @click="resetCircleProgress">重置</t-button>
          <t-button @click="stopCircleProgress">停止</t-button>
        </div>
      </div>

      <!-- 组合属性测试 -->
      <div class="progress-circle-container" style="margin-top: 20px">
        <div class="progress-circle-item">
          <t-progress
            :percentage="75"
            type="circle"
            :stroke-width="10"
            stroke-linecap="butt"
            status="warning"
            :width="150"
          ></t-progress>
          <div class="attribute-label">组合属性</div>
        </div>
      </div>
    </test-section>

    <!-- 仪表盘进度条 -->
    <test-section title="仪表盘进度条">
      <div class="progress-circle-container">
        <div class="progress-circle-item">
          <t-progress :percentage="25" type="dashboard"></t-progress>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="75" type="dashboard"></t-progress>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="100" type="dashboard" status="success"></t-progress>
        </div>
      </div>
    </test-section>

    <!-- 仪表盘进度条动态效果 -->
    <test-section title="仪表盘进度条动态效果">
      <div class="progress-circle-container">
        <div class="progress-circle-item">
          <t-progress :percentage="dashboardPercentage" type="dashboard"></t-progress>
          <div class="percentage-label">{{ dashboardPercentage }}%</div>
        </div>

        <div class="progress-controls dashboard-controls">
          <t-button @click="startDashboardProgress">开始动画</t-button>
          <t-button @click="resetDashboardProgress">重置</t-button>
          <t-button @click="stopDashboardProgress">停止</t-button>
        </div>
      </div>
    </test-section>

    <!-- 仪表盘不同粗细 -->
    <test-section title="仪表盘不同粗细">
      <div class="progress-circle-container">
        <div class="progress-circle-item">
          <t-progress :percentage="50" type="dashboard" :stroke-width="3"></t-progress>
          <div class="attribute-label">stroke-width: 3</div>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="50" type="dashboard" :stroke-width="6"></t-progress>
          <div class="attribute-label">stroke-width: 6</div>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="50" type="dashboard" :stroke-width="10"></t-progress>
          <div class="attribute-label">stroke-width: 10</div>
        </div>
      </div>
    </test-section>

    <!-- 自定义尺寸 -->
    <test-section title="自定义尺寸">
      <div class="progress-circle-container">
        <div class="progress-circle-item">
          <t-progress :percentage="75" type="circle" :width="80"></t-progress>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="75" type="circle" :width="120"></t-progress>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="75" type="circle" :width="160"></t-progress>
        </div>
      </div>
    </test-section>

    <!-- 自定义文本 -->
    <test-section title="自定义文本格式">
      <div class="progress-row">
        <t-progress :percentage="50" :format="formatText"></t-progress>
      </div>
      <div class="progress-circle-container">
        <div class="progress-circle-item">
          <t-progress :percentage="50" type="circle" :format="formatText"></t-progress>
        </div>
        <div class="progress-circle-item">
          <t-progress :percentage="50" type="dashboard" :format="formatText"></t-progress>
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from "vue";
import { TProgress } from "@/packages/progress";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "ProgressTest" });

// 可变进度百分比
const percentage = ref(50);

// 增加进度
const increase = () => {
  percentage.value = Math.min(100, percentage.value + 10);
};

// 减少进度
const decrease = () => {
  percentage.value = Math.max(0, percentage.value - 10);
};

// 自定义颜色方法
const customColorMethod = (percentage: number) => {
  if (percentage < 30) {
    return "#f56c6c";
  } else if (percentage < 70) {
    return "#e6a23c";
  } else {
    return "#5cb87a";
  }
};

// 自定义文本格式化
const formatText = (percentage: number) => {
  return percentage < 100 ? `进度: ${percentage}%` : "完成!";
};

// 仪表盘进度条相关
const dashboardPercentage = ref(0);
let dashboardIntervalId: ReturnType<typeof setInterval> | null = null;

// 开始仪表盘进度动画
const startDashboardProgress = () => {
  stopDashboardProgress();

  dashboardIntervalId = setInterval(() => {
    if (dashboardPercentage.value < 100) {
      dashboardPercentage.value += 1;
    } else {
      stopDashboardProgress();
    }
  }, 100);
};

// 重置仪表盘进度
const resetDashboardProgress = () => {
  stopDashboardProgress();
  dashboardPercentage.value = 0;
};

// 停止仪表盘进度动画
const stopDashboardProgress = () => {
  if (dashboardIntervalId) {
    clearInterval(dashboardIntervalId);
    dashboardIntervalId = null;
  }
};

// 线性进度条相关
const linearPercentage = ref(0);
let linearIntervalId: ReturnType<typeof setInterval> | null = null;

// 开始线性进度动画
const startLinearProgress = () => {
  stopLinearProgress();

  linearIntervalId = setInterval(() => {
    if (linearPercentage.value < 100) {
      linearPercentage.value += 1;
    } else {
      stopLinearProgress();
    }
  }, 100);
};

// 重置线性进度
const resetLinearProgress = () => {
  stopLinearProgress();
  linearPercentage.value = 0;
};

// 停止线性进度动画
const stopLinearProgress = () => {
  if (linearIntervalId) {
    clearInterval(linearIntervalId);
    linearIntervalId = null;
  }
};

// 环形进度条相关
const circlePercentage = ref(0);
let circleIntervalId: ReturnType<typeof setInterval> | null = null;

// 开始环形进度动画
const startCircleProgress = () => {
  stopCircleProgress();

  circleIntervalId = setInterval(() => {
    if (circlePercentage.value < 100) {
      circlePercentage.value += 1;
    } else {
      stopCircleProgress();
    }
  }, 100);
};

// 重置环形进度
const resetCircleProgress = () => {
  stopCircleProgress();
  circlePercentage.value = 0;
};

// 停止环形进度动画
const stopCircleProgress = () => {
  if (circleIntervalId) {
    clearInterval(circleIntervalId);
    circleIntervalId = null;
  }
};

// 组件卸载时清除计时器
onUnmounted(() => {
  stopDashboardProgress();
  stopLinearProgress();
  stopCircleProgress();
});
</script>

<style lang="scss" scoped>
.test-container {
  padding: 24px;

  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 12px;
  }

  .progress-row {
    margin-bottom: 15px;
    width: 350px;
  }

  .progress-controls {
    display: flex;
    gap: 10px;
    margin-top: 10px;

    &.dashboard-controls {
      margin-left: 20px;
    }
  }

  .progress-circle-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .progress-circle-item {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .percentage-label,
    .attribute-label {
      margin-top: 5px;
      font-size: 14px;
      color: #666;
    }

    .attribute-label {
      font-family: monospace;
      background-color: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
    }
  }

  :deep(.test-section) {
    margin-bottom: 30px;
  }
}
</style>
