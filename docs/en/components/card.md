<script setup lang="ts">
import cardBasic from '../examples/card/basic.vue'
import cardTitle from '../examples/card/title.vue'
import cardShadow from '../examples/card/shadow.vue'
import cardSlots from '../examples/card/slots.vue'
</script>

# Card

![Card](/components/card.png)

Card component is used to group information content, providing unified appearance and interaction behavior, commonly used in admin systems, information display and other scenarios.

## Basic Usage

The most basic card usage, containing content area that can include any content.

<demo :component="cardBasic" name="card" examples="basic" />

## Card Title

You can set the card title through the `title` attribute, or use the `titleIcon` attribute to add a title icon.

<demo :component="cardTitle" name="card" examples="title" />

## Shadow Effect

Through the `shadow` attribute, you can set when the card shadow is displayed. There are three optional values: `always` (always show), `hover` (show on hover), and `never` (never show).

<demo :component="cardShadow" name="card" examples="shadow" />

## Slot Usage

Card component provides multiple slots, including default slot, header left slot, header right slot, and footer slot, which can achieve various custom layouts.

<demo :component="cardSlots" name="card" examples="slots" />

## Card API

### Attributes

| Attribute  | Description        | Type                            | Accepted Values            | Default   |
| ---------- | ------------------ | ------------------------------- | -------------------------- | --------- |
| `title`    | Card title         | `string`                        | —                          | —         |
| `titleIcon`| Title icon         | `IconTypes`                     | —                          | —         |
| `shadow`   | When to show shadow| `string`                        | `always` / `hover` / `never` | `always`  |

### Slots

| Slot Name   | Description            |
| ----------- | ---------------------- |
| `default`   | Card main content      |
| `headLeft`  | Card header left content |
| `headRight` | Card header right content |
| `footer`    | Card footer content    |

### Style Variables

The card component uses the following style variables, which can be customized through SCSS variables:

| Variable Name    | Description            |
| ---------------- | ---------------------- |
| `$shadow-color`  | Card shadow color      |
| `border-color()` | Card border color function |
</rewritten_file> 