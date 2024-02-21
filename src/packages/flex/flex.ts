/**
 * @description: 组件props类型
 */
export type AlignmentTypes = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
export interface PropsType {
  spans: number[]
  gap?: number
  align?: AlignmentTypes
  justify?: AlignmentTypes
  offset?: number[]
  itemDisplay?: string
  sort?: number[]
}
