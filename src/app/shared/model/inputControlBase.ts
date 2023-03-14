import { IValueListDefinition } from 'src/app/service/services/valuelistdefinition.service';
import {dataType} from './dataType';
import {inputType} from './inputType';

export interface InputControlBase {
    fieldName: string,
    label: string,
    hint?: string,
    sortOrder: number,
    dataType: dataType,
    inputType: inputType,
    readonly?:boolean,
    required?:boolean,    
    defaultValue?:string,
    
    showOnForm?: string,
    mandatoryOnForm?:string,
    show?: boolean

    

    valueListName?: string,
    valueListItems?: any,
    valueListDefinition?: IValueListDefinition
}