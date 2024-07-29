<template>
  <TPopover
    position="top"
    type="none"
    v-model="visible"
    :disabled="props.disabled"
    :close-on-press-escape="props.closeOnPressEscape"
    :close-on-press-other="!props.isModal && props.closeOnPressModel"
    :padding="props.padding"
    :box-shadow="props.boxShadow"
    :custom="state.custom"
    :drawer-aniamtion="true"
    :show-arrow="false"
    :is-modal="props.isModal"
    :is-modal-nest="true"
    :radius="state.radius"
    @click-model="handlerClickmodel"
    @hover-enter="handlerDrag"
    @open="emit('open')"
    @close="emit('close')"
  >
    <template #content>
      <div class="t-drawer" :style="getPopconfirmSytle">
        <div :class="['_head', props.draggable && '_head-draggable']">
          <slot name="title" v-if="slots.title" />
          <div class="_title" v-else>
            <TIcon :icon="props.icon" :size="18" v-if="props.icon" />
            <span class="_title">{{ props.title }}</span>
          </div>
          <TIcon icon="close" :size="28" @click="handlerSubmit(false)" v-if="props.isCloseIcon" />
        </div>
        <div class="content">
          <slot />
        </div>
        <div class="_foot" :style="getFootStyle" v-if="props.isFoot">
          <slot name="foot" v-if="slots.foot" />
          <div class="_btns" v-else>
            <TButton :type="props.cancelType" @click="handlerSubmit(true)">{{ props.cancelText }}</TButton>
            <TButton :type="props.confirmType" @click="handlerSubmit(false)">
              {{ props.confirmText }}
            </TButton>
          </div>
        </div>
      </div>
    </template>
  </TPopover>
</template>
<script lang="ts" setup>
import type { PropsType, EmitsType } from './drawer'
import { TPopover } from '../popover'
import { TButton } from '../button'
import { TIcon } from '../icon'
import { computed, reactive, StyleValue, useSlots } from 'vue'
import { useDraggable } from '@/hooks/useDraggable'
defineOptions({ name: 'Tdrawer' })
const emit = defineEmits<EmitsType>()
const gap = 4
const defRadius = 8
const slots = useSlots()
const state = reactive({
  custom: { x: 0, y: 0 },
  radius: [0, defRadius, defRadius, 0] as [number, number, number, number]
})
const props = withDefaults(defineProps<PropsType>(), {
  width: '600px',
  height: `${window.innerHeight}px`,
  icon: 'inspiration',
  confirmText: '确认',
  confirmType: 'success',
  cancelText: '取消',
  cancelType: 'default',
  btnAlign: 'flex-end',
  closeOnPressEscape: true,
  closeOnPressModel: true,
  isModal: true,
  isFoot: true,
  isCloseIcon: true,
  padding: () => [12, 16, 12, 16],
  offset: () => ({ x: 0, y: 0 })
})
const visible = defineModel<boolean>()
// 注册拖动hooks事件
const { injectDrag } = useDraggable()

const handlerSubmit = (isConfirm) => {
  if (isConfirm) emit('confirm')
  else emit('cancel')
  visible.value = false
}
const handlerClickmodel = () => {
  if (props.closeOnPressModel) handlerSubmit(false)
}
/**
 * 实现拖动弹框
 * @param el
 */
const handlerDrag = (el: HTMLElement) => {
  injectDrag(el, '._head-draggable')
}
const getPopconfirmSytle = computed((): StyleValue => {
  const { width } = props
  return {
    width: width,
    height: `${innerHeight - props.padding[0] * 2 - gap}px`
  }
})
const getFootStyle = computed((): StyleValue => {
  return {
    justifyContent: props.btnAlign
  }
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
