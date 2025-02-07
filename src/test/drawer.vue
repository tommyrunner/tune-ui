<template>
  <div class="test-container">
    <h2>Drawer 抽屉组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-button type="primary" @click="visible1 = true">打开抽屉</t-button>

      <t-drawer v-model="visible1" title="基础抽屉">
        <div class="drawer-content">基础抽屉内容</div>
      </t-drawer>
    </test-section>

    <!-- 弹出方向 -->
    <test-section title="弹出方向">
      <div class="button-group">
        <t-button @click="visible2 = true">左侧弹出</t-button>
        <t-button @click="visible3 = true">右侧弹出</t-button>
        <t-button @click="visible4 = true">顶部弹出</t-button>
        <t-button @click="visible5 = true">底部弹出</t-button>
      </div>

      <t-drawer v-model="visible2" title="左侧抽屉" position="left">
        <div class="drawer-content">左侧弹出内容</div>
      </t-drawer>

      <t-drawer v-model="visible3" title="右侧抽屉" position="right">
        <div class="drawer-content">右侧弹出内容</div>
      </t-drawer>

      <t-drawer v-model="visible4" title="顶部抽屉" position="top">
        <div class="drawer-content">顶部弹出内容</div>
      </t-drawer>

      <t-drawer v-model="visible5" title="底部抽屉" position="bottom">
        <div class="drawer-content">底部弹出内容</div>
      </t-drawer>
    </test-section>

    <!-- 尺寸和样式 -->
    <test-section title="尺寸和样式">
      <div class="button-group">
        <t-button @click="visible6 = true">自定义尺寸</t-button>
        <t-button @click="visible7 = true">自定义样式</t-button>
      </div>

      <t-drawer v-model="visible6" title="自定义尺寸" size="400px">
        <div class="drawer-content">自定义宽度为400px</div>
      </t-drawer>

      <t-drawer
        v-model="visible7"
        title="自定义样式"
        :padding="[24, 32, 24, 32]"
        :box-shadow="[0, 4, 12, 'rgba(0, 0, 0, 0.1)']"
        :offset="{ x: 20, y: 20 }"
      >
        <div class="drawer-content">自定义内边距、阴影和偏移</div>
      </t-drawer>
    </test-section>

    <!-- 按钮配置 -->
    <test-section title="按钮配置">
      <div class="button-group">
        <t-button @click="visible8 = true">按钮配置</t-button>
        <t-button @click="visible9 = true">隐藏按钮</t-button>
      </div>

      <t-drawer
        v-model="visible8"
        title="按钮配置"
        confirm-text="保存"
        cancel-text="返回"
        confirm-type="success"
        cancel-type="info"
        btn-align="center"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <div class="drawer-content">自定义按钮文本、类型和对齐方式</div>
      </t-drawer>

      <t-drawer v-model="visible9" title="隐藏按钮" :is-foot="false" :is-close-icon="false">
        <div class="drawer-content">隐藏底部按钮和关闭图标</div>
      </t-drawer>
    </test-section>

    <!-- 交互配置 -->
    <test-section title="交互配置">
      <div class="button-group">
        <t-button @click="visible10 = true">交互配置</t-button>
      </div>

      <t-drawer
        v-model="visible10"
        title="交互配置"
        :is-modal="false"
        :close-on-press-model="true"
        :close-on-press-escape="true"
        :is-set-max-height="false"
      >
        <div class="drawer-content">
          <p>交互配置：</p>
          <ul>
            <li>无遮罩层</li>
            <li>点击外部可关闭</li>
            <li>按ESC可关闭</li>
            <li>不限制最大高度</li>
          </ul>
        </div>
      </t-drawer>
    </test-section>

    <!-- 自定义内容 -->
    <test-section title="自定义内容">
      <div class="button-group">
        <t-button @click="visible11 = true">自定义内容</t-button>
      </div>

      <t-drawer v-model="visible11" icon="info">
        <template #title>
          <div class="custom-title">
            <t-icon icon="info" />
            <span>自定义标题</span>
          </div>
        </template>

        <div class="drawer-content">自定义内容区域</div>

        <template #foot>
          <div class="custom-footer">
            <t-button type="text">返回</t-button>
            <t-button type="primary">确定</t-button>
          </div>
        </template>
      </t-drawer>
    </test-section>

    <!-- 事件监听 -->
    <test-section title="事件监听">
      <div class="button-group">
        <t-button @click="visible12 = true">事件监听</t-button>
      </div>

      <t-drawer
        v-model="visible12"
        title="事件监听"
        @open="handleOpen"
        @close="handleClose"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <div class="drawer-content">
          <div class="event-log">
            <div class="event-title">事件记录：</div>
            <div v-for="(log, index) in logs" :key="index" class="event-item">
              {{ log }}
            </div>
          </div>
        </div>
      </t-drawer>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TButton } from "@/packages/button";
import { TIcon } from "@/packages/icon";
import { TDrawer } from "@/packages/drawer";
import TestSection from "./components/test-section.vue";

defineOptions({ name: "DrawerTest" });

// 控制显示
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const visible6 = ref(false);
const visible7 = ref(false);
const visible8 = ref(false);
const visible9 = ref(false);
const visible10 = ref(false);
const visible11 = ref(false);
const visible12 = ref(false);

// 事件日志
const logs = ref<string[]>([]);

// 事件处理
const handleOpen = () => {
  logs.value.push("触发 open 事件");
};

const handleClose = () => {
  logs.value.push("触发 close 事件");
};

const handleConfirm = () => {
  logs.value.push("触发 confirm 事件");
};

const handleCancel = () => {
  logs.value.push("触发 cancel 事件");
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

  .drawer-content {
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

  .custom-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 500;
    color: #1f2937;
  }

  .custom-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  .event-log {
    padding: 12px;
    background-color: #f9fafb;
    border-radius: 4px;

    .event-title {
      margin-bottom: 8px;
      font-weight: 500;
      color: #374151;
    }

    .event-item {
      padding: 4px 0;
      color: #666;
      font-size: 14px;
      font-family: monospace;
    }
  }
}
</style>
