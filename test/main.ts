import { createApp } from "vue";
import App from "./App.vue";
import installTestComponents from "./index";
import "@/styles/index.scss";
import TuiDirective from "../src/directive";
import { useOptions } from "../src/hooks/useOptions";

const { updateDefaultSize } = useOptions();
updateDefaultSize("small");
// 创建应用实例
const app = createApp(App);

app.use(TuiDirective);

// 安装测试组件
installTestComponents(app);

// 挂载应用
app.mount("#app");
