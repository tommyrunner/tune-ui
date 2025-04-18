# 组件总览

Tune UI 组件库提供了丰富的组件，覆盖了常见的 UI 交互场景。以下是所有组件的分类导航。

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
  font-size: 20px;
  margin-right: 8px;
  color: var(--vp-c-brand);
}

.component-section {
  margin-bottom: 32px;
}
</style>

## 基础组件

<div class="component-section">
  <div class="component-list">
    <a href="/components/button" class="component-item">
      <span class="component-icon">⚡</span>按钮 Button
    </a>
    <a href="/components/icon" class="component-item">
      <span class="component-icon">🎨</span>图标 Icon
    </a>
    <a href="/components/layout" class="component-item">
      <span class="component-icon">🔳</span>布局 Layout
    </a>
    <a href="/components/empty" class="component-item">
      <span class="component-icon">📭</span>空状态 Empty
    </a>
  </div>
</div>

## 表单组件

<div class="component-section">
  <div class="component-list">
    <a href="/components/input" class="component-item">
      <span class="component-icon">📝</span>输入框 Input
    </a>
    <a href="/components/input-number" class="component-item">
      <span class="component-icon">🔢</span>数字输入框 InputNumber
    </a>
    <a href="/components/textarea" class="component-item">
      <span class="component-icon">📋</span>文本域 Textarea
    </a>
    <a href="/components/radio" class="component-item">
      <span class="component-icon">⭕</span>单选框 Radio
    </a>
    <a href="/components/checkbox" class="component-item">
      <span class="component-icon">✅</span>复选框 Checkbox
    </a>
    <a href="/components/select" class="component-item">
      <span class="component-icon">📊</span>选择器 Select
    </a>
    <a href="/components/switch" class="component-item">
      <span class="component-icon">🔘</span>开关 Switch
    </a>
    <a href="/components/slider" class="component-item">
      <span class="component-icon">📏</span>滑块 Slider
    </a>
    <a href="/components/date-picker" class="component-item">
      <span class="component-icon">📅</span>日期选择器 DatePicker
    </a>
    <a href="/components/upload" class="component-item">
      <span class="component-icon">📤</span>上传 Upload
    </a>
    <a href="/components/rate" class="component-item">
      <span class="component-icon">⭐</span>评分 Rate
    </a>
    <a href="/components/color-picker" class="component-item">
      <span class="component-icon">🎭</span>颜色选择器 ColorPicker
    </a>
  </div>
</div>

## 数据展示

<div class="component-section">
  <div class="component-list">
    <a href="/components/table" class="component-item">
      <span class="component-icon">🗃️</span>表格 Table
    </a>
    <a href="/components/list-view" class="component-item">
      <span class="component-icon">📜</span>列表 List
    </a>
    <a href="/components/tree" class="component-item">
      <span class="component-icon">🌲</span>树形控件 Tree
    </a>
    <a href="/components/tabs" class="component-item">
      <span class="component-icon">📑</span>标签页 Tabs
    </a>
    <a href="/components/tag" class="component-item">
      <span class="component-icon">🏷️</span>标签 Tag
    </a>
    <a href="/components/progress" class="component-item">
      <span class="component-icon">📊</span>进度条 Progress
    </a>
    <a href="/components/badge" class="component-item">
      <span class="component-icon">🔰</span>徽章 Badge
    </a>
    <a href="/components/card" class="component-item">
      <span class="component-icon">🎴</span>卡片 Card
    </a>
    <a href="/components/carousel" class="component-item">
      <span class="component-icon">🎠</span>走马灯 Carousel
    </a>
    <a href="/components/image" class="component-item">
      <span class="component-icon">🖼️</span>图片 Image
    </a>
    <a href="/components/calendar" class="component-item">
      <span class="component-icon">📆</span>日历 Calendar
    </a>
  </div>
</div>

## 反馈组件

<div class="component-section">
  <div class="component-list">
    <a href="/components/dialog" class="component-item">
      <span class="component-icon">💬</span>对话框 Dialog
    </a>
    <a href="/components/drawer" class="component-item">
      <span class="component-icon">🧩</span>抽屉 Drawer
    </a>
    <a href="/components/pop-confirm" class="component-item">
      <span class="component-icon">❓</span>气泡确认框 PopConfirm
    </a>
    <a href="/components/message" class="component-item">
      <span class="component-icon">📨</span>消息提示 Message
    </a>
    <a href="/components/popover" class="component-item">
      <span class="component-icon">🔍</span>气泡卡片 Popover
    </a>
  </div>
</div>

## 导航组件

<div class="component-section">
  <div class="component-list">
    <a href="/components/breadcrumb" class="component-item">
      <span class="component-icon">🧵</span>面包屑 Breadcrumb
    </a>
    <a href="/components/back-top" class="component-item">
      <span class="component-icon">⬆️</span>回到顶部 BackTop
    </a>
    <a href="/components/collapse" class="component-item">
      <span class="component-icon">🗂️</span>折叠面板 Collapse
    </a>
  </div>
</div>

## 其他组件

<div class="component-section">
  <div class="component-list">
    <a href="/components/scrollbar" class="component-item">
      <span class="component-icon">📹</span>滚动条 Scrollbar
    </a>
    <a href="/components/flex" class="component-item">
      <span class="component-icon">🧩</span>弹性布局 Flex
    </a>
  </div>
</div>

## 开发指南

如需了解如何开发新组件，请参考 [组件开发指南](/guide/component-development)。 