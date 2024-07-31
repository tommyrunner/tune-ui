import type { PropsType } from './message'
import { createVNode, render } from 'vue'
import Message from './index.vue'

export const messageGap = 28
export const messageClass = `t-message`
export const messageTag = `tui`

function getLastMessage() {
  let max = 0
  let lastMessageEl = void 0
  const messageAllEl: HTMLElement[] = Array.from(document.querySelectorAll(`.${messageClass}[${messageTag}]`))
  messageAllEl.forEach((el) => {
    if (el.offsetTop >= max) {
      max = el.offsetTop
      lastMessageEl = el
    }
  })
  return { lastMessageEl, messageAllEl }
}
function createMessage(props: PropsType) {
  const { duration, maxLength } = props
  // 判断得出最大的y轴
  const { lastMessageEl, messageAllEl } = getLastMessage()
  if (messageAllEl.length > maxLength) return
  const custom = { x: '50%', y: `${messageGap}px` }
  if (lastMessageEl) {
    custom.y = `${lastMessageEl.offsetHeight + lastMessageEl.offsetTop + messageGap}px`
  }
  const VNode = createVNode(Message, { ...props, ...{ custom } })
  render(VNode, document.createElement('div'))
  const component: HTMLElement = VNode.component.exposed.getComponent()
  // 控制是否显示时长
  if (duration) {
    window.setTimeout(() => closeMessage(component), duration)
  }
  return { VNode: VNode, component }
}
function closeMessage(messageEl: HTMLElement) {
  if (!messageEl) return
  messageEl.classList.add('t-message-close')
  messageEl.addEventListener('animationend', removeElement)
}
const removeElement = function (event: MouseEvent) {
  const element = event.target as HTMLElement
  element.remove() // 从DOM中移除元素
  // 移除事件监听器
  element.removeEventListener('animationend', removeElement)
}

function initProps(props: PropsType) {
  return {
    ...{ duration: 2600, maxLength: 8 },
    ...props
  }
}
function message(props: PropsType) {
  createMessage(initProps(props))
}
export default {
  message
}
