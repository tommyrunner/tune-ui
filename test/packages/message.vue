<template>
  <div class="test-container">
    <h2>Message 消息提示组件</h2>

    <!-- 基础类型 -->
    <test-section title="基础类型">
      <div class="button-group">
        <t-button type="info" prefixIcon="help" @click="showMessage('info')">信息消息</t-button>
        <t-button type="success" prefixIcon="success-to" @click="showMessage('success')">成功消息</t-button>
        <t-button type="warning" prefixIcon="illustrate" @click="showMessage('warning')">警告消息</t-button>
        <t-button type="danger" prefixIcon="close-to" @click="showMessage('danger')">错误消息</t-button>
      </div>
    </test-section>

    <!-- 消息样式 -->
    <test-section title="消息样式">
      <div class="button-group">
        <t-button type="primary" prefixIcon="edit" @click="showStyleMessage">自定义宽度</t-button>
        <t-button type="primary" prefixIcon="menu" @click="showPlainMessage">朴素样式</t-button>
        <t-button type="primary" prefixIcon="information" @click="showCustomIconMessage">自定义图标</t-button>
        <t-button type="primary" prefixIcon="position" @click="showMaxLengthMessage">最大数量</t-button>
      </div>
    </test-section>

    <!-- 通知类型 -->
    <test-section title="通知类型">
      <div class="button-group">
        <t-button type="success" prefixIcon="afferent" @click="showNotice('topRight')">右上角</t-button>
        <t-button type="success" prefixIcon="afferent" @click="showNotice('bottomRight')">右下角</t-button>
        <t-button type="success" prefixIcon="position" @click="showNotice('bottomLeft')">左下角</t-button>
        <t-button type="success" prefixIcon="link" @click="showNotice('topLeft')">左上角</t-button>
      </div>
    </test-section>

    <!-- 关闭配置 -->
    <test-section title="关闭配置">
      <div class="button-group">
        <t-button type="info" prefixIcon="close" @click="showCloseMessage">手动关闭</t-button>
        <t-button type="info" prefixIcon="close-to" @click="showEscMessage">ESC关闭</t-button>
        <t-button type="info" prefixIcon="link" @click="showAutoCloseMessage">自动关闭</t-button>
      </div>
    </test-section>

    <!-- 自定义配置 -->
    <test-section title="自定义配置">
      <div class="button-group">
        <t-button type="primary" prefixIcon="position" @click="showCustomAppendMessage">自定义挂载</t-button>
        <t-button type="primary" prefixIcon="link" @click="showCustomPositionMessage">自定义位置</t-button>
      </div>
      <div id="custom-append" class="custom-append"></div>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <div class="button-group">
        <t-button type="warning" prefixIcon="link" @click="showCallbackMessage">关闭回调</t-button>
        <t-button type="warning" prefixIcon="map" @click="showMultipleMessage">多消息堆叠</t-button>
      </div>
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
import type { PropsType } from "@/packages/message/types";
import { TMessage, TNotification } from "@/packages/message";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "MessageTest" });

// 事件日志
const logs = ref<string[]>([]);

/**
 * 显示基础消息
 */
const showMessage = (type: PropsType["type"]) => {
  TMessage.message(`这是一条${type}消息`, type);
};

/**
 * 显示样式消息
 */
const showStyleMessage = () => {
  TMessage.message("自定义宽度和内边距的消息", "info", {
    width: "400px",
    padding: [12, 24, 12, 24],
    radius: [8, 8, 8, 8]
  });
};

/**
 * 显示朴素消息
 */
const showPlainMessage = () => {
  TMessage.message("这是一条朴素样式的消息", "success", {
    plain: true
  });
};

/**
 * 显示自定义图标消息
 */
const showCustomIconMessage = () => {
  TMessage.message("使用自定义图标的消息", "info", {
    icon: "information"
  });
};

/**
 * 显示最大数量消息
 */
const showMaxLengthMessage = () => {
  for (let i = 0; i < 3; i++) {
    TMessage.message(`消息 ${i + 1}`, "info", {
      maxLength: 2
    });
  }
};

/**
 * 显示通知消息
 */
const showNotice = (position: PropsType["position"]) => {
  TNotification.message("通知标题", "这是一条通知消息内容", "info", {
    position,
    icon: "information",
    isClose: true,
    closeCallback: id => {
      logs.value.unshift(`通知 ${id} 已关闭`);
      if (logs.value.length > 5) logs.value.pop();
    }
  });
};

/**
 * 显示手动关闭消息
 */
const showCloseMessage = () => {
  TMessage.message("点击关闭按钮可以关闭此消息", "info", {
    duration: 0,
    isClose: true,
    closeCallback: id => {
      logs.value.unshift(`手动关闭消息 ${id}`);
      if (logs.value.length > 5) logs.value.pop();
    }
  });
};

/**
 * 显示ESC关闭消息
 */
const showEscMessage = () => {
  TMessage.message("按ESC键可以关闭此消息", "info", {
    duration: 0,
    closeOnPressEscape: true,
    closeCallback: id => {
      logs.value.unshift(`ESC关闭消息 ${id}`);
      if (logs.value.length > 5) logs.value.pop();
    }
  });
};

/**
 * 显示自动关闭消息
 */
const showAutoCloseMessage = () => {
  TMessage.message("此消息将在3秒后自动关闭", "info", {
    duration: 3000,
    closeCallback: id => {
      logs.value.unshift(`自动关闭消息 ${id}`);
      if (logs.value.length > 5) logs.value.pop();
    }
  });
};

/**
 * 显示自定义挂载消息
 */
const showCustomAppendMessage = () => {
  TMessage.message("自定义挂载到指定容器", "info", {
    appendTo: "#custom-append",
    isClose: true,
    closeCallback: id => {
      logs.value.unshift(`自定义挂载消息 ${id} 已关闭`);
      if (logs.value.length > 5) logs.value.pop();
    }
  });
};

/**
 * 显示自定义位置消息
 */
const showCustomPositionMessage = () => {
  TMessage.message("自定义显示位置", "info", {
    custom: {
      x: "80%",
      y: "100px"
    },
    isClose: true
  });
};

/**
 * 显示回调消息
 */
const showCallbackMessage = () => {
  TMessage.message("关闭此消息会触发回调", "info", {
    isClose: true,
    closeCallback: id => {
      logs.value.unshift(`回调消息 ${id} 已关闭`);
      if (logs.value.length > 5) logs.value.pop();
    }
  });
};

/**
 * 显示多条消息
 */
const showMultipleMessage = () => {
  ["info", "success", "warning", "danger"].forEach((type, index) => {
    setTimeout(() => {
      TMessage.message(`第 ${index + 1} 条消息`, type as PropsType["type"], {
        isClose: true,
        closeCallback: id => {
          logs.value.unshift(`堆叠消息 ${id} 已关闭`);
          if (logs.value.length > 5) logs.value.pop();
        }
      });
    }, index * 1000);
  });
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
    flex-wrap: wrap;
  }

  .custom-append {
    margin-top: 16px;
    height: 100px;
    background-color: #f9fafb;
    border: 1px dashed #e5e7eb;
    border-radius: 4px;
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
