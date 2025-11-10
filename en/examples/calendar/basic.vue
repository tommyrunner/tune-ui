<template>
  <div class="example-container">
    <t-calendar v-model="date" />
    <div class="value-display">
      <p>Currently selected date: {{ formatDisplayDate(date) }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const date = ref(new Date());

const formatDisplayDate = date => {
  if (!date) return "Not selected";
  if (typeof date === "string") return date;
  if (typeof date === "number") return new Date(date).toLocaleString();
  return date.toLocaleString();
};
</script>

<style scoped>
.example-container {
  margin-bottom: 20px;
}

.value-display {
  margin-top: 16px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
}
</style>
