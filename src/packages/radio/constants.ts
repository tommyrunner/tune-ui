import type { InjectionKey } from 'vue'
import { PropsType } from './radio-group'
import { ValueType } from './radio'

export interface GroupContextType extends PropsType {
  model?: ValueType
  changeEvent: (val?: ValueType) => void
}

export const radioGroupKey: InjectionKey<GroupContextType> = Symbol('radioGroupKey')
