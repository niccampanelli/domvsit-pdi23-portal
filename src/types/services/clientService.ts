export interface IIdentifyRequest {
    email: string
    attendantToken: string
}

export interface IIdentifyResponse {
    id: number
    name: string
    email: string
    role: string
    clientId: number
    token: string
    refreshToken: string
}

export interface IJoinRequest {
    name: string
    email: string
    role: string
    attendantToken: string
}

export interface IJoinResponse {
    id: number
    isEmailInDomain: boolean
}