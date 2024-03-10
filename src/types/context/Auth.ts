import { ReactNode } from "react"
import { IAuthenticateRequest } from "../services/authService"
import { IUser } from "./User"
import { IIdentifyRequest } from "../services/clientService"

export interface IAuthContext {
    login: (request: IAuthenticateRequest) => Promise<void>
    attendantLogin: (request: IIdentifyRequest) => Promise<void>
    user?: IUser
    userLoading: boolean
    logout: () => void
}

export interface IAuthProviderProps {
    children: ReactNode
}