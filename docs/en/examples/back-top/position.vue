<template>
  <div class="back-top-demo">
    <div class="scroll-container-position">
      <p v-for="i in 30" :key="i" class="paragraph">
        This is line {{ i }} of example text. Please scroll down to see back to top buttons at different positions.
      </p>
    </div>
    <t-back-top target=".scroll-container-position" :right="`${right}px`" :bottom="`${bottom}px`" />
  </div>
  <div class="demo-controller">
    <div class="control-item">
      <span>Right Distance: {{ right }}px</span>
      <t-slider v-model="right" :min="20" :max="150" />
    </div>
    <div class="control-item">
      <span>Bottom Distance: {{ bottom }}px</span>
      <t-slider v-model="bottom" :min="20" :max="150" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const right = ref(32);
const bottom = ref(32);
</script>

<style scoped>
.back-top-demo {
  position: relative;
}
.scroll-container-position {
  height: 250px;
  overflow-y: auto;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 12px;
}
.paragraph {
  margin: 10px 0;
  line-height: 1.6;
}
.demo-controller {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.control-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
