<template>
  <TPopover
    position="top"
    type="none"
    v-model="visible"
    :disabled="props.disabled"
    :close-on-press-escape="props.closeOnPressEscape"
    :close-on-press-other="props.closeOnPressModel"
    :padding="props.padding"
    :box-shadow="props.boxShadow"
    :custom="state.custom"
    :dialog-animation="true"
    :show-arrow="false"
    :is-modal="props.isModal"
    :is-modal-nest="props.isModal"
    :width="props.width"
    @click-model="handlerClickModel"
    @hover-enter="handlerDrag"
    @open="emit('open')"
    @close="emit('close')"
  >
    <template #content>
      <div class="t-dialog">
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
          <div class="_btn" v-else>
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
import type { PropsType, EmitsType } from './dialog'
import { TPopover } from '../popover'
import { TButton } from '../button'
import { TIcon } from '../icon'
import { computed, onMounted, reactive, StyleValue, useSlots } from 'vue'
import { useDraggable } from '@/hooks/useDraggable'
defineOptions({ name: 'TDialog' })
const emit = defineEmits<EmitsType>()
const slots = useSlots()
const state = reactive({
  custom: { x: 0, y: 0 }
})
const props = withDefaults(defineProps<PropsType>(), {
  width: '600px',
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

onMounted(() => {
  const { offset } = props
  state.custom = {
    x: window.innerWidth / 2 + offset.x,
    y: window.innerHeight / 2 + offset.y
  }
})
const handlerSubmit = (isConfirm) => {
  if (isConfirm) emit('confirm')
  else emit('cancel')
  visible.value = false
}
const handlerClickModel = () => {
  if (props.closeOnPressModel) handlerSubmit(false)
}
/**
 * 实现拖动弹框
 * @param el
 */
const handlerDrag = (el: HTMLElement) => {
  injectDrag(el, '._head-draggable')
}
const getFootStyle = computed((): StyleValue => {
  return {
    justifyContent: props.btnAlign
  }
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
