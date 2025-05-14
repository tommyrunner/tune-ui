<template>
  <div class="tag-demo">
    <t-tag v-for="(tag, index) in tags" :key="index" :type="tag.type" closable @close="handleClose(index)">
      {{ tag.text }}
    </t-tag>
    <t-tag v-if="tags.length < initialTags.length" type="primary" @click="handleRestore"> 恢复标签 </t-tag>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TTag } from "tune-ui";

const initialTags = [
  { text: "标签一", type: "default" },
  { text: "标签二", type: "primary" },
  { text: "标签三", type: "success" },
  { text: "标签四", type: "warning" }
];

const tags = ref([...initialTags]);

const handleClose = index => {
  tags.value.splice(index, 1);
};

const handleRestore = () => {
  tags.value = [...initialTags];
};
</script>

<style scoped>
.tag-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
