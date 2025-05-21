<template>
  <div class="demo-container">
    <p class="demo-desc">通过 justify 和 align 属性设置弹性容器内元素的对齐方式。</p>

    <h4 class="section-title">水平对齐（justify）</h4>
    <div class="demo-section">
      <div class="demo-item">
        <p class="demo-label">start（默认）</p>
        <t-flex-group justify="start" class="demo-flex">
          <t-flex :span="2">
            <div class="flex-item">1</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item">2</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item">3</div>
          </t-flex>
        </t-flex-group>
      </div>

      <div class="demo-item">
        <p class="demo-label">center</p>
        <t-flex-group justify="center" class="demo-flex">
          <t-flex :span="2">
            <div class="flex-item">1</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item">2</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item">3</div>
          </t-flex>
        </t-flex-group>
      </div>

      <div class="demo-item">
        <p class="demo-label">end</p>
        <t-flex-group justify="end" class="demo-flex">
          <t-flex :span="2">
            <div class="flex-item">1</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item">2</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item">3</div>
          </t-flex>
        </t-flex-group>
      </div>

      <div class="demo-item">
        <p class="demo-label">space-between</p>
        <t-flex-group justify="space-between" class="demo-flex">
          <t-flex :span="2">
            <div class="flex-item">1</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item">2</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item">3</div>
          </t-flex>
        </t-flex-group>
      </div>

      <div class="demo-item">
        <p class="demo-label">space-around</p>
        <t-flex-group justify="space-around" class="demo-flex">
          <t-flex :span="2">
            <div class="flex-item">1</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item">2</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item">3</div>
          </t-flex>
        </t-flex-group>
      </div>
    </div>

    <h4 class="section-title">垂直对齐（align）</h4>
    <div class="demo-section">
      <div class="demo-item">
        <p class="demo-label">center（默认）</p>
        <t-flex-group align="center" class="demo-flex demo-flex-height">
          <t-flex :span="2">
            <div class="flex-item">1</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item height-60">2</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item">3</div>
          </t-flex>
        </t-flex-group>
      </div>

      <div class="demo-item">
        <p class="demo-label">start</p>
        <t-flex-group align="start" class="demo-flex demo-flex-height">
          <t-flex :span="2">
            <div class="flex-item">1</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item height-60">2</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item">3</div>
          </t-flex>
        </t-flex-group>
      </div>

      <div class="demo-item">
        <p class="demo-label">end</p>
        <t-flex-group align="end" class="demo-flex demo-flex-height">
          <t-flex :span="2">
            <div class="flex-item">1</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item height-60">2</div>
          </t-flex>
          <t-flex :span="2">
            <div class="flex-item">3</div>
          </t-flex>
        </t-flex-group>
      </div>
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

.section-title {
  margin: 24px 0 16px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.demo-section {
  margin-bottom: 24px;
}

.demo-item {
  margin-bottom: 20px;
}

.demo-label {
  margin: 0 0 8px;
  color: #606266;
  font-size: 14px;
}

.demo-flex {
  background-color: #f5f7fa;
  padding: 16px;
  border-radius: 4px;
}

.demo-flex-height {
  height: 100px;
}

.flex-item {
  padding: 16px;
  text-align: center;
  background-color: #e5edff;
  border: 1px solid #c6d9ff;
  border-radius: 4px;
}

.height-60 {
  height: 60px;
}
</style> 