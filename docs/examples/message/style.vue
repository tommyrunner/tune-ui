<template>
  <div class="demo-container">
    <p class="demo-desc">消息提示组件支持自定义样式，如宽度、内边距、图标和朴素样式。</p>
    
    <div class="demo-block">
      <t-button type="primary" @click="showWidthMessage">自定义宽度</t-button>
      <t-button type="primary" @click="showPaddingMessage">自定义内边距</t-button>
      <t-button type="primary" @click="showIconMessage">自定义图标</t-button>
      <t-button type="primary" @click="showPlainMessage">朴素样式</t-button>
      <t-button type="primary" @click="showMaxLengthMessage">最大数量限制</t-button>
    </div>
  </div>
</template>

<script setup>
import { TMessage, TButton } from "tune-ui";

/**
 * 显示自定义宽度消息
 */
const showWidthMessage = () => {
  TMessage.message("这是一条自定义宽度的消息，宽度设置为400px", "info", {
    width: "400px"
  });
};

/**
 * 显示自定义内边距消息
 */
const showPaddingMessage = () => {
  TMessage.message("这是一条自定义内边距的消息，内边距更大", "info", {
    padding: [16, 24, 16, 24],
    radius: [8, 8, 8, 8]
  });
};

/**
 * 显示自定义图标消息
 */
const showIconMessage = () => {
  TMessage.message("这是一条自定义图标的消息", "info", {
    icon: "information"
  });
};

/**
 * 显示朴素样式消息
 */
const showPlainMessage = () => {
  TMessage.message("这是一条朴素样式的成功消息", "success", {
    plain: true
  });
};

/**
 * 显示最大数量消息
 */
const showMaxLengthMessage = () => {
  for (let i = 0; i < 3; i++) {
    TMessage.message(`这是第 ${i + 1} 条消息，最多显示2条`, "info", {
      maxLength: 2
    });
  }
};
</script>

<style scoped>
.demo-container {
  padding: 16px 0;
}

.demo-desc {
  margin: 0 0 16px;
  color: #606266;
  line-height: 1.6;
}

.demo-block {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style> 