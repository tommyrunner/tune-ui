# 组件开发指南

本文档提供了关于如何为 Tune UI 组件库开发新组件的指南。

## 目录结构

组件存放路径统一为 `tune-ui/src/packages` 目录下，每个组件应遵循以下目录结构:

```
packages/
├── 组件名/
│   ├── index.vue          # 主组件
│   ├── index.ts           # 组件导出入口
│   ├── 组件名.ts           # 类型定义文件
│   ├── index.scss         # 主样式文件
│   ├── constants.ts       # 常量和注入键定义
│   ├── components/        # 子组件目录
│   │   ├── 子组件名/
│   │   │   ├── 子组件名.vue
│   │   │   └── 子组件名.scss
```

## 基本规范

### 组件命名

- 所有组件**必须**使用`<script lang="ts" setup>`语法糖方式开发
- 组件命名必须使用`T`前缀，例如`TUpload`、`TButton`
- 使用`defineOptions({name: "T组件名"})`明确定义组件名称
- 保持组件的单一职责原则，一个组件只负责一个功能

### 示例代码

```vue
<template>
  <button class="t-button" :class="buttonClasses">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { PropsType } from './button';

defineOptions({
  name: "TButton"
});

const props = withDefaults(defineProps<PropsType>(), {
  type: 'default',
  size: 'default',
  disabled: false
});

const buttonClasses = computed(() => ({
  't-button--primary': props.type === 'primary',
  't-button--disabled': props.disabled,
  [`t-button--${props.size}`]: props.size !== 'default'
}));
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
```

## 类型定义

所有的Props和Emits类型必须定义在单独的TS文件中，并使用JSDoc注释:

```typescript
/**
 * @description 按钮组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 按钮类型 */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  /** 按钮尺寸 */
  size?: 'large' | 'default' | 'small' | 'mini';
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * @description 按钮组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 点击事件 */
  (e: 'click', event: MouseEvent): void;
}
```

## 双向绑定

双向绑定必须使用`defineModel`，不能使用`v-model:prop`和`update:prop`旧方式:

```typescript
const value = defineModel<string>("value", { default: "" });
```

## 组件通信

优先使用`provide/inject`方式实现组件通信:

```typescript
// constants.ts
import type { InjectionKey } from 'vue';
import type { ComponentContextType } from './component';

export const componentKey: InjectionKey<ComponentContextType> = Symbol('componentKey');

// 父组件
import { provide } from 'vue';
import { componentKey } from './constants';

provide(componentKey, {
  value: modelValue,
  disabled: props.disabled
});

// 子组件
import { inject } from 'vue';
import { componentKey } from '../../constants';
import type { ComponentContextType } from '../../component';

const componentContext = inject<ComponentContextType>(componentKey, {
  value: '',
  disabled: false
});
```

## 样式规范

### BEM命名规范

使用BEM命名规范结合SCSS嵌套语法:

```scss
.t-button {
  // 按钮基础样式
  
  &__icon {
    // 图标样式
  }
  
  &--primary {
    // 主要按钮样式
  }
  
  &--large {
    // 大型按钮样式
  }
  
  &--disabled {
    // 禁用状态样式
  }
}
```

### 样式变量

优先使用全局变量:

```scss
@import "@/styles/index.scss";

.t-button {
  font-size: $font-size-default;
  color: $text-color;
  background-color: $bg-color;
  
  &--primary {
    color: $text-color-inverse;
    background-color: $theme-color-primary;
  }
}
```

## 导入顺序规范

组件内的导入语句必须遵循以下顺序：

```typescript
// 1. 类型导入
import type { InjectionKey } from 'vue';
import type { ComponentContextType } from './component-name';

// 2. Vue核心库导入
import { computed, defineModel, inject, provide, reactive, ref } from 'vue';

// 3. 第三方库导入
import dayjs from 'dayjs';
import { debounce } from 'lodash-es';

// 4. 组件导入
import TIcon from '../icon/index.vue';

// 5. 工具函数导入
import { formatValue } from '@/utils/format';

// 6. 常量/配置导入
import { componentKey } from './constants';

// 7. 样式导入
import './index.scss';
```

## 文档编写规范

每个组件都需要编写完整的文档，包含以下内容：

1. **组件介绍**：简要描述组件的功能和用途
2. **基础用法**：组件的基本使用方式
3. **不同类型/状态**：组件的不同类型或状态
4. **属性说明**：组件的所有属性列表
5. **事件说明**：组件的所有事件列表
6. **插槽说明**：组件的所有插槽列表
7. **最佳实践**：组件的使用建议和示例

### 文档模板

```md
# 组件名 ComponentName

组件的简要介绍。

## 基础用法

描述基础用法。

:::demo
```vue
<template>
  <!-- 组件基础用法示例 -->
  <t-component></t-component>
</template>
```
:::

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop1 | 属性1的说明 | string | - |
| prop2 | 属性2的说明 | boolean | false |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 值变化时触发 | (value: string) => void |
| click | 点击时触发 | (event: MouseEvent) => void |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 默认插槽，组件内容 |
| header | 头部插槽 |
```

## 测试用例

每个组件必须编写测试用例，测试用例统一存放在 `tune-ui/test/packages` 目录下:

```vue
<template>
  <div class="test-container">
    <h2>Button 按钮组件</h2>
    
    <test-section title="基础类型按钮">
      <t-button>默认按钮</t-button>
      <t-button type="primary">主要按钮</t-button>
      <t-button type="success">成功按钮</t-button>
    </test-section>
    
    <test-section title="禁用状态">
      <t-button disabled>禁用按钮</t-button>
    </test-section>
    
    <test-section title="点击事件">
      <t-button @click="handleClick">点击事件</t-button>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "ButtonTest" });

const handleClick = (event: MouseEvent) => {
  console.log("按钮被点击:", event);
};
</script>
```

## 组件开发流程

1. **需求分析**：明确组件的功能、属性、事件和样式需求
2. **目录结构创建**：按照规范创建组件目录结构
3. **类型定义**：定义组件的Props、Events和内部状态类型
4. **组件实现**：编写组件的模板、逻辑和样式
5. **测试用例**：编写组件的测试用例
6. **文档编写**：编写组件的使用文档
7. **代码审查**：确保代码符合规范
8. **完成发布**：合并代码，更新版本号

## 总结

开发一个组件包括以下步骤:

1. 根据规范创建目录结构
2. 定义类型接口
3. 开发组件
4. 编写样式
5. 编写测试用例
6. 编写文档

遵循以上规范可以保持代码风格的一致性，提高组件的可维护性和复用性。 