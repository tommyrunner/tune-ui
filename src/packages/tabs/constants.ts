import type { InjectionKey } from 'vue'
import type { ValueType } from './tabs'
import { PropsType } from './tabs-group'

export interface GroupContextType extends PropsType {
  model?: ValueType
  changeEvent: (el: HTMLElement, val?: ValueType) => void
}

export const radioGroupKey: InjectionKey<GroupContextType> = Symbol('radioGroupKey')
