<template>
  <div :class="getClass">
    <div class="_t-card-head" v-if="isHead">
      <slot name="headLeft" v-if="slot.headLeft" />
      <div class="left" v-else>
        <TIcon :icon="props.titleIcon" v-if="props.titleIcon" />
        {{ props.title }}
      </div>
      <slot name="headRight" />
    </div>
    <div class="_t-card-body">
      <slot />
    </div>
    <div class="_t-card-foot" v-if="slot.foot">
      <slot name="foot" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropsType } from './card'
import { TIcon } from '../icon'
import { computed, useSlots } from 'vue'
defineOptions({ name: 'TCard' })
const slot = useSlots()
const props = withDefaults(defineProps<PropsType>(), {
  shadow: 'always'
})
const getClass = computed(() => {
  const { shadow } = props
  return ['t-card', `t-card-shadow-${shadow}`]
})
const isHead = computed(() => {
  return props.title || slot.headLeft
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
