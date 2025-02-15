import ListView from "./index.vue";
import ListViewItem from "./listView-item.vue";

/** 列表视图组件 */
export const TListView = ListView;
export type TListViewType = InstanceType<typeof TListView>;

/** 列表项组件 */
export const TListViewItem = ListViewItem;
export type TListViewItemType = InstanceType<typeof TListViewItem>;
