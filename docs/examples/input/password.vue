<template>
  <div class="input-demo">
    <t-input v-model="password" password placeholder="请输入密码" />
  </div>
</template>

<script setup>
import { ref } from "vue";


const password = ref("");
</script>

<style scoped>
.input-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.t-input {
  width: 240px;
}
</style>
