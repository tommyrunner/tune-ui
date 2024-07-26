<template>
  <TPopover
    position="top"
    type="click"
    v-model="visible"
    :disabled="props.disabled"
    :close-on-press-escape="props.closeOnPressEscape"
    :close-on-press-other="props.closeOnPressOther"
    :padding="props.padding"
    :box-shadow="props.boxShadow"
  >
    <template #content>
      <div class="t-popconfirm" :style="getPopconfirmSytle">
        <slot name="content" v-if="slots.content" />
        <div class="_head" v-else>
          <TIcon :icon="props.icon" color="#fc9824" :size="14" v-if="props.icon" />
          <span>{{ props.content }}</span>
        </div>
        <div class="_btns">
          <TButton :type="props.cancelType" size="small" @click="handlerSubmit(true)">{{ props.cancelText }}</TButton>
          <TButton :type="props.confirmType" size="small" @click="handlerSubmit(false)">
            {{ props.confirmText }}
          </TButton>
        </div>
      </div>
    </template>
    <slot />
  </TPopover>
</template>
<script lang="ts" setup>
import type { PropsType, EmitsType } from './popconfirm'
import { TPopover } from '../popover'
import { TButton } from '../button'
import { TIcon } from '../icon'
import { computed, ref, StyleValue, useSlots } from 'vue'
defineOptions({ name: 'TPopconfirm' })
const emit = defineEmits<EmitsType>()
const slots = useSlots()
const props = withDefaults(defineProps<PropsType>(), {
  maxWidth: '140px',
  icon: 'illustrate',
  confirmText: '确认',
  confirmType: 'text',
  cancelText: '取消',
  cancelType: 'text',
  closeOnPressOther: false
})
const visible = ref(false)
const handlerSubmit = (isConfirm) => {
  if (isConfirm) emit('confirm')
  else emit('cancel')
  visible.value = false
}
const getPopconfirmSytle = computed((): StyleValue => {
  const { maxWidth } = props
  return {
    maxWidth: maxWidth
  }
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
