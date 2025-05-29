<template>
  <div class="demo-container">
    <p class="demo-desc">The popover supports multiple trigger methods, including hover, click, focus, and manual trigger.</p>
    <div class="demo-block">
      <div class="trigger-item">
        <h4>Hover Trigger</h4>
        <t-popover
          title="Hover Trigger"
          content="Display popover when mouse hovers over trigger element, close when moved away"
          type="hover"
          :hover-delay="300"
          :hide-delay="200"
        >
          <t-button>Hover Trigger</t-button>
        </t-popover>
      </div>

      <div class="trigger-item">
        <h4>Click Trigger</h4>
        <t-popover
          title="Click Trigger"
          content="Display popover when clicking trigger element, close when clicking again or outside area"
          type="click"
        >
          <t-button>Click Trigger</t-button>
        </t-popover>
      </div>

      <div class="trigger-item">
        <h4>Focus Trigger</h4>
        <t-popover
          title="Focus Trigger"
          content="Display popover when trigger element is focused, close when focus is lost"
          type="focus"
        >
          <t-input placeholder="Click input to focus" />
        </t-popover>
      </div>
      
      <div class="trigger-item">
        <h4>Manual Trigger</h4>
        <div class="manual-trigger">
          <t-popover 
            v-model:visible="manualVisible" 
            title="Manual Trigger" 
            content="Control popover display and hide through programming" 
            type="manual"
          >
            <t-button>Controlled Element</t-button>
          </t-popover>
          
          <div class="control-buttons">
            <t-button size="small" type="primary" @click="showPopover">Show</t-button>
            <t-button size="small" type="danger" @click="hidePopover">Hide</t-button>
          </div>
        </div>
      </div>
      
      <div class="trigger-item">
        <h4>Hover Delay</h4>
        <div class="delay-triggers">
          <t-popover 
            content="No delay" 
            type="hover"
          >
            <t-button>No Delay</t-button>
          </t-popover>
          
          <t-popover 
            content="Show delay 500ms" 
            type="hover"
            :hover-delay="500"
          >
            <t-button>Show Delay</t-button>
          </t-popover>
          
          <t-popover 
            content="Hide delay 500ms" 
            type="hover"
            :hide-delay="500"
          >
            <t-button>Hide Delay</t-button>
          </t-popover>
        </div>
      </div>
    </div>
    
    <div class="trigger-info">
      <h4>Trigger Method Properties</h4>
      <ul>
        <li><code>type</code>: Specify trigger method, options are <code>hover</code>, <code>click</code>, <code>focus</code>, <code>manual</code></li>
        <li><code>hover-delay</code>: Show delay time for hover trigger, in milliseconds</li>
        <li><code>hide-delay</code>: Hide delay time for hover trigger, in milliseconds</li>
        <li><code>visible</code>: Manually control popover display state (only effective when <code>type="manual"</code>)</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Manual control state
const manualVisible = ref(false);

// Show popover
const showPopover = () => {
  manualVisible.value = true;
};

// Hide popover
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