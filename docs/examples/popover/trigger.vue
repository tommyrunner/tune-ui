<template>
  <div class="demo-container">
    <p class="demo-desc">弹出框支持多种触发方式，包括悬停、点击、聚焦和手动触发。</p>
    <div class="demo-block">
      <div class="trigger-item">
        <h4>悬停触发 (hover)</h4>
        <t-popover 
          title="悬停触发" 
          content="鼠标悬停在触发元素上时显示弹出框，移开后关闭" 
          type="hover"
          :hover-delay="300"
          :hide-delay="200"
        >
          <t-button>悬停触发</t-button>
        </t-popover>
      </div>
      
      <div class="trigger-item">
        <h4>点击触发 (click)</h4>
        <t-popover 
          title="点击触发" 
          content="点击触发元素时显示弹出框，再次点击或点击外部区域关闭" 
          type="click"
        >
          <t-button>点击触发</t-button>
        </t-popover>
      </div>
      
      <div class="trigger-item">
        <h4>聚焦触发 (focus)</h4>
        <t-popover 
          title="聚焦触发" 
          content="聚焦到触发元素时显示弹出框，失去焦点时关闭" 
          type="focus"
        >
          <t-input placeholder="点击输入框聚焦" />
        </t-popover>
      </div>
      
      <div class="trigger-item">
        <h4>手动触发 (manual)</h4>
        <div class="manual-trigger">
          <t-popover 
            v-model:visible="manualVisible" 
            title="手动触发" 
            content="通过程序控制弹出框的显示和隐藏" 
            type="manual"
          >
            <t-button>受控元素</t-button>
          </t-popover>
          
          <div class="control-buttons">
            <t-button size="small" type="primary" @click="showPopover">显示</t-button>
            <t-button size="small" type="danger" @click="hidePopover">隐藏</t-button>
          </div>
        </div>
      </div>
      
      <div class="trigger-item">
        <h4>悬停延迟 (delay)</h4>
        <div class="delay-triggers">
          <t-popover 
            content="无延迟" 
            type="hover"
          >
            <t-button>无延迟</t-button>
          </t-popover>
          
          <t-popover 
            content="显示延迟 500ms" 
            type="hover"
            :hover-delay="500"
          >
            <t-button>显示延迟</t-button>
          </t-popover>
          
          <t-popover 
            content="隐藏延迟 500ms" 
            type="hover"
            :hide-delay="500"
          >
            <t-button>隐藏延迟</t-button>
          </t-popover>
        </div>
      </div>
    </div>
    
    <div class="trigger-info">
      <h4>触发方式属性</h4>
      <ul>
        <li><code>type</code>：指定触发方式，可选值为 <code>hover</code>、<code>click</code>、<code>focus</code>、<code>manual</code></li>
        <li><code>hover-delay</code>：悬停触发的显示延迟时间，单位为毫秒</li>
        <li><code>hide-delay</code>：悬停触发的隐藏延迟时间，单位为毫秒</li>
        <li><code>visible</code>：手动控制弹出框显示状态（仅在 <code>type="manual"</code> 时生效）</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


// 手动控制状态
const manualVisible = ref(false);

// 显示弹出框
const showPopover = () => {
  manualVisible.value = true;
};

// 隐藏弹出框
const hidePopover = () => {
  manualVisible.value = false;
};
</script>

<style scoped>
.demo-container {
  padding: 16px 0;
}

.demo-desc {
  margin: 0 0 16px;
  color: #606266;
  line-height: 1.6;
}

.demo-block {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-bottom: 24px;
}

.trigger-item {
  margin-bottom: 20px;
}

.trigger-item h4 {
  margin: 0 0 12px;
  font-size: 14px;
  color: #606266;
}

.manual-trigger {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.control-buttons {
  display: flex;
  gap: 8px;
}

.delay-triggers {
  display: flex;
  gap: 12px;
}

.trigger-info {
  width: 100%;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #409eff;
}

.trigger-info h4 {
  margin: 0 0 12px;
  font-size: 16px;
  color: #303133;
}

.trigger-info ul {
  margin: 0;
  padding-left: 20px;
  color: #606266;
  line-height: 1.8;
}

.trigger-info li {
  margin-bottom: 8px;
}

.trigger-info code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: monospace;
}
</style> 