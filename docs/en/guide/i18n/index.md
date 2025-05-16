# TUI Component Library Internationalization Guide

## 1. Internationalization Overview

TUI component library supports multi-language internationalization, providing Chinese and English language packs by default. The internationalization functionality is implemented through the `useI18n` Hook, which provides two translation functions:

- `t` - Standard translation function, returns a regular string, suitable for use within components
- `tr` - Reactive translation function, returns a reactive computed property, suitable for defining static text constants

## 2. Correct Usage of Internationalization

### 2.1 Direct Use in Components

Using the `t` function from the `useI18n` Hook directly within a component is the **most recommended** approach, as the translation function is executed each time the component is rendered:

```vue
<template>
  <div>{{ t("key") }}</div>
</template>

<script lang="ts" setup>
import { useI18n } from "@/hooks/useI18n";

// Using namespace
const { t } = useI18n("component");

// Using translation
function showMessage() {
  alert(t("common.confirmDelete"));
}
</script>
```

### 2.2 Static Text Constants

If you need to define static text constants (e.g., in an i18n.ts file), you **must use the `tr` function** to ensure the text updates when the language changes:

```typescript
// i18n.ts
import { useI18n } from "@/hooks/useI18n";

// Using reactive translation function
const { tr } = useI18n("component");

// Exporting reactive text constants
export const TEXT_TITLE = tr("title");
export const TEXT_SUBMIT = tr("submit");

// Reactive text with parameters
export const TEXT_WELCOME = tr("welcome", { defaultName: "Guest" });
```

Then use in components:

```vue
<template>
  <h1>{{ TEXT_TITLE.value }}</h1>
  <button>{{ TEXT_SUBMIT.value }}</button>
</template>

<script lang="ts" setup>
import { TEXT_TITLE, TEXT_SUBMIT } from "./i18n";
</script>
```

### 2.3 Difference Between the Two Translation Functions

1. `t` function - Returns a regular string:
   ```typescript
   // Use within components
   const { t } = useI18n("component");
   const message = t("key");  // Returns regular string
   const paramMessage = t("key", { name: "Value" });  // Returns string with parameters
   ```

2. `tr` function - Returns a reactive computed property:
   ```typescript
   // Define static text at module level
   const { tr } = useI18n("component");
   export const TEXT = tr("key");  // Returns reactive computed property
   export const PARAM_TEXT = tr("key", { name: "Value" });  // Returns reactive computed property with parameters
   ```

### 2.4 Common Mistakes

❌ **Incorrect**: Using the regular `t` function to create static text outside components

```typescript
// Incorrect example
const { t } = useI18n("component");
export const TEXT = t("key"); // This value won't update when language changes!
```

✅ **Correct**: Using the reactive `tr` function

```typescript
const { tr } = useI18n("component");
export const TEXT = tr("key"); // Correct, will update with language changes
```

## 3. Advanced Usage

### 3.1 Using Interpolation

```typescript
// Regular translation with parameters
const message = t("hello", { name: "World" }); // Corresponds to "hello": "Hello, {name}"

// Reactive translation with parameters
const welcomeMessage = tr("welcome", { name: userName }); // userName can be reactive
```

### 3.2 Manually Switching Languages

```typescript
<script lang="ts" setup>
import { useI18n } from "@/hooks/useI18n";

const { t, setLocale, locale } = useI18n();

// Display current language
console.log(locale.value); // 'en-US'

// Switch language
function switchToChinese() {
  setLocale("zh-CN");
}
</script>
```

## 4. Adding Internationalization Support for Components

1. Create language files in the `src/locale/components/{component-name}/` directory
2. Update `src/locale/zh-CN.ts` and `src/locale/en-US.ts` to import the new language files
3. Create an `i18n.ts` file in the component, using the `tr` function to define reactive constants

## 5. Implementation Principles

Our i18n implementation uses two different functions for different scenarios, but they share the underlying translation logic:

```typescript
// Simplified internal implementation
const translateText = (key, values) => {
  // Logic to get translated text
  return translatedText;
};

// Regular translation function
const t = (key, values) => {
  return translateText(key, values);
};

// Reactive translation function
const tr = (key, values) => {
  return computed(() => translateText(key, values));
};
```

This design clearly distinguishes between two use cases:
1. Using the `t` function in components, getting the latest translation on each render
2. Using the `tr` function for module-level static text definitions, ensuring they update automatically when language changes

## 6. Notes

- Use the `t` function (returns string) within components
- Use the `tr` function (returns reactive value) for static text definitions
- When using reactive values, you must access the actual text via `.value`
- Using nested key names (e.g. `common.confirm`) allows skipping namespace specification
- Ensure translation keys exist in the corresponding language pack, otherwise the key name itself will be displayed 