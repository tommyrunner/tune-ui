import type { SFCWithInstall } from "@/utils/pack";
import type {
  PropsType as ListViewPropsType,
  SlotsType as ListViewSlotsType,
  EmitsType as ListViewEmitsType,
  ExposesType as ListViewExposesType
} from "./list-view";
import type { PropsType as ListViewItemPropsType, SlotsType as ListViewItemSlotsType } from "./list-view-item";
import ListView from "./index.vue";
import ListViewItem from "./list-view-item.vue";

/** 列表视图组件 */
export const TListView = ListView as unknown as SFCWithInstall<
  ListViewPropsType,
  ListViewExposesType,
  ListViewSlotsType,
  ListViewEmitsType
>;
export type TListViewType = InstanceType<typeof TListView>;

/** 列表项组件 */
export const TListViewItem = ListViewItem as unknown as SFCWithInstall<ListViewItemPropsType, {}, ListViewItemSlotsType, {}>;
export type TListViewItemType = InstanceType<typeof TListViewItem>;
