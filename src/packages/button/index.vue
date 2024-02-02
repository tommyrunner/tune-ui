<template>
  <button
    :class="[
      't-button',
      `t-button-type-${props.type}`,
      `t-button-size-${props.size}`,
      `t-button-radius-${props.radius}`
    ]"
  >
    <i :class="['t-button-startIcon', 'iconfont', props.startIcon]"></i>
    <slot />
    <i :class="['t-button-endIcon', 'iconfont', props.endIcon]"></i>
  </button>
</template>
<script lang="ts" setup>
import { defaultProps, ButtonPropsType } from './button'
defineOptions({ name: 'TButton' })
const props = withDefaults(defineProps<ButtonPropsType>(), defaultProps)
defineExpose({
  test: () => {
    console.log('测试')
  }
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
