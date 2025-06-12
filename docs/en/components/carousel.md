<script setup lang="ts">
import carouselBasic from '../examples/carousel/basic.vue'
import carouselSize from '../examples/carousel/size.vue'
import carouselAutoplay from '../examples/carousel/autoplay.vue'
import carouselToggle from '../examples/carousel/toggle.vue'
import carouselIndicator from '../examples/carousel/indicator.vue'
import carouselVertical from '../examples/carousel/vertical.vue'
import carouselEvents from '../examples/carousel/events.vue'
</script>

# Carousel Component

![Carousel Component](/components/carousel.png)

Carousel component is used to cyclically display multiple content items in a limited space, supporting autoplay, transition animations, and indicator controls.

## Basic Usage

Carousel component consists of `TCarouselGroup` container and multiple `TCarousel` items, displaying horizontal carousel by default.

<demo :component="carouselBasic" name="carousel" examples="basic" />

## Size and Initial Position

Set carousel container size through `width` and `height` attributes, and set the initial display item index through `initIndex` attribute.

<demo :component="carouselSize" name="carousel" examples="size" />

## Autoplay

Set `autoplay` attribute to enable autoplay, `delay` controls interval time, `autoplayBack` controls play direction, and `pauseOnHover` controls whether to pause on mouse hover.

<demo :component="carouselAutoplay" name="carousel" examples="autoplay" />

## Toggle Effects

Configure different toggle effects through the `toggle` attribute, including vision (parallax), repeat, repeatedly, and none (no loop) modes. The `animation` attribute controls whether to enable animations.

<demo :component="carouselToggle" name="carousel" examples="toggle" />

## Indicators and Arrows

The `trigger` attribute configures indicator trigger mode (hover, click, none), and the `arrow` attribute controls when toggle arrows are displayed (always, hover, none).

<demo :component="carouselIndicator" name="carousel" examples="indicator" />

## Vertical Carousel

Set the `direction` attribute to `vertical` to achieve vertical carousel, default is `horizontal`.

<demo :component="carouselVertical" name="carousel" examples="vertical" />

## Event Handling

Carousel component supports `change` event (triggered when carousel switches) and `autoplay` event (triggered when autoplay switches).

<demo :component="carouselEvents" name="carousel" examples="events" />

## Carousel Component API

### Attributes

| Attribute | Description | Type | Accepted Values | Default |
| --- | --- | --- | --- | --- |
| width | Container width | number | — | 300 |
| height | Container height | number | — | 200 |
| delay | Carousel interval time (ms) | number | — | 2200 |
| initIndex | Initial index | number | — | 0 |
| autoplay | Whether to autoplay | boolean | — | false |
| autoplayBack | Carousel direction (true: forward, false: backward) | boolean | — | false |
| pauseOnHover | Whether to pause on mouse hover | boolean | — | true |
| animation | Whether to enable toggle animation | boolean | — | true |
| trigger | Indicator trigger mode | string | hover / click / none | hover |
| arrow | Toggle arrow display timing | string | always / hover / none | hover |
| direction | Carousel direction | string | horizontal / vertical | horizontal |
| toggle | Content carousel mode | string | vision / repeat / repeatedly / none | vision |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| change | Triggered when carousel switches | (index: `number`) |
| autoplay | Triggered when autoplay switches | (index: `number`) |

### Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| setIndex | Set current carousel item index | (index: `number`, behavior: `ScrollBehavior`) |
| incrementedIndex | Increase or decrease current index | (is: `boolean`) true to increase, false to decrease |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Carousel item content, usually contains `TCarousel` components |

### Style Variables

Carousel component uses the following style variables, which can be customized through SCSS variables:

| Variable Name | Description |
| --- | --- |
| $z-index-show | Display z-index |
| $bg-color-hover | Hover background color |
| $border-color-default | Default border color |