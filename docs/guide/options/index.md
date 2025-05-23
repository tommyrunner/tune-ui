# 全局配置选项

`useOptions` 是 Tune UI 提供的全局配置钩子函数，用于管理组件库的主题、尺寸、国际化等全局设置。

## 基本用法

```js
import { useOptions } from "tune-ui";

// 获取配置API
const { updateThemeColor, updateDefaultSize, setLocale, configOptions } = useOptions();
```

## API 详解

### 输出参数

`useOptions` 钩子不需要任何输入参数，但会返回以下方法和属性：

| 名称                 | 类型                                    | 说明                 |
| -------------------- | --------------------------------------- | -------------------- |
| updateThemeColor     | `(theme: OptionsThemeType) => void`     | 更新主题色           |
| updateDefaultSize    | `(size: ElSizeType) => void`            | 更新默认元素尺寸     |
| updateLoadingOptions | `(options: LoadingOptionsType) => void` | 更新加载配置         |
| setLocale            | `(locale: LocaleType) => void`          | 切换语言             |
| initOptions          | `() => OptionsType`                     | 初始化并返回默认配置 |
| configOptions        | `Ref<OptionsType>`                      | 当前配置的响应式引用 |
| baseSize             | `ComputedRef<ElSizeType>`               | 当前基础尺寸计算属性 |
| locale               | `ComputedRef<LocaleType>`               | 当前语言计算属性     |

#### 获取当前配置

```js
// 获取配置API
const { configOptions } = useOptions();

// 获取当前主题配置
console.log(configOptions.value.theme);

// 获取当前尺寸
console.log(configOptions.value.elSize);

// 获取当前语言
console.log(configOptions.value.locale);
```

#### 重置所有配置

```js
// 获取配置API
const { initOptions } = useOptions();

// 重置所有配置到默认值
const defaultOptions = initOptions();
```
