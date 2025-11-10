<template>
  <div class="drawer-demo">
    <t-button type="primary" @click="customContentDrawerVisible = true">Custom Content Drawer</t-button>

    <t-drawer v-model="customContentDrawerVisible">
      <!-- Custom Title -->
      <template #title>
        <div class="custom-title">
          <t-icon icon="info" class="title-icon" />
          <span>Custom Title Area</span>
          <div class="title-badge">Important</div>
        </div>
      </template>

      <!-- Custom Content -->
      <div class="custom-content">
        <div class="section">
          <h3>Custom Content Area</h3>
          <p>The drawer component provides three slots that allow you to customize various parts of the drawer:</p>
          <ul>
            <li><code>title</code> slot: Customize title area</li>
            <li><code>default</code> slot: Customize content area</li>
            <li><code>footer</code> slot: Customize footer area</li>
          </ul>
        </div>

        <div class="section form-demo">
          <h3>Example Form</h3>
          <div class="form-item">
            <label>Username</label>
            <t-input v-model="form.username" placeholder="Please enter username" />
          </div>
          <div class="form-item">
            <label>Email</label>
            <t-input v-model="form.email" placeholder="Please enter email" />
          </div>
          <div class="form-item">
            <label>Role</label>
            <t-select v-model="form.role" placeholder="Please select role">
              <t-select-option value="admin" label="Administrator" />
              <t-select-option value="editor" label="Editor" />
              <t-select-option value="user" label="User" />
            </t-select>
          </div>
        </div>
      </div>

      <!-- Custom Footer -->
      <template #footer>
        <div class="custom-footer">
          <div class="footer-info">
            <t-icon icon="warning" class="warning-icon" />
            <span>Please confirm the information is correct before submitting</span>
          </div>
          <div class="footer-buttons">
            <t-button type="text" @click="customContentDrawerVisible = false">Cancel</t-button>
            <t-button type="success" @click="handleSubmit">Save</t-button>
          </div>
        </div>
      </template>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const customContentDrawerVisible = ref(false);

// Form data
const form = reactive({
  username: "",
  email: "",
  role: ""
});

/**
 * Handle form submission
 * @returns {void}
 */
const handleSubmit = () => {
  console.log("Form data:", form);
  customContentDrawerVisible.value = false;
};
</script>

<style scoped>
.drawer-demo {
  padding: 16px 0;
}

/* Custom title styles */
.custom-title {
  display: flex;
  align-items: center;
  width: 100%;
}

.title-icon {
  color: #409eff;
  margin-right: 8px;
}

.title-badge {
  margin-left: auto;
  background-color: #f56c6c;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
}

/* Custom content styles */
.custom-content {
  padding: 16px 0;
  color: #606266;
  line-height: 1.6;
}

.section {
  margin-bottom: 24px;
}

.section h3 {
  margin: 0 0 12px;
  font-size: 16px;
  color: #303133;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 8px;
}

.section p {
  margin: 0 0 12px;
}

.section ul {
  margin: 0 0 12px;
  padding-left: 24px;
}

.section li {
  margin-bottom: 8px;
}

.section code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}

/* Form styles */
.form-demo {
  background-color: #f5f7fa;
  padding: 16px;
  border-radius: 4px;
}

.form-item {
  margin-bottom: 16px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  color: #606266;
  font-size: 14px;
}

/* Custom footer styles */
.custom-footer {
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}

.footer-info {
  display: flex;
  align-items: center;
  color: #e6a23c;
}

.warning-icon {
  margin-right: 6px;
}

.footer-buttons {
  margin-left: auto;
  display: flex;
  gap: 8px;
}
</style>
