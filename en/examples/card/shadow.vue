<template>
  <div class="card-demo">
    <div class="card-row">
      <t-card shadow="always" title="Always Show Shadow">
        <div class="card-content">
          <p>shadow="always"</p>
          <p>This card always shows shadow effect</p>
        </div>
      </t-card>

      <t-card shadow="hover" title="Show Shadow on Hover">
        <div class="card-content">
          <p>shadow="hover"</p>
          <p>This card shows shadow when mouse hovers</p>
        </div>
      </t-card>

      <t-card shadow="never" title="Never Show Shadow">
        <div class="card-content">
          <p>shadow="never"</p>
          <p>This card never shows shadow</p>
        </div>
      </t-card>
    </div>
  </div>
</template>

<style scoped>
.card-demo {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 6px;
}

.card-row {
  display: flex;
  gap: 20px;
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

@media screen and (max-width: 992px) {
  .card-row {
    flex-direction: column;
  }
}
</style>
