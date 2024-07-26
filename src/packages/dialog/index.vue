<template>
  <TPopover
    position="top"
    type="none"
    v-model="visible"
    :disabled="props.disabled"
    :close-on-press-escape="props.closeOnPressEscape"
    :close-on-press-other="false"
    :padding="props.padding"
    :box-shadow="props.boxShadow"
    :custom="state.custom"
    :show-arrow="false"
    :is-modal="true"
    :is-modal-nest="true"
    @click-model="handlerClickmodel"
    @model-change="handlerModelChange"
  >
    <template #content>
      <div class="t-dialog" :style="getPopconfirmSytle" :id="state.dialogId">
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
import type { PropsType, EmitsType } from './dialog'
import { TPopover } from '../popover'
import { TButton } from '../button'
import { TIcon } from '../icon'
import { computed, onMounted, reactive, StyleValue, useSlots } from 'vue'
import { useDraggable } from '@/hooks/useDraggable'
import { generateId } from '@/utils'
defineOptions({ name: 'TDialog' })
const emit = defineEmits<EmitsType>()
const slots = useSlots()
const state = reactive({
  custom: { x: 0, y: 0 },
  dialogId: `t-dialog-0`
})
const props = withDefaults(defineProps<PropsType>(), {
  width: '600px',
  height: '400px',
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
  draggable: true,
  padding: () => [12, 16, 12, 16],
  offset: () => ({ x: 0, y: 0 })
})
const visible = defineModel<boolean>()
onMounted(() => {
  const { offset } = props
  state.custom = {
    x: window.innerWidth / 2 + offset.x,
    y: window.innerHeight / 2 + offset.y
  }
  // 生成唯一id
  state.dialogId = `t-dialog-${generateId()}`
})
const handlerSubmit = (isConfirm) => {
  if (isConfirm) emit('confirm')
  else emit('cancel')
  visible.value = false
}
const handlerClickmodel = () => {
  if (props.closeOnPressModel) handlerSubmit(false)
}
const handlerModelChange = (popover: HTMLElement) => {
  // 处理移动对话框
  console.log(popover)
  // if (props.draggable) {
  //   const dialogEl: HTMLElement = document.querySelector('#state.dialogId')
  //   if (!dialogEl) return
  //   useDraggable(dialogEl, dialogEl.querySelector('>._head-draggable'))
  // }
}
const getPopconfirmSytle = computed((): StyleValue => {
  const { width } = props
  return {
    width: width
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
