# Divider Component

![Divider Component](/components/divider.png)

The divider component is used to separate content into groups, providing visual separation and better organization of the page structure.

## Basic Usage

The most basic divider, default is horizontal.

<demo component-name="divider" examples="basic"></demo>

## Direction

Dividers can be horizontal or vertical, with horizontal being the default.

<demo component-name="divider" examples="direction"></demo>

## Different Styles

Dividers support different border styles: solid (default), dashed, dotted, and double.

<demo component-name="divider" examples="style"></demo>

## Divider with Text

Text content can be embedded in the divider, with customizable text position.

<demo component-name="divider" examples="with-text"></demo>

## Divider API

### Properties

| Property        | Description      | Type   | Values                              | Default    |
| --------------- | ---------------- | ------ | ----------------------------------- | ---------- |
| direction       | Divider direction | string | horizontal / vertical               | horizontal |
| borderStyle     | Border style     | string | solid / dashed / dotted / double    | solid      |
| contentPosition | Text position    | string | left / center / right               | center     |

### Slots

| Slot Name | Description           |
| --------- | --------------------- |
| default   | Text content inside the divider |

### Style Variables

The divider component uses the following style variables, which can be customized via SCSS variables:

| Variable Name        | Description        |
| -------------------- | ------------------ |
| $border-color-default | Divider color      |
| $text-color-default  | Text color         |
| $bg-color-default    | Background color   |
| $font-size-default   | Default font size  | 