import { App, Plugin } from "vue";
import Tree from "./index.vue";

export type { PropsType, TreeNode } from "./tree";

export const TTree: typeof Tree & Plugin = {
  ...Tree,
  install: (app: App) => {
    app.component(Tree.name, Tree);
  }
};

export default TTree; 