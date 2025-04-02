import Menu from "./index.vue";
import MenuGroup from "./components/menu-group/menu-group.vue";
import MenuItem from "./components/menu-item/menu-item.vue";

/** 菜单组件 */
export const TMenu = Menu;
export const TMenuGroup = MenuGroup;
export const TMenuItem = MenuItem;
export type TMenuType = InstanceType<typeof TMenu>;
export type TMenuGroupType = InstanceType<typeof TMenuGroup>;
export type TMenuItemType = InstanceType<typeof TMenuItem>;
