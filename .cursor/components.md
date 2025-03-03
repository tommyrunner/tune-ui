# TUI 组件创建规则

本文档是创建新UI组件的规范和模板。创建新组件时，请严格按照此规范执行，确保组件风格一致、可维护性高。

## 1. 组件创建流程

1. **在packages目录创建组件文件夹和文件**
   - 在`src/packages/`下创建以组件名命名的文件夹(使用kebab-case)
   - 按照下面的文件结构创建必要文件

2. **创建测试用例**
   - 在`test/packages/`下创建测试文件
   - 遵循测试规范实现组件的测试用例

3. **注册组件**
   - 在`test/constants.ts`添加组件配置
   - 确保组件在测试环境中可用

## 2. 组件文件结构

组件目录结构必须遵循以下规范:

```
src/packages/组件名(kebab-case)/
├── index.vue        # 组件主文件
├── index.scss       # 组件样式文件
├── index.ts         # 组件导出文件
└── 组件名.ts        # 组件类型定义文件(kebab-case)
```

## 3. 组件文件详细规范

### 3.1 组件主文件 (index.vue)

```vue
<template>
  <div 
    :class="[
      't-组件名',  <!-- 组件根元素类名必须以t-前缀 -->
      {
        'is-disabled': props.disabled,
        [`t-组件名--${props.type}`]: props.type,
        [`t-组件名--${props.size}`]: props.size
      }
    ]"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- 前缀图标(如果需要) -->
    <t-icon 
      v-if="props.prefixIcon" 
      :icon="props.prefixIcon" 
      class="_prefixIcon" 
    />
    
    <!-- 默认插槽 -->
    <slot></slot>
    
    <!-- 后缀图标或加载图标(如果需要) -->
    <t-icon
      v-if="props.suffixIcon || props.loading"
      :icon="loadingIcon"
      :class="['_suffixIcon', props.loading && 't-loading']"
    />
  </div>
</template>

<script lang="ts" setup>
// 引入必要的类型和依赖，使用@路径别名
import { computed } from 'vue';
import type { EmitsType, PropsType } from './组件名'; // 使用组件名的kebab-case
import { configOptions } from "@/hooks/useOptions";
import { TIcon } from "@/packages/icon"; // 按需引入其他组件

// 设置组件名称，必须以T开头
defineOptions({ name: 'T组件名PascalCase' });

// Props 定义，使用withDefaults设置默认值
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  type: 'default',
  disabled: false,
  // 其他属性默认值
});

// Emits 定义
const emit = defineEmits<EmitsType>();

/**
 * 计算属性示例 - 必须添加JSDoc注释
 */
const loadingIcon = computed(() => {
  return props.loading ? 'loading' : props.suffixIcon;
});

/**
 * 事件处理方法 - 必须以handle前缀
 */
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};

// 计算样式类
const buttonClasses = computed(() => {
  const { size, type, disabled, radius } = props;
  return [
    't-组件名',
    `t-组件名--${size}`,
    `t-组件名--${type}`,
    radius && `t-组件名--${radius}`,
    disabled && 'is-disabled'
  ];
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
```

### 3.2 组件样式文件 (index.scss)

```scss
// 必须引入全局样式变量，禁止创建自定义变量
@import "@/styles/index.scss";

// 组件根类名
.t-组件名 {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: $font-size-default;
  color: $text-color-default;
  border: 1px solid $border-color-default;
  background-color: $bg-color-default;
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
  
  // 内部元素使用_前缀
  ._prefixIcon {
    margin-right: 5px;
  }
  
  ._suffixIcon {
    margin-left: 5px;
  }
  
  // 尺寸变量 - 使用--修饰符
  &--large {
    padding: 12px 20px;
    font-size: $font-size-large;
  }
  
  &--default {
    padding: 8px 16px;
    font-size: $font-size-default;
  }
  
  &--small {
    padding: 5px 10px;
    font-size: $font-size-small;
  }
  
  // 类型变量 - 使用--修饰符
  &--primary {
    color: $color-white;
    background-color: $theme-color-primary;
    border-color: $theme-color-primary;
  }
  
  &--success {
    color: $color-white;
    background-color: $theme-color-success;
    border-color: $theme-color-success;
  }
  
  // 其他类型...
  
  // 状态类 - 使用is-前缀
  &.is-disabled {
    cursor: not-allowed;
    opacity: $opacity-disabled;
    pointer-events: none;
  }
}
```

### 3.3 组件类型定义文件 (组件名.ts)

```typescript
// 引入基础类型，使用@别名
import { ElSizeType, type BaseProps } from "@/types";
import type { IconTypes } from "@/packages/icon/icon";

/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  /** 组件类型 */
  type?: "default" | "primary" | "success" | "info" | "warning" | "danger";
  
  /** 组件尺寸 */
  size?: ElSizeType;
  
  /** 前缀图标 - 使用IconTypes类型 */
  prefixIcon?: IconTypes;
  
  /** 后缀图标 - 使用IconTypes类型 */
  suffixIcon?: IconTypes;
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 其他属性... */
}

/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  /** 点击事件 */
  (e: "click", data: MouseEvent): void;
  
  /** 其他事件... */
  (e: "change", data: any): void;
}

/**
 * 组件常量 - 如果需要
 */
export const SOME_CONSTANTS = {
  // 常量配置
};
```

### 3.4 组件导出文件 (index.ts)

```typescript
import Component from './index.vue';

// 导出组件
export const T组件名PascalCase = Component;

// 导出组件类型
export type T组件名PascalCaseType = InstanceType<typeof Component>;

// 导出组件Props和Emits类型
export * from './组件名';

// 默认导出
export default Component;
```

## 4. 测试用例创建

在`test/packages/`目录下创建与组件同名的测试文件：

```vue
<template>
  <div class="test-container">
    <h2>组件名 组件</h2>

    <!-- 基础功能测试 -->
    <test-section title="基础功能">
      <t-组件名>默认组件</t-组件名>
      <t-组件名 type="primary">主要组件</t-组件名>
      <t-组件名 type="success">成功组件</t-组件名>
      <!-- 更多测试用例 -->
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <t-组件名 disabled>禁用组件</t-组件名>
    </test-section>

    <!-- 尺寸变化 -->
    <test-section title="组件尺寸">
      <t-组件名 size="small">小型组件</t-组件名>
      <t-组件名 size="default">默认组件</t-组件名>
      <t-组件名 size="large">大型组件</t-组件名>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-组件名 @click="handleClick">点击事件</t-组件名>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// 组件导入必须使用@别名
import { T组件名PascalCase } from "@/packages/组件名";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "组件名PascalCaseTest" });

/**
 * 处理点击事件
 */
const handleClick = (event: MouseEvent) => {
  console.log("组件被点击:", event);
};

// 其它测试逻辑...
</script>

<style lang="scss" scoped>
.test-container {
  padding: 24px;

  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 12px;
  }

  :deep(.test-section) {
    .test-section-content {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
  }
}
</style>
```

## 5. 组件注册

创建完测试用例后，需要在以下两个文件中进行同步更新：

### 5.1 更新 test/index.ts

将组件测试文件导出，以便在home.vue中使用：

```typescript
// 导出其他组件测试...
export { default as TButtonTest } from './packages/button.vue';
export { default as TInputTest } from './packages/input.vue';

// 导出新创建的组件测试
export { default as T组件名PascalCaseTest } from './packages/组件名.vue';
```

### 5.2 更新 test/home.vue

在home.vue中添加组件引入并配置到组件列表中：

```typescript
// 文件顶部引入
import {
  // 其他组件引入...
  TButtonTest,
  T组件名PascalCaseTest
} from "./index";

// 组件列表配置
const componentList: ComponentConfig[] = [
  // 其他组件...
  
  // 添加新组件配置 (根据组件类型选择合适的分类)
  { 
    name: "T组件名PascalCaseTest", 
    label: "组件名 组件", 
    category: ComponentCategory.Basic, // 根据组件性质选择合适的分类
    component: T组件名PascalCaseTest 
  },
];

// 设置当前组件为新创建的组件(如果需要)
const currentComponent = ref<ComponentConfig>(componentList.find(col => col.name === "T组件名PascalCaseTest"));
```

## 6. 命名规范

### 6.1 文件命名
- 组件文件夹: kebab-case (如 `button`, `date-picker`)
- 组件类型文件: 与文件夹同名 (如 `button.ts`, `date-picker.ts`)
- 其它文件: 使用 `index.vue`, `index.scss`, `index.ts`

### 6.2 组件内部命名
- 组件名称: PascalCase 并以T开头 (如 `TButton`, `TDatePicker`)
- Props属性: camelCase (如 `prefixIcon`, `borderRadius`)
- 事件名称: kebab-case (如 `click`, `change`, `update:model-value`)
- CSS类名: 
  - 根类名: `t-组件名` (kebab-case)
  - 修饰符: `t-组件名--修饰符` (如 `t-button--primary`)
  - 状态类: `is-状态` (如 `is-disabled`, `is-active`)
  - 内部元素: `_元素名` (如 `_prefixIcon`, `_content`)

### 6.3 方法命名
- 事件处理方法: `handle` + 事件名 (如 `handleClick`, `handleChange`)
- 状态切换方法: `toggle` + 状态名 (如 `toggleVisible`, `toggleActive`)
- 获取数据方法: `get` + 数据名 (如 `getData`, `getOptions`)

## 7. 样式编写规范

### 7.1 样式变量使用
- 必须使用 `@/styles/index.scss` 中定义的变量
- 禁止创建自定义变量
- 颜色必须使用预定义变量，不得使用硬编码颜色值

### 7.2 样式结构
- 使用BEM命名法
- 组件根元素使用 `t-` 前缀
- 内部元素使用 `_` 前缀
- 状态类使用 `is-` 前缀
- 修饰符使用 `--` 连接

### 7.3 响应式设计
- 组件应具备基本的响应式能力
- 合理使用flex布局
- 考虑移动端适配

## 8. Button组件参考

Button组件是一个很好的参考实例，包含了完整的组件结构和常用功能：

- 类型切换 (type属性)
- 尺寸变化 (size属性)
- 禁用状态 (disabled属性)
- 图标支持 (prefixIcon/suffixIcon属性)
- 加载状态 (loading属性)
- 圆角样式 (radius属性)
- 自定义颜色 (color属性)
- 点击事件处理

创建新组件时，可以参考Button组件的实现方式，根据实际需要调整组件结构和功能。

## 9. 注意事项

1. 严格遵循Vue3 Composition API和TypeScript类型规范
2. 所有引入必须使用`@`别名引入src目录下的文件
3. 图标只能使用`@/icons/iconfont.ts`中定义的图标
4. 样式变量只能使用`@/styles/index.scss`中定义的变量
5. 组件必须包含完整的类型定义和注释
6. 简单组件不要创建不必要的文件，保持结构简洁
7. 测试用例必须覆盖组件的主要功能和状态
