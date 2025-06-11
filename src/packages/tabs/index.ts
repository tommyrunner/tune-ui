import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType as TabsPropsType, SlotsType as TabsSlotsType } from "./tabs";
import type {
  PropsType as TabsGroupPropsType,
  EmitsType as TabsGroupEmitsType,
  SlotsType as TabsGroupSlotsType,
  ExposesType as TabsGroupExposesType
} from "./tabs-group";
import Tabs from "./index.vue";
import TabsGroup from "./tabs-group.vue";

/** 标签页组件 */
export const TTabs = Tabs as unknown as SFCWithInstall<TabsPropsType, {}, TabsSlotsType, {}>;
export type TTabsType = InstanceType<typeof TTabs>;

/** 标签页组组件 */
export const TTabsGroup = TabsGroup as unknown as SFCWithInstall<
  TabsGroupPropsType,
  TabsGroupExposesType,
  TabsGroupSlotsType,
  TabsGroupEmitsType
>;
export type TTabsGroupType = InstanceType<typeof TTabsGroup>;
