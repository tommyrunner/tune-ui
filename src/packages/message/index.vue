<template>
  <Teleport :to="props.appendTo">
    <div
      :class="messageClass"
      v-bind="{ [messageTag]: messageTag }"
      :style="getMessageStyle"
      :id="state.messageId"
      ref="messageRef"
    >
      <TIcon :icon="props.icon" />
      <span>{{ props.content }}</span>
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import type { PropsType } from './message'
import { messageClass, messageGap, messageTag } from './method'
import { fromCssVal, generateId } from '@/utils'
import { TIcon } from '../icon'
defineOptions({ name: 'TMessage' })
const props = withDefaults(defineProps<PropsType>(), {
  icon: 'illustrate',
  appendTo: 'body',
  custom: () => ({
    x: '50%',
    y: `${messageGap}px`
  }),
  radius: () => [6, 6, 6, 6],
  padding: () => [8, 12, 8, 12],
  boxShadow: () => [0, 0, 4, 'rgba(0, 0, 0, 0.5)']
})
const messageRef = ref()
const state = reactive({
  messageId: 't-message-0'
})
onMounted(() => {
  state.messageId = `t-message-${generateId()}`
})
const getMessageStyle = computed(() => {
  const { padding = [], boxShadow = [], radius = [], custom } = props
  return {
    padding: `${fromCssVal(padding)}`,
    boxShadow: `${fromCssVal(boxShadow)}`,
    borderRadius: `${fromCssVal(radius)}`,
    left: custom.x,
    top: custom.y
  }
})
defineExpose({
  getComponent: () => {
    return messageRef.value
  }
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
