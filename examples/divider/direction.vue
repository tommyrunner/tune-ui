<template>
  <div class="divider-demo">
    <!-- 水平分割线 -->
    <p>水平分割线（默认）</p>
    <t-divider direction="horizontal" />

    <!-- 垂直分割线 -->
    <p>垂直分割线</p>
    <div class="vertical-container">
      <span>文本</span>
      <t-divider direction="vertical" />
      <span>文本</span>
      <t-divider direction="vertical" />
      <span>文本</span>
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
