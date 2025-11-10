<template>
  <div class="back-top-demo">
    <div class="scroll-container-icon">
      <p v-for="i in 30" :key="i" class="paragraph">
        This is line {{ i }} of example text. Please scroll down to see back to top buttons with different icons.
      </p>
    </div>
    <div class="demo-row">
      <t-back-top target=".scroll-container-icon" :right="'120px'" icon="up" icon-size="24" />
      <t-back-top target=".scroll-container-icon" :right="'60px'" icon="upload" icon-size="24" />
      <t-back-top target=".scroll-container-icon" :right="'10px'" icon="download" icon-size="24" />
    </div>
  </div>
</template>

<style scoped>
.back-top-demo {
  position: relative;
  height: 300px;
}
.scroll-container-icon {
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
