import type { InjectionKey } from 'vue'
import type { ValueType } from './tabs'
import { PropsType } from './tabs-group'

export interface GroupContextType extends PropsType {
  model?: ValueType
  /**
   * 修改action状态
   * @param el 更改组件
   * @param params 当前value参数
   * @param isChange 标记是否选中
   * @param isEmit 标记是否抛出
   */
  changeEvent: (el: HTMLElement, value?: ValueType, isChange?: boolean, isEmit?: boolean) => void
  /**
   * 关闭事件
   * @param params 当前value参数
   */
  handlerClose: (params?: ValueType) => void
}

export const radioGroupKey: InjectionKey<GroupContextType> = Symbol('tabsGroupKey')
