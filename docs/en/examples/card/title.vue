<template>
  <div class="card-demo">
    <div class="card-row">
      <t-card title="Title Text">
        <div class="card-content">
          <p>This is a card with text title</p>
          <p>Set card title through title attribute</p>
        </div>
      </t-card>

      <t-card title="Title with Icon" titleIcon="info">
        <div class="card-content">
          <p>This is a card with icon and title</p>
          <p>Add title icon through titleIcon attribute</p>
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

@media screen and (max-width: 768px) {
  .card-row {
    flex-direction: column;
  }
}
</style>
