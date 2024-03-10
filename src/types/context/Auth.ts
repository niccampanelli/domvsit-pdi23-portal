import { ReactNode } from "react"
import { IAuthenticateRequest } from "../services/authService"
import { IIdentifyRequest } from "../services/clientService"
import { IUser } from "./User"

export interface IAuthContext {
    login: (request: IAuthenticateRequest) => Promise<void>
    loginAttendant: (request: IIdentifyRequest) => Promise<void>
    user?: IUser,
    userDataLoading: boolean,
    logout: () => void
}

export interface IAuthProviderProps {
    children: ReactNode
}