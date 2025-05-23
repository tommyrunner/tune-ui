# Directives and Menu Bar

In addition to components, Tune UI also provides a series of useful directives and menu bar related functionality. This section will introduce how to import and use these features.

## Directive Import

Directives provided by Tune UI can be used through global registration or local import methods.

### Global Import of Directives

When you import the component library globally, all directives will be automatically registered:

```js
import { createApp } from "vue";
import App from "./App.vue";
import { install } from "tune-ui";
import "tune-ui/dist/lib/style.css";

const app = createApp(App);
app.use(install); // Automatically register all directives
app.mount("#app");
```

After global registration, you can use these directives directly in any component:

```vue
<template>
  <div v-loading="loading">Content area</div>
  <button v-ripple>Click to create ripple effect</button>
</template>

<script setup>
import { ref } from "vue";

const loading = ref(true);
setTimeout(() => {
  loading.value = false;
}, 2000);
</script>
```

### Local Import of Directives

If you only need to use a specific directive, you can adopt the local import method:

```vue
<template>
  <div v-loading="loading">Content area</div>
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

Or register using the `directive` method in the component:

```vue
<script setup>
import { vLoading } from "tune-ui/directives";

// Register directive in current component
const vMyLoading = vLoading;
</script>

<template>
  <div v-my-loading="loading">Content area</div>
</template>
```
