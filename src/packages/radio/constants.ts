import type { InjectionKey } from 'vue'
import type { ValueType } from './radio'
import { PropsType } from './radio-group'

export interface GroupContextType extends PropsType {
  model?: ValueType
  changeEvent: (val?: ValueType) => void
}

export const radioGroupKey: InjectionKey<GroupContextType> = Symbol('radioGroupKey')
