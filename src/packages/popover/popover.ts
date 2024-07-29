import { RendererElement } from 'vue'

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 是否禁用(显示)
  disabled?: boolean
  // 显示方式
  type?: 'hover' | 'click' | 'none'
  // 标题
  content?: string
  // 圆角
  radius?: [number, number, number, number]
  // 内间距
  padding?: [number, number, number, number]
  // 阴影
  boxShadow?: [number, number, number, string]
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
  // 是否 dialog弹窗动画
  dialogAniamtion?: boolean
  // 是否 drawer弹窗动画
  drawerAniamtion?: boolean
  // 是否按下esc关闭
  closeOnPressEscape?: boolean
  // 是否点击其他区域关闭
  closeOnPressOther?: boolean
  // 是否有遮罩层
  isModal?: boolean
  // 是否遮罩层允许嵌套
  isModalNest?: boolean
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
