<template>
  <div class="drawer-demo">
    <t-button type="primary" @click="drawerVisible = true">自定义内容抽屉</t-button>

    <t-drawer v-model="drawerVisible">
      <!-- 自定义标题 -->
      <template #title>
        <div class="custom-title">
          <t-icon icon="info" class="title-icon" />
          <span>自定义标题区域</span>
          <div class="title-badge">重要</div>
        </div>
      </template>

      <!-- 自定义内容 -->
      <div class="custom-content">
        <div class="section">
          <h3>自定义内容区域</h3>
          <p>抽屉组件提供了三个插槽，让您可以自定义抽屉的各个部分：</p>
          <ul>
            <li><code>title</code> 插槽：自定义标题区域</li>
            <li><code>default</code> 插槽：自定义内容区域</li>
            <li><code>footer</code> 插槽：自定义底部区域</li>
          </ul>
        </div>

        <div class="section form-demo">
          <h3>示例表单</h3>
          <div class="form-item">
            <label>用户名</label>
            <t-input v-model="form.username" placeholder="请输入用户名" />
          </div>
          <div class="form-item">
            <label>邮箱</label>
            <t-input v-model="form.email" placeholder="请输入邮箱" />
          </div>
          <div class="form-item">
            <label>角色</label>
            <t-select v-model="form.role" placeholder="请选择角色">
              <t-select-option value="admin" label="管理员" />
              <t-select-option value="editor" label="编辑" />
              <t-select-option value="user" label="用户" />
            </t-select>
          </div>
        </div>
      </div>

      <!-- 自定义底部 -->
      <template #footer>
        <div class="custom-footer">
          <div class="footer-info">
            <t-icon icon="warning" class="warning-icon" />
            <span>提交前请确认信息正确</span>
          </div>
          <div class="footer-buttons">
            <t-button type="text" @click="drawerVisible = false">取消</t-button>
            <t-button type="success" @click="handleSubmit">保存</t-button>
          </div>
        </div>
      </template>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { TDrawer, TButton, TIcon, TInput, TSelect, TSelectOption } from "tune-ui";

const drawerVisible = ref(false);

// 表单数据
const form = reactive({
  username: "",
  email: "",
  role: ""
});

/**
 * 处理表单提交
 */
const handleSubmit = () => {
  console.log("表单数据:", form);
  drawerVisible.value = false;
};
</script>

<style scoped>
.drawer-demo {
  padding: 16px 0;
}

/* 自定义标题样式 */
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

/* 自定义内容样式 */
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

/* 表单样式 */
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

/* 自定义底部样式 */
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
