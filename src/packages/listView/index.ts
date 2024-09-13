import ListView from "./index.vue";
import ListViewItem from "./listView-item.vue";
export const TListView = ListView;
export type TListView = InstanceType<typeof TListView>;
// 组合
export const TListViewItem = ListViewItem;
export type TListViewItemType = InstanceType<typeof TListViewItem>;
