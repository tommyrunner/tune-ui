import Table from "./index.vue";
import TableRow from "./table-row/table-row.vue";
export const TTable = Table;
export type TTableType = InstanceType<typeof Table>;
// 组合
export const TTableItem = TableRow;
export type TTableItemType = InstanceType<typeof TTableItem>;
