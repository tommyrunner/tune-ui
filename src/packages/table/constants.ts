import type { InjectionKey } from "vue";
import { PropsType, StateType, TableColumnsType } from "./table";
import { PropsType as TableRowPropsType } from "./table-row/table-row";

export interface GroupContextType extends PropsType {
  autoColWidth: (props: string) => void;
  state: StateType;
}
export interface GroupContextTableRowType extends TableRowPropsType {
  columns: TableColumnsType[];
}

export const tableGroupKey: InjectionKey<GroupContextType> = Symbol("tableGroupKey");
export const tableRowGroupKey: InjectionKey<GroupContextTableRowType> = Symbol("tableRowGroupKey");
export const TABLE_COL_TAG = "_t-table-col";
export const getTableColTag = (prop: string) => `${TABLE_COL_TAG}-${prop}`;
