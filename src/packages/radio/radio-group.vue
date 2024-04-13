<template>
  <div
    class="t-radio-group"
    :direction="props.direction"
    :style="{ flexDirection: props.direction }"
    :type="props.type"
    ref="groupRef"
  >
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { configOptions } from '@/hooks/useOptions'
import { type PropsType, type EmitsType } from './radio-group'
import { useVModel } from '@vueuse/core'
import { ref, provide, reactive, toRefs, nextTick, onMounted } from 'vue'
import { type GroupContextType, radioGroupKey } from './constants'
defineOptions({ name: 'TRadioGroup' })
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  type: 'button',
  direction: 'row'
})

const emit = defineEmits<EmitsType>()
const groupRef = ref<HTMLElement>()
const vis = useVModel(props, 'modelValue', emit)
const changeEvent = (value: PropsType['modelValue']) => {
  vis.value = value
  nextTick(() => emit('change', vis.value))
}
onMounted(() => props.immediateChange && changeEvent(vis.value))
// 抛出操作api，与子组件交互
provide<GroupContextType>(
  radioGroupKey,
  reactive({
    ...toRefs(props),
    changeEvent
  })
)
</script>
<style lang="scss" scoped>
@import './radio-group.scss';
</style>
