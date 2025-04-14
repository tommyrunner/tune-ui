import { createApp } from "vue";
import App from "./App.vue";
import installTestComponents from "./index";
import "@/styles/index.scss";

// 创建应用实例
const app = createApp(App);

// 安装测试组件
installTestComponents(app);

// 挂载应用
app.mount("#app");
