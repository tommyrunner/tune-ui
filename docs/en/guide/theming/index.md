# Theme Customization

Tune UI provides flexible theme customization capabilities, supporting multiple ways to customize theme styles to meet personalized product requirements.

## Theme Configuration Methods

Tune UI supports two theme configuration methods: dynamic configuration through API and static configuration through CSS variables.

### Using API for Configuration

Tune UI provides a `useOptions` hook function that gives access to a series of configuration methods:

```js
import { useOptions } from "tune-ui";

// Get configuration API
const { updateThemeColor, updateDefaultSize } = useOptions();

// Update theme colors
updateThemeColor({
  primary: "#409eff",
  success: "#28a745"
});

// Update default element size
updateDefaultSize("default");
```

### CSS Variables Method

Customize themes by overriding CSS variables:

```css
:root {
  --primary: #409eff;
  --success: #28a745;
  --warning: #eeb406;
  --danger: #dc3545;
  --info: #b9b9b9;
}
```
