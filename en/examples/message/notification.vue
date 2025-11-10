<template>
  <div class="demo-container">
    <p class="demo-desc">
      Message notification supports popup in four directions, suitable for scenarios that require stronger prompt effects.
    </p>

    <div class="demo-block">
      <div class="position-section">
        <h4>Popup Position</h4>
        <div class="button-group">
          <t-button type="success" @click="showNotice('topRight')">Top Right</t-button>
          <t-button type="success" @click="showNotice('bottomRight')">Bottom Right</t-button>
          <t-button type="success" @click="showNotice('bottomLeft')">Bottom Left</t-button>
          <t-button type="success" @click="showNotice('topLeft')">Top Left</t-button>
        </div>
      </div>

      <div class="type-section">
        <h4>Notification Type</h4>
        <div class="button-group">
          <t-button type="info" @click="showNoticeType('info')">Info Notification</t-button>
          <t-button type="success" @click="showNoticeType('success')">Success Notification</t-button>
          <t-button type="warning" @click="showNoticeType('warning')">Warning Notification</t-button>
          <t-button type="danger" @click="showNoticeType('danger')">Error Notification</t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Show notifications in different positions
 */
const showNotice = position => {
  TNotification.message(
    "Notification Message",
    `This is a notification message displayed at ${getPositionName(position)}`,
    "info",
    {
      position,
      isClose: true
    }
  );
};

/**
 * Show notifications of different types
 */
const showNoticeType = type => {
  TNotification.message(`${getTypeName(type)} Notification`, `This is a ${getTypeName(type)} type notification message`, type, {
    isClose: true
  });
};

/**
 * Get position name
 */
const getPositionName = position => {
  const map = {
    topRight: "top right",
    bottomRight: "bottom right",
    bottomLeft: "bottom left",
    topLeft: "top left"
  };
  return map[position] || "default position";
};

/**
 * Get type name
 */
const getTypeName = type => {
  const map = {
    info: "info",
    success: "success",
    warning: "warning",
    danger: "error"
  };
  return map[type] || "default";
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