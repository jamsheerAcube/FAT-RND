export interface IConfig{
    appName: string;
    serverURLs: IKeyValuePair[];
}

export interface IKeyValuePair{
    key:string;
    value:string;
}