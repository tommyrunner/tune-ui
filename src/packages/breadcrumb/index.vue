<template>
  <div class="t-breadcrumb">
    <div v-for="(item, index) in options" :key="item.value || index" class="_breadcrumb-item">
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
import { useRouter } from "vue-router";
import { TIcon } from "@/packages/icon";
import { useI18nText } from "./i18n";

defineOptions({ name: "TBreadcrumb" });
const props = withDefaults(defineProps<PropsType>(), {
  isRouter: true,
  gap: 6,
  options: () => []
});
const { TEXT_ROUTE_NOT_FOUND, TEXT_ROUTE_NOT_SET } = useI18nText();

const model = defineModel<string>();
const emit = defineEmits<EmitsType>();
const router = useRouter();

// 路由检查
if (!router) {
  console.warn(TEXT_ROUTE_NOT_FOUND);
}

/**
 * 处理面包屑项点击
 */
const handleClick = (item: ValueType) => {
  if (item.disabled) return;

  // 更新选中值
  model.value = item.value;
  emit("change", item);

  // 处理路由跳转
  const { isRouter, isReplace } = props;
  if (!isRouter || !router) return;

  if (!item.to) {
    console.warn(TEXT_ROUTE_NOT_SET);
    return;
  }

  isReplace ? router.replace(item.to) : router.push(item.to);
};
</script>
