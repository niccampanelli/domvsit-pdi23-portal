export interface IIdentifyRequest {
    email: string
    attendantToken: string
}

export interface IIdentifyResponse {
    id: number
    name: string
    email: string
    role: string
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
}