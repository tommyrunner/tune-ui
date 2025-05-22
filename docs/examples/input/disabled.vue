<template>
  <div class="input-demo">
    <t-input placeholder="正常状态" />
    <t-input disabled placeholder="禁用状态" />
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
