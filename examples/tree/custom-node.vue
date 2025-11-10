<template>
  <div class="tree-demo">
    <t-tree :data="treeData">
      <template #default="rowData">
        <div class="custom-node">
          <span :class="getIconClass(rowData?.node)" :style="{ color: getIconColor(rowData?.node) }"></span>
          <span class="node-label">{{ rowData?.node?.label }}</span>
          <span v-if="rowData?.node?.tag" class="node-tag" :class="getTagClass(rowData?.node?.tag)">
            {{ rowData?.node?.tag }}
          </span>
        </div>
      </template>
    </t-tree>
  </div>
</template>

<script setup>
import { ref } from "vue";

const treeData = ref([
  {
    id: "1",
    label: "项目文件",
    tag: "文件夹",
    children: [
      {
        id: "1-1",
        label: "源代码",
        tag: "文件夹",
        children: [
          {
            id: "1-1-1",
            label: "index.html",
            tag: "HTML"
          },
          {
            id: "1-1-2",
            label: "app.js",
            tag: "JS"
          },
          {
            id: "1-1-3",
            label: "style.css",
            tag: "CSS"
          }
        ]
      },
      {
        id: "1-2",
        label: "资源文件",
        tag: "文件夹",
        children: [
          {
            id: "1-2-1",
            label: "logo.png",
            tag: "图片"
          },
          {
            id: "1-2-2",
            label: "banner.jpg",
            tag: "图片"
          }
        ]
      },
      {
        id: "1-3",
        label: "README.md",
        tag: "MD"
      }
    ]
  },
  {
    id: "2",
    label: "配置文件",
    tag: "文件夹",
    children: [
      {
        id: "2-1",
        label: "package.json",
        tag: "JSON"
      },
      {
        id: "2-2",
        label: ".gitignore",
        tag: "配置"
      }
    ]
  }
]);

/**
 * 获取节点图标类
 * @param {Object} node - 树节点对象
 * @returns {string} 图标CSS类名
 */
const getIconClass = node => {
  // 判断是否有children属性且不为空数组来确定是否为文件夹
  const hasChildren = node?.data?.children && node.data.children.length > 0;

  if (hasChildren) {
    return node.isExpanded ? "icon icon-folder-open" : "icon icon-folder";
  }

  // 根据扩展名决定图标
  const label = node?.data?.label || "";
  if (label.endsWith(".html")) return "icon icon-html";
  if (label.endsWith(".js")) return "icon icon-js";
  if (label.endsWith(".css")) return "icon icon-css";
  if (label.endsWith(".json")) return "icon icon-json";
  if (label.endsWith(".md")) return "icon icon-markdown";
  if (label.endsWith(".png") || label.endsWith(".jpg")) return "icon icon-image";

  return "icon icon-file";
};

/**
 * 获取图标颜色
 * @param {Object} node - 树节点对象
 * @returns {string} 颜色值
 */
const getIconColor = node => {
  // 判断是否有children属性且不为空数组来确定是否为文件夹
  const hasChildren = node?.data?.children && node.data.children.length > 0;

  if (hasChildren) return "#f9a825"; // 文件夹颜色

  const label = node?.data?.label || "";
  if (label.endsWith(".html")) return "#e44d26";
  if (label.endsWith(".js")) return "#f0db4f";
  if (label.endsWith(".css")) return "#264de4";
  if (label.endsWith(".json")) return "#f0a050";
  if (label.endsWith(".md")) return "#2196f3";
  if (label.endsWith(".png") || label.endsWith(".jpg")) return "#4caf50";

  return "#607d8b";
};

/**
 * 获取标签样式
 * @param {string} tag - 标签文本
 * @returns {string} 标签CSS类名
 */
const getTagClass = tag => {
  const map = {
    文件夹: "tag-folder",
    HTML: "tag-html",
    JS: "tag-js",
    CSS: "tag-css",
    JSON: "tag-json",
    MD: "tag-md",
    图片: "tag-image",
    配置: "tag-config"
  };

  return map[tag] || "tag-default";
};
</script>

<style scoped>
.tree-demo {
  padding: 16px 0;
  max-width: 400px;
}
.custom-node {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 4px;
  font-family: "FontAwesome";
}
.icon-folder::before {
  content: "📁";
}
.icon-folder-open::before {
  content: "📂";
}
.icon-file::before {
  content: "📄";
}
.icon-html::before {
  content: "🌐";
}
.icon-css::before {
  content: "🎨";
}
.icon-js::before {
  content: "⚙️";
}
.icon-json::before {
  content: "📋";
}
.icon-markdown::before {
  content: "📝";
}
.icon-image::before {
  content: "🖼️";
}

.node-label {
  flex: 1;
}
.node-tag {
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
  margin-left: 8px;
}
.tag-folder {
  background-color: #fff3e0;
  color: #e65100;
}
.tag-html {
  background-color: #ffebee;
  color: #c62828;
}
.tag-js {
  background-color: #fffde7;
  color: #fbc02d;
}
.tag-css {
  background-color: #e3f2fd;
  color: #1565c0;
}
.tag-json {
  background-color: #fff8e1;
  color: #ff8f00;
}
.tag-md {
  background-color: #e1f5fe;
  color: #0277bd;
}
.tag-image {
  background-color: #e8f5e9;
  color: #2e7d32;
}
.tag-config {
  background-color: #f3e5f5;
  color: #6a1b9a;
}
.tag-default {
  background-color: #f5f5f5;
  color: #616161;
}
</style>
