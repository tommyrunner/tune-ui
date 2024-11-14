import type { InjectionKey } from "vue";
import { TTableType } from "./index";
import { PropsType, TableColumnsType } from "./table";
import { PropsType as TableRowPropsType } from "./table-row/table-row";

export interface GroupContextType extends PropsType {
  tTableRef: TTableType;
  // autoColWidth: () => void;
}
export interface GroupContextTableRowType extends TableRowPropsType {
  columns: TableColumnsType[];
}

export const tableGroupKey: InjectionKey<GroupContextType> = Symbol("tableGroupKey");
export const tableRowGroupKey: InjectionKey<GroupContextTableRowType> = Symbol("tableRowGroupKey");
export const tableColTag = "_t-table-col";
