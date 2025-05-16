# 组件总览

Tune UI 组件库提供了丰富的组件，覆盖了常见的 UI 交互场景。以下是所有组件的分类导航（共有 38 个组件）。

<style>
.component-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.component-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.3s;
  color: var(--vp-c-text-1);
  font-weight: 500;
  text-decoration: none;
}

.component-item:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.component-icon {
  width: 30px;
  height: 30px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.component-icon img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.component-section {
  margin-bottom: 32px;
}
</style>

## 基础组件

<div class="component-section">
  <div class="component-list">
    <a href="/tune-ui/components/button" class="component-item">
      <span class="component-icon">
        <img src="/components/button.png" />
      </span>按钮 Button
    </a>
    <a href="/tune-ui/components/icon" class="component-item">
      <span class="component-icon">
        <img src="/components/icon.png" />
      </span>图标 Icon
    </a>
    <a href="/tune-ui/components/tag" class="component-item">
      <span class="component-icon">
        <img src="/components/tag.png" />
      </span>标签 Tag
    </a>
    <a href="/tune-ui/components/divider" class="component-item">
      <span class="component-icon">
        <img src="/components/divider.png" />
      </span>分割线 Divider
    </a>
  </div>
</div>

## 表单组件

<div class="component-section">
  <div class="component-list">
    <a href="/tune-ui/components/input" class="component-item">
      <span class="component-icon">
        <img src="/components/input.png" />
      </span>输入框 Input
    </a>
    <a href="/tune-ui/components/input-number" class="component-item">
      <span class="component-icon">
        <img src="/components/input-number.png" />
      </span>数字输入框 InputNumber
    </a>
    <a href="/tune-ui/components/textarea" class="component-item">
      <span class="component-icon">
        <img src="/components/textarea.png" />
      </span>文本域 Textarea
    </a>
    <a href="/tune-ui/components/radio" class="component-item">
      <span class="component-icon">
        <img src="/components/radio.png" />
      </span>单选框 Radio
    </a>
    <a href="/tune-ui/components/checkbox" class="component-item">
      <span class="component-icon">
        <img src="/components/checkbox.png" />
      </span>复选框 Checkbox
    </a>
    <a href="/tune-ui/components/switch" class="component-item">
      <span class="component-icon">
        <img src="/components/switch.png" />
      </span>开关 Switch
    </a>
    <a href="/tune-ui/components/select" class="component-item">
      <span class="component-icon">
        <img src="/components/select.png" />
      </span>选择器 Select
    </a>
    <a href="/tune-ui/components/rate" class="component-item">
      <span class="component-icon">
        <img src="/components/rate.png" />
      </span>评分 Rate
    </a>
    <a href="/tune-ui/components/slider" class="component-item">
      <span class="component-icon">
        <img src="/components/slider.png" />
      </span>滑块 Slider
    </a>
    <a href="/tune-ui/components/date-picker" class="component-item">
      <span class="component-icon">
        <img src="/components/date-picker.png" />
      </span>日期选择器 DatePicker
    </a>
    <a href="/tune-ui/components/date-picker-multiple" class="component-item">
      <span class="component-icon">
        <img src="/components/date-picker-multiple.png" />
      </span>多选日期选择器 DatePickerMultiple
    </a>
    <a href="/tune-ui/components/upload" class="component-item">
      <span class="component-icon">
        <img src="/components/upload.png" />
      </span>上传 Upload
    </a>
    <a href="/tune-ui/components/color-picker" class="component-item">
      <span class="component-icon">
        <img src="/components/color-picker.png" />
      </span>颜色选择器 ColorPicker
    </a>
  </div>
</div>

## 数据展示

<div class="component-section">
  <div class="component-list">
    <a href="/tune-ui/components/badge" class="component-item">
      <span class="component-icon">
        <img src="/components/badge.png" />
      </span>徽章 Badge
    </a>
    <a href="/tune-ui/components/card" class="component-item">
      <span class="component-icon">
        <img src="/components/card.png" />
      </span>卡片 Card
    </a>
    <a href="/tune-ui/components/carousel" class="component-item">
      <span class="component-icon">
        <img src="/components/carousel.png" />
      </span>轮播图 Carousel
    </a>
    <a href="/tune-ui/components/list-view" class="component-item">
      <span class="component-icon">
        <img src="/components/list-view.png" />
      </span>列表视图 ListView
    </a>
    <a href="/tune-ui/components/table" class="component-item">
      <span class="component-icon">
        <img src="/components/table.png" />
      </span>表格 Table
    </a>
    <a href="/tune-ui/components/progress" class="component-item">
      <span class="component-icon">
        <img src="/components/progress.png" />
      </span>进度条 Progress
    </a>
    <a href="/tune-ui/components/image" class="component-item">
      <span class="component-icon">
        <img src="/components/image.png" />
      </span>图片 Image
    </a>
    <a href="/tune-ui/components/calendar" class="component-item">
      <span class="component-icon">
        <img src="/components/calendar.png" />
      </span>日历 Calendar
    </a>
    <a href="/tune-ui/components/loading" class="component-item">
      <span class="component-icon">
        <img src="/components/loading.png" />
      </span>加载 Loading
    </a>
    <a href="/tune-ui/components/scrollbar" class="component-item">
      <span class="component-icon">
        <img src="/components/scrollbar.png" />
      </span>滚动条 Scrollbar
    </a>
  </div>
</div>

## 导航组件

<div class="component-section">
  <div class="component-list">
    <a href="/tune-ui/components/breadcrumb" class="component-item">
      <span class="component-icon">
        <img src="/components/breadcrumb.png" />
      </span>面包屑 Breadcrumb
    </a>
    <a href="/tune-ui/components/back-top" class="component-item">
      <span class="component-icon">
        <img src="/components/back-top.png" />
      </span>回到顶部 BackTop
    </a>
    <a href="/tune-ui/components/tabs" class="component-item">
      <span class="component-icon">
        <img src="/components/tabs.png" />
      </span>标签页 Tabs
    </a>
    <a href="/tune-ui/components/tree" class="component-item">
      <span class="component-icon">
        <img src="/components/tree.png" />
      </span>树形控件 Tree
    </a>
    <a href="/tune-ui/components/collapse" class="component-item">
      <span class="component-icon">
        <img src="/components/collapse.png" />
      </span>折叠面板 Collapse
    </a>
  </div>
</div>

## 反馈组件

<div class="component-section">
  <div class="component-list">
    <a href="/tune-ui/components/dialog" class="component-item">
      <span class="component-icon">
        <img src="/components/dialog.png" />
      </span>对话框 Dialog
    </a>
    <a href="/tune-ui/components/drawer" class="component-item">
      <span class="component-icon">
        <img src="/components/drawer.png" />
      </span>抽屉 Drawer
    </a>
    <a href="/tune-ui/components/pop-confirm" class="component-item">
      <span class="component-icon">
        <img src="/components/pop-confirm.png" />
      </span>气泡确认框 PopConfirm
    </a>
    <a href="/tune-ui/components/message" class="component-item">
      <span class="component-icon">
        <img src="/components/message.png" />
      </span>消息提示 Message
    </a>
    <a href="/tune-ui/components/popover" class="component-item">
      <span class="component-icon">
        <img src="/components/popover.png" />
      </span>气泡卡片 Popover
    </a>
  </div>
</div>

## 布局组件

<div class="component-section">
  <div class="component-list">
    <a href="/tune-ui/components/flex" class="component-item">
      <span class="component-icon">
        <img src="/components/flex.png" />
      </span>弹性布局 Flex
    </a>
  </div>
</div>
