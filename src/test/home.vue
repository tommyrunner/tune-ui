<template>
  <div class="test-home">
    <!-- 侧边栏 -->
    <div class="test-sidebar">
      <div class="sidebar-header">
        <h1>TUI 组件库</h1>
      </div>
      <div class="sidebar-content">
        <div
          v-for="item in componentList"
          :key="item.name"
          :class="['sidebar-item', currentComponent?.name === item.name && 'active']"
          @click="handleComponentChange(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>

    <!-- 内容区 -->
    <div class="test-content">
      <component :is="currentComponent?.component" v-if="currentComponent" />
      <div v-else class="welcome-content">
        <h2>欢迎使用 TUI 组件库</h2>
        <p>请从左侧选择组件进行预览</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  TBackTopTest,
  TButtonTest,
  TInputTest,
  TTextareaTest,
  TBadgeTest,
  TBreadcrumbTest,
  TCardTest,
  TCarouselTest,
  TCheckboxTest,
  TCollapseTest,
  TDialogTest,
  TDrawerTest,
  TFlexTest,
  TIconTest,
  TInputNumberTest,
  TMessageTest,
  TPopoverTest,
  TPopConfirmTest,
  TRadioTest,
  TRateTest,
  TSwitchTest,
  TTabsTest
} from "./index";

defineOptions({ name: "TestHome" });

interface ComponentItem {
  name: string;
  label: string;
  component: typeof TButtonTest;
}

// 组件列表
const componentList: ComponentItem[] = [
  { name: "TButtonTest", label: "Button 按钮", component: TButtonTest },
  { name: "TInputTest", label: "Input 输入框", component: TInputTest },
  { name: "TTextareaTest", label: "Textarea 文本域", component: TTextareaTest },
  { name: "TBackTopTest", label: "BackTop 回到顶部", component: TBackTopTest },
  { name: "TBadgeTest", label: "Badge 徽标", component: TBadgeTest },
  { name: "TBreadcrumbTest", label: "Breadcrumb 面包屑", component: TBreadcrumbTest },
  { name: "TCardTest", label: "Card 卡片", component: TCardTest },
  { name: "TCarouselTest", label: "Carousel 轮播", component: TCarouselTest },
  { name: "TCheckboxTest", label: "Checkbox 复选框", component: TCheckboxTest },
  { name: "TCollapseTest", label: "Collapse 折叠面板", component: TCollapseTest },
  { name: "TDialogTest", label: "Dialog 对话框", component: TDialogTest },
  { name: "TDrawerTest", label: "Drawer 抽屉", component: TDrawerTest },
  { name: "TFlexTest", label: "Flex 布局", component: TFlexTest },
  { name: "TIconTest", label: "Icon 图标", component: TIconTest },
  { name: "TInputNumberTest", label: "InputNumber 数值输入框", component: TInputNumberTest },
  { name: "TMessageTest", label: "Message 消息提示", component: TMessageTest },
  { name: "TPopoverTest", label: "Popover 弹出框", component: TPopoverTest },
  { name: "TPopConfirmTest", label: "PopConfirm 气泡确认框", component: TPopConfirmTest },
  { name: "TRadioTest", label: "Radio 单选框", component: TRadioTest },
  { name: "TRateTest", label: "Rate 评分", component: TRateTest },
  { name: "TSwitchTest", label: "Switch 开关", component: TSwitchTest },
  { name: "TTabsTest", label: "Tabs 标签页", component: TTabsTest }
];

// 当前选中的组件(默认最后一个)
const currentComponent = ref<ComponentItem>(componentList[componentList.length - 1]);

/**
 * 处理组件切换
 */
const handleComponentChange = (item: ComponentItem) => {
  currentComponent.value = item;
};
</script>

<style lang="scss" scoped>
.test-home {
  display: flex;
  min-height: 100vh;
  background-color: #f3f4f6;

  .test-sidebar {
    width: 240px;
    background-color: #fff;
    border-right: 1px solid #e5e7eb;

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid #e5e7eb;

      h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
        color: #111827;
      }
    }

    .sidebar-content {
      padding: 12px 0;
    }

    .sidebar-item {
      padding: 12px 20px;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: #f9fafb;
        color: #3b82f6;
      }

      &.active {
        background-color: #eff6ff;
        color: #3b82f6;
        font-weight: 500;
      }
    }
  }

  .test-content {
    flex: 1;
    padding: 20px;
    overflow: auto;
  }

  .welcome-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #6b7280;

    h2 {
      margin: 0 0 12px;
      font-size: 28px;
      font-weight: 500;
    }

    p {
      margin: 0;
      font-size: 16px;
    }
  }
}
</style>
