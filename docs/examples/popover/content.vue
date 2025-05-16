<template>
  <div class="demo-container">
    <p class="demo-desc">弹出框支持通过插槽自定义内容，包括标题、内容和底部区域。</p>
    <div class="demo-block">
      <div class="content-item">
        <t-popover type="hover" width="280px">
          <template #content>
            <div class="custom-content">
              <div class="content-image">
                <img src="https://picsum.photos/280/140" alt="随机图片" />
              </div>
              <h3 class="content-title">自定义内容示例</h3>
              <p class="content-desc">您可以在弹出框中添加任意内容，包括文本、图片、表单等元素。</p>
            </div>
          </template>
          <t-button>图文内容</t-button>
        </t-popover>
      </div>

      <div class="content-item">
        <t-popover type="hover" width="300px">
          <template #title>
            <div class="custom-title">
              <t-icon name="message-circle" />
              <span>自定义标题</span>
            </div>
          </template>
          <template #content>
            <div class="message-content">
              <div class="message-item">
                <div class="avatar">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="用户头像" />
                </div>
                <div class="message">
                  <div class="message-user">用户A</div>
                  <div class="message-text">这是一条消息内容示例</div>
                </div>
              </div>
              <div class="message-item">
                <div class="avatar">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="用户头像" />
                </div>
                <div class="message">
                  <div class="message-user">用户B</div>
                  <div class="message-text">这是另一条消息内容示例，展示了如何自定义复杂内容</div>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="custom-footer">
              <t-input placeholder="输入消息..." size="small" />
              <t-button type="primary" size="small">发送</t-button>
            </div>
          </template>
          <t-button>消息面板</t-button>
        </t-popover>
      </div>

      <div class="content-item">
        <t-popover type="click" width="260px">
          <template #content>
            <div class="form-content">
              <div class="form-group">
                <label class="form-label">用户名</label>
                <t-input size="small" placeholder="请输入用户名" />
              </div>
              <div class="form-group">
                <label class="form-label">密码</label>
                <t-input type="password" size="small" placeholder="请输入密码" />
              </div>
              <div class="form-actions">
                <t-button size="small">取消</t-button>
                <t-button type="primary" size="small">确定</t-button>
              </div>
            </div>
          </template>
          <t-button>表单内容</t-button>
        </t-popover>
      </div>
    </div>

    <div class="slot-info">
      <h4>可用插槽</h4>
      <ul>
        <li><code>default</code>：触发元素</li>
        <li><code>title</code>：自定义标题区域</li>
        <li><code>content</code>：自定义内容区域</li>
        <li><code>footer</code>：自定义底部区域</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { TPopover, TButton, TInput, TIcon } from "tune-ui";
</script>

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
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
}

.content-item {
  margin-bottom: 16px;
}

/* 图文内容样式 */
.custom-content {
  padding: 0;
}

.content-image {
  width: 100%;
  height: 140px;
  overflow: hidden;
  border-radius: 4px 4px 0 0;
}

.content-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-title {
  margin: 12px 0 8px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.content-desc {
  margin: 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
}

/* 自定义标题样式 */
.custom-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

/* 消息面板样式 */
.message-content {
  padding: 12px 0;
  max-height: 200px;
  overflow-y: auto;
}

.message-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.message-item:last-child {
  margin-bottom: 0;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message {
  flex: 1;
}

.message-user {
  font-weight: 500;
  margin-bottom: 4px;
  color: #303133;
  font-size: 14px;
}

.message-text {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
}

.custom-footer {
  display: flex;
  gap: 8px;
}

/* 表单内容样式 */
.form-content {
  padding: 12px 0;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #606266;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

/* 插槽信息样式 */
.slot-info {
  width: 100%;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #409eff;
}

.slot-info h4 {
  margin: 0 0 12px;
  font-size: 16px;
  color: #303133;
}

.slot-info ul {
  margin: 0;
  padding-left: 20px;
  color: #606266;
  line-height: 1.8;
}

.slot-info li {
  margin-bottom: 8px;
}

.slot-info code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: monospace;
}
</style>
