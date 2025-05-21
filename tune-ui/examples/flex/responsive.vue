<template>
  <div class="demo-container">
    <p class="demo-desc">Flex组件支持响应式布局，可以根据不同屏幕尺寸自动调整布局。</p>

    <div class="demo-block">
      <div class="demo-title">响应式变化（请调整浏览器窗口查看效果）</div>
      <div class="breakpoint-info">
        <div class="breakpoint-item">
          <div class="breakpoint">XS</div>
          <div class="breakpoint-desc">&lt;768px</div>
        </div>
        <div class="breakpoint-item">
          <div class="breakpoint">SM</div>
          <div class="breakpoint-desc">≥768px</div>
        </div>
        <div class="breakpoint-item">
          <div class="breakpoint">MD</div>
          <div class="breakpoint-desc">≥992px</div>
        </div>
        <div class="breakpoint-item">
          <div class="breakpoint">LG</div>
          <div class="breakpoint-desc">≥1200px</div>
        </div>
        <div class="breakpoint-item">
          <div class="breakpoint">XL</div>
          <div class="breakpoint-desc">≥1920px</div>
        </div>
      </div>

      <t-flex-group :gap="16">
        <t-flex :xs="10" :sm="5" :md="3" :lg="2" :xl="1">
          <div class="flex-item">
            <div class="item-title">项目 1</div>
            <div class="responsive-info">
              <div>xs: 10 列</div>
              <div>sm: 5 列</div>
              <div>md: 3 列</div>
              <div>lg: 2 列</div>
              <div>xl: 1 列</div>
            </div>
          </div>
        </t-flex>
        <t-flex :xs="10" :sm="5" :md="3" :lg="2" :xl="1">
          <div class="flex-item">
            <div class="item-title">项目 2</div>
            <div class="responsive-info">
              <div>xs: 10 列</div>
              <div>sm: 5 列</div>
              <div>md: 3 列</div>
              <div>lg: 2 列</div>
              <div>xl: 1 列</div>
            </div>
          </div>
        </t-flex>
        <t-flex :xs="10" :sm="5" :md="3" :lg="2" :xl="1">
          <div class="flex-item">
            <div class="item-title">项目 3</div>
            <div class="responsive-info">
              <div>xs: 10 列</div>
              <div>sm: 5 列</div>
              <div>md: 3 列</div>
              <div>lg: 2 列</div>
              <div>xl: 1 列</div>
            </div>
          </div>
        </t-flex>
        <t-flex :xs="10" :sm="5" :md="3" :lg="2" :xl="1">
          <div class="flex-item">
            <div class="item-title">项目 4</div>
            <div class="responsive-info">
              <div>xs: 10 列</div>
              <div>sm: 5 列</div>
              <div>md: 3 列</div>
              <div>lg: 2 列</div>
              <div>xl: 1 列</div>
            </div>
          </div>
        </t-flex>
      </t-flex-group>
    </div>

    <div class="demo-note">
      <p>屏幕尺寸变化时，每行显示的项目数量将改变：</p>
      <ul>
        <li>XS(&lt;768px): 每行1个（10列宽）</li>
        <li>SM(≥768px): 每行2个（5列宽）</li>
        <li>MD(≥992px): 每行3-4个（3列宽）</li>
        <li>LG(≥1200px): 每行5个（2列宽）</li>
        <li>XL(≥1920px): 每行10个（1列宽）</li>
      </ul>
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

.demo-title {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.breakpoint-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.breakpoint-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.breakpoint {
  padding: 4px 8px;
  background-color: #e5edff;
  border-radius: 4px;
  font-weight: 500;
  color: #409eff;
}

.breakpoint-desc {
  margin-top: 4px;
  font-size: 12px;
  color: #909399;
}

.flex-item {
  padding: 16px;
  background-color: #e5edff;
  border: 1px solid #c6d9ff;
  border-radius: 4px;
}

.item-title {
  margin-bottom: 8px;
  font-weight: 500;
  color: #303133;
  text-align: center;
}

.responsive-info {
  font-size: 13px;
  color: #606266;
}

.responsive-info div {
  margin-bottom: 4px;
}

.demo-note {
  padding: 16px;
  background-color: #f8f9fa;
  border-left: 3px solid #67c23a;
  margin-top: 16px;
}

.demo-note p {
  margin: 0 0 8px;
  color: #303133;
}

.demo-note ul {
  margin: 0;
  padding-left: 16px;
  color: #606266;
}

.demo-note li {
  margin-bottom: 4px;
}
</style> 