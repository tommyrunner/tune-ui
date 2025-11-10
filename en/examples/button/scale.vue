<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button scale>Default Scale</t-button>
      <t-button :scale="false">Disable Scale</t-button>
    </div>
    <div class="button-row">
      <t-button type="primary" scale>Default Scale</t-button>
      <t-button type="primary" :scale="false">Disable Scale</t-button>
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
