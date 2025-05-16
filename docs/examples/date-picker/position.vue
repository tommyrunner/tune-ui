<template>
  <div class="example-container">
    <div class="positions-container">
      <div class="position-row">
        <p>面板位置控制：</p>
      </div>

      <div class="position-row">
        <div class="position-item">
          <p>上方弹出：</p>
          <t-date-picker v-model="topPosition" position="top" placeholder="上方弹出" />
        </div>

        <div class="position-item">
          <p>右侧弹出：</p>
          <t-date-picker v-model="rightPosition" position="right" placeholder="右侧弹出" />
        </div>
      </div>

      <div class="position-row">
        <div class="position-item">
          <p>下方弹出（默认）：</p>
          <t-date-picker v-model="bottomPosition" position="bottom" placeholder="下方弹出" />
        </div>

        <div class="position-item">
          <p>左侧弹出：</p>
          <t-date-picker v-model="leftPosition" position="left" placeholder="左侧弹出" />
        </div>
      </div>

      <div class="position-row tips">
        <div class="tip-box">
          <p class="tip-title">提示：</p>
          <p>1. 可以通过 position 属性控制日期选择器面板的弹出位置</p>
          <p>2. 当空间不足时，会自动调整到合适的位置</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TDatePicker } from "tune-ui";

// 位置示例数据
const topPosition = ref(null);
const rightPosition = ref(null);
const bottomPosition = ref(null);
const leftPosition = ref(null);
</script>

<style lang="scss" scoped>
.example-container {
  width: 100%;
}

.positions-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.position-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  p {
    margin-bottom: 8px;
    font-weight: 500;
  }

  &.tips {
    margin-top: 12px;
  }
}

.position-item {
  flex: 1;
  min-width: 250px;
}

.tip-box {
  width: 100%;
  padding: 12px 16px;
  background-color: #f0f9ff;
  border-left: 4px solid #409eff;
  border-radius: 4px;

  p {
    margin: 0 0 6px;
    font-weight: normal;
    color: #606266;
    font-size: 14px;

    &.tip-title {
      font-weight: 500;
      color: #409eff;
      margin-bottom: 8px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
