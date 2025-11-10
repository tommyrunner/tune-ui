<template>
  <div class="example-container">
    <div class="positions-container">
      <div class="position-row">
        <p>Panel Position Control:</p>
      </div>

      <div class="position-row">
        <div class="position-item">
          <p>Top Popup:</p>
          <t-date-picker v-model="topPosition" position="top" placeholder="Top popup" />
        </div>

        <div class="position-item">
          <p>Right Popup:</p>
          <t-date-picker v-model="rightPosition" position="right" placeholder="Right popup" />
        </div>
      </div>

      <div class="position-row">
        <div class="position-item">
          <p>Bottom Popup (Default):</p>
          <t-date-picker v-model="bottomPosition" position="bottom" placeholder="Bottom popup" />
        </div>

        <div class="position-item">
          <p>Left Popup:</p>
          <t-date-picker v-model="leftPosition" position="left" placeholder="Left popup" />
        </div>
      </div>

      <div class="position-row tips">
        <div class="tip-box">
          <p class="tip-title">Tips:</p>
          <p>1. You can control the popup position of the date picker panel through the position attribute</p>
          <p>2. When there is insufficient space, it will automatically adjust to a suitable position</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// Position example data
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
