import type { InjectionKey } from 'vue'

export interface GroupContextType {}

export const collapseGroupKey: InjectionKey<GroupContextType> = Symbol('collapseGroupKey')
