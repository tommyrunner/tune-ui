<template>
  <div class="tag-demo">
    <t-tag>Default Tag</t-tag>
    <t-tag round>Round Tag</t-tag>
    <t-tag round type="primary">Round Primary Tag</t-tag>
    <t-tag round type="success">Round Success Tag</t-tag>
    <t-tag round type="warning">Round Warning Tag</t-tag>
  </div>
</template>

<style scoped>
.tag-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
