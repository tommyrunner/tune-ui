import type { InjectionKey } from 'vue'
import { PropsType } from './checkbox-group'
import { ValueType } from '..'

export interface GroupContextType extends PropsType {
  changeEvent: (isChecked?: boolean, val?: ValueType) => void
}

export const checkboxGroupKey: InjectionKey<GroupContextType> = Symbol('checkboxGroupKey')
