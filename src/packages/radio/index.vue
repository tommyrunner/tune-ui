<template>
  <div class="t-radio" t-group="t-radio" :checked="props.value === vis" :_value="props.value" @click="handChecked">
    <span :class="['radio-span']" v-if="!props.icon" />
    <TIcon class="radio-icon" :icon="props.icon" :type="props.value === vis ? 'primary' : 'default'" v-else />
    <input type="radio" :name="props.name" :value="props.value" />
    <span class="title"><slot /></span>
  </div>
</template>
<script lang="ts" setup>
/**
 * @displayName Radio 单选框
 *  t-group="t-radio" : 代表支持t-group组件
 * _value : 内部标记值
 */
import { defaultProps, type PropsType, type EmitsType } from './radio'
import { useVModel } from '@vueuse/core'
import { TIcon } from '..'
defineOptions({ name: 'TRadio' })
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), defaultProps)
const vis = useVModel(props, 'modelValue', emit)
const handChecked = () => {
  vis.value = props.value
}
defineExpose({
  handleClick: (evt: MouseEvent) => {
    emit('click', evt)
  }
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
