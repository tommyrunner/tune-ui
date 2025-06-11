# TUI组件库开发规范文档

## 概述

本文档规定了TUI组件库开发的标准化流程、代码规范、类型定义要求和最佳实践，旨在确保代码质量、可维护性和团队协作效率。

## 1. 文件结构规范

### 1.1 组件目录结构

每个组件必须按照以下结构组织：

```
packages/组件名/
├── index.vue          # 主组件文件
├── index.ts           # 组件导出入口
├── 组件名.ts          # 类型定义文件  
├── index.scss         # 主样式文件
├── constants.ts       # 常量和注入键定义（如需要）
├── components/        # 子组件目录（如需要）
│   └── 子组件名/
│       ├── 子组件名.vue
│       └── 子组件名.scss
```

### 1.2 测试文件结构

```
test/packages/
└── 组件名.vue         # 组件测试用例
```

## 2. 类型定义规范

### 2.1 必需类型定义

每个组件的`组件名.ts`文件必须包含以下类型定义：

#### 2.1.1 PropsType（必需）
```typescript
/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 属性描述 */
  propName?: string;
  // ... 其他属性
}
```

#### 2.1.2 EmitsType（必需）
```typescript
/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export type EmitsType = {
  /** 事件描述 */
  "event-name": [参数类型];
  /** 点击事件 */
  click: [MouseEvent];
  /** 无参数事件 */
  "no-param-event": [];
};
```

#### 2.1.3 SlotsType（必需）
```typescript
/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 */
  default?: () => any;
  /** 自定义插槽 */
  "slot-name"?: (props: { data: any }) => any;
}
```

#### 2.1.4 ExposesType（如使用defineExpose则必需）
```typescript
import type { ComputedRef, Ref } from "vue";

/**
 * @description 组件暴露的方法类型定义
 * @interface ExposesType
 */
export interface ExposesType {
  /** 方法描述 */
  methodName: (param: string) => void;
  /** 计算属性 */
  computedProp: ComputedRef<number>;
  /** 响应式数据 */
  refData: Ref<boolean>;
}
```

### 2.2 类型定义要求

- **必须**使用JSDoc注释描述每个类型和属性
- **必须**为所有接口和类型添加`@interface`或`@description`标注
- **禁止**使用`any`类型，除非在插槽定义中确实需要
- **必须**为复杂类型创建独立的type或interface定义

## 3. 组件开发规范

### 3.1 基本要求

- **必须**使用`<script lang="ts" setup>`语法糖
- **必须**使用`defineOptions({name: "T组件名"})`定义组件名
- **必须**使用T前缀命名组件（如TButton、TCalendar）

### 3.2 导入语句顺序规范

**严格按照以下顺序排列导入语句：**

```typescript
// 1. 样式导入（最优先）
import "./index.scss";

// 2. type类型语句
import type { PropsType, EmitsType, SlotsType, ExposesType } from "./component-name";

// 3. 其他引入
import { computed, ref, watch } from "vue";
import { utilFunction } from "@/utils/helpers";
import ChildComponent from "./components/child.vue";
import { CONSTANTS } from "./constants";
```

### 3.3 双向绑定规范

- **必须**使用`defineModel`实现双向绑定
- **禁止**使用`v-model:prop`和`update:prop`旧方式

```typescript
// ✅ 正确方式
const modelValue = defineModel<string>("modelValue", { default: "" });

// ❌ 错误方式
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ "update:modelValue": [string] }>();
```

### 3.4 defineExpose规范

如果组件需要暴露方法或属性：

```typescript
// ✅ 必须使用泛型约束
defineExpose<ExposesType>({
  methodName,
  computedProp,
  refData
});

// ❌ 禁止无类型约束
defineExpose({
  methodName,
  computedProp,
  refData
});
```

### 3.5 状态管理规范

#### 3.5.1 响应式变量规则
- **3个及以上变量**: 使用`reactive`统一管理，命名为`state`
```typescript
const state = reactive({
  loading: false,
  visible: false,
  selectedIndex: 0
});
```

- **1-2个变量**: 使用`ref`独立定义
```typescript
const visible = ref(false);
const count = ref(0);
```

#### 3.5.2 计算属性规范
- **必须**使用`computed`处理动态样式和类
- **禁止**在模板中写复杂逻辑

```typescript
const buttonClasses = computed(() => ({
  "t-button--primary": props.type === "primary",
  "t-button--disabled": props.disabled
}));
```

## 4. 导出规范

### 4.1 index.ts导出格式

**必须**使用以下标准格式：

```typescript
import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./component-name";
import Component from "./index.vue";

export const TComponentName = Component as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;

export type TComponentNameType = InstanceType<typeof TComponentName>;
```

### 4.2 类型导出要求

- **必须**导出所有类型定义（PropsType、SlotsType、EmitsType、ExposesType）
- **必须**使用`SFCWithInstall`包装组件
- **必须**提供组件实例类型`TComponentNameType`

## 5. 样式开发规范

### 5.1 样式文件组织

- **必须**有独立的`.scss`文件
- **必须**导入全局样式：`@import "@/styles/index.scss";`
- **必须**使用BEM命名规范

### 5.2 BEM命名规范

```scss
.t-component {
  // 块样式
  
  &__element {
    // 元素样式
  }
  
  &--modifier {
    // 修饰符样式
  }
}
```

### 5.3 变量使用规范

- **优先**使用全局变量
- **禁止**直接使用CSS变量函数`var()`
- 组件级变量格式：`$component-property-name: value;`

## 6. JSDoc注释规范

### 6.1 函数注释格式

**所有函数必须**使用以下格式：

```typescript
/**
 * 函数主要功能描述
 * @description 详细描述（可选）
 * @param {类型} 参数名 - 参数说明
 * @param {类型} [可选参数名] - 可选参数说明
 * @returns {返回值类型} 返回值说明
 * @throws {错误类型} 可能抛出的错误说明（可选）
 * @example
 * // 使用示例
 * const result = functionName(param);
 */
const functionName = (param: string): number => {
  // 实现代码
};
```

### 6.2 类型注释格式

```typescript
/**
 * @description 类型的用途描述
 * @interface InterfaceName
 */
export interface InterfaceName {
  /** 属性描述 */
  property: string;
}
```

## 7. 组件通信规范

### 7.1 父子组件通信

- **优先**使用`provide/inject`
- **必须**在`constants.ts`中定义注入键

```typescript
// constants.ts
export const componentKey: InjectionKey<ComponentContextType> = Symbol("componentKey");

// 父组件
provide<ComponentContextType>(componentKey, contextData);

// 子组件
const context = inject<ComponentContextType>(componentKey, defaultValue);
```

### 7.2 事件通信

```typescript
// 子组件向父组件通信
const emit = defineEmits<EmitsType>();
emit("event-name", data);
```

## 8. 测试用例规范

### 8.1 测试文件结构

```vue
<template>
  <div class="test-container">
    <h2>ComponentName 组件</h2>
    
    <test-section title="基础用法">
      <!-- 测试内容 -->
    </test-section>
    
    <test-section title="不同状态">
      <!-- 测试内容 -->
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { TComponentName } from "@/packages/component-name";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "ComponentNameTest" });
</script>
```

### 8.2 必需测试场景

1. **基础用法**：默认状态和基本功能
2. **属性变化**：各种属性的不同值
3. **状态变化**：组件的各种状态
4. **事件响应**：交互和事件处理
5. **边界情况**：错误处理和边界值

## 9. 性能优化规范

### 9.1 计算属性优化

- **必须**使用`computed`缓存计算结果
- **避免**在模板中使用复杂表达式

### 9.2 渲染优化

- 静态内容使用`v-once`
- 大列表实现虚拟滚动
- 复杂组件考虑异步加载

## 10. 代码审查检查点

### 10.1 类型检查

- [ ] 是否定义了完整的类型（Props、Emits、Slots、Exports）
- [ ] 类型定义是否有JSDoc注释
- [ ] 是否正确使用了泛型约束

### 10.2 结构检查

- [ ] 导入语句顺序是否正确
- [ ] 是否使用了规范的导出方式
- [ ] 文件结构是否符合要求

### 10.3 功能检查

- [ ] 是否遵循单一职责原则
- [ ] 是否有重复造轮子
- [ ] 性能是否得到优化

### 10.4 样式检查

- [ ] 是否使用BEM命名规范
- [ ] 是否正确使用全局变量
- [ ] 样式是否合理组织

## 11. 常见错误和解决方案

### 11.1 类型错误

**错误：** EmitsType使用函数声明方式
```typescript
// ❌ 错误
export interface EmitsType {
  (e: "change", value: string): void;
}

// ✅ 正确
export type EmitsType = {
  change: [string];
};
```

### 11.2 导入错误

**错误：** 导入顺序不规范
```typescript
// ❌ 错误顺序
import { ref } from "vue";
import "./styles.scss";
import type { PropsType } from "./types";

// ✅ 正确顺序
import "./styles.scss";
import type { PropsType } from "./types";
import { ref } from "vue";
```

### 11.3 导出错误

**错误：** 不完整的导出方式
```typescript
// ❌ 错误
export const TButton = Button;

// ✅ 正确
export const TButton = Button as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
```

## 12. 工具和辅助

### 12.1 VS Code配置建议

建议在`.vscode/settings.json`中配置：

```json
{
  "typescript.preferences.organizeImports": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

### 12.2 ESLint规则建议

```json
{
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "vue/component-name-in-template-casing": ["error", "kebab-case"],
    "vue/prop-name-casing": ["error", "camelCase"]
  }
}
```

---

## 总结

本规范文档涵盖了TUI组件库开发的所有关键方面，从文件结构到代码实现，从类型定义到性能优化。严格遵循这些规范将确保：

- **代码一致性**：统一的代码风格和结构
- **类型安全**：完整的TypeScript类型约束
- **可维护性**：清晰的文档和规范的命名
- **团队协作**：标准化的开发流程
- **代码质量**：最佳实践和性能优化

开发团队应将此文档作为开发标准，在代码审查中严格执行这些规范。 