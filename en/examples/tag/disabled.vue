<template>
  <div class="tag-demo">
    <t-tag disabled>Disabled Tag</t-tag>
    <t-tag disabled type="primary">Disabled Primary Tag</t-tag>
    <t-tag disabled type="success">Disabled Success Tag</t-tag>
    <t-tag disabled closable>Disabled Closable Tag</t-tag>
  </div>
</template>

<style scoped>
.tag-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
