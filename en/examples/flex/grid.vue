<template>
  <div class="demo-container">
    <p class="demo-desc">Create grid layout through span and offset properties, with a total of 10 grid columns.</p>

    <div class="demo-block">
      <t-flex-group>
        <t-flex :span="3">
          <div class="flex-item">span: 3 (30%)</div>
        </t-flex>
        <t-flex :span="4" :offset="1">
          <div class="flex-item">span: 4, offset: 1</div>
        </t-flex>
        <t-flex :span="2">
          <div class="flex-item">span: 2 (20%)</div>
        </t-flex>
      </t-flex-group>
    </div>

    <div class="demo-block">
      <t-flex-group>
        <t-flex :span="6">
          <div class="flex-item">span: 6 (60%)</div>
        </t-flex>
        <t-flex :span="4">
          <div class="flex-item">span: 4 (40%)</div>
        </t-flex>
      </t-flex-group>
    </div>

    <div class="demo-block">
      <t-flex-group>
        <t-flex :span="2">
          <div class="flex-item">span: 2</div>
        </t-flex>
        <t-flex :span="2">
          <div class="flex-item">span: 2</div>
        </t-flex>
        <t-flex :span="2">
          <div class="flex-item">span: 2</div>
        </t-flex>
        <t-flex :span="2">
          <div class="flex-item">span: 2</div>
        </t-flex>
        <t-flex :span="2">
          <div class="flex-item">span: 2</div>
        </t-flex>
      </t-flex-group>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 16px 0;
}

.demo-desc {
  margin: 0 0 16px;
  color: #606266;
  line-height: 1.6;
}

.demo-block {
  margin-bottom: 24px;
}

.flex-item {
  padding: 16px;
  text-align: center;
  background-color: #e5edff;
  border: 1px solid #c6d9ff;
  border-radius: 4px;
}
</style> 