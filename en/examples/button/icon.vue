<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button prefixIcon="search">Search</t-button>
      <t-button suffixIcon="left-arrow">Back</t-button>
      <t-button prefixIcon="edit" suffixIcon="delete">Edit</t-button>
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
