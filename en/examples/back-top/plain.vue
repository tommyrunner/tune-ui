<template>
  <div class="back-top-demo">
    <div class="scroll-container-plain">
      <p v-for="i in 30" :key="i" class="paragraph">
        This is line {{ i }} of example text. Please scroll down to see the plain style back to top button.
      </p>
    </div>
    <div class="demo-row">
      <t-back-top target=".scroll-container-plain" :right="'100px'" />
      <t-back-top target=".scroll-container-plain" plain />
    </div>
  </div>
</template>

<style scoped>
.back-top-demo {
  position: relative;
  height: 300px;
}
.scroll-container-plain {
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
.demo-row {
  margin-top: 10px;
  display: flex;
  gap: 15px;
}
</style>
