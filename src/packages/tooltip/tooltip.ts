import { RendererElement } from 'vue'
import type { IconTypes } from '../icon/icon'

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 显示方式
  type?: 'hover' | 'click'
  // 标题
  content?: string
  // 圆角
  radius?: number
  // icon
  icon?: IconTypes
  // 间隙
  gap?: number
  // 隐藏时间
  hideAfter?: number
  // 方向
  position?: 'top' | 'right' | 'bottom' | 'left'
  // 方向
  appendTo?: string | RendererElement
  // 自动适配position
  autoPosition?: boolean
}

export interface TooltipHookParamsType {
  type: PropsType['type']
}
