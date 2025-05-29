<template>
  <div class="button-demo">
    <!-- Basic type buttons -->
    <div class="button-row">
      <t-button>Default Button</t-button>
      <t-button type="primary">Primary Button</t-button>
      <t-button type="success">Success Button</t-button>
      <t-button type="info">Info Button</t-button>
      <t-button type="warning">Warning Button</t-button>
      <t-button type="danger">Danger Button</t-button>
      <t-button type="text">Text Button</t-button>
    </div>
  </div>
</template>

<style scoped>
.button-demo {
  padding: 16px 0;
}
.button-row {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
