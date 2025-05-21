<template>
  <div class="tag-demo">
    <t-tag>默认标签</t-tag>
    <t-tag type="primary">主要标签</t-tag>
    <t-tag type="success">成功标签</t-tag>
    <t-tag type="info">信息标签</t-tag>
    <t-tag type="warning">警告标签</t-tag>
    <t-tag type="danger">危险标签</t-tag>
  </div>
</template>

<style scoped>
.tag-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
