<template>
  <div class="test-container">
    <h2>Dialog 对话框组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-button type="primary" @click="dialogVisible1 = true">基础对话框</t-button>
      <t-dialog
        v-model="dialogVisible1"
        title="基础对话框"
        width="500px"
        :padding="[16, 20, 16, 20]"
        :box-shadow="[0, 2, 8, 'rgba(0, 0, 0, 0.1)']"
      >
        <div class="dialog-content">这是一个基础的对话框，展示了宽度、内边距和阴影的基本配置。</div>
      </t-dialog>
    </test-section>

    <!-- 标题配置 -->
    <test-section title="标题配置">
      <div class="button-group">
        <t-button type="primary" @click="dialogVisible2 = true">带图标标题</t-button>
        <t-button type="primary" @click="dialogVisible3 = true">无关闭图标</t-button>
      </div>
      <t-dialog v-model="dialogVisible2" title="带图标标题" icon="info">
        <div class="dialog-content">通过 icon 属性可以设置标题前的图标。</div>
      </t-dialog>
      <t-dialog v-model="dialogVisible3" title="无关闭图标" :is-close-icon="false">
        <div class="dialog-content">通过 is-close-icon 属性可以控制是否显示关闭图标。</div>
      </t-dialog>
    </test-section>

    <!-- 按钮配置 -->
    <test-section title="按钮配置">
      <div class="button-group">
        <t-button type="primary" @click="dialogVisible4 = true">自定义按钮</t-button>
        <t-button type="primary" @click="dialogVisible5 = true">无按钮</t-button>
      </div>
      <t-dialog
        v-model="dialogVisible4"
        title="自定义按钮"
        confirm-text="确定保存"
        cancel-text="返回"
        confirm-type="success"
        cancel-type="info"
        btn-align="center"
      >
        <div class="dialog-content">可以自定义按钮的文本、类型和对齐方式。</div>
      </t-dialog>
      <t-dialog v-model="dialogVisible5" title="无按钮" :is-foot="false">
        <div class="dialog-content">通过 is-foot 属性可以控制是否显示底部按钮。</div>
      </t-dialog>
    </test-section>

    <!-- 交互方式 -->
    <test-section title="交互方式">
      <div class="button-group">
        <t-button type="primary" @click="dialogVisible6 = true">禁用遮罩层</t-button>
        <t-button type="primary" @click="dialogVisible7 = true">禁用关闭方式</t-button>
        <t-button type="primary" @click="dialogVisible8 = true">可拖动对话框</t-button>
      </div>
      <t-dialog v-model="dialogVisible6" title="禁用遮罩层" :is-modal="false">
        <div class="dialog-content">通过 is-modal 属性可以控制是否显示遮罩层。</div>
      </t-dialog>
      <t-dialog v-model="dialogVisible7" title="禁用关闭方式" :close-on-press-model="false" :close-on-press-escape="false">
        <div class="dialog-content">可以禁用点击遮罩层关闭和ESC关闭功能。</div>
      </t-dialog>
      <t-dialog v-model="dialogVisible8" title="可拖动对话框" :draggable="true" :offset="{ x: -100, y: -50 }">
        <div class="dialog-content">通过 draggable 属性启用拖动功能，offset 可以设置初始偏移位置。</div>
      </t-dialog>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-button type="primary" @click="dialogVisible9 = true">事件测试</t-button>
      <t-dialog
        v-model="dialogVisible9"
        title="事件测试"
        @confirm="handleConfirm"
        @cancel="handleCancel"
        @open="handleOpen"
        @close="handleClose"
      >
        <div class="dialog-content">
          <p>对话框提供了以下事件：</p>
          <ul>
            <li>confirm: 点击确认按钮时触发</li>
            <li>cancel: 点击取消按钮时触发</li>
            <li>open: 对话框打开时触发</li>
            <li>close: 对话框关闭时触发</li>
          </ul>
          <p>请打开控制台查看事件触发记录</p>
        </div>
      </t-dialog>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TDialog, TButton } from "@/packages";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "DialogTest" });

// 控制对话框显示
const dialogVisible1 = ref(false);
const dialogVisible2 = ref(false);
const dialogVisible3 = ref(false);
const dialogVisible4 = ref(false);
const dialogVisible5 = ref(false);
const dialogVisible6 = ref(false);
const dialogVisible7 = ref(false);
const dialogVisible8 = ref(false);
const dialogVisible9 = ref(false);

// 事件处理
const handleConfirm = () => {
  console.log("Dialog confirmed");
};

const handleCancel = () => {
  console.log("Dialog cancelled");
};

const handleOpen = () => {
  console.log("Dialog opened");
};

const handleClose = () => {
  console.log("Dialog closed");
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
  }

  .button-group {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }

  .dialog-content {
    padding: 20px 0;
    color: #666;
    line-height: 1.6;

    ul {
      margin: 12px 0;
      padding-left: 20px;

      li {
        margin: 8px 0;
      }
    }
  }
}
</style>
