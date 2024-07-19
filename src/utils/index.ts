import { is, isFunction } from './is'
export function isKeyboard(event: KeyboardEvent, key: string | number) {
  if (is(key, 'Number')) return event.keyCode === key
  else event.key.toLocaleLowerCase() === key.toLocaleString()
}

/**
 * 处理绑定防抖事件
 * @param fun 事件触发
 * @param delay 延迟
 * @param params 参数
 */
export function bindDebounce<T>(fun: (data?: T) => void | Function, delay: number, params?: T) {
  let timeout: undefined | NodeJS.Timeout = void 0
  return (() => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      if (fun) {
        let reFun = fun(params)
        isFunction(reFun) && reFun()
      }
      clearTimeout(timeout)
    }, delay)
  })()
}
/**
 * 处理绑定节流事件
 * @param fun 事件触发
 * @param delay 延迟
 * @param params 参数
 */
export function bindThrottle<T>(fun: (data?: T) => void, delay: number) {
  let isThrottled = false
  return function (...args: any[]) {
    if (!isThrottled) {
      fun(...args)
      isThrottled = true
      setTimeout(() => (isThrottled = false), delay)
    }
  }
}

const requestAnimationFrame = window.requestAnimationFrame
export class AnimationFrame {
  delay: number
  id: number
  /**
   * AnimationFrame 循环事件类
   * @param delay 事件循环延迟时间
   */
  constructor(delay: number) {
    this.delay = delay
  }
  /**
   * 循环触发
   * @param fun 循环事件处理回调
   * @param immediate 是否立即触发
   */
  call(fun: Function, immediate: boolean = false) {
    // 如果不支持requestAnimationFrame，使用setInterval代替事件循环
    if (!requestAnimationFrame) {
      window.setInterval(fun, this.delay)
    }
    // Use the time axis to control the trigger time
    let endTime = Date.now() + this.delay
    if (immediate) fun.call(this)
    const run = () => {
      if (Date.now() > endTime) {
        fun.call(this)
        endTime = Date.now() + this.delay
      }
      this.id = requestAnimationFrame(run)
    }
    this.id = requestAnimationFrame(run)
  }
  /**
   * 清空事件循环
   * @returns
   */
  clear() {
    if (!this.id) return
    if (!requestAnimationFrame) {
      window.clearInterval(this.id)
    } else {
      window.cancelAnimationFrame(this.id)
    }
  }
}
