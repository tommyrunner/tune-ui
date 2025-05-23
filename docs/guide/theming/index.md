# 主题定制

Tune UI 提供了灵活的主题定制能力，支持多种方式自定义主题风格，满足个性化产品需求。

## 主题配置方式

Tune UI 支持两种主题配置方式：通过 API 进行动态配置和通过 CSS 变量进行静态配置。

### 使用 API 进行配置

Tune UI 提供了 `useOptions` 钩子函数，可以获取一系列配置方法：

```js
import { useOptions } from "tune-ui";

// 获取配置API
const { updateThemeColor, updateDefaultSize } = useOptions();

// 更新主题颜色
updateThemeColor({
  primary: "#409eff",
  success: "#28a745"
});

// 更新元素默认尺寸
updateDefaultSize("default");
```

### CSS 变量方式

通过覆盖 CSS 变量来自定义主题：

```css
:root {
  --primary: #409eff;
  --success: #28a745;
  --warning: #eeb406;
  --danger: #dc3545;
  --info: #b9b9b9;
}
```
