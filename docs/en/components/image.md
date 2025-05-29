<script setup lang="ts">
import imageBasic from '../examples/image/basic.vue'
import imageFit from '../examples/image/fit.vue'
import imageLoading from '../examples/image/loading.vue'
import imageLazy from '../examples/image/lazy.vue'
import imagePreview from '../examples/image/preview.vue'
import imagePreviewConfig from '../examples/image/preview-config.vue'
</script>

# Image Component

![Image Component](/components/image.png)

Image component is used to display images, supporting lazy loading, error handling, preview and other features.

## Basic Usage

Basic image component for displaying images, setting width, height and alternative text.

<demo :component="imageBasic" name="image" examples="basic" />

## Fit Container

Through the `fit` attribute, you can set how the image adapts to the container.

<demo :component="imageFit" name="image" examples="fit" />

## Image Loading State

The component provides default loading and loading failed states, which can also be customized through slots.

<demo :component="imageLoading" name="image" examples="loading" />

## Lazy Loading

Setting the `lazy` attribute enables image lazy loading, which loads only when scrolled into the visible area.

<demo :component="imageLazy" name="image" examples="lazy" />

## Image Preview

Setting the `preview-src-list` attribute enables image preview functionality.

<demo :component="imagePreview" name="image" examples="preview" />

## Preview Configuration

You can configure preview zoom ratio, initial index, etc.

<demo :component="imagePreviewConfig" name="image" examples="preview-config" />

## Image Component API

### Attributes

| Attribute | Description | Type | Accepted Values | Default |
| --- | --- | --- | --- | --- |
| src | Image source URL | string | — | — |
| fit | How image fits container | string | fill / contain / cover / none / scale-down | — |
| alt | Image alternative text | string | — | — |
| referrerPolicy | Image referrer policy | string | — | — |
| lazy | Whether lazy loading | boolean | — | false |
| width | Image width | string / number | — | — |
| height | Image height | string / number | — | — |
| previewSrcList | Preview image list | Array\<string\> | — | [] |
| initialIndex | Preview initial image index | number | — | 0 |
| zIndex | Preview z-index | number | — | 2000 |
| infinite | Whether infinite loop preview | boolean | — | true |
| closeOnPressEscape | Whether to close preview on ESC | boolean | — | true |
| zoomRate | Zoom rate | number | — | 1.2 |
| minScale | Minimum zoom ratio | number | — | 0.2 |
| maxScale | Maximum zoom ratio | number | — | 7 |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| load | Triggered when image loads successfully | (e: Event) |
| error | Triggered when image loading fails | (e: Error) |
| switch | Triggered when preview image switches | (index: number) |
| close | Triggered when preview closes | — |
| show | Triggered when preview opens | — |

### Slots

| Slot Name | Description |
| --- | --- |
| placeholder | Placeholder content while image is loading |
| error | Content when image loading fails |

### Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| showPreview | Manually show preview | — |

### Style Variables

Image component uses the following style variables, which can be customized through SCSS variables:

| Variable Name | Description |
| --- | --- |
| $image-placeholder-bg-color | Placeholder background color |
| $image-error-bg-color | Error state background color |
| $overlay-bg-color | Overlay background color | 