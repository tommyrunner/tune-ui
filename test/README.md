# TUI 组件测试用例样式指南

本文档提供了 TUI 组件测试用例的样式指南，帮助开发者统一测试用例的视觉风格。

## 通用样式

我们提供了一个通用样式文件 `styles/test-common.scss`，包含了测试用例中常用的样式定义。使用这个样式文件可以确保所有测试用例具有一致的外观。

## 使用方法

1. 在测试用例组件中导入通用样式：

```vue
<style lang="scss">
@import "../styles/test-common.scss";
</style>
```

2. 使用预定义的样式类：

```vue
<template>
  <div class="test-container">
    <h2>测试用例标题</h2>
    
    <!-- 使用 test-section 组件 -->
    <test-section title="基础用法">
      <template #content>
        <!-- 组件测试内容 -->
      </template>
    </test-section>
    
    <!-- 事件日志 -->
    <div class="event-log">
      <div class="event-title">事件记录</div>
      <div v-for="(event, index) in events" :key="index" class="event-item">
        {{ event }}
      </div>
    </div>
    
    <!-- 数据预览 -->
    <div class="data-preview">
      <div class="preview-item">
        <span class="label">标签：</span>
        <span class="value">值</span>
      </div>
    </div>
  </div>
</template>
```

## 样式类说明

### 基础容器

- `.test-container` - 测试用例的主容器，提供统一的内边距
- `h2` - 测试用例标题样式

### 测试区域

- `.test-section` - 测试区域组件，用于分组展示不同的测试场景
  - `.test-section-content` - 测试内容区域，使用 flex 布局

### 事件日志

- `.event-log` - 事件日志容器
  - `.event-title` - 事件日志标题
  - `.event-item` - 单个事件项

### 数据展示

- `.value-display` - 简单值显示容器
- `.data-preview` - 数据预览容器
  - `.preview-item` - 数据项
    - `.label` - 数据标签
    - `.value` - 数据值

## 示例

请参考 `packages/example-test.vue` 文件，了解如何使用这些样式类创建一个统一风格的测试用例。 