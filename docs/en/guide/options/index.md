# Global Configuration Options

`useOptions` is a global configuration hook function provided by Tune UI, used for managing global settings such as theme, size, internationalization, etc. of the component library.

## Basic Usage

```js
import { useOptions } from "tune-ui";

// Get configuration API
const { updateThemeColor, updateDefaultSize, setLocale, configOptions } = useOptions();
```

## API Details

### Output Parameters

The `useOptions` hook doesn't require any input parameters but returns the following methods and properties:

| Name                | Type                                   | Description                              |
| ------------------- | -------------------------------------- | ---------------------------------------- |
| updateThemeColor    | `(theme: OptionsThemeType) => void`    | Update theme colors                      |
| updateDefaultSize   | `(size: ElSizeType) => void`           | Update default element size              |
| updateLoadingOptions| `(options: LoadingOptionsType) => void`| Update loading configuration             |
| setLocale           | `(locale: LocaleType) => void`         | Switch language                          |
| initOptions         | `() => OptionsType`                    | Initialize and return default config     |
| configOptions       | `Ref<OptionsType>`                     | Reactive reference to current config     |
| baseSize            | `ComputedRef<ElSizeType>`              | Computed property for current base size  |
| locale              | `ComputedRef<LocaleType>`              | Computed property for current language   |

#### Get Current Configuration

```js
// Get configuration API
const { configOptions } = useOptions();

// Get current theme configuration
console.log(configOptions.value.theme);

// Get current size
console.log(configOptions.value.elSize);

// Get current language
console.log(configOptions.value.locale);
```

#### Reset All Configurations

```js
// Get configuration API
const { initOptions } = useOptions();

// Reset all configurations to default values
const defaultOptions = initOptions();
```
