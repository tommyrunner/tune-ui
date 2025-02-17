import Table from "./index.vue";
import TableRow from "./table-row/table-row.vue";

/** 导出组件 */
export const TTable = Table;
export type TTableType = InstanceType<typeof Table>;

/** 导出行组件 */
export const TTableRow = TableRow;
export type TTableRowType = InstanceType<typeof TableRow>;
