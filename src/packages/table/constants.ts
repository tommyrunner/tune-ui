import type { InjectionKey } from "vue";
import { PropsType, TableColumnsType } from "./table";
import { PropsType as TableRowPropsType } from "./table-row/table-row";
import { TListView } from "../listView";

export interface GroupContextType extends PropsType {
  tTableRef: InstanceType<typeof TListView>;
  // autoColWidth: () => void;
}
export interface GroupContextTableRowType extends TableRowPropsType {
  columns: TableColumnsType[];
}

export const tableGroupKey: InjectionKey<GroupContextType> = Symbol("tableGroupKey");
export const tableRowGroupKey: InjectionKey<GroupContextTableRowType> = Symbol("tableRowGroupKey");
export const tableColTag = "_t-table-col";
