<template>
  <div class="test-home">
    <!-- 侧边栏 -->
    <div class="test-sidebar">
      <div class="sidebar-header">
        <div class="header-content">
          <h1>TUI 组件库</h1>
          <span class="total-count">{{ componentList.length }}个组件</span>
        </div>
      </div>
      <div class="sidebar-content">
        <div v-for="category in categories" :key="category" class="category-group">
          <div class="category-title">
            <span>{{ category }}</span>
            <span class="count">({{ getComponentsByCategory(category).length }})</span>
          </div>
          <div
            v-for="item in getComponentsByCategory(category)"
            :key="item.name"
            :class="['sidebar-item', currentComponent?.name === item.name && 'active']"
            @click="handleComponentChange(item)"
          >
            {{ item.label }}
          </div>
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
import { ref, computed } from "vue";
import { ComponentCategory, type ComponentConfig } from "./constants";
import {
  TButtonTest,
  TInputTest,
  TTextareaTest,
  TBackTopTest,
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
  TTabsTest,
  TListViewTest,
  TScrollbarTest,
  TTableTest,
  TSelectTest,
  TTagTest,
  TCalendarTest,
  TDatePickerTest,
  TDatePickerMultipleTest,
  TColorPickerTest,
  TSliderTest,
  TProgressTest,
  TImageTest,
  TUploadTest,
  TTreeTest,
  TFormTest,
  TDividerTest,
  TWatermarkTest,
  TMenuTest
} from "./index";

defineOptions({ name: "TestHome" });

// 组件列表配置
const componentList: ComponentConfig[] = [
  // 基础组件
  { name: "TButtonTest", label: "Button 按钮", category: ComponentCategory.Basic, component: TButtonTest },
  { name: "TIconTest", label: "Icon 图标", category: ComponentCategory.Basic, component: TIconTest },
  { name: "TTagTest", label: "Tag 标签", category: ComponentCategory.Basic, component: TTagTest },
  // 表单组件
  { name: "TInputTest", label: "Input 输入框", category: ComponentCategory.Form, component: TInputTest },
  { name: "TInputNumberTest", label: "InputNumber 数值输入框", category: ComponentCategory.Form, component: TInputNumberTest },
  { name: "TTextareaTest", label: "Textarea 文本域", category: ComponentCategory.Form, component: TTextareaTest },
  { name: "TRadioTest", label: "Radio 单选框", category: ComponentCategory.Form, component: TRadioTest },
  { name: "TCheckboxTest", label: "Checkbox 复选框", category: ComponentCategory.Form, component: TCheckboxTest },
  { name: "TSwitchTest", label: "Switch 开关", category: ComponentCategory.Form, component: TSwitchTest },
  { name: "TRateTest", label: "Rate 评分", category: ComponentCategory.Form, component: TRateTest },
  { name: "TSelectTest", label: "Select 选择器", category: ComponentCategory.Form, component: TSelectTest },
  { name: "TDatePickerTest", label: "DatePicker 日期选择器", category: ComponentCategory.Form, component: TDatePickerTest },
  {
    name: "TDatePickerMultipleTest",
    label: "DatePickerMultiple 多选日期选择器",
    category: ComponentCategory.Form,
    component: TDatePickerMultipleTest
  },
  { name: "TColorPickerTest", label: "ColorPicker 颜色选择器", category: ComponentCategory.Form, component: TColorPickerTest },
  { name: "TSliderTest", label: "Slider 滑块", category: ComponentCategory.Form, component: TSliderTest },
  { name: "TUploadTest", label: "Upload 上传", category: ComponentCategory.Form, component: TUploadTest },
  { name: "TFormTest", label: "Form 表单", category: ComponentCategory.Form, component: TFormTest },

  // 数据展示
  { name: "TBadgeTest", label: "Badge 徽标", category: ComponentCategory.Data, component: TBadgeTest },
  { name: "TCardTest", label: "Card 卡片", category: ComponentCategory.Data, component: TCardTest },
  { name: "TCarouselTest", label: "Carousel 轮播", category: ComponentCategory.Data, component: TCarouselTest },
  { name: "TCollapseTest", label: "Collapse 折叠面板", category: ComponentCategory.Data, component: TCollapseTest },
  { name: "TListViewTest", label: "ListView 列表视图", category: ComponentCategory.Data, component: TListViewTest },
  { name: "TScrollbarTest", label: "Scrollbar 滚动条", category: ComponentCategory.Data, component: TScrollbarTest },
  { name: "TTableTest", label: "Table 表格", category: ComponentCategory.Data, component: TTableTest },
  { name: "TProgressTest", label: "Progress 进度条", category: ComponentCategory.Data, component: TProgressTest },
  { name: "TImageTest", label: "Image 图片", category: ComponentCategory.Data, component: TImageTest },
  { name: "TTreeTest", label: "Tree 树形控件", category: ComponentCategory.Navigation, component: TTreeTest },

  // 反馈组件
  { name: "TMessageTest", label: "Message 消息提示", category: ComponentCategory.Feedback, component: TMessageTest },
  { name: "TDialogTest", label: "Dialog 对话框", category: ComponentCategory.Feedback, component: TDialogTest },
  { name: "TDrawerTest", label: "Drawer 抽屉", category: ComponentCategory.Feedback, component: TDrawerTest },
  { name: "TPopoverTest", label: "Popover 弹出框", category: ComponentCategory.Feedback, component: TPopoverTest },
  { name: "TPopConfirmTest", label: "PopConfirm 气泡确认框", category: ComponentCategory.Feedback, component: TPopConfirmTest },

  // 导航组件
  { name: "TBreadcrumbTest", label: "Breadcrumb 面包屑", category: ComponentCategory.Navigation, component: TBreadcrumbTest },
  { name: "TBackTopTest", label: "BackTop 回到顶部", category: ComponentCategory.Navigation, component: TBackTopTest },
  { name: "TTabsTest", label: "Tabs 标签页", category: ComponentCategory.Navigation, component: TTabsTest },
  { name: "TMenuTest", label: "Menu 菜单", category: ComponentCategory.Navigation, component: TMenuTest },

  // 布局组件
  { name: "TFlexTest", label: "Flex 布局", category: ComponentCategory.Layout, component: TFlexTest },
  { name: "TCalendarTest", label: "Calendar 日历", category: ComponentCategory.Layout, component: TCalendarTest },
  { name: "TDividerTest", label: "Divider 分割线", category: ComponentCategory.Basic, component: TDividerTest },
  { name: "TWatermarkTest", label: "Watermark 水印", category: ComponentCategory.Layout, component: TWatermarkTest }
];

// 根据分类获取组件
const getComponentsByCategory = (category: ComponentCategory) => {
  return componentList.filter(item => item.category === category);
};

// 当前选中的组件(默认第一个)
const currentComponent = ref<ComponentConfig>(componentList.find(col => col.name === "TMenuTest"));

// 处理组件切换
const handleComponentChange = (item: ComponentConfig) => {
  currentComponent.value = item;
};

// 获取所有分类
const categories = computed(() => {
  const categorySet = new Set(componentList.map(item => item.category));
  return Array.from(categorySet);
});
</script>

<style lang="scss" scoped>
.test-home {
  display: flex;
  min-height: 100vh;
  box-sizing: border-box;
  .test-sidebar {
    position: relative;
    width: 260px;
    background-color: #fff;
    border-right: 1px solid #e5e7eb;

    .sidebar-header {
      display: flex;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #e5e7eb;

      .header-content {
        flex: 1;

        h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .total-count {
          font-size: 12px;
          color: #6b7280;
        }
      }
    }

    .sidebar-content {
      padding: 12px 0;
      height: calc(100vh - 120px);
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #d1d5db;
        border-radius: 3px;
      }

      .category-group {
        margin-bottom: 16px;

        .category-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 20px;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          background-color: #f3f4f6;
          transition: all 0.2s;

          span {
            transition: opacity 0.2s;
          }

          .count {
            font-size: 12px;
            color: #9ca3af;
          }
        }

        .sidebar-item {
          padding: 12px 20px;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &:hover {
            background-color: #f9fafb;
            color: #3b82f6;
          }

          &.active {
            background-color: #eff6ff;
            color: #3b82f6;
            font-weight: 500;
            border-right: 2px solid #3b82f6;
          }
        }
      }
    }
  }

  .test-content {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    height: 100vh;
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
