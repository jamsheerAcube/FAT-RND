export interface IUser{
    key:string;
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    userRoleID: number;
    roleName: string;
}

export interface ILoginParam {
    userName: string;
    password: string;
}