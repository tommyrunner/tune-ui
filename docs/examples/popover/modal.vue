<template>
  <div class="demo-container">
    <p class="demo-desc">弹出框可以配置模态遮罩层，使其具有类似对话框的效果。</p>
    <div class="demo-block">
      <div class="modal-section">
        <t-popover
          title="模态弹出框"
          content="这是一个带有遮罩层的弹出框，点击遮罩层可以关闭。"
          type="click"
          :modal="true"
          position="top"
          @click-modal="handleClickModal"
        >
          <t-button type="primary">带遮罩弹出框</t-button>
        </t-popover>

        <t-popover
          title="模态弹出框（点击遮罩不关闭）"
          content="这是一个带有遮罩层的弹出框，但点击遮罩层不会关闭。"
          type="click"
          :modal="true"
          :close-on-modal-click="false"
          position="top"
        >
          <t-button type="warning">遮罩不关闭</t-button>
        </t-popover>
      </div>

      <div class="modal-custom">
        <t-popover type="click" :modal="true" transition="fade" position="bottom" class="custom-modal-popover">
          <template #content>
            <div class="custom-modal-content">
              <h3 class="custom-title">自定义模态内容</h3>
              <p class="custom-desc">这是一个自定义内容的模态弹出框示例。</p>
              <div class="custom-footer">
                <t-button size="small" @click="closeCustomModal">取消</t-button>
                <t-button size="small" type="primary" @click="confirmCustomModal">确认</t-button>
              </div>
            </div>
          </template>
          <t-button type="info">自定义模态内容</t-button>
        </t-popover>
      </div>
    </div>

    <div class="modal-info">
      <h4>模态遮罩属性</h4>
      <ul>
        <li><code>modal</code>：设置为 <code>true</code> 开启模态遮罩背景</li>
        <li><code>close-on-modal-click</code>：设置为 <code>false</code> 可以阻止点击遮罩层关闭</li>
        <li><code>modal-opacity</code>：设置遮罩层的透明度，默认为 <code>0.5</code></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TPopover, TButton, TMessage } from "tune-ui";

// 获取自定义模态弹窗引用
const customModalRef = ref(null);

// 处理点击模态背景事件
const handleClickModal = () => {
  TMessage.info("点击了遮罩层");
};

// 关闭自定义模态
const closeCustomModal = () => {
  TMessage.info("取消操作");
  // 通过父级传递的close方法关闭弹窗
  document.querySelector(".custom-modal-popover").__vueParentComponent.ctx.close();
};

// 确认自定义模态
const confirmCustomModal = () => {
  TMessage.success("确认操作");
  // 通过父级传递的close方法关闭弹窗
  document.querySelector(".custom-modal-popover").__vueParentComponent.ctx.close();
};
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

.modal-section {
  display: flex;
  gap: 16px;
}

.modal-custom {
  margin-top: 8px;
}

.custom-modal-content {
  min-width: 280px;
  padding: 8px 0;
}

.custom-title {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.custom-desc {
  margin: 0 0 20px;
  color: #606266;
  line-height: 1.5;
}

.custom-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.modal-info {
  width: 100%;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #409eff;
  margin-top: 16px;
}

.modal-info h4 {
  margin: 0 0 12px;
  font-size: 16px;
  color: #303133;
}

.modal-info ul {
  margin: 0;
  padding-left: 20px;
  color: #606266;
  line-height: 1.8;
}

.modal-info li {
  margin-bottom: 8px;
}

.modal-info code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: monospace;
}
</style>
