import { ReactNode } from "react";
import { IAuthenticateRequest } from "../services/authService";

export interface IAuthContext {
    login: (request: IAuthenticateRequest) => Promise<void>
}

export interface IAuthProviderProps {
    children: ReactNode
}