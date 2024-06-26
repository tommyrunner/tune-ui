<template>
  <div :class="getClass">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import type { PropsType } from './collapse'
import { computed } from 'vue'
defineOptions({ name: 'TCollapse' })
const props = withDefaults(defineProps<PropsType>(), {
  shadow: 'always'
})
const getClass = computed(() => {
  return ['t-collapse']
})
</script>
<style lang="scss" scoped>
.t-collapse {
  display: flex;
  flex-direction: column;
}
</style>
