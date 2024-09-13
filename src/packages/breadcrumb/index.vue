<template>
  <div class="t-breadcrumb">
    <div v-for="(model, index) in models" :key="model.value || index" class="_item">
      <div class="_separated" v-if="index !== 0" :style="{ margin: `0px ${gap}px` }">
        <TIcon :icon="props.separatedIcon" v-if="props.separatedIcon" :size="18" />
        <b v-else>/</b>
      </div>
      <div :class="['_label', model.disabled && 't-disabled']" @click="handlerPush(model)">
        <TIcon :icon="model.icon" v-if="model.icon" :size="18" />
        <span v-html="model.label"></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { TIcon } from "../icon";
import type { EmitsType, PropsType, ValueType } from "./breadcrumb";
import { useRouter } from "vue-router";
defineOptions({ name: "TBreadcrumb" });
const props = withDefaults(defineProps<PropsType>(), {
  isRouter: true,
  gap: 6
});
const emit = defineEmits<EmitsType>();
const models = defineModel<ValueType[]>();
const router = useRouter();
if (!router) console.warn("router not injected!");
/**
 * 处理点击路由跳转事件
 */
const handlerPush = (model: ValueType) => {
  emit("change", model);
  const { isRouter, isReplace } = props;
  if (!isRouter || !router || model.disabled) return;
  if (!model.to) console.warn("to parameter not filled in");
  isReplace ? router.replace(model.to) : router.push(model.to);
};
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
