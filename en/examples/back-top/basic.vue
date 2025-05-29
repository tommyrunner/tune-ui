<template>
  <div class="back-top-demo">
    <div class="scroll-container-basic">
      <p v-for="i in 30" :key="i" class="paragraph">
        This is line {{ i }} of example text. Please scroll down to see the back to top button effect.
      </p>
    </div>
    <t-back-top target=".scroll-container-basic" />
  </div>
</template>

<style scoped>
.back-top-demo {
  position: relative;
  height: 300px;
}
.scroll-container-basic {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 12px;
}
.paragraph {
  margin: 10px 0;
  line-height: 1.6;
}
</style>
