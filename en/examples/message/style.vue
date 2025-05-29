<template>
  <div class="demo-container">
    <p class="demo-desc">The message component supports custom styles, such as width, padding, icon and plain style.</p>
    
    <div class="demo-block">
      <t-button type="primary" @click="showWidthMessage">Custom Width</t-button>
      <t-button type="primary" @click="showPaddingMessage">Custom Padding</t-button>
      <t-button type="primary" @click="showIconMessage">Custom Icon</t-button>
      <t-button type="primary" @click="showPlainMessage">Plain Style</t-button>
      <t-button type="primary" @click="showMaxLengthMessage">Max Count Limit</t-button>
    </div>
  </div>
</template>

<script setup>

/**
 * Show custom width message
 */
const showWidthMessage = () => {
  TMessage.message("This is a custom width message, width set to 400px", "info", {
    width: "400px"
  });
};

/**
 * Show custom padding message
 */
const showPaddingMessage = () => {
  TMessage.message("This is a custom padding message with larger padding", "info", {
    padding: [16, 24, 16, 24],
    radius: [8, 8, 8, 8]
  });
};

/**
 * Show custom icon message
 */
const showIconMessage = () => {
  TMessage.message("This is a custom icon message", "info", {
    icon: "information"
  });
};

/**
 * Show plain style message
 */
const showPlainMessage = () => {
  TMessage.message("This is a plain style success message", "success", {
    plain: true
  });
};

/**
 * Show max count message
 */
const showMaxLengthMessage = () => {
  for (let i = 0; i < 3; i++) {
    TMessage.message(`This is message ${i + 1}, max display 2 messages`, "info", {
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