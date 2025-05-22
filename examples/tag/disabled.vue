<template>
  <div class="tag-demo">
    <t-tag disabled>禁用标签</t-tag>
    <t-tag disabled type="primary">禁用主要标签</t-tag>
    <t-tag disabled type="success">禁用成功标签</t-tag>
    <t-tag disabled closable>禁用可关闭标签</t-tag>
  </div>
</template>

<style scoped>
.tag-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
