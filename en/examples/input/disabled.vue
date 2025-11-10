<template>
  <div class="input-demo">
    <t-input placeholder="Normal state" />
    <t-input disabled placeholder="Disabled state" />
  </div>
</template>

<style scoped>
.input-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.t-input {
  width: 240px;
}
</style>
