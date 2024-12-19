import type { InjectionKey } from "vue";
import { PropsType, StateType, TableColumnsType, TableRowType } from "./table";
import { PropsType as TableRowPropsType } from "./table-row/table-row";
import { PropsType as TableColPropsType } from "./table-col/table-col";

/**
 * table 共享 provide 数据
 */
export interface GroupContextType extends PropsType {
  autoColWidth: (props: string) => void;
  state: StateType;
  columns: TableColumnsType[];
  headData: TableRowType;
}
/**
 * table-row 共享 provide 数据
 */

export interface GroupContextTableRowType extends TableRowPropsType {}
/**
 * table-col 共享 provide 数据
 */
export interface GroupContextTableColType extends TableColPropsType {}

export const tableGroupKey: InjectionKey<GroupContextType> = Symbol("tableGroupKey");
export const tableRowGroupKey: InjectionKey<GroupContextTableRowType> = Symbol("tableRowGroupKey");
export const tableColGroupKey: InjectionKey<GroupContextTableRowType> = Symbol("tableColGroupKey");
/**
 * 唯一列标记
 */
export const TABLE_COL_TAG = "_t-table-col";
export const getTableColTag = (prop: string) => `${TABLE_COL_TAG}-${prop}`;
