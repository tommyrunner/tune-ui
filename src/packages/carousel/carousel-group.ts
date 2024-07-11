import { ValueType } from './carousel'

/**
 * @description: 组件props类型
 */
export interface PropsType {
  height?: number
  width?: number
  delay?: number
  initIndex?: number // 初始化值
  autoplay?: boolean
  pauseOnHover?: boolean // 鼠标悬停是否暂停
  // 指示器: hover 悬停 , click 点击 none 不显示
  trigger?: 'hover' | 'click' | 'none'
  // 箭头: always 总是显示 , hover 悬停 none 不显示
  arrow?: 'always' | 'hover' | 'none'
  // 方向: horizontal 横向 , vertical 竖向
  direction?: 'horizontal' | 'vertical'
  // 内容轮播方式: vision:视觉差,repeat:重复,repeatedly:反复,none:不循环
  toggle?: 'vision' | 'repeat' | 'repeatedly' | 'none'
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: 'change', data?: ValueType[]): void
}
