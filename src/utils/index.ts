/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}
/**
 * @description: 是否已定义
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined'
}
/**
 * @description: 是否未定义
 */
export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val)
}
/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object')
}
/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function')
}

export function isKeyboard(event: KeyboardEvent, key: string | number) {
  if (is(key, 'Number')) return event.keyCode === key
  else event.key.toLocaleLowerCase() === key.toLocaleString()
}
