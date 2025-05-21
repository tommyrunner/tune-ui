<template>
  <div class="dialog-demo">
    <div class="button-group">
      <t-button type="primary" @click="openDialog('nomodal')">无遮罩层</t-button>
      <t-button type="primary" @click="openDialog('noescape')">禁用关闭方式</t-button>
      <t-button type="primary" @click="openDialog('custom')">自定义样式</t-button>
    </div>
    
    <!-- 无遮罩层 -->
    <t-dialog v-model="dialogVisible" title="无遮罩层对话框" :is-modal="false" v-if="dialogType === 'nomodal'">
      <div class="dialog-content">
        <p>通过设置 <code>is-modal</code> 属性为 <code>false</code> 可以隐藏遮罩层。</p>
        <p>无遮罩层的对话框允许用户同时与页面其他部分进行交互，适用于不需要强制用户响应的辅助性对话框。</p>
      </div>
    </t-dialog>
    
    <!-- 禁用关闭方式 -->
    <t-dialog
      v-model="dialogVisible"
      title="禁用默认关闭方式"
      :close-on-press-model="false"
      :close-on-press-escape="false"
      v-if="dialogType === 'noescape'"
    >
      <div class="dialog-content">
        <p>通过设置以下属性可以禁用默认的关闭方式：</p>
        <ul>
          <li><code>close-on-press-model</code>：设置为 <code>false</code> 禁止点击遮罩层关闭</li>
          <li><code>close-on-press-escape</code>：设置为 <code>false</code> 禁止按ESC键关闭</li>
        </ul>
        <p>这种设置适用于需要用户明确操作的重要对话框，避免意外关闭。</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button type="primary" @click="dialogVisible = false">我已了解</t-button>
        </div>
      </template>
    </t-dialog>
    
    <!-- 自定义样式 -->
    <t-dialog
      v-model="dialogVisible"
      title="自定义样式对话框"
      :width="dialogWidth"
      :top="dialogTop"
      :padding="dialogPadding"
      :box-shadow="dialogShadow"
      v-if="dialogType === 'custom'"
    >
      <div class="dialog-content">
        <p>对话框提供了多种样式自定义选项：</p>
        <div class="style-controls">
          <div class="control-item">
            <label>宽度：</label>
            <div class="buttons">
              <t-button size="small" @click="dialogWidth = '400px'">窄</t-button>
              <t-button size="small" @click="dialogWidth = '600px'">中</t-button>
              <t-button size="small" @click="dialogWidth = '800px'">宽</t-button>
            </div>
          </div>
          <div class="control-item">
            <label>顶部距离：</label>
            <div class="buttons">
              <t-button size="small" @click="dialogTop = '5vh'">靠上</t-button>
              <t-button size="small" @click="dialogTop = '15vh'">中间</t-button>
              <t-button size="small" @click="dialogTop = '30vh'">靠下</t-button>
            </div>
          </div>
          <div class="control-item">
            <label>内边距：</label>
            <div class="buttons">
              <t-button size="small" @click="dialogPadding = [8, 8, 8, 8]">小</t-button>
              <t-button size="small" @click="dialogPadding = [16, 16, 16, 16]">中</t-button>
              <t-button size="small" @click="dialogPadding = [24, 24, 24, 24]">大</t-button>
            </div>
          </div>
        </div>
        <div class="current-styles">
          <p>当前样式：</p>
          <ul>
            <li>宽度: {{ dialogWidth }}</li>
            <li>顶部距离: {{ dialogTop }}</li>
            <li>内边距: [{{ dialogPadding.join(', ') }}]</li>
          </ul>
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";


const dialogVisible = ref(false);
const dialogType = ref("");

// 自定义样式属性
const dialogWidth = ref("600px");
const dialogTop = ref("15vh");
const dialogPadding = ref([16, 16, 16, 16]);
const dialogShadow = ref([0, 3, 10, "rgba(0, 0, 0, 0.1)"]);

/**
 * 打开不同类型的对话框
 */
const openDialog = (type) => {
  dialogType.value = type;
  dialogVisible.value = true;
};
</script>

<style scoped>
.dialog-demo {
  padding: 16px 0;
}

.button-group {
  display: flex;
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

.style-controls {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
}

.control-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.control-item label {
  width: 80px;
  color: #606266;
}

.buttons {
  display: flex;
  gap: 8px;
}

.current-styles {
  background-color: #ecf5ff;
  border-radius: 4px;
  padding: 12px;
}

.current-styles p {
  font-weight: bold;
  margin-bottom: 8px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style> 