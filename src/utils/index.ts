import { is, isFunction } from './is'
export function isKeyboard(event: KeyboardEvent, key: string | number) {
  if (is(key, 'Number')) return event.keyCode === key
  else event.key.toLocaleLowerCase() === key.toLocaleString()
}

let tmieout: undefined | NodeJS.Timeout = void 0

export function bindDebounce<T>(fun: (data?: T) => void | Function, delay: number, value?: T) {
  if (tmieout) clearTimeout(tmieout)
  tmieout = setTimeout(() => {
    if (fun) {
      let reFun = fun(value)
      isFunction(reFun) && reFun()
    }
    clearTimeout(tmieout)
  }, delay)
}
