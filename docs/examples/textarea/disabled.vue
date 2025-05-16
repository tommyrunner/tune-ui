<template>
  <div class="textarea-demo">
    <t-textarea disabled placeholder="禁用状态的文本域" />
  </div>
</template>

<script setup>
import { TTextarea } from "tune-ui";
</script>

<style scoped>
.textarea-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.t-textarea {
  width: 320px;
}
</style>
