<template>
  <div class="demo-container">
    <p class="demo-desc">
      The popover component supports both hover and click trigger methods, you can choose the appropriate interaction method based
      on actual needs.
    </p>

    <div class="demo-block">
      <t-popover content="This is a basic popover triggered by hover">
        <t-button type="primary">Hover Trigger</t-button>
      </t-popover>

      <t-popover content="This is a popover triggered by click" type="click">
        <t-button type="success">Click Trigger</t-button>
      </t-popover>

      <t-popover content="Popover will not trigger when disabled" disabled>
        <t-button type="info">Disabled State</t-button>
      </t-popover>
    </div>
  </div>
</template>

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
