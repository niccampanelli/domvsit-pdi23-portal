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

export enum JwtTokenUserTypeEnum {
    User = 1,
    Attendant = 2
}

export interface IJwtTokenPayload {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid": number,
    UserType: keyof typeof JwtTokenUserTypeEnum,
    nbf: number,
    exp: number,
    iat: number
}