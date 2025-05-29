<template>
  <div class="tag-demo">
    <t-tag v-for="(tag, index) in tags" :key="index" :type="tag.type" closable @close="handleClose(index)">
      {{ tag.text }}
    </t-tag>
    <t-tag v-if="tags.length < initialTags.length" type="primary" @click="handleRestore">Restore Tags</t-tag>
  </div>
</template>

<script setup>
import { ref } from "vue";

const initialTags = [
  { text: "Tag One", type: "default" },
  { text: "Tag Two", type: "primary" },
  { text: "Tag Three", type: "success" },
  { text: "Tag Four", type: "warning" }
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
