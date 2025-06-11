import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType, ExposesType } from "./table";
import Table from "./index.vue";
import TableRow from "./table-row/table-row.vue";

/** 表格组件 */
export const TTable = Table as unknown as SFCWithInstall<PropsType, ExposesType, SlotsType, EmitsType>;
export type TTableType = InstanceType<typeof TTable>;

/** 表格行组件 */
export const TTableRow = TableRow;
export type TTableRowType = InstanceType<typeof TableRow>;
