<template>
  <div class="test-container">
    <h2>PopConfirm 气泡确认框</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-pop-confirm content="确定要删除这条记录吗？">
        <t-button type="danger" prefixIcon="delete">删除</t-button>
      </t-pop-confirm>
      <t-pop-confirm content="确定要禁用此功能吗？" disabled>
        <t-button type="info" prefixIcon="close">禁用状态</t-button>
      </t-pop-confirm>
    </test-section>

    <!-- 自定义图标 -->
    <test-section title="自定义图标">
      <t-pop-confirm content="确定要删除这条记录吗？" icon="delete" icon-color="#ff4d4f">
        <t-button type="danger" prefixIcon="delete">删除</t-button>
      </t-pop-confirm>
      <t-pop-confirm content="确定要保存修改吗？" icon="success-to" icon-color="#52c41a">
        <t-button type="success" prefixIcon="success-to">保存</t-button>
      </t-pop-confirm>
      <t-pop-confirm content="确定要执行此操作吗？" icon="information" icon-color="#1890ff">
        <t-button type="primary" prefixIcon="information">提示</t-button>
      </t-pop-confirm>
      <t-pop-confirm content="确定要执行此操作吗？" icon="illustrate" icon-color="#faad14">
        <t-button type="warning" prefixIcon="illustrate">警告</t-button>
      </t-pop-confirm>
    </test-section>

    <!-- 自定义按钮 -->
    <test-section title="自定义按钮">
      <t-pop-confirm
        content="确定要执行此操作吗？"
        confirm-text="执行"
        cancel-text="返回"
        confirm-type="primary"
        cancel-type="info"
      >
        <t-button type="primary" prefixIcon="position">自定义按钮</t-button>
      </t-pop-confirm>
    </test-section>

    <!-- 弹出位置 -->
    <test-section title="弹出位置">
      <div class="position-group">
        <t-pop-confirm content="顶部弹出" position="top">
          <t-button type="info" prefixIcon="up">上</t-button>
        </t-pop-confirm>
        <t-pop-confirm content="右侧弹出" position="right">
          <t-button type="info" prefixIcon="right">右</t-button>
        </t-pop-confirm>
        <t-pop-confirm content="底部弹出" position="bottom">
          <t-button type="info" prefixIcon="left">下</t-button>
        </t-pop-confirm>
        <t-pop-confirm content="左侧弹出" position="left">
          <t-button type="info" prefixIcon="downward">左</t-button>
        </t-pop-confirm>
      </div>
    </test-section>

    <!-- 自定义样式 -->
    <test-section title="自定义样式">
      <t-pop-confirm
        content="自定义样式的确认框"
        :padding="[12, 16, 12, 16]"
        :box-shadow="[0, 4, 12, 'rgba(0, 0, 0, 0.1)']"
        max-width="300px"
      >
        <t-button type="warning" prefixIcon="edit">自定义样式</t-button>
      </t-pop-confirm>
    </test-section>

    <!-- 触发配置 -->
    <test-section title="触发配置">
      <t-pop-confirm content="支持ESC关闭" :close-on-press-escape="true">
        <t-button type="primary" prefixIcon="close">ESC关闭</t-button>
      </t-pop-confirm>
      <t-pop-confirm content="点击其他区域关闭" :close-on-press-other="true">
        <t-button type="primary" prefixIcon="position">点击其他关闭</t-button>
      </t-pop-confirm>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-pop-confirm content="测试事件回调" @confirm="handleConfirm" @cancel="handleCancel">
        <t-button type="success" prefixIcon="link">事件测试</t-button>
      </t-pop-confirm>
      <div class="event-log" v-if="logs.length">
        <div class="event-title">事件记录：</div>
        <div v-for="(log, index) in logs" :key="index" class="event-item">
          {{ log }}
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TPopConfirm } from "@/packages/popConfirm";
import { TButton } from "@/packages/button";
import TestSection from "./components/test-section.vue";

defineOptions({ name: "PopConfirmTest" });

// 事件日志
const logs = ref<string[]>([]);

// 添加日志
const addLog = (message: string) => {
  logs.value.unshift(message);
  if (logs.value.length > 5) {
    logs.value.pop();
  }
};

// 事件处理
const handleConfirm = () => {
  addLog("点击了确认按钮");
};

const handleCancel = () => {
  addLog("点击了取消按钮");
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

  .position-group {
    display: flex;
    gap: 12px;
  }

  // 增加测试区域间距
  :deep(.test-section) {
    margin-bottom: 24px;

    .button-group {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
  }

  .event-log {
    margin-top: 16px;
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
