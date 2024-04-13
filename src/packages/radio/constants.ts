import type { InjectionKey } from 'vue'
import { PropsType } from './radio-group'

export interface GroupContextType extends PropsType {
  changeEvent: (val: PropsType['modelValue']) => void
}

export const radioGroupKey: InjectionKey<GroupContextType> = Symbol('radioGroupKey')
