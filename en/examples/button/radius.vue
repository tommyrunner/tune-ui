<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button radius="default">Default Radius</t-button>
      <t-button radius="round">Round Button</t-button>
      <t-button radius="circle" prefixIcon="search"></t-button>
    </div>
    <div class="button-row">
      <t-button type="primary" radius="default">Default Radius</t-button>
      <t-button type="primary" radius="round">Round Button</t-button>
      <t-button type="primary" radius="circle" prefixIcon="edit"></t-button>
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
