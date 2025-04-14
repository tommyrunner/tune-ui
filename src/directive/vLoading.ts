import { watchEffect, type DirectiveBinding } from "vue";
import { initLoading, type LoadingType } from "web-loading";
import { configOptions } from "@/hooks/useOptions";

export const vLoading = {
  mounted(el: HTMLElement) {
    el["loadingInstance"] = initLoading(configOptions.value.loadingOptions ?? {});
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const loadingInstance = el["loadingInstance"] as LoadingType;
    watchEffect(() => {
      if (binding.value) {
        loadingInstance.loading(el);
      } else {
        loadingInstance.close();
      }
    });
  },
  unmounted(el: HTMLElement) {
    (el["loadingInstance"] as LoadingType).close();
    el["loadingInstance"] = null;
  }
};
