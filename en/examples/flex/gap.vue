<template>
  <div class="demo-container">
    <p class="demo-desc">Use the gap property to set the spacing between elements.</p>

    <div class="demo-block">
      <h4 class="section-title">No Gap (default)</h4>
      <t-flex-group :gap="0">
        <t-flex :span="3">
          <div class="flex-item">gap: 0</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 0</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 0</div>
        </t-flex>
      </t-flex-group>
    </div>

    <div class="demo-block">
      <h4 class="section-title">Gap 8px</h4>
      <t-flex-group :gap="8">
        <t-flex :span="3">
          <div class="flex-item">gap: 8</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 8</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 8</div>
        </t-flex>
      </t-flex-group>
    </div>

    <div class="demo-block">
      <h4 class="section-title">Gap 16px</h4>
      <t-flex-group :gap="16">
        <t-flex :span="3">
          <div class="flex-item">gap: 16</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 16</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 16</div>
        </t-flex>
      </t-flex-group>
    </div>

    <div class="demo-block">
      <h4 class="section-title">Gap 24px</h4>
      <t-flex-group :gap="24">
        <t-flex :span="3">
          <div class="flex-item">gap: 24</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 24</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 24</div>
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

.section-title {
  margin: 0 0 12px;
  font-size: 16px;
  color: #606266;
}

.flex-item {
  padding: 16px;
  text-align: center;
  background-color: #e5edff;
  border: 1px solid #c6d9ff;
  border-radius: 4px;
}
</style> 