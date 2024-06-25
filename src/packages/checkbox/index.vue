<template>
  <span :class="getClass" :checked="isChecked" @click="handChecked">
    <div v-if="!props.icon && slot.checkboxSpan">
      <slot name="checkboxSpan" :value="modelValue" />
    </div>
    <span :class="['_t-checkbox-span', `_t-checkbox-span-${props.radius}`]" v-else-if="!props.icon">
      <TIcon icon="success" color="white" v-if="isChecked" />
    </span>
    <TIcon class="_t-checkbox-icon" :icon="props.icon" v-else />
    <input type="checkbox" :name="props.name" :value="props.value" />
    <span :class="getTitleClass"><slot /></span>
  </span>
</template>
<script lang="ts" setup>
import { type PropsType, type EmitsType } from './checkbox'
import { TIcon, ValueType } from '..'
import { computed, inject, useSlots } from 'vue'
import { configOptions } from '@/hooks/useOptions'
import { type GroupContextType, checkboxGroupKey } from './constants'
defineOptions({ name: 'TCheckbox' })
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  radius: 'square',
  disabled: false
})
const slot = useSlots()
const model = defineModel<ValueType>()
const groupContext = inject<GroupContextType | undefined>(checkboxGroupKey, void 0)
/**
   span的class配置
   custom-span 代表有自定义组件代替了span，需要修复样式
 **/
const getTitleClass = computed(() => {
  const base = [
    '_t-checkbox-title',
    props.disabled && 't-disabled',
    (slot.checkboxSpan || props.icon) && '_t-checkbox-custom-span'
  ]
  return base
})
const getClass = computed(() => {
  const { size, disabled } = props
  const base = ['t-checkbox', `t-checkbox-size-${size}`, disabled && 't-disabled']
  // 组合样式
  if (groupContext) {
    return [
      ...base,
      `_t-checkbox-group-type-${groupContext.type}`,
      `_t-checkbox-group-direction-${groupContext.direction}`
    ]
  }
  return base
})
/**
 * 组合使用时会失效
 */
const isChecked = computed(() => {
  // model值
  const visValue = groupContext?.objKey && model.value ? (model.value as any)[modelObjKey.value] : model.value
  // 组件绑定value值
  const propValue = modelObjKey.value ? (props.value as any)[modelObjKey.value] : props.value
  // 如果是组合组件
  if (groupContext && groupContext.model) {
    // 是对象属性
    if (modelObjKey.value) {
      return groupContext.model.some((v: any) => v[modelObjKey.value] === propValue)
    } else {
      return groupContext.model.includes(propValue)
    }
  } else {
    // 未值定value默认以boolean类型
    if (typeof model.value === 'boolean' && !props.value) return model.value
    // 是对象属性
    if (modelObjKey.value && model.value) {
      return (model.value as any)[modelObjKey.value] === propValue
    } else return visValue === propValue
  }
})

const modelObjKey = computed((): string => {
  if (groupContext) return groupContext.objKey || ''
  return props.objKey || ''
})
const handChecked = () => {
  if (props.disabled) return
  if (groupContext) {
    groupContext.changeEvent(isChecked.value, props.value)
  } else {
    // 未值定value默认以boolean类型
    console.log(model.value, props.value)
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
./checkbox
