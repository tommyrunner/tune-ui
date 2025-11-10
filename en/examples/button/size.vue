<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button size="small">Small Button</t-button>
      <t-button>Default Button</t-button>
      <t-button size="large">Large Button</t-button>
    </div>
    <div class="button-row">
      <t-button size="small" type="primary">Small Button</t-button>
      <t-button type="primary">Default Button</t-button>
      <t-button size="large" type="primary">Large Button</t-button>
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
  align-items: center;
}
</style>
