<template>
  <div class="t-carousel-group" :style="getStyle">
    <!-- 箭头 -->
    <TIcon
      :class="['_t-carousel-group-arrow', '_t-carousel-group-arrow-icon1', `_t-carousel-group-arrow-${props.arrow}`]"
      icon="left-circle"
      :size="32"
      @click="incrementedIndex(false)"
    />
    <TIcon
      :class="['_t-carousel-group-arrow', '_t-carousel-group-arrow-icon2', `_t-carousel-group-arrow-${props.arrow}`]"
      icon="right-circle"
      :size="32"
      @click="incrementedIndex(true)"
    />
    <!-- 指示器 -->
    <div :class="getTriggerClass" v-if="childEls.length && props.trigger !== 'none'">
      <div
        :class="[
          '_t-carousel-group-trigger-item',
          state.triggerActive === index && '_t-carousel-group-trigger-item-active'
        ]"
        v-for="(_, index) in childEls"
        :key="index"
        @click="setPageIndex(index, 'click')"
        @mouseover="setPageIndex(index, 'hover')"
      ></div>
    </div>
    <div
      :class="getContentClass"
      ref="groupContent"
      @mouseover="state.isHoverContent = true"
      @mouseout="state.isHoverContent = false"
    >
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ValueType } from './carousel'
import type { PropsType, EmitsType } from './carousel-group'
import { type GroupContextType, collapseGroupKey } from './constants'
import { type StyleValue, ref, provide, reactive, toRefs, nextTick, onMounted, computed, onDeactivated } from 'vue'
import { AnimationFrame } from '@/utils'
import { TIcon } from '../icon'
defineOptions({ name: 'TCheckboxGroup' })
const props = withDefaults(defineProps<PropsType>(), {
  width: 300,
  height: 200,
  delay: 2200,
  initIndex: 0,
  pauseOnHover: true,
  direction: 'horizontal',
  trigger: 'hover',
  arrow: 'always',
  toggle: 'vision'
})
const emit = defineEmits<EmitsType>()
const groupContent = ref<HTMLElement>()
const model = defineModel<ValueType[]>()
const childEls = ref<HTMLDivElement[]>([])
const animationFrame = ref<AnimationFrame>()
const state = reactive({
  // 防止抖动动画
  bindDebounce: true,
  triggerActive: 0,
  isHoverContent: false
})
/**
 * 子组件状态更新函数
 * @param isChecked 当前是否选中
 * @param item 子组件绑定value值
 */
const changeEvent = (isChecked?: boolean, item?: ValueType) => {
  if (!item || !model.value) return
  // 如果选中，则取消选中
  if (isChecked && model.value.includes(item)) {
    model.value = model.value.filter((v) => v !== item)
  }
  nextTick(() => emit('change', model.value))
}
onDeactivated(() => {
  if (animationFrame.value) animationFrame.value.clear()
})
onMounted(() => {
  childEls.value = Array.from(groupContent.value?.querySelectorAll('#_t-carousel'))
  // 初始化
  if (childEls.value.length) {
    // 监听滚动回调
    groupContent.value?.addEventListener('scroll', () => {
      updatePageIndex()
      state.bindDebounce = true
    })
    // vision模式克隆视觉组件
    if (props.toggle === 'vision') {
      groupContent.value.append(childEls.value[0].cloneNode(true))
    }
    // 初始定位
    setPageIndex(props.initIndex, props.trigger)
    // 开启播放
    if (props.autoplay) {
      animationFrame.value = new AnimationFrame(props.delay)
      runAutoplay(animationFrame.value)
    }
  }
})
const updatePageIndex = () => {
  const { toggle, trigger } = props
  if (trigger === 'none' || !state.bindDebounce) return
  state.bindDebounce = false
  const el = groupContent.value
  const box = props[getBoxConter.value.box]
  const scrollDirection = el[getBoxConter.value.scrollDirection]
  const scrollBox = el[getBoxConter.value.scrollBox]
  // 使用四舍五入让指示标提前显示
  state.triggerActive = Math.round(scrollDirection / box)
  // 处理克隆多出的page
  if (toggle === 'vision' && scrollDirection >= scrollBox - box) {
    state.triggerActive = 0
  }
}
/**
 * 设置当前指示标位置
 * @param index 下标
 */
const setPageIndex = (index: number, val: typeof props.trigger, behavior: ScrollBehavior = 'smooth') => {
  if (props.trigger === val)
    groupContent.value?.scrollTo({
      [getBoxConter.value.direction]: props[getBoxConter.value.box] * index,
      behavior: behavior
    })
}
/**
 * 轮播
 */
const runAutoplay = (animationFrame?: AnimationFrame) => {
  animationFrame.call(toIndex)
}
/**
 * 根据不同 toggle 值切换
 */
const toIndex = () => {
  const { toggle } = props
  const el = groupContent.value
  const direction = getBoxConter.value.direction
  const box = props[getBoxConter.value.box]
  const isVision = toggle === 'vision'
  // 控制repeatedly反复 方向
  let isRepeatedly = toggle === 'repeatedly'
  // 鼠标进入暂停轮播
  if (state.isHoverContent) return
  const scrollDirection = el[getBoxConter.value.scrollDirection]
  const scrollBox = el[getBoxConter.value.scrollBox]
  // 当前处于最后一个
  const lastBox = scrollDirection >= scrollBox - box
  // 当前处于第一个
  const firstLeft = scrollDirection <= 0
  // 结束播放
  if (toggle === 'none' && lastBox) {
    return animationFrame.value.clear()
  }
  // 到达克隆dom（提前切换克隆下标）
  if (isVision && scrollDirection >= scrollBox - box * 2) {
    el.scrollTo({
      [direction]: 0
    })
  }
  // 重复
  if (toggle === 'repeat' && lastBox) {
    el.scrollTo({
      [direction]: 0,
      behavior: 'smooth'
    })
  }
  // 反复(相反方向)
  else if (toggle === 'repeatedly') {
    if (lastBox) isRepeatedly = false
    else if (firstLeft) isRepeatedly = true
    el.scrollBy({
      [direction]: isRepeatedly ? box : -box,
      behavior: 'smooth'
    })
  } else {
    el.scrollBy({
      [direction]: box,
      behavior: 'smooth'
    })
  }
}
/**
 * 根据 toggle 类型切换下标
 * @param is true: 下一个 ,false: 上一个
 */
const incrementedIndex = (is: boolean) => {
  console.log(is)
  toIndex()
}
/**
 * 根据 direction 方向获取对应宽高值
 * @param direction 方向key(props)
 * @param scrollDirection 滚动方向key(el)
 * @param box 方向值(el)
 * @param scrollBox 滚动方向值(el)
 */
const getBoxConter = computed(() => {
  let params = { direction: 'left', scrollDirection: 'scrollLeft', box: 'width', scrollBox: 'scrollWidth' }
  if (props.direction === 'vertical')
    params = { direction: 'top', scrollDirection: 'scrollTop', box: 'height', scrollBox: 'scrollHeight' }
  return params
})
const getStyle = computed((): StyleValue => {
  const { width, height } = props
  return {
    height: `${height}px`,
    width: `${width}px`
  }
})
const getTriggerClass = computed(() => {
  return ['_t-carousel-group-trigger', `_t-carousel-group-trigger-${props.direction}`]
})
const getContentClass = computed(() => {
  return ['_t-carousel-group-content', `_t-carousel-group-content-${props.direction}`]
})
// 抛出操作api，与子组件交互
provide<GroupContextType>(
  collapseGroupKey,
  reactive({
    ...toRefs(props),
    model,
    changeEvent
  })
)
defineExpose({
  /**
   * 手动修改下表
   * @param index 下表位置 >=0
   * @param behavior 是否动画
   */
  setIndex: (index: number, behavior: ScrollBehavior) => {
    if (index < 0) return
    setPageIndex(index, props.trigger, behavior)
  },
  incrementedIndex
})
</script>
<style lang="scss" scoped>
@import './group.scss';
</style>
