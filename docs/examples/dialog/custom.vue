<template>
  <div class="dialog-demo">
    <div class="controls">
      <div class="control-item">
        <label>宽度：</label>
        <t-input v-model="width" placeholder="例如：600px 或 50%"></t-input>
      </div>
      <div class="control-item">
        <label>顶部距离：</label>
        <t-input v-model="top" placeholder="例如：20vh 或 100px"></t-input>
      </div>
      <div class="control-item">
        <label>标题和底部居中：</label>
        <t-switch v-model="center"></t-switch>
      </div>
      <t-button type="primary" @click="dialogVisible = true">打开对话框</t-button>
    </div>
    
    <t-dialog
      v-model="dialogVisible"
      title="自定义样式对话框"
      :width="width"
      :top="top"
      :center="center"
    >
      <div class="dialog-content">
        <p>您可以通过以下属性自定义对话框的样式：</p>
        <ul>
          <li><strong>width</strong>: 设置对话框的宽度，可以是像素值或百分比</li>
          <li><strong>top</strong>: 设置对话框距离顶部的距离</li>
          <li><strong>center</strong>: 设置标题和底部内容是否居中显示</li>
        </ul>
        <p>当前设置：</p>
        <pre>{{ currentSettings }}</pre>
      </div>
      <template #footer>
        <div class="dialog-footer" :class="{ 'is-center': center }">
          <t-button @click="dialogVisible = false">取消</t-button>
          <t-button type="primary" @click="dialogVisible = false">确定</t-button>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";


const dialogVisible = ref(false);
const width = ref("50%");
const top = ref("10vh");
const center = ref(false);

const currentSettings = computed(() => {
  return {
    width: width.value,
    top: top.value,
    center: center.value
  };
});
</script>

<style scoped>
.dialog-demo {
  padding: 16px 0;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-item label {
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
}

.dialog-content {
  line-height: 1.6;
  color: #606266;
}

.dialog-content p {
  margin: 0 0 12px;
}

.dialog-content ul {
  margin: 0 0 12px;
  padding-left: 24px;
}

.dialog-content pre {
  background-color: #f5f7fa;
  padding: 12px;
  border-radius: 4px;
  font-family: Consolas, Monaco, monospace;
  margin: 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.dialog-footer.is-center {
  justify-content: center;
}
</style> 