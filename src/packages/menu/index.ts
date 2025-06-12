/**
 * @module Menu
 */
import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType, ExposesType } from "./menu";
import type { PropsType as GroupPropsType, SlotsType as GroupSlotsType } from "./components/menu-group/menu-group";
import type {
  PropsType as ItemPropsType,
  SlotsType as ItemSlotsType,
  ExposesType as ItemExposesType
} from "./components/menu-item/menu-item";
import Menu from "./index.vue";
import MenuGroup from "./components/menu-group/menu-group.vue";
import MenuItem from "./components/menu-item/menu-item.vue";

/**
 * @description menu组件
 */
export const TMenu = Menu as unknown as SFCWithInstall<PropsType, ExposesType, SlotsType, EmitsType>;

/**
 * @description menu-group组件
 */
export const TMenuGroup = MenuGroup as unknown as SFCWithInstall<GroupPropsType, {}, GroupSlotsType, {}>;

/**
 * @description menu-item组件
 */
export const TMenuItem = MenuItem as unknown as SFCWithInstall<ItemPropsType, ItemExposesType, ItemSlotsType, {}>;

/**
 * @description menu类型
 */
export type TMenuType = InstanceType<typeof TMenu>;

/**
 * @description menu-group类型
 */
export type TMenuGroupType = InstanceType<typeof TMenuGroup>;

/**
 * @description menu-item类型
 */
export type TMenuItemType = InstanceType<typeof TMenuItem>;
