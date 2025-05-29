<script setup lang="ts">
import radioBasic from '../examples/radio/basic.vue'
import radioDisabled from '../examples/radio/disabled.vue'
import radioRadius from '../examples/radio/radius.vue'
import radioIcon from '../examples/radio/icon.vue'
import radioGroup from '../examples/radio/group.vue'
import radioGroupType from '../examples/radio/group-type.vue'
import radioDirection from '../examples/radio/direction.vue'
import radioEvents from '../examples/radio/events.vue'
</script>

# Radio Component

![Radio Component](/components/radio.png)

Radio component is used to select one option from multiple alternatives. Users can change the selected state by clicking.

## Basic Usage

Basic radio for selecting a single state.

<demo :component="radioBasic" name="radio" examples="basic" />

## Disabled State

Set the `disabled` attribute to disable the radio.

<demo :component="radioDisabled" name="radio" examples="disabled" />

## Different Styles

Set the `radius` attribute to change the radio style, supporting `default` (circular) and `square` (square).

<demo :component="radioRadius" name="radio" examples="radius" />

## Custom Icon

Set the `icon` attribute to customize the radio icon.

<demo :component="radioIcon" name="radio" examples="icon" />

## Radio Group

Use the `t-radio-group` component to combine multiple radios into a group, bind values through `v-model`.

<demo :component="radioGroup" name="radio" examples="group" />

## Radio Group Types

Radio group supports four types: `default` (default), `text` (text), `border` (border), and `button` (button).

<demo :component="radioGroupType" name="radio" examples="group-type" />

## Arrangement Direction

Set the arrangement direction of radio group through the `direction` attribute, supporting `row` (horizontal) and `column` (vertical).

<demo :component="radioDirection" name="radio" examples="direction" />

## Event Handling

Radio and radio group provide `change` events.

<demo :component="radioEvents" name="radio" examples="events" />

## Radio API

### Attributes

| Attribute | Description              | Type                                   | Accepted Values         | Default |
| --------- | ------------------------ | -------------------------------------- | ----------------------- | ------- |
| v-model   | Binding value            | string / number / boolean / object     | —                       | —       |
| value     | Value when selected      | string / number / boolean / object     | —                       | false   |
| size      | Size                     | string                                 | small / default / large | default |
| radius    | Selected shape style     | string                                 | default / square        | default |
| objKey    | Binding object type mark key | string                             | —                       | —       |
| disabled  | Whether disabled         | boolean                                | —                       | false   |
| name      | Native name attribute    | string                                 | —                       | —       |
| icon      | Custom icon type         | string                                 | —                       | —       |

### Events

| Event Name | Description                | Parameters                                         |
| ---------- | -------------------------- | -------------------------------------------------- |
| change     | Triggered when value changes | (value: `string` / `number` / `boolean` / `object`) |

### Slots

| Slot Name | Description              |
| --------- | ------------------------ |
| default   | Radio text content       |
| radioSpan | Custom radio icon        |

## Radio Group API

### Attributes

| Attribute       | Description                    | Type                               | Accepted Values                  | Default |
| --------------- | ------------------------------ | ---------------------------------- | -------------------------------- | ------- |
| v-model         | Binding value                  | string / number / boolean / object | —                                | —       |
| size            | Size                           | string                             | small / default / large          | default |
| objKey          | Binding object mark key        | string                             | —                                | —       |
| type            | Radio group type               | string                             | default / text / border / button | button  |
| direction       | Arrangement direction          | string                             | column / row                     | row     |
| immediateChange | Whether immediately trigger change event | boolean                  | —                                | false   |

### Events

| Event Name | Description                | Parameters                                         |
| ---------- | -------------------------- | -------------------------------------------------- |
| change     | Triggered when value changes | (value: `string` / `number` / `boolean` / `object`) |

### Style Variables

The radio component uses the following style variables, which can be customized through SCSS variables:

| Variable Name         | Description           |
| --------------------- | --------------------- |
| $theme-color-primary  | Theme color - Primary |
| $border-color-default | Border color - Default |
| $font-size-small      | Font size - Small     |
| $font-size-default    | Font size - Default   |
| $font-size-large      | Font size - Large     | 