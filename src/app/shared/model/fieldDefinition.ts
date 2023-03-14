import {dataType} from './dataType';
import {inputType} from './inputType';

export interface IFieldDefinition {
    fieldName: string,
    label: string,    
    hint?: string,
    sortOrder: number,
    dataType: dataType,
    inputType: inputType,

    //Related to Form
    showOnForm?: boolean,   //Wil consider true as default
    readOnlyOnForm?: boolean, //Wil consider false as default
    mandatoryOnForm?: boolean, //Wil consider false as default
    showOnFormCondition?: string,
    mandatoryOnFormCondition?:string,

    //Related to Filter Panel
    showAsFilter?: boolean, //Wil consider false as default
    readOnlyFilter?: boolean, //Wil consider false as default
    mandatoryFilter?: boolean, //Wil consider false as default    

    //Related to Grid
    showInGrid?:boolean, //Wil consider true as default
    gridColumOrder?:number,
    gridColumnWidth?:number,    

    valueListName?: string,

    defaultFilterValue?:any,
    defaultFormValue?:any,

    gridFilterType?: string,
    gridfilterFeild?: string,
}