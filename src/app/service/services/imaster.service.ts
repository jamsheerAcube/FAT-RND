import { Observable } from "rxjs";

export interface IMasterService<ModelType>{
    getAll(filters?: any): Observable<ModelType[]>;
    cachedData(): ModelType[];
    post(createDTO: any) : Observable<ModelType>;
    put(updateDTO: any) : Observable<ModelType>;
    delete(resourceKey: string) : Observable<any>;
}