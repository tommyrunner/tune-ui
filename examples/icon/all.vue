<template>
  <div class="icon-demo">
    <div v-for="(category, index) in iconCategories" :key="index" class="icon-category">
      <h3 class="category-title">{{ category.title }}</h3>
      <div class="icon-grid">
        <div v-for="icon in category.icons" :key="icon" class="icon-item" @click="copyIconName(icon)">
          <t-icon :icon="icon" />
          <div class="icon-name">{{ icon }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


// 复制图标名称到剪贴板
const copyIconName = iconName => {
  navigator.clipboard.writeText(iconName).then(() => {
    TMessage.success(`已复制图标名称: ${iconName}`);
  });
};

// 图标分类
const iconCategories = [
  {
    title: "操作类图标",
    icons: [
      "add",
      "add-to",
      "delete",
      "delete-to",
      "edit",
      "edit-to",
      "save",
      "upload",
      "upload-to",
      "download",
      "search",
      "filter",
      "close",
      "close-to",
      "minus",
      "minus-to",
      "collect",
      "link",
      "link-to",
      "link-break",
      "share",
      "print",
      "copy-multiple",
      "screen",
      "amplify",
      "reduce"
    ]
  },
  {
    title: "导航类图标",
    icons: [
      "left",
      "right",
      "up",
      "downward",
      "left-arrow",
      "caret-left",
      "caret-right",
      "caret-up",
      "caret-down",
      "double-left",
      "double-right",
      "left-double",
      "right-double",
      "menu",
      "menu-to",
      "navigation",
      "previous",
      "next",
      "home",
      "return",
      "position",
      "map",
      "horizontal-more",
      "vertical-more",
      "left-circle",
      "right-circle",
      "rotate-left",
      "rotate-right"
    ]
  },
  {
    title: "文件类图标",
    icons: [
      "file",
      "file-folder",
      "folder",
      "folder-add",
      "file-add",
      "file-copy",
      "file-remove",
      "file-text",
      "file-image",
      "file-excel",
      "file-pdf",
      "file-word",
      "file-ppt1",
      "file-jpg",
      "file-gif",
      "file-markdown",
      "file-done",
      "file-exclamation",
      "file-protect",
      "file-unknown",
      "document",
      "Filing",
      "remove-file"
    ]
  },
  {
    title: "媒体类图标",
    icons: ["image", "camera", "volume", "play-circle", "pause-circle", "pause", "record", "qrcode"]
  },
  {
    title: "通信类图标",
    icons: [
      "message",
      "mail",
      "phone",
      "send",
      "forward",
      "forward-to",
      "cloud",
      "cloud-upload",
      "cloud-download",
      "wifi",
      "network"
    ]
  },
  {
    title: "状态类图标",
    icons: [
      "success",
      "success-to",
      "info",
      "information",
      "information-to",
      "error-to",
      "warning-to",
      "help",
      "lock",
      "unlock",
      "secure",
      "secure-to",
      "filter-error",
      "loading"
    ]
  },
  {
    title: "社交媒体图标",
    icons: ["github", "google", "qq", "wechat", "weibo", "taobao", "alipay", "ie", "apple"]
  },
  {
    title: "天气图标",
    icons: [
      "qingtian",
      "duoyunzhuanqing",
      "qingzhuanduoyun",
      "yintian",
      "xiaoyu",
      "zhongyu",
      "dayu",
      "baoyu",
      "leizhenyu",
      "leiyu",
      "zhenyu",
      "youwu",
      "xiaoxue",
      "zhongxue",
      "daxue",
      "baoxue",
      "yujiaxue",
      "yujiabingbao",
      "bingbao",
      "feng",
      "shachenbao",
      "richu",
      "rila",
      "yejianduoyun",
      "yejianyouyu",
      "yejianyouxue"
    ]
  },
  {
    title: "用户图标",
    icons: ["user", "add-user", "add-multiple-user", "multiple-user", "user-remove", "male", "woman", "member", "fingerprint"]
  },
  {
    title: "图表与数据",
    icons: ["chart", "chart-pie", "data-up", "data-glide", "count", "sort-up", "exchange", "fluctuate", "grade", "trendc-hart"]
  },
  {
    title: "设置与工具",
    icons: ["setting", "seting-to", "type", "adjust", "repair", "lightn", "scan", "poweroff", "shutdown", "track", "code", "leak"]
  },
  {
    title: "其他图标",
    icons: [
      "love",
      "like",
      "dislike",
      "assets",
      "badge",
      "annex",
      "calendar",
      "label",
      "nail",
      "floor",
      "city",
      "rocket",
      "woman",
      "branch",
      "afferent",
      "outgoing",
      "read",
      "illustrate",
      "vertical-widen",
      "vertical-reduce",
      "horizontal-widen",
      "menu-contract",
      "menu-expand",
      "magnifier-amplify",
      "magnifier-reduce",
      "inspiration",
      "product",
      "dollar-circle",
      "rate",
      "rate-null",
      "rate-half"
    ]
  }
];
</script>

<style scoped>
.icon-demo {
  padding: 16px 0;
}

.icon-category {
  margin-bottom: 32px;
}

.category-title {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  border-radius: 6px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-item:hover {
  background-color: #f6f6f6;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon-name {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  text-align: center;
  word-break: break-all;
}
</style>
