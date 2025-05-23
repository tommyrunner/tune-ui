# 指令与菜单栏

除了组件外，Tune UI 还提供了一系列实用的指令，以及菜单栏相关功能。本章节将介绍如何引入和使用这些功能。

## 指令引入

Tune UI 提供的指令可以通过全局注册或局部引入的方式使用。

### 全局引入指令

当你使用全局方式引入组件库时，所有指令会被自动注册：

```js
import { createApp } from "vue";
import App from "./App.vue";
import { install } from "tune-ui";
import "tune-ui/dist/lib/style.css";

const app = createApp(App);
app.use(install); // 自动注册所有指令
app.mount("#app");
```

全局注册后，你可以在任何组件中直接使用这些指令：

```vue
<template>
  <div v-loading="loading">内容区域</div>
  <button v-ripple>点击产生波纹效果</button>
</template>

<script setup>
import { ref } from "vue";

const loading = ref(true);
setTimeout(() => {
  loading.value = false;
}, 2000);
</script>
```

### 局部引入指令

如果你只需要使用某个特定指令，可以采用局部引入的方式：

```vue
<template>
  <div v-loading="loading">内容区域</div>
</template>

<script setup>
import { ref } from "vue";
import { vLoading } from "tune-ui/directives";

const loading = ref(true);
setTimeout(() => {
  loading.value = false;
}, 2000);
</script>
```

或者在组件中使用 `directive` 方法注册：

```vue
<script setup>
import { vLoading } from "tune-ui/directives";

// 在当前组件注册指令
const vMyLoading = vLoading;
</script>

<template>
  <div v-my-loading="loading">内容区域</div>
</template>
```
