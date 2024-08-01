import type { IconTypes } from '../icon/icon'
import type { RendererElement } from 'vue'

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 宽度
  width?: string
  // 类型
  type?: 'success' | 'warning' | 'info' | 'danger'
  // 是否 plain 格式
  plain?: boolean
  // 显示方式
  messageType?: 'default' | 'notice'
  // 标题(notification可用)
  title?: string
  // 方向(notification可用)
  position?: 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft'
  // 内容
  content?: string
  // icon
  icon?: IconTypes
  // 	显示时间, 单位为毫秒。 值为 0 则不会自动关闭
  duration?: number
  // 圆角
  radius?: [number, number, number, number]
  // 内间距
  padding?: [number, number, number, number]
  // 悬浮元素渲染位置
  appendTo?: string | RendererElement
  // 自定义xy轴
  custom?: {
    x: string
    y: string
  }
  // 最大消息条数
  maxLength?: number
  // 是否可主动关闭
  isClose?: boolean
  closeCallback?: (id: string) => void
  // 按下esc 关闭
  closeOnPressEscape?: boolean
}

export interface TooltipHookParamsType {
  type: PropsType['type']
}
