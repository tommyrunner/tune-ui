<template>
  <div class="t-select">
    <!-- :close-on-press-other="false" -->
    <TPopover type="click" position="bottom">
      <template #content>
        <div class="_options">
          <Option />
        </div>
      </template>
      <!-- <div style="width: 100px; height: 100px; border: 1px solid saddlebrown">1</div>
      <div style="width: 100px; height: 100px; border: 1px solid saddlebrown">1</div> -->
      <div class="_text-content" v-if="type === 'text'" @click="handlerActive(!state.active)">
        {{ textLabel }}
        <TIcon :size="getIconSize" icon="caret-down" :color="defIconColor" />
      </div>
      <div :class="getClass" v-else>
        <div class="_prefix">
          <slot name="prefix" />
        </div>
        <span class="_tip" v-if="getTip">{{ getTip }}</span>
        <input
          ref="inputRef"
          v-model="model"
          :type="getInputType"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :maxlength="props.maxLength"
          @focus="handlerActive(true)"
          @blur="handlerActive(false)"
          @keyup.enter="emit('enter', model)"
          @input="handleInput"
        />
        <div class="_right-icon">
          <TIcon v-if="closeIconShow" :size="getIconSize" icon="close-to" :color="defIconColor" @click="handleClear" />
          <TIcon
            v-else
            :class="state.active ? '_icon-active' : ''"
            :size="getIconSize"
            icon="caret-down"
            :color="defIconColor"
            @click="inputRef.focus()"
          />
        </div>
      </div>
    </TPopover>
  </div>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType } from "./select";
import type { ElSizeType } from "@/types";
import { configOptions } from "@/hooks/useOptions";
import { TPopover } from "@/packages/popover";
import { InputTypeHTMLAttribute, computed, reactive, ref } from "vue";
import { TIcon } from "../icon";
import Option from "./option.vue";
import { bindDebounce } from "@/utils";
defineOptions({ name: "TSelect" });
const inputRef = ref();
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  textLabel: "请选择",
  debounce: undefined,
  isTip: true,
  clearable: true,
  size: configOptions.value.elSize,
  disabled: false,
  debounceDelay: 1000
});
const model = defineModel<string>("");
const state = reactive({
  active: false
});
const isPreview = ref(false);

const getClass = computed(() => {
  const { size, clearable, disabled } = props;
  return ["_select-content ", `t-select-size-${size}`, clearable && "t-select-clearable", disabled && "t-disabled"];
});
const getTip = computed(() => {
  return props.isTip && model.value && (props.placeholder || props.tip);
});
const getInputType = computed((): InputTypeHTMLAttribute => {
  return props.password && !isPreview.value ? "password" : "text";
});
const closeIconShow = computed((): boolean => {
  return props.clearable && model.value ? true : false;
});
const sizes: { [key in ElSizeType]: number } = {
  default: 14,
  small: 14,
  large: 18
};
const defIconColor = "#656a6e56";
const getIconSize = computed(() => {
  return sizes[props.size];
});
const handlerActive = (is: boolean) => {
  state.active = is;
};
const handleClear = () => {
  if (!props.clearable) return;
  model.value = "";
  emit("clear");
};
// 防抖事件
const debounce = bindDebounce(props.debounce, props.debounceDelay);
// 输入处理
const handleInput = () => {
  emit("input", model.value);
  // 优化处理:如果没绑定防抖事件直接返回
  if (!props.debounce) return;
  // 防抖处理
  debounce(model.value);
};
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
