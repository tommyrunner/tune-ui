<template>
  <div class="t-tooltip" ref="contentRef">
    <Teleport :to="props.appendTo">
      <Transition
        :name="`tooltip-${state.dyPosition}`"
        @after-enter="animationAfterEnter"
        @enter="animationEnter"
        @leave="animationLeave"
      >
        <div
          @mouseenter="state.isHoverTooltip = true"
          @mouseleave="onTooltipHoverOut"
          v-if="state.show"
          :class="getTooltipClass"
          :style="getTooltipStyle"
          :id="state.tooltipId"
        >
          <slot name="content" v-if="slots.content" />
          <span v-else>{{ props.content }}</span>
          <div class="_triangle">
            <div></div>
            <div></div>
          </div>
        </div>
      </Transition>
    </Teleport>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { bindDebounce, generateId } from '@/utils'
import type { PropsType } from './tooltip'
import { computed, nextTick, onDeactivated, onMounted, reactive, ref, StyleValue, useSlots } from 'vue'
defineOptions({ name: 'TTooltip' })
const props = withDefaults(defineProps<PropsType>(), {
  radius: 8,
  gap: 12,
  type: 'hover',
  position: 'top',
  appendTo: 'body',
  hideAfter: 150,
  autoPosition: true
})
const state = reactive({
  // tooltip 显示
  show: false,
  // tooltip标记id
  tooltipId: '_tooltip_0',
  // 动画标记
  isTransitionEnterOk: false,
  // 标记hover进入tooltip
  isHoverTooltip: false,
  // 标记hover进入元素
  isHoverContent: false,
  // 动态方向
  dyPosition: props.position,
  // 暂存tooltip位置
  point: {
    left: 0,
    top: 0
  }
})
const slots = useSlots()
const contentRef = ref<HTMLDivElement>()
const tooltipRef = ref<HTMLDivElement>()
/**
 * 延迟隐藏tooltip，用户可能需要复制tooltip内部内容
 */
const bounceShow = bindDebounce(() => {
  if ((!state.isHoverTooltip && !state.isHoverContent) || props.type === 'click') state.show = false
}, props.hideAfter)
/**
 * 显示tooltip
 */
const showTooltip = (el: Element, type: typeof props.type) => {
  state.tooltipId = `t-tooltip-${generateId()}`
  if (type === props.type) {
    if (props.type === 'click' && state.show) {
      hideTooltip(true)
    } else {
      state.show = true
      state.isHoverContent = true
      updateView(el)
    }
  }
}
/**
 * 隐藏tooltip
 */
const hideTooltip = (hide?: boolean) => {
  if (hide || props.type === 'hover') {
    state.isHoverContent = false
    bounceShow()
  }
}
/**
 * 标记是否hover在tooltip上
 */
const onTooltipHoverOut = () => {
  state.isHoverTooltip = false
  hideTooltip()
}
/**
 * 更新元素位置
 * @param el 更新元素
 */
const updateView = async (el: Element) => {
  await nextTick()
  const { position } = props
  tooltipRef.value = document.body.querySelector(`#${state.tooltipId}`)
  const rect = el.getBoundingClientRect()
  state.point = getPoint(rect, position)
  // 自动检测如果超出调整 position
  autoPosition(rect, tooltipRef.value)
}
/**
 * 自动调整 position
 * @param rect 元素信息
 */
const autoPosition = (elRect: DOMRect, contentEl: HTMLDivElement) => {
  const { gap, autoPosition } = props
  if (!autoPosition) return
  const { innerWidth, innerHeight } = window
  let { point } = state
  let newPosition = props.position
  if (point.left - gap < 0) {
    newPosition = 'right'
  } else if (point.top - gap < 0) {
    newPosition = 'bottom'
  } else if (point.left > innerWidth - gap - contentEl.offsetWidth) {
    newPosition = 'left'
  } else if (point.top > innerHeight - gap - contentEl.offsetHeight) {
    newPosition = 'top'
  }
  // 调整位置
  state.point = getPoint(elRect, newPosition)
  // 调整三角指向
  state.dyPosition = newPosition
}

/**
 * 处理元素事件
 * @param remove 是否移出事件
 */
const handlerEventListener = (remove: boolean = false) => {
  let funKey: 'addEventListener' | 'removeEventListener' = 'addEventListener'
  if (contentRef.value) {
    Array.from(contentRef.value.children).forEach((child) => {
      // 初始化监听
      child[funKey]('click', () => {
        showTooltip(child, 'click')
      })
      child[funKey]('mouseenter', () => {
        showTooltip(child, 'hover')
      })
      child[funKey]('mouseleave', () => {
        hideTooltip()
      })
      // 初始化样式
      if (!remove) updateView(child)
    })
  }
}
onDeactivated(() => {
  // 清空事件
  handlerEventListener(true)
})
onMounted(() => {
  handlerEventListener()
})
// 标记动画状态
const animationEnter = () => {
  state.isTransitionEnterOk = true
}
const animationAfterEnter = () => {
  state.isTransitionEnterOk = false
}
const animationLeave = () => {
  state.isTransitionEnterOk = false
}
// 动态处理tooltip样式处理
const getTooltipStyle = computed((): StyleValue => {
  return {
    pointerEvents: state.isTransitionEnterOk ? 'none' : 'initial',
    left: `${state.point.left}px`,
    top: `${state.point.top}px`
  }
})
/**
 * 处理tooltip位置
 * @param domRect 元素信息
 * @param position 指定位置
 */
const getPoint = (domRect: DOMRect, position?: typeof props.position) => {
  const { x, y, width, height } = domRect
  const { gap } = props
  // offsetHeight 包含padding
  const { offsetHeight = 0, offsetWidth = 0 } = tooltipRef.value || {}
  let point = { left: 0, top: 0 }
  // 根据指定显示的位置调整样式
  if (position === 'top') {
    point = {
      left: x,
      top: !tooltipRef.value ? y - gap : y - offsetHeight - gap
    }
  } else if (position === 'right') {
    point = {
      left: x + width + gap,
      // 元素的y轴减去元素的高度，以为箭头是局中的需要减去本身的一半
      top: y + height / 2 - offsetHeight / 2
    }
  } else if (position === 'bottom') {
    point = {
      left: x,
      top: !tooltipRef.value ? y + gap : y + height + gap
    }
  } else if (position === 'left') {
    point = {
      left: -(offsetWidth - x + gap),
      top: y + height / 2 - offsetHeight / 2
    }
  }
  return point
}
const getTooltipClass = computed(() => {
  // 因为抛出使用特殊格式
  return ['_t-tooltip', `_t-tooltip-${state.dyPosition}`]
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
