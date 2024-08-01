import { App } from 'vue'
import { TButton } from './button'
import { TIcon } from './icon'
import { TFlex, TFlexGroup } from './flex'
import { TRadio, TRadioGroup } from './radio'
import { TCheckbox, TCheckboxGroup } from './checkbox'
import { TSwitch } from './switch'
import { TInput } from './input'
import { TInputNumber } from './input-number'
import { TTextarea } from './textarea'
import { TRate } from './rate'
import { TBadge } from './badge'
import { TCard } from './card'
import { TCollapse, TCollapseGroup } from './collapse'
import { TCarousel, TCarouselGroup } from './carousel'
import { TPopover } from './popover'
import { TPopconfirm } from './popconfirm'
import { TDialog } from './dialog'
import { TDrawer } from './drawer'
import { TMessage, TNotification } from './message'

const components = {
  TButton,
  TIcon,
  TFlex,
  TFlexGroup,
  TRadio,
  TCheckbox,
  TRadioGroup,
  TCheckboxGroup,
  TSwitch,
  TInput,
  TInputNumber,
  TTextarea,
  TRate,
  TBadge,
  TCard,
  TCollapse,
  TCollapseGroup,
  TCarousel,
  TCarouselGroup,
  TPopover,
  TPopconfirm,
  TDialog,
  TDrawer,
  TMessage,
  TNotification
}
// 全局组件注册
export default {
  version: '1.0.0',
  install: (Vue: App) => {
    // 全部注册
    for (const comp of Object.values(components)) {
      comp.name && Vue.component(comp.name, comp)
    }
  }
}
// 导出所有组件类型
export * from './button'
export * from './icon'
export * from './flex'
export * from './radio'
export * from './checkbox'
export * from './switch'
export * from './input'
export * from './input-number'
export * from './textarea'
export * from './rate'
export * from './badge'
export * from './card'
export * from './collapse'
export * from './carousel'
export * from './popover'
export * from './popconfirm'
export * from './dialog'
export * from './drawer'
export * from './message'
