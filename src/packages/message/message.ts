import type { IconTypes } from '../icon/icon'
import type { RendererElement } from 'vue'

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 宽
  width?: string
  // 是否禁用(显示)
  disabled?: boolean
  // 显示方式
  type?: 'default' | 'notice '
  // 标题
  content?: string
  // icon
  icon?: IconTypes
  // 	显示时间, 单位为毫秒。 值为 0 则不会自动关闭
  duration?: number
  // 圆角
  radius?: [number, number, number, number]
  // 内间距
  padding?: [number, number, number, number]
  // 阴影
  boxShadow?: [number, number, number, string]
  // 悬浮元素渲染位置
  appendTo?: string | RendererElement
  // 自定义xy轴
  custom?: {
    x: string
    y: string
  }
  // 最大消息条数
  maxLength?: number
}

export interface TooltipHookParamsType {
  type: PropsType['type']
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 遮罩层点击
  (e: 'clickModel'): void
  // 鼠标进入退出事件
  (e: 'hoverEnter', el: HTMLElement): void
  (e: 'hoverOut', el: HTMLElement): void
  // model改变监听
  (e: 'modelChange'): void
  // 打开关闭回调
  (e: 'open'): void
  (e: 'close'): void
}
