import { IPaginatedResponse, IPaginationRequest, ISortingRequest } from "./services"

export interface ICreateClientRequest {
    name: string
    email: string
    phone: string
}

export interface ICreateClientAttendantTokenResponse {
    id: number
    value: string
    createdAt: Date
    expiresAt: Date
}

export interface ICreateClientResponse {
    createdId: number
    createdAttendantId: number
    attendantToken: ICreateClientAttendantTokenResponse
}

export interface IUpdateClientRequest {
    id: number
    name: string
    email: string
    phone: string
}

export interface IUpdateClientResponse {
}

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

export interface IListAttendantRequest extends IPaginationRequest, ISortingRequest<"name" | "email" | "role" | "createdAt"> {
    clientId?: number
    search?: string
}

export interface IListAttendantResponseItem {
    id: number
    name: string
    email: string
    role: string
    clientId: number
    createdAt: Date
}

export type ListAttendantResponseType = IPaginatedResponse<IListAttendantResponseItem>

export type ListClientRequestSortFieldsType = "name" | "email" | "phone" | "createdAt"

export interface IListClientRequest extends IPaginationRequest, ISortingRequest<ListClientRequestSortFieldsType> {
    consultorId?: number
    search?: string
}

export interface IListClientResponseItem {
    id: number
    name: string
    email: string
    phone: string
    consultorId: number
    createdAt: Date
}

export type ListClientResponseType = IPaginatedResponse<IListClientResponseItem>

export interface IGetAttendantByIdResponse {
    id: number
    name: string
    email: string
    role: string
    clientId: number
    createdAt: Date
}

export interface IGetClientByIdResponse {
    id: number
    name: string
    email: string
    phone: string
    consultorId: number
    createdAt: Date
}

export interface IGetAttendantTokenResponse {
    id: number
    value: string
    createdAt: Date
    expiresAt: Date
    expiredAt?: Date
}