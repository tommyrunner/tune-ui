<template>
  <div class="demo-container">
    <p class="demo-desc">
      You can customize the style of the pop confirm by setting properties such as <code>padding</code>, <code>box-shadow</code> and <code>max-width</code>.
    </p>
    
    <div class="style-config">
      <div class="config-item">
        <span class="config-label">Padding</span>
        <div class="config-options">
          <t-button size="small" :type="padding === 'small' ? 'primary' : 'default'" @click="padding = 'small'">Small</t-button>
          <t-button size="small" :type="padding === 'medium' ? 'primary' : 'default'" @click="padding = 'medium'">Medium</t-button>
          <t-button size="small" :type="padding === 'large' ? 'primary' : 'default'" @click="padding = 'large'">Large</t-button>
        </div>
      </div>
      
      <div class="config-item">
        <span class="config-label">Shadow</span>
        <div class="config-options">
          <t-button size="small" :type="shadow === 'light' ? 'primary' : 'default'" @click="shadow = 'light'">Light</t-button>
          <t-button size="small" :type="shadow === 'medium' ? 'primary' : 'default'" @click="shadow = 'medium'">Medium</t-button>
          <t-button size="small" :type="shadow === 'deep' ? 'primary' : 'default'" @click="shadow = 'deep'">Deep</t-button>
        </div>
      </div>
      
      <div class="config-item">
        <span class="config-label">Max Width</span>
        <div class="config-options">
          <t-button size="small" :type="maxWidth === '200px' ? 'primary' : 'default'" @click="maxWidth = '200px'">Narrow</t-button>
          <t-button size="small" :type="maxWidth === '300px' ? 'primary' : 'default'" @click="maxWidth = '300px'">Medium</t-button>
          <t-button size="small" :type="maxWidth === '400px' ? 'primary' : 'default'" @click="maxWidth = '400px'">Wide</t-button>
        </div>
      </div>
    </div>
    
    <div class="preview">
      <t-pop-confirm 
        :content="contentText"
        :padding="getPadding()"
        :box-shadow="getBoxShadow()"
        :max-width="maxWidth"
      >
        <t-button type="primary">Preview Custom Style</t-button>
      </t-pop-confirm>
      
      <div class="current-config">
        <h4>Current Configuration</h4>
        <div class="config-code">
          <pre><code>padding: {{ JSON.stringify(getPadding()) }}
box-shadow: {{ JSON.stringify(getBoxShadow()) }}
max-width: {{ maxWidth }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";


// Style configuration
const padding = ref("medium");
const shadow = ref("medium");
const maxWidth = ref("300px");

// Content text
const contentText = computed(() => {
  return "This is a custom styled pop confirm. Current configuration: padding(" + padding.value + 
    "), shadow(" + shadow.value + "), max-width(" + maxWidth.value + ")";
});

// Get padding configuration
const getPadding = () => {
  switch (padding.value) {
    case "small": return [4, 4, 4, 4];
    case "large": return [16, 16, 16, 16];
    default: return [8, 8, 8, 8]; // medium
  }
};

// Get shadow configuration
const getBoxShadow = () => {
  switch (shadow.value) {
    case "light": return [0, 2, 6, "rgba(0, 0, 0, 0.05)"];
    case "deep": return [0, 6, 16, "rgba(0, 0, 0, 0.15)"];
    default: return [0, 4, 12, "rgba(0, 0, 0, 0.1)"]; // medium
  }
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

.demo-desc code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}

.style-config {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.config-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.config-item:last-child {
  margin-bottom: 0;
}

.config-label {
  width: 80px;
  color: #606266;
  font-size: 14px;
}

.config-options {
  display: flex;
  gap: 8px;
}

.preview {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-start;
}

.current-config {
  margin-top: 8px;
}

.current-config h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #303133;
}

.config-code {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-family: Consolas, Monaco, monospace;
  font-size: 12px;
  color: #606266;
  line-height: 1.6;
}

.config-code pre {
  margin: 0;
}
</style> 