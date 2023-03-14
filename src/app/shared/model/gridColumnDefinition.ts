import { dataType } from './dataType';
import { filterType } from './filterType';
export interface IGridColumnDefinition {
  fieldName: string;
  label: string;
  dataType: dataType;
  columnWidth: number;
  filter?: filterType;
  valueListName?: any;
  valueListDefinition?: any;
  valueListItems?: any;
  gridfilterFeild?: any;
}

export class gridColumnDefinition implements IGridColumnDefinition {
  fieldName: string;
  label: string;
  dataType: dataType;
  columnWidth: number;
  valueListName: any;
  valueListDefinition: any;
  valueListItems: any;
  gridfilterFeild: any;

  constructor(option: {
    fieldName: string,
    label: string,
    dataType?: dataType,
    columnWidth?: number
    valueListName?: any;
    valueListDefinition?: any;
    valueListItems?: any;
    gridfilterFeild?: any;
  }) {
    this.fieldName = option.fieldName;
    this.label = option.label;
    this.dataType = (option.dataType ?? 'text');
    this.columnWidth = (option.columnWidth ?? 150);
    this.valueListName = option.valueListName;
    this.valueListDefinition = option.valueListDefinition;
    this.valueListItems = option.valueListItems;
    this.gridfilterFeild = option.gridfilterFeild;
  }

  get filter(): filterType {
    switch (this.dataType.toLowerCase()) {
      case 'date':
      case 'datetime':
        return 'date';
      case 'number':
        return 'numeric';
      default:
        return 'text';
    }
  }
}
