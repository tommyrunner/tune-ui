<template>
  <div class="drawer-demo">
    <div class="button-group">
      <t-button type="primary" @click="customDrawerVisible = true">自定义按钮</t-button>
      <t-button type="primary" @click="alignDrawerVisible = true">按钮对齐方式</t-button>
      <t-button type="primary" @click="hiddenDrawerVisible = true">隐藏按钮</t-button>
    </div>

    <!-- 自定义按钮 -->
    <t-drawer
      v-model="customDrawerVisible"
      title="自定义按钮"
      confirm-text="保存更改"
      cancel-text="返回列表"
      confirm-type="success"
      cancel-type="info"
    >
      <div class="drawer-content">
        <p>可以通过以下属性自定义底部按钮：</p>
        <ul>
          <li><code>confirm-text</code>：自定义确认按钮文本</li>
          <li><code>cancel-text</code>：自定义取消按钮文本</li>
          <li><code>confirm-type</code>：设置确认按钮类型</li>
          <li><code>cancel-type</code>：设置取消按钮类型</li>
        </ul>
        <p>这些配置选项让您可以根据业务场景调整按钮的文本和样式。</p>
      </div>
    </t-drawer>

    <!-- 按钮对齐方式 -->
    <t-drawer v-model="alignDrawerVisible" title="按钮对齐方式" :btn-align="btnAlign">
      <div class="drawer-content">
        <p>通过 <code>btn-align</code> 属性可以设置底部按钮的对齐方式。</p>
        <div class="align-options">
          <t-button size="small" @click="btnAlign = 'flex-start'">左对齐</t-button>
          <t-button size="small" @click="btnAlign = 'center'">居中对齐</t-button>
          <t-button size="small" @click="btnAlign = 'flex-end'">右对齐</t-button>
        </div>
        <p class="current-align">当前对齐方式：{{ alignText[btnAlign] }}</p>
      </div>
    </t-drawer>

    <!-- 隐藏按钮 -->
    <t-drawer v-model="hiddenDrawerVisible" title="隐藏按钮和关闭图标" :is-foot="false" :is-close-icon="false">
      <div class="drawer-content">
        <p>通过设置以下属性可以控制按钮和关闭图标的显示：</p>
        <ul>
          <li><code>is-foot</code>：设置为 <code>false</code> 可隐藏底部按钮区域</li>
          <li><code>is-close-icon</code>：设置为 <code>false</code> 可隐藏右上角关闭图标</li>
        </ul>
        <p>这种配置适用于需要完全自定义内容和操作的场景。</p>
        <div class="custom-actions">
          <t-button type="primary" @click="hiddenDrawerVisible = false">我知道了</t-button>
        </div>
      </div>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const customDrawerVisible = ref(false);
const alignDrawerVisible = ref(false);
const hiddenDrawerVisible = ref(false);
const btnAlign = ref("flex-end");

const alignText = reactive({
  "flex-start": "左对齐",
  center: "居中对齐",
  "flex-end": "右对齐"
});
</script>

<style scoped>
.drawer-demo {
  padding: 16px 0;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.drawer-content {
  line-height: 1.6;
  color: #606266;
}

.drawer-content p {
  margin: 0 0 12px;
}

.drawer-content ul {
  margin: 0 0 12px;
  padding-left: 24px;
}

.drawer-content li {
  margin-bottom: 8px;
}

.drawer-content code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}

.align-options {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}

.current-align {
  margin-top: 16px;
  font-weight: bold;
  color: #409eff;
}

.custom-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
