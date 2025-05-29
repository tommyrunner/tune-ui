<template>
  <div class="divider-demo">
    <!-- Horizontal divider -->
    <p>Horizontal divider (default)</p>
    <t-divider direction="horizontal" />

    <!-- Vertical divider -->
    <p>Vertical divider</p>
    <div class="vertical-container">
      <span>Text</span>
      <t-divider direction="vertical" />
      <span>Text</span>
      <t-divider direction="vertical" />
      <span>Text</span>
    </div>
  </div>
</template>

<style scoped>
.divider-demo {
  padding: 16px 0;
}
.vertical-container {
  display: flex;
  align-items: center;
  height: 40px;
}
</style>
