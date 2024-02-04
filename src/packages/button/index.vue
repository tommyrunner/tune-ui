<template>
  <button
    autofocus
    :class="[
      't-button',
      !props.color && `t-button-type-${props.type}`,
      `t-button-size-${props.size}`,
      `t-button-radius-${props.radius}`,
      props.disabled && 't-button-disabled'
    ]"
    :style="getCustemStyle"
  >
    <i v-if="props.startIcon" :class="['t-button-startIcon', 'iconfont', props.startIcon]"></i>
    <slot />
    <i
      v-if="props.endIcon || props.loading"
      :class="['t-button-endIcon', 'iconfont', endIcon, props.loading && 't-button-loading']"
    ></i>
  </button>
</template>
<script lang="ts" setup>
import { computed, StyleValue } from 'vue'
import { defaultProps, ButtonPropsType } from './button'
defineOptions({ name: 'TButton' })
const props = withDefaults(defineProps<ButtonPropsType>(), defaultProps)
const endIcon = computed(() => {
  if (!props.loading) return props.endIcon
  // 处理loading-icon
  else return 'icon-xianxing-_jiazai'
})
const getCustemStyle = computed((): StyleValue => {
  if (props.color) {
    return {
      color: '#ffffff',
      backgroundColor: props.color,
      border: ` 1px solid ${props.color}`
    }
  } else return void 0
})
defineExpose({
  test: () => {
    console.log('测试')
  }
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
