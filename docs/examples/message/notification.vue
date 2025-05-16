<template>
  <div class="demo-container">
    <p class="demo-desc">消息通知支持四个方向的弹出，适用于需要更强提示效果的场景。</p>
    
    <div class="demo-block">
      <div class="position-section">
        <h4>弹出位置</h4>
        <div class="button-group">
          <t-button type="success" @click="showNotice('topRight')">右上角</t-button>
          <t-button type="success" @click="showNotice('bottomRight')">右下角</t-button>
          <t-button type="success" @click="showNotice('bottomLeft')">左下角</t-button>
          <t-button type="success" @click="showNotice('topLeft')">左上角</t-button>
        </div>
      </div>
      
      <div class="type-section">
        <h4>通知类型</h4>
        <div class="button-group">
          <t-button type="info" @click="showNoticeType('info')">信息通知</t-button>
          <t-button type="success" @click="showNoticeType('success')">成功通知</t-button>
          <t-button type="warning" @click="showNoticeType('warning')">警告通知</t-button>
          <t-button type="danger" @click="showNoticeType('danger')">错误通知</t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TNotification, TButton } from "tune-ui";

/**
 * 显示不同位置的通知
 */
const showNotice = position => {
  TNotification.message("通知消息", `这是一条显示在${getPositionName(position)}的通知消息`, "info", {
    position,
    isClose: true
  });
};

/**
 * 显示不同类型的通知
 */
const showNoticeType = type => {
  TNotification.message(`${getTypeName(type)}通知`, `这是一条${getTypeName(type)}类型的通知消息`, type, {
    isClose: true
  });
};

/**
 * 获取位置名称
 */
const getPositionName = position => {
  const map = {
    topRight: "右上角",
    bottomRight: "右下角",
    bottomLeft: "左下角",
    topLeft: "左上角"
  };
  return map[position] || "默认位置";
};

/**
 * 获取类型名称
 */
const getTypeName = type => {
  const map = {
    info: "信息",
    success: "成功",
    warning: "警告",
    danger: "错误"
  };
  return map[type] || "默认";
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
  flex-direction: column;
  gap: 24px;
}

.position-section,
.type-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h4 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style> 