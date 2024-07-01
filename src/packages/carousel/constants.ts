import type { InjectionKey } from 'vue'
import type { ValueType } from './carousel'

export interface GroupContextType {
  model?: ValueType[]
  changeEvent: (is: boolean, val?: ValueType) => void
}

export const collapseGroupKey: InjectionKey<GroupContextType> = Symbol('collapseGroupKey')
