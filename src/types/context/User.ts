export interface ICommomData {
    id: number
    name: string
    email: string
    token: string
    refreshToken: string
}

export interface IUserData extends ICommomData {
}

export interface IAttendantData extends ICommomData{
    role?: string
    clientId?: number
}

export type IUser = IUserData | IAttendantData

export function isUser(user?: IUser): user is IUserData {
    return user !== undefined && "role" in user === false;
}