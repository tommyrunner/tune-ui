<template>
  <div class="t-carousel" id="_t-carousel">
    <slot />
  </div>
</template>
<script lang="ts" setup>
// import type { PropsType, ValueType, EmitsType } from './carousel'
// import { type GroupContextType, collapseGroupKey } from './constants'
// import { inject, onMounted, ref } from 'vue'
defineOptions({ name: 'TCarousel' })
// const emit = defineEmits<EmitsType>()
// const props = withDefaults(defineProps<PropsType>(), {})
// const model = defineModel<ValueType>()
// const groupContext = inject<GroupContextType | undefined>(collapseGroupKey, void 0)
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
