<template>
  <div class="dialog-demo">
    <div class="button-group">
      <t-button type="primary" @click="openDialog('tiny')">超小尺寸</t-button>
      <t-button type="primary" @click="openDialog('small')">小尺寸</t-button>
      <t-button type="primary" @click="openDialog('medium')">中等尺寸</t-button>
      <t-button type="primary" @click="openDialog('large')">大尺寸</t-button>
      <t-button type="primary" @click="openDialog('full')">全屏</t-button>
    </div>

    <t-dialog v-model="dialogVisible" :title="dialogTitle" :size="currentSize">
      <div class="dialog-content">
        <p>
          当前对话框尺寸：<strong>{{ sizeText }}</strong>
        </p>
        <p>通过设置 <code>size</code> 属性可以改变对话框的尺寸。可选值包括：</p>
        <ul>
          <li><code>tiny</code>: 超小尺寸</li>
          <li><code>small</code>: 小尺寸</li>
          <li><code>medium</code>: 中等尺寸（默认）</li>
          <li><code>large</code>: 大尺寸</li>
          <li><code>full</code>: 全屏</li>
        </ul>
        <p>也可以通过 <code>width</code> 属性直接设置对话框的宽度。</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button @click="dialogVisible = false">关闭</t-button>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { TDialog, TButton } from "tune-ui";

const dialogVisible = ref(false);
const currentSize = ref("medium");

const sizeTextMap = {
  tiny: "超小尺寸",
  small: "小尺寸",
  medium: "中等尺寸",
  large: "大尺寸",
  full: "全屏"
};

const sizeText = computed(() => sizeTextMap[currentSize.value]);
const dialogTitle = computed(() => `${sizeText.value}对话框`);

const openDialog = size => {
  currentSize.value = size;
  dialogVisible.value = true;
};
</script>

<style scoped>
.dialog-demo {
  padding: 16px 0;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
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

.dialog-content code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
