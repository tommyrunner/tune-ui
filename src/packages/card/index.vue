<template>
  <div :class="getClass">
    <div class="t_card_head">标题</div>
    <div class="t_card_body">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropsType } from './card'
import { computed, ref } from 'vue'
defineOptions({ name: 'TBadge' })
const badgeRef = ref<InstanceType<typeof HTMLDivElement>>()
const model = defineModel<number>()
const props = withDefaults(defineProps<PropsType>(), {
  offsetY: 0,
  offsetX: 0,
  max: 99,
  color: '#f56c6c',
  hiddenValue: 0
})
const getClass = computed(() => {
  return ['t-card']
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
./colorPicker ./nadge ./card
