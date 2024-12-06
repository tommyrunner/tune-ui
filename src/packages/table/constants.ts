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
 * 行数据唯一key
 */
export const ROW_DATA_EXTEND_KEY = Symbol("_row_extend"); // 是否扩展
export const ROW_DATA_ID_KEY = Symbol("_row_ID"); // 唯一id
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
