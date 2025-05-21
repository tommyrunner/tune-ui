<template>
  <div class="image-demo">
    <div class="image-container">
      <t-image
        src="https://i.postimg.cc/C5k7W9GK/1.webp"
        alt="测试图片"
        width="300px"
        height="200px"
        referrerPolicy="no-referrer"
      />
    </div>
    <div class="code-block">
      <pre>
        &lt;t-image
          src="https://i.postimg.cc/C5k7W9GK/1.webp"
          alt="测试图片"
          width="300px"
          height="200px"
          referrerPolicy="no-referrer"
        /&gt;
      </pre>
    </div>
  </div>
</template>

<style scoped>
.image-demo {
  width: 100%;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 4px;
}

.code-block {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 15px;
  margin-top: 10px;
  color: #606266;
  font-family: Consolas, Monaco, monospace;
  font-size: 14px;
  line-height: 1.5;
}

pre {
  margin: 0;
  white-space: pre-wrap;
}
</style> 