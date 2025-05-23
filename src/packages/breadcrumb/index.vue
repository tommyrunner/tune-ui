<template>
  <div class="t-breadcrumb">
    <div v-for="(item, index) in props.options" :key="item.value || index" class="_breadcrumb-item">
      <div v-if="index !== 0" class="_separator" :style="{ margin: `0px ${gap}px` }">
        <t-icon v-if="separatedIcon" :icon="separatedIcon" :size="13" />
        <b v-else>/</b>
      </div>
      <div :class="['_content', item.disabled && 't-disabled', model === item.value && 't-active']" @click="handleClick(item)">
        <t-icon v-if="item.icon" :icon="item.icon" :size="13" />
        <span v-html="item.label"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { EmitsType, PropsType, ValueType } from "./breadcrumb";
import { TIcon } from "@/packages/icon";

defineOptions({ name: "TBreadcrumb" });
const props = withDefaults(defineProps<PropsType>(), {
  gap: 6,
  options: () => []
});

const model = defineModel<string>();
const emit = defineEmits<EmitsType>();

/**
 * 处理面包屑项点击
 */
const handleClick = (item: ValueType) => {
  if (item.disabled) return;

  // 更新选中值
  model.value = item.value;
  emit("change", item);

  // 触发点击事件，由使用者自行处理路由跳转
  emit("click", item);
};
</script>
