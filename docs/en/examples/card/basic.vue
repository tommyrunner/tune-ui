<template>
  <div class="card-demo">
    <t-card>
      <div class="card-content">
        <p>This is a basic card example</p>
        <p>Cards can contain various content such as text, images, lists, etc.</p>
      </div>
    </t-card>
  </div>
</template>

<style scoped>
.card-demo {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 6px;
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-content p {
  margin: 0;
  line-height: 1.6;
  color: #606266;
}
</style>
