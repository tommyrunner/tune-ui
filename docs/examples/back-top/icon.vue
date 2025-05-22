<template>
  <div class="back-top-demo">
    <div class="scroll-container">
      <p v-for="i in 30" :key="i" class="paragraph">这是第 {{ i }} 行示例文本，请向下滚动查看不同图标的回到顶部按钮。</p>
    </div>
    <div class="demo-row">
      <t-back-top target=".scroll-container" :right="'120px'" icon="up" />
      <t-back-top target=".scroll-container" :right="'60px'" icon="arrow-up" />
      <t-back-top target=".scroll-container" icon="top" />
    </div>
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
.demo-row {
  margin-top: 10px;
  display: flex;
  gap: 15px;
}
</style>
