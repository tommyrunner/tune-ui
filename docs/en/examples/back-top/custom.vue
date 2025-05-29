<template>
  <div class="back-top-demo">
    <div class="scroll-container-custom">
      <p v-for="i in 30" :key="i" class="paragraph">
        This is line {{ i }} of example text. Please scroll down to see back to top buttons with custom content.
      </p>
    </div>
    <t-back-top target=".scroll-container-custom" :right="'120px'">
      <div class="custom-back-top">
        <t-icon icon="caret-up" :size="12" />
        <span>Top</span>
      </div>
    </t-back-top>
    <t-back-top target=".scroll-container-custom">
      <div class="custom-back-top custom-back-top-circle">
        <t-icon icon="up" :size="16" />
      </div>
    </t-back-top>
  </div>
</template>

<style scoped>
.back-top-demo {
  position: relative;
  height: 300px;
}
.scroll-container-custom {
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
.custom-back-top {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #409eff;
  color: white;
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 12px;
}
.custom-back-top-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  justify-content: center;
  padding: 0;
}
</style>
