# 组件标准格式

## 组件文件结构

```
├── 组件文件夹(组件名)
│   ├── index.vue        # 组件主文件
│   ├── index.scss       # 组件样式
│   ├── #{组件名}.ts    # 组件类型声明
│   └── index.ts         # 组件导出
```

## 文件模板

### 1. 组件主文件 (index.vue)

```vue
<template>
  <div 
    :class="[
      't-#{组件名}',
      {
        'is-disabled': disabled,
        [`t-#{组件名}--${type}`]: type,
        [`t-#{组件名}--${size}`]: size
      }
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { PropsType, EmitsType } from './#{组件名}';

defineOptions({
  name: 'T#{组件名}'
});

const props = withDefaults(defineProps<PropsType>(), {
  type: 'default',
  size: 'medium',
  disabled: false
});

const emits = defineEmits<EmitsType>();
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
```

### 2. 组件样式 (index.scss)

```scss
@import "../../styles/common.scss";

.t-#{组件名} {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  
  // 尺寸变量
  &--large {
    // ...
  }
  
  &--medium {
    // ...
  }
  
  &--small {
    // ...
  }
  
  // 类型变量
  &--primary {
    // ...
  }
  
  &--default {
    // ...
  }
  
  // 状态
  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
```

### 3. 组件类型声明 (#{组件名}.ts)

```typescript
import { BaseProps } from '../types';

/**
 * @description 组件属性类型
 */
export interface PropsType extends BaseProps {
  /** 组件类型 */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'default';
  
  /** 组件尺寸 */
  size?: 'large' | 'medium' | 'small';
  
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * @description 组件事件类型
 */
export interface EmitsType {
  (e: 'click', event: MouseEvent): void;
  (e: 'change', value: unknown): void;
}
```

### 4. 组件导出 (index.ts)

```typescript
import #{组件名} from './index.vue';

// 导出组件
export const T#{组件名} = #{组件名};

// 导出组件类型
export type T#{组件名}Type = InstanceType<typeof #{组件名}>;

// 导出组件属性类型
export * from './#{组件名}';
```

### 5. 组件类型补充

如果组件包含子组件（如 Option），建议添加：

```vue
<!-- option.vue -->
<template>
  <div :class="['t-#{组件名}-option']" @click="emit('change', props)">
    <slot>{{ props.label }}</slot>
  </div>
</template>

<script lang="ts" setup>
import { EmitsType, PropsType } from './option';

defineOptions({ name: 'T#{组件名}Option' });
const emit = defineEmits<EmitsType>();
const props = defineProps<PropsType>();
</script>
```

```typescript
// option.ts
export interface PropsType {
  value: string | number;
  label: string | number;
}

export interface EmitsType {
  (e: 'change', params: PropsType): void;
}
```

### 6. 组件状态管理

```typescript
// 在主组件中
const state = reactive({
  active: false,
  // 其他状态...
});

// 计算属性示例
const getClass = computed(() => {
  const { size, disabled } = props;
  return [
    't-#{组件名}',
    `t-#{组件名}--${size}`,
    disabled && 'is-disabled'
  ];
});
```

### 7. 事件处理规范

```typescript
// 处理方法命名规范
const handleXxx = () => {
  // 处理逻辑
  emit('xxx', params);
};

// 状态切换方法命名规范
const toggleXxx = () => {
  state.xxx = !state.xxx;
};
```

## 样式规范

1. 使用嵌套的 SCSS 语法
2. 使用 `_` 前缀表示组件内部元素
3. 使用 `is-` 前缀表示状态类
4. 使用 `t-#{组件名}--` 前缀表示修饰符
5. 动画使用 `anima-` 前缀

```scss
.t-#{组件名} {
  // 基础样式
  
  // 内部元素
  ._xxx {
    // ...
  }
  
  // 状态类
  &.is-xxx {
    // ...
  }
  
  // 尺寸变体
  &--large {
    // ...
  }
  
  // 动画
  @keyframes anima-xxx {
    // ...
  }
}
```

## 注意事项

1. 组件名称使用大驼峰命名法
2. 组件类名使用 `t-` 前缀
3. 使用 TypeScript 进行类型声明
4. 样式采用 BEM 命名规范
5. Props 和 Emits 类型必须在单独的 .ts 文件中声明
6. 组件必须包含完整的类型声明和注释
7. 保持与现有组件风格一致

## 参考示例

完整的组件示例可参考：`/tui/src/packages/button/*`
