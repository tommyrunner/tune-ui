<template>
  <div class="back-top-demo">
    <div class="scroll-container">
      <p v-for="i in 30" :key="i" class="paragraph">
        这是第 {{ i }} 行示例文本，请向下滚动查看不同位置的回到顶部按钮。
      </p>
    </div>
    <div class="demo-controller">
      <div class="control-item">
        <span>右侧距离: {{ right }}px</span>
        <t-slider v-model="right" :min="20" :max="150" />
      </div>
      <div class="control-item">
        <span>底部距离: {{ bottom }}px</span>
        <t-slider v-model="bottom" :min="20" :max="150" />
      </div>
    </div>
    <t-back-top 
      target=".scroll-container" 
      :right="`${right}px`" 
      :bottom="`${bottom}px`" 
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TBackTop, TSlider } from "tune-ui";

const right = ref(32);
const bottom = ref(32);
</script>

<style scoped>
.back-top-demo {
  position: relative;
  height: 400px;
}
.scroll-container {
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