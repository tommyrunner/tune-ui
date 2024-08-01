import type { IconTypes } from '../icon/icon'
import { PropsType as ButtonPropsType } from '../button/button'

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 内间距
  padding?: [number, number, number, number]
  // 阴影
  boxShadow?: [number, number, number, string]
  // 最大宽高
  maxWidth?: string
  // 是否禁用(显示)
  disabled?: boolean
  // 内容
  content?: string
  // icon
  icon?: IconTypes
  // 按钮文字
  confirmText?: string
  cancelText?: string
  confirmType?: ButtonPropsType['type']
  cancelType?: ButtonPropsType['type']
  // 方向
  position?: 'top' | 'right' | 'bottom' | 'left'
  // 是否按下esc关闭
  closeOnPressEscape?: boolean
  // 是否点击其他区域关闭
  closeOnPressOther?: boolean
}

/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 提交
  (e: 'confirm'): void
  // 取消
  (e: 'cancel'): void
}
