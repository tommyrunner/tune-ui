import { computed, h, Ref, type Component } from "vue";
import type { TipProps } from "./type";

/**
 * 提示文本 hooks
 * @param props 组件 props
 * @param modelValue 组件的值
 * @returns Tip 组件
 */
export const useTip = (props: TipProps, modelValue: Ref<any>): Component => {
  return {
    name: "TTip",
    setup() {
      // 是否显示提示
      const showTip = computed(() => {
        if (!props.isTip) return false;
        return Boolean(modelValue.value) && Boolean(props.placeholder || props.tip);
      });

      // 提示文本
      const tipText = computed(() => {
        return props.tip || props.placeholder || "";
      });

      return () =>
        showTip.value
          ? h(
              "span",
              {
                class: ["t-tip", props.tipClass]
              },
              tipText.value
            )
          : null;
    }
  };
};

export type { TipProps };
