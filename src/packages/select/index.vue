<template>
  <div class="t-select">
    <TPopover v-model="state.popoverActive" type="click" position="bottom" :padding="0" :radius="contentRadius">
      <template #content>
        <TListView :list-data="options" class="_options" :style="getOptionsStyle" height="auto">
          <template #default="{ row }: ListSlotParamsType<OptionsItemType>">
            <TListViewItem>
              <Option :label="row.label" :value="row.value" />
            </TListViewItem>
          </template>
        </TListView>
      </template>
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
          readonly
          ref="inputRef"
          v-model="model"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          @focus="handlerActive(true)"
          @blur="handlerActive(false)"
          @keyup.enter="emit('enter', model)"
          @input="handleInput"
        />
        <div class="_right-icon">
          <TIcon v-if="closeIconShow" :size="getIconSize" icon="close-to" :color="defIconColor" @click="handleClear" />
          <TIcon
            v-else
            :class="state.popoverActive ? '_icon-active' : ''"
            :size="getIconSize"
            icon="caret-down"
            :color="defIconColor"
          />
        </div>
      </div>
    </TPopover>
  </div>
</template>
<script lang="ts" setup>
import { type EmitsType, OptionsItemType, type PropsType, contentRadius } from "./select";
import type { ListSlotParamsType } from "@/packages/listView/listView";
import type { ElSizeType } from "@/types";
import { configOptions } from "@/hooks/useOptions";
import { TPopover } from "@/packages/popover";
import { computed, reactive, ref, StyleValue } from "vue";
import { TIcon } from "@/packages/icon";
import Option from "./option.vue";
import { TListView, TListViewItem } from "@/packages/listView";
import { fromCssVal } from "@/utils";
defineOptions({ name: "TSelect" });
const inputRef = ref();
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  options: () => [],
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
  popoverActive: false,
  active: false
});

const getClass = computed(() => {
  const { size, clearable, disabled } = props;
  return ["_select-content ", `t-select-size-${size}`, clearable && "t-select-clearable", disabled && "t-disabled"];
});
const getTip = computed(() => {
  return props.isTip && model.value && (props.placeholder || props.tip);
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
const getOptionsStyle = computed((): StyleValue => {
  return {
    borderRadius: fromCssVal(contentRadius)
  };
});
// 输入处理
const handleInput = () => {
  emit("input", model.value);
};
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
