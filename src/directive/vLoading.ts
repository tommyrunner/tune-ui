import { watchEffect, type DirectiveBinding, type ObjectDirective } from "vue";
import { initLoading, type LoadingType } from "web-loading";
import { configOptions } from "@/hooks/useOptions";

/**
 * 为元素添加Loading状态的自定义指令
 * @interface LoadingElement
 * @extends HTMLElement
 */
interface LoadingElement extends HTMLElement {
  loadingInstance?: LoadingType | null;
}

/**
 * v-loading 指令：用于在元素上显示加载状态
 * @example
 * <div v-loading="isLoading"></div>
 */
export const vLoading: ObjectDirective<LoadingElement, boolean> = {
  /**
   * 指令挂载时初始化loading实例
   * @param {LoadingElement} el - 指令绑定的元素
   */
  mounted(el: LoadingElement) {
    el.loadingInstance = initLoading(configOptions.value.loadingOptions ?? {});
  },

  /**
   * 指令更新时处理loading状态变化
   * @param {LoadingElement} el - 指令绑定的元素
   * @param {DirectiveBinding<boolean>} binding - 指令绑定值
   */
  updated(el: LoadingElement, binding: DirectiveBinding<boolean>) {
    // 更新loading实例配置
    const loadingInstance = el.loadingInstance as LoadingType;

    // 监听绑定值变化，控制loading状态
    watchEffect(() => {
      if (binding.value) {
        loadingInstance.loading(el, configOptions.value.loadingOptions);
      } else {
        loadingInstance.close();
      }
    });
  },

  /**
   * 指令卸载时清理loading实例
   * @param {LoadingElement} el - 指令绑定的元素
   */
  unmounted(el: LoadingElement) {
    if (el.loadingInstance) {
      el.loadingInstance.close();
      el.loadingInstance = null;
    }
  }
};
