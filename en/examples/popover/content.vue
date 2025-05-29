<template>
  <div class="demo-container">
    <p class="demo-desc">The popover supports customizing content through slots, including title, content, and footer areas.</p>
    <div class="demo-block">
      <div class="content-item">
        <t-popover type="hover" width="280px">
          <template #content>
            <div class="custom-content">
              <div class="content-image">
                <img src="https://picsum.photos/280/140" alt="Random image" />
              </div>
              <h3 class="content-title">Custom Content Example</h3>
              <p class="content-desc">
                You can add any content to the popover, including text, images, forms, and other elements.
              </p>
            </div>
          </template>
          <t-button>Image & Text Content</t-button>
        </t-popover>
      </div>

      <div class="content-item">
        <t-popover type="hover" width="300px">
          <template #title>
            <div class="custom-title">
              <t-icon name="message-circle" />
              <span>Custom Title</span>
            </div>
          </template>
          <template #content>
            <div class="message-content">
              <div class="message-item">
                <div class="avatar">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User avatar" />
                </div>
                <div class="message">
                  <div class="message-user">User A</div>
                  <div class="message-text">This is a sample message content</div>
                </div>
              </div>
              <div class="message-item">
                <div class="avatar">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User avatar" />
                </div>
                <div class="message">
                  <div class="message-user">User B</div>
                  <div class="message-text">
                    This is another sample message content, demonstrating how to customize complex content
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="custom-footer">
              <t-input placeholder="Enter message..." size="small" />
              <t-button type="primary" size="small">Send</t-button>
            </div>
          </template>
          <t-button>Message Panel</t-button>
        </t-popover>
      </div>

      <div class="content-item">
        <t-popover type="click" width="260px">
          <template #content>
            <div class="form-content">
              <div class="form-group">
                <label class="form-label">Username</label>
                <t-input size="small" placeholder="Please enter username" />
              </div>
              <div class="form-group">
                <label class="form-label">Password</label>
                <t-input type="password" size="small" placeholder="Please enter password" />
              </div>
              <div class="form-actions">
                <t-button size="small">Cancel</t-button>
                <t-button type="primary" size="small">Confirm</t-button>
              </div>
            </div>
          </template>
          <t-button>Form Content</t-button>
        </t-popover>
      </div>
    </div>

    <div class="slot-info">
      <h4>Available Slots</h4>
      <ul>
        <li><code>default</code>: Trigger element</li>
        <li><code>title</code>: Custom title area</li>
        <li><code>content</code>: Custom content area</li>
        <li><code>footer</code>: Custom footer area</li>
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
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
}

.content-item {
  margin-bottom: 16px;
}

/* Image and text content styles */
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

/* Custom title styles */
.custom-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

/* Message panel styles */
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

/* Form content styles */
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

/* Slot information styles */
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
