<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button disabled>Disabled Button</t-button>
      <t-button type="primary" disabled>Disabled Primary</t-button>
      <t-button type="success" disabled>Disabled Success</t-button>
      <t-button type="info" disabled>Disabled Info</t-button>
      <t-button type="warning" disabled>Disabled Warning</t-button>
      <t-button type="danger" disabled>Disabled Danger</t-button>
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
