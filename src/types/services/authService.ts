export interface IAuthenticateRequest {
    login: string
    password: string
}

export interface IAuthenticateResponse {
    id: number
    name: string
    email: string
    token: string
    refreshToken: string
}

export interface IResetPasswordRequest {
    login: string
    oldPassword: string
    newPassword: string
}

export interface ISignUpRequest {
    name: string
    email: string
    password: string
}

export interface ISignUpResponse {
    id: number
}

export interface IRevalidateTokenResponse {
    token: string
}