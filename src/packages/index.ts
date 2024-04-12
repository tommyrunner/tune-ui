import { App } from 'vue'
import { TButton } from './button'
import { TIcon } from './icon'
import { TFlex } from './flex'
import { TRadio, TRadioGroup } from './radio'
import { TCheckbox } from './checkbox'
import { TCheckboxGroup } from './checkbox-group'

const components = { TButton, TIcon, TFlex, TRadio, TCheckbox, TRadioGroup, TCheckboxGroup }
// 全局组件注册
export default {
  version: '1.0.0',
  install: (Vue: App) => {
    // 全部注册
    for (const comp of Object.values(components)) {
      Vue.component(comp.name, comp)
    }
  }
}
// 导出所有组件类型
export * from './button'
export * from './icon'
export * from './flex'
export * from './radio'
export * from './radio/radio-group'
export * from './checkbox'
export * from './checkbox-group'
