<template>
  <div class="t-collapse">
    <div class="_t-collapse-head" @click="updateModel">
      <slot name="title" :value="model" v-if="slot.title" />
      <div v-else>{{ props.title }}</div>
      <div class="_t-collapse-head-right">
        <slot name="headRight" :value="model" v-if="slot.headRight" />
        <TIcon v-else :class="isChecked && '_t-collapse-icon-active'" :icon="props.rightIcon" :size="14" />
      </div>
    </div>
    <div class="_t-collapse-body" ref="bodyRef" :style="getBodyStyle">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { StyleValue } from 'vue'
import type { PropsType, ValueType, EmitsType } from './collapse'
import { type GroupContextType, collapseGroupKey } from './constants'
import { TIcon } from '../icon'
import { computed, inject, onMounted, ref, useSlots } from 'vue'
defineOptions({ name: 'TCollapse' })
const slot = useSlots()
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), {
  value: false,
  rightIcon: 'caret-right'
})
const model = defineModel<ValueType>()
const groupContext = inject<GroupContextType | undefined>(collapseGroupKey, void 0)
// 记录原始高度
const bodyHeight = ref(0)
const bodyRef = ref<InstanceType<typeof HTMLDivElement>>()
onMounted(() => {
  // 进入记录body原始高度
  bodyHeight.value = bodyRef.value?.clientHeight
})
// 判断是否选中
const isChecked = computed(() => {
  // 如果是组合组件
  if (groupContext && groupContext.model) {
    return groupContext.model.includes(props.value)
  } else {
    // 未值定value默认以boolean类型
    if (typeof model.value === 'boolean' && !props.value) return model.value
    else return model.value === props.value
  }
})
const getBodyStyle = computed((): StyleValue => {
  // 默认样式
  if (!bodyHeight.value)
    return {
      height: 'auto'
    }
  return {
    height: `${isChecked.value ? bodyHeight.value : 0}px`
  }
})
const updateModel = () => {
  if (props.disabled) return
  if (groupContext) {
    groupContext.changeEvent(isChecked.value, props.value)
  } else {
    // 未值定value默认以boolean类型
    if (typeof model.value === 'boolean' && !props.value) model.value = !model.value
    // 则
    else model.value = isChecked.value ? void 0 : props.value
  }
  emit('change', model.value)
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
