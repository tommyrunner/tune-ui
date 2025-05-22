<template>
  <div class="back-top-demo">
    <div class="scroll-container">
      <p v-for="i in 30" :key="i" class="paragraph">这是第 {{ i }} 行示例文本，请向下滚动查看回到顶部按钮效果。</p>
    </div>
    <t-back-top />
  </div>
</template>

<style scoped>
.back-top-demo {
  position: relative;
  height: 300px;
}
.scroll-container {
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
