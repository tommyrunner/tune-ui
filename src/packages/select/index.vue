<template>
  <div class="t-select">
    <TPopover v-model="state.popoverActive" type="click" position="bottom" :padding="0" :radius="contentRadius">
      <template #content>
        <TListView :list-data="options" class="_options" :style="getOptionsStyle" height="auto">
          <template #default="{ row }: ListSlotParamsType<OptionsItemType>">
            <TListViewItem>
              <Option :label="row.label" :value="row.value" @change="handlerOption(row)" />
            </TListViewItem>
          </template>
        </TListView>
      </template>
      <div class="_text-content" v-if="type === 'text'">
        {{ textLabel }}
        <TIcon :size="getIconSize" icon="caret-down" :color="defIconColor" />
      </div>
      <div :class="getClass" v-else>
        <div class="_prefix">
          <slot name="prefix" />
        </div>
        <component :is="TipComponent" />
        <input readonly ref="inputRef" :value="state.row.label" :placeholder="props.placeholder" :disabled="props.disabled" />
        <div class="_right-icon">
          <TIcon v-if="closeIconShow" icon="close-to" :size="getIconSize" :color="defIconColor" @click.stop="handleClear" />
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
import { type EmitsType, type ValueType, OptionsItemType, type PropsType, contentRadius } from "./select";
import type { ListSlotParamsType } from "@/packages/listView/listView";
import type { ElSizeType } from "@/types";
import { configOptions } from "@/hooks/useOptions";
import { TPopover } from "@/packages/popover";
import { type StyleValue, computed, reactive, ref, watch } from "vue";
import { TIcon } from "@/packages/icon";
import Option from "./option.vue";
import { TListView, TListViewItem } from "@/packages/listView";
import { fromCssVal } from "@/utils";
import { useTip } from "@/hooks";
import { provide } from "vue";
import { GroupContextType } from "./constants";
import { selectKey } from "element-plus";
import { toRefs } from "vue";

defineOptions({ name: "TSelect" });
const inputRef = ref();
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  options: () => [],
  type: "input",
  textLabel: "请选择",
  debounce: undefined,
  isTip: true,
  clearable: true,
  size: configOptions.value.elSize,
  disabled: false,
  debounceDelay: 1000
});
const model = defineModel<ValueType>();
const initRow: OptionsItemType = { label: "", value: "" };
const state = reactive({
  row: { ...initRow },
  popoverActive: false
});

const getClass = computed(() => {
  const { size, clearable, disabled } = props;
  return ["_select-content ", `t-select-size-${size}`, clearable && "t-select-clearable", disabled && "t-disabled"];
});
const TipComponent = useTip(props, model);
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
const handleClear = (event: Event) => {
  // 阻止事件冒泡，防止触发 popover
  event.stopPropagation();
  if (!props.clearable) return;
  modelCall();
  emit("clear");
};
/**
 * 点击option
 */
const handlerOption = (row: OptionsItemType) => {
  modelCall(row);
};
/**
 * 根据option处理model值
 * @param row
 */
const modelCall = (row?: OptionsItemType) => {
  if (!row) {
    state.row = { ...initRow };
    model.value = "";
    return;
  }
  state.row = row;
  state.popoverActive = false;
  model.value = row.value;
};
watch(
  () => [model.value],
  () => {
    const find = props.options.find(o => o.value === model.value);
    if (find) return find.label;
    else modelCall();
  }
);
const getOptionsStyle = computed((): StyleValue => {
  return {
    borderRadius: fromCssVal(contentRadius)
  };
});
// 抛出操作api，与子组件交互
provide<GroupContextType>(selectKey, reactive({ ...toRefs(props), model }));
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
