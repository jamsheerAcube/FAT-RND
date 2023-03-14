import { ButtonThemeColor } from "@progress/kendo-angular-buttons";

export interface gridActionDefinition{
    name: string,
    condition: string,
    icon:string,
    themeColor:ButtonThemeColor,
    altText?:string,
}

