<template>
  <div class="demo-container">
    <p class="demo-desc">The message component provides four different types for feedback in different scenarios.</p>

    <div class="demo-block">
      <t-button type="info" @click="showInfoMessage">Info Message</t-button>
      <t-button type="success" @click="showSuccessMessage">Success Message</t-button>
      <t-button type="warning" @click="showWarningMessage">Warning Message</t-button>
      <t-button type="danger" @click="showDangerMessage">Error Message</t-button>
    </div>
  </div>
</template>

<script setup>
/**
 * Show info message
 */
const showInfoMessage = () => {
  TMessage.message("This is an info message", "info");
};

/**
 * Show success message
 */
const showSuccessMessage = () => {
  TMessage.message("This is a success message", "success");
};

/**
 * Show warning message
 */
const showWarningMessage = () => {
  TMessage.message("This is a warning message", "warning");
};

/**
 * Show error message
 */
const showDangerMessage = () => {
  TMessage.message("This is an error message", "danger");
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
