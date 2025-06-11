/**
 * @description Calendar 日历组件
 */
import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./calendar";
import Calendar from "./index.vue";

export const TCalendar = Calendar as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;

export type TCalendarType = InstanceType<typeof TCalendar>;
