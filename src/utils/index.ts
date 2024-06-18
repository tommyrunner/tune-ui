import { is } from './is'
export function isKeyboard(event: KeyboardEvent, key: string | number) {
  if (is(key, 'Number')) return event.keyCode === key
  else event.key.toLocaleLowerCase() === key.toLocaleString()
}
