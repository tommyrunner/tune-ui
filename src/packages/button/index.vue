<template>
  <button>按钮2</button>
  <i class="iconfont icon-xianxing-_shanchu1"></i>
</template>
<script lang="ts" setup>
defineOptions({ name: 'TButton' })
defineExpose({
  test: () => {
    console.log('测试')
  }
})
</script>
<style lang="scss" scoped>
@import '../../styles/index.scss';
button {
  background-color: $bgColor;
}
</style>
