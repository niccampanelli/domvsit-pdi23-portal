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
}

export type IUser = IUserData | IAttendantData