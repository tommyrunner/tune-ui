<template>
  <Transition name="t-backTop">
    <div :class="getBackTopClass" v-if="isShow" @click="handlerClick" :style="getBackTopStyle">
      <slot>
        <TIcon :icon="props.icon" :size="props.iconSize" />
      </slot>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType } from './backTop'
import { computed, onMounted, ref } from 'vue'
import { TIcon } from '../icon'
import { isString } from '@/utils/is'
import { onDeactivated } from 'vue'
defineOptions({ name: 'TBackTop' })
const props = withDefaults(defineProps<PropsType>(), {
  icon: 'caret-up',
  bottom: '32px',
  right: '32px',
  iconSize: 32,
  visibilityHeight: 200
})
const emit = defineEmits<EmitsType>()
const isShow = ref(false)

/**
 * 获取target元素
 */
const getTarget = (): HTMLElement | null => {
  return isString(props.target) ? document.querySelector(props.target) : props.target
}
/**
 * 获取滚动元素（如果为空使用window代替）
 */
const getScrollingElement = computed(() => {
  const target = getTarget()
  return target || window
})
onMounted(() => getScrollingElement.value.addEventListener('scroll', handleScroll))
onDeactivated(() => getScrollingElement.value.removeEventListener('scroll', handleScroll))
/**
 * 处理滚动事件
 */
function handleScroll() {
  const { visibilityHeight } = props
  const target = getTarget()
  // 默认使用 window
  let scrollTop = window.scrollY || document.documentElement.scrollTop
  let scrollHeight = document.documentElement.scrollHeight
  let clientHeight = window.innerHeight
  // 如果是元素
  if (target) {
    scrollTop = target.scrollTop
    scrollHeight = target.scrollHeight
    clientHeight = target.clientHeight
  }
  // 判断是否滚动到底部
  isShow.value = scrollTop + clientHeight >= scrollHeight - visibilityHeight
}
/**
 * 处理点击路由跳转事件
 */
const handlerClick = () => {
  getScrollingElement.value.scrollTo({ top: 0, behavior: 'smooth' })
  emit('click')
}
const getBackTopClass = computed(() => {
  return ['t-backTop', props.plain && 't-backTop-plain']
})
const getBackTopStyle = computed(() => {
  const { bottom, right } = props
  return {
    bottom,
    right
  }
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
