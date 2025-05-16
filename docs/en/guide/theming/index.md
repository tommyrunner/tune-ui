# Theme Customization

Tune UI provides a flexible theme system that allows you to customize the visual style of components to match your design requirements. This guide explains how to customize themes in your project.

## Basic Principles

Tune UI's theme system is built on SCSS variables and CSS variables. The framework provides a default theme with predefined colors, fonts, spacing, and other design tokens.

## Customization Methods

### Method 1: Using SCSS Variables (Recommended)

Create a custom theme file in your project and import it before the Tune UI styles:

1. Create a `theme.scss` file in your project:

```scss
// theme.scss

// Override primary colors
$theme-color-primary: #3e63dd;
$theme-color-success: #16a34a;
$theme-color-warning: #eab308;
$theme-color-danger: #dc2626;
$theme-color-info: #38bdf8;

// Override other variables
$font-size-default: 14px;
$font-size-large: 16px;
$font-size-small: 12px;

$border-radius-default: 4px;
$border-radius-round: 20px;
$border-radius-circle: 50%;

// Import Tune UI base styles
@import "tune-ui/styles/index.scss";
```

2. Import your theme file in your main entry file:

```js
// main.js or main.ts
import "./path/to/theme.scss";
import { createApp } from "vue";
import TuneUI from "tune-ui";
import App from "./App.vue";

const app = createApp(App);
app.use(TuneUI);
app.mount("#app");
```

### Method 2: Using CSS Variables

You can override CSS variables directly in your CSS/SCSS:

```css
:root {
  --tune-color-primary: #3e63dd;
  --tune-color-success: #16a34a;
  --tune-color-warning: #eab308;
  --tune-color-danger: #dc2626;
  --tune-color-info: #38bdf8;
  
  --tune-font-size-default: 14px;
  --tune-border-radius: 4px;
}
```

### Method 3: Using Runtime Config

For dynamic theme switching, you can use the runtime configuration:

```js
import { createApp } from "vue";
import TuneUI from "tune-ui";
import App from "./App.vue";

const app = createApp(App);

// Configure theme
app.use(TuneUI, {
  theme: {
    colors: {
      primary: "#3e63dd",
      success: "#16a34a",
      warning: "#eab308",
      danger: "#dc2626",
      info: "#38bdf8"
    },
    // Other theme options
  }
});

app.mount("#app");
```

## Theme Variables Reference

Below is a list of the main theme variables that can be customized:

### Colors

| Variable Name | Description | Default Value |
| ------------- | ----------- | ------------- |
| $theme-color-primary | Primary theme color | #1677ff |
| $theme-color-success | Success state color | #16b364 |
| $theme-color-warning | Warning state color | #f59b0a |
| $theme-color-danger | Danger/error state color | #f43f5e |
| $theme-color-info | Info state color | #0aa5ff |

### Typography

| Variable Name | Description | Default Value |
| ------------- | ----------- | ------------- |
| $font-family | Base font family | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ... |
| $font-size-default | Default font size | 14px |
| $font-size-large | Large font size | 16px |
| $font-size-small | Small font size | 12px |
| $line-height-default | Default line height | 1.5 |

### Spacing

| Variable Name | Description | Default Value |
| ------------- | ----------- | ------------- |
| $spacing-xs | Extra small spacing | 4px |
| $spacing-sm | Small spacing | 8px |
| $spacing-md | Medium spacing | 16px |
| $spacing-lg | Large spacing | 24px |
| $spacing-xl | Extra large spacing | 32px |

### Border and Radius

| Variable Name | Description | Default Value |
| ------------- | ----------- | ------------- |
| $border-color-default | Default border color | #e5e7eb |
| $border-radius-default | Default border radius | 4px |
| $border-radius-round | Rounded border radius | 20px |
| $border-radius-circle | Circle border radius | 50% |

## Creating Custom Component Themes

To customize a specific component's theme, you can target its CSS variables:

```scss
// Custom button theme
.t-button {
  --t-button-primary-bg: #0c4a6e;
  --t-button-primary-text: #ffffff;
  --t-button-primary-border: #0c4a6e;
  --t-button-primary-hover-bg: #075985;
  --t-button-radius: 8px;
}
```

## Dark Mode Support

Tune UI provides built-in dark mode support. To enable dark mode:

1. Add the `.dark` class to your `<html>` or `<body>` element
2. Use the theme switcher utility provided by the library:

```js
import { useDarkMode } from "tune-ui";

const { isDark, toggleDarkMode } = useDarkMode();

// Toggle dark mode
function handleToggleDarkMode() {
  toggleDarkMode();
}
```

## Best Practices

1. **Consistency**: Maintain a consistent visual language across your application
2. **Limited palette**: Use a limited color palette based on your brand guidelines
3. **Accessibility**: Ensure sufficient color contrast for text readability
4. **Color semantics**: Use semantic colors for different states (success, error, etc.)
5. **Documentation**: Document your theme customizations for your team

## Example: Complete Theme Customization

Here's an example of a comprehensive theme customization file:

```scss
// custom-theme.scss

// Primary colors
$theme-color-primary: #4f46e5;  // Indigo
$theme-color-success: #10b981;  // Emerald
$theme-color-warning: #f59e0b;  // Amber
$theme-color-danger: #ef4444;   // Red
$theme-color-info: #06b6d4;     // Cyan

// Typography
$font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
$font-size-default: 15px;
$font-size-large: 18px;
$font-size-small: 13px;
$line-height-default: 1.6;

// Spacing
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;

// Borders
$border-color-default: #d1d5db;
$border-radius-default: 6px;
$border-radius-round: 24px;

// Shadows
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

// Import Tune UI base styles
@import "tune-ui/styles/index.scss";
```

With these customizations, you can create a unique look and feel for your application while maintaining the functionality and component structure provided by Tune UI. 