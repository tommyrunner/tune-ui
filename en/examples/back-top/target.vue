<template>
  <div class="back-top-demo">
    <div class="demo-row">
      <div class="scroll-container-target-1" id="container1">
        <div class="container-title">Container 1</div>
        <p v-for="i in 20" :key="i" class="paragraph">This is line {{ i }} of example text in container 1.</p>
      </div>
      <div class="scroll-container-target-2" id="container2">
        <div class="container-title">Container 2</div>
        <p v-for="i in 20" :key="i" class="paragraph">This is line {{ i }} of example text in container 2.</p>
      </div>
    </div>
    <t-back-top target="#container1" :right="'120px'" :icon-size="24" icon="caret-left" />
    <t-back-top target="#container2" :icon-size="24" icon="caret-right" />
  </div>
</template>

<style scoped>
.back-top-demo {
  position: relative;
  height: 300px;
}
.demo-row {
  display: flex;
  gap: 20px;
}
.scroll-container-target-1,
.scroll-container-target-2 {
  flex: 1;
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 12px;
  position: relative;
}
.container-title {
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: #409eff;
}
.paragraph {
  margin: 10px 0;
  line-height: 1.6;
}
</style>
