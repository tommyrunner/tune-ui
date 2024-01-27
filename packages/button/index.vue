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
<style lang="scss" scoped></style>
