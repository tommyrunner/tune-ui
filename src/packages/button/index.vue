<template>
  <button>按钮</button>
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
