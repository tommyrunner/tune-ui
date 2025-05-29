<script setup lang="ts">
import loadingBasic from '../examples/loading/basic.vue'
import loadingText from '../examples/loading/text.vue'
import loadingBackground from '../examples/loading/background.vue'
import loadingFullscreen from '../examples/loading/fullscreen.vue'
import loadingMini from '../examples/loading/mini.vue'
</script>

# Loading Component

![Loading Component](/components/loading.png)

Loading component is used to display loading animations during page or element loading processes, providing fullscreen loading, area loading, and mini loading methods, with customizable text and styles.

## Basic Usage

The most basic usage is to add loading effects to any element through the `v-loading` directive. The loading animation is displayed when the bound value is `true`.

<ClientOnly>
  <demo :component="loadingBasic" name="loading" examples="basic" />
</ClientOnly>

## Loading Text

You can add loading text to describe the ongoing operation by setting the `loading-text` attribute.

<ClientOnly>
  <demo :component="loadingText" name="loading" examples="text" />
</ClientOnly>

## Custom Background

You can change the color of the loading mask by setting the background color, suitable for use on different backgrounds.

<ClientOnly>
  <demo :component="loadingBackground" name="loading" examples="background" />
</ClientOnly>

## Fullscreen Loading

Fullscreen loading is used for the loading process of the entire page, used through API calls.

<ClientOnly>
  <demo :component="loadingFullscreen" name="loading" examples="fullscreen" />
</ClientOnly>

## Mini Loading

Mini loading provides a lighter loading prompt, suitable for loading state display in small areas or lightweight operations.

<ClientOnly>
  <demo :component="loadingMini" name="loading" examples="mini" />
</ClientOnly>

## Loading Component API

### Directive Usage

| Directive   | Description                    | Type      | Default |
| ----------- | ------------------------------ | --------- | ------- |
| `v-loading` | Whether to show loading animation | `boolean` | `false` |

### Directive Modifiers

| Modifier Name        | Description                                        |
| -------------------- | -------------------------------------------------- |
| `loading-text`       | Loading prompt text                                |
| `loading-type`       | Loading animation type, options: `bounce`, `spin` |
| `loading-background` | Loading background color                           |

### API Methods

| Method Name            | Description           | Parameters                    |
| ---------------------- | --------------------- | ----------------------------- |
| `fullLoading(options)` | Show fullscreen loading | `options: LoadingOptionsType` |
| `miniLoading(options)` | Show mini loading     | `options: LoadingOptionsType` |

### Options Type

```typescript
interface LoadingOptionsType {
  text?: string; // Loading text
  bgColor?: string; // Background color, default is semi-transparent white
  model?: "ring" | "bean"; // Loading animation type
  delay?: number; // Delay display time (ms)
}
```

### Style Variables

Loading component uses the following CSS variables, which can be customized through style overrides:

| Variable Name               | Description            | Default Value              |
| --------------------------- | ---------------------- | -------------------------- |
| `--t-loading-bg-color`      | Loading mask background color | `rgba(255, 255, 255, 0.9)` |
| `--t-loading-text-color`    | Loading text color     | `#606266`                  |
| `--t-loading-spinner-color` | Loading icon color     | `#1890ff`                  |
