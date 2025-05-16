# Installation

## Prerequisites

- Node.js >= 16
- Vue >= 3.3

## Installation

### Using Package Manager

```bash
# npm
npm install tune-ui

# yarn
yarn add tune-ui

# pnpm
pnpm add tune-ui
```

## Full Import

```ts
import { createApp } from 'vue'
import TuneUI from 'tune-ui'
import 'tune-ui/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(TuneUI)
app.mount('#app')
```

## On-Demand Import

Tune UI supports on-demand import, allowing you to import only the components you need, reducing bundle size.

### Automatic Import (Recommended)

Use [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) and [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) plugins for automatic imports:

```bash
# npm
npm install -D unplugin-vue-components unplugin-auto-import

# yarn
yarn add -D unplugin-vue-components unplugin-auto-import

# pnpm
pnpm add -D unplugin-vue-components unplugin-auto-import
```

Configure in `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TuneUIResolver } from 'tune-ui/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [TuneUIResolver()],
    }),
    Components({
      resolvers: [TuneUIResolver()],
    }),
  ],
})
```

This allows you to use Tune UI components directly in templates without manually importing them:

```vue
<template>
  <t-button type="primary">Button</t-button>
  <t-input v-model="input" placeholder="Please input"></t-input>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
```

### Manual On-Demand Import

You can also manually import components as needed:

```vue
<template>
  <t-button type="primary">Button</t-button>
</template>

<script setup>
import { TButton } from 'tune-ui'
</script>
```

## Global Configuration

Tune UI provides global configuration options that can be set during initialization:

```ts
import { createApp } from 'vue'
import TuneUI from 'tune-ui'
import App from './App.vue'

const app = createApp(App)

app.use(TuneUI, {
  // Global configuration options
  size: 'medium', // Global component size: small/medium/large
  zIndex: 2000, // Global initial z-index
  locale: 'en-US', // Language
})

app.mount('#app')
```

## Browser Compatibility

Tune UI's CSS variable functionality requires modern browser support. If you need to support older browsers, please use appropriate polyfills.

## CDN Usage

You can also include Tune UI directly in HTML via CDN:

```html
<!-- Import CSS -->
<link rel="stylesheet" href="https://unpkg.com/tune-ui/dist/index.css">
<!-- Import component library -->
<script src="https://unpkg.com/tune-ui"></script>
```

Usage example:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Tune UI Example</title>
  <!-- Import CSS -->
  <link rel="stylesheet" href="https://unpkg.com/tune-ui/dist/index.css">
</head>
<body>
  <div id="app">
    <t-button type="primary">Button</t-button>
  </div>
  
  <!-- Import Vue -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <!-- Import Tune UI component library -->
  <script src="https://unpkg.com/tune-ui"></script>
  <script>
    const app = Vue.createApp({
      data() {
        return {
          message: 'Hello Tune UI!'
        }
      }
    })
    app.use(TuneUI)
    app.mount('#app')
  </script>
</body>
</html>
``` 