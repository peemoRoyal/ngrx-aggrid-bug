export interface ColumnDefs {
  headerName: string;
  field: string;
}

export interface RowData {
  // Todo: strongly type this
  // {[key:TrickyKey]: string
  criterionValue: string;
  criterionType: string;
  targetType: string;
  criterionBlocked: boolean;
  allBlocked: boolean;
  noneBlocked: boolean;
}

export interface TableData {
  columnDefs: ColumnDefs[];
  rowData: RowData[];
}
