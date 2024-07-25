import { RendererElement } from 'vue'

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 是否禁用(显示)
  disabled?: boolean
  // 显示方式
  type?: 'hover' | 'click'
  // 标题
  content?: string
  // 圆角
  radius?: number
  // 间隙
  gap?: number
  // 隐藏时间
  hideAfter?: number
  // 方向
  position?: 'top' | 'right' | 'bottom' | 'left'
  // 悬浮元素渲染位置
  appendTo?: string | RendererElement
  // 自动适配position
  autoPosition?: boolean
  // 是否显示箭头
  showArrow?: boolean
  // 自定义xy轴
  custom?: {
    x: number
    y: number
  }
  // 是否按下esc关闭
  closeOnPressEscape?: boolean
  // 是否点击其他区域关闭
  closeOnPressOther?: boolean
}

export interface TooltipHookParamsType {
  type: PropsType['type']
}
