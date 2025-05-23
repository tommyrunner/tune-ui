# Installation

## Requirements

- Node.js >= 16
- Vue >= 3.3

## Installation

```bash
# npm
npm install tune-ui

# yarn
yarn add tune-ui

# pnpm
pnpm add tune-ui
```

## Usage Methods

Tune UI provides two methods of import: global import and local import.

### Global Import

Global import registers all components, suitable for rapid development or when using the entire component library.

```js
import { createApp } from "vue";
import App from "./App.vue";
import { install } from "tune-ui";
import "tune-ui/dist/lib/style.css";

const app = createApp(App);
app.use(install);
app.mount("#app");
```

### Local Import

Local import only imports the components you need, effectively reducing bundle size. This is suitable for projects with strict size requirements.

```vue
<template>
  <t-button type="primary" prefix-icon="github">Click</t-button>
  <t-input v-model="value" placeholder="Please input" />
</template>

<script setup>
import { ref } from "vue";
import { TButton, TInput } from "tune-ui";
import "tune-ui/dist/lib/style.css";

const value = ref("");
</script>
```

> Note: When using local import, you still need to import the style file `tune-ui/dist/lib/style.css`.

## Browser Compatibility

Tune UI's CSS variable functionality requires modern browser support. If you need to support older browsers, please use the appropriate polyfill.