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
    label: "Project Files",
    tag: "Folder",
    children: [
      {
        id: "1-1",
        label: "Source Code",
        tag: "Folder",
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
        label: "Assets",
        tag: "Folder",
        children: [
          {
            id: "1-2-1",
            label: "logo.png",
            tag: "Image"
          },
          {
            id: "1-2-2",
            label: "banner.jpg",
            tag: "Image"
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
    label: "Config Files",
    tag: "Folder",
    children: [
      {
        id: "2-1",
        label: "package.json",
        tag: "JSON"
      },
      {
        id: "2-2",
        label: ".gitignore",
        tag: "Config"
      }
    ]
  }
]);

/**
 * Get node icon class
 * @param {Object} node - Tree node object
 * @returns {string} Icon CSS class name
 */
const getIconClass = node => {
  // Check if it has children property and is not an empty array to determine if it's a folder
  const hasChildren = node?.data?.children && node.data.children.length > 0;

  if (hasChildren) {
    return node.isExpanded ? "icon icon-folder-open" : "icon icon-folder";
  }

  // Determine icon based on file extension
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
 * Get icon color
 * @param {Object} node - Tree node object
 * @returns {string} Color value
 */
const getIconColor = node => {
  // Check if it has children property and is not an empty array to determine if it's a folder
  const hasChildren = node?.data?.children && node.data.children.length > 0;

  if (hasChildren) return "#f9a825"; // Folder color

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
 * Get tag style
 * @param {string} tag - Tag text
 * @returns {string} Tag CSS class name
 */
const getTagClass = tag => {
  const map = {
    Folder: "tag-folder",
    HTML: "tag-html",
    JS: "tag-js",
    CSS: "tag-css",
    JSON: "tag-json",
    MD: "tag-md",
    Image: "tag-image",
    Config: "tag-config"
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
