import { IPaginatedResponse, IPaginationRequest, ISortingRequest } from "./services"

interface IEventAttendantRequest {
    clientId: number
}

export interface INewRequest {
    title: string
    description: string
    tags?: string[]
    link?: string
    ocurrence: Date
    clientId: number
    eventAttendants: IEventAttendantRequest[]
}

export interface INewResponse {
    createdId: number
}

export interface IListRequest extends IPaginationRequest, ISortingRequest<"title" | "ocurrence" | "createdAt" | "updatedAt"> {
    consultorId?: number
    clientId?: number
}

interface IEventAttendant {
    id: number
    eventId: number
    attendantId: number
}

export interface IListResponseItem {
    id: number
    title: string
    description: string
    tags?: string[]
    link?: string
    consultorId: number
    clientId: number
    ocurrence: Date
    createdAt: Date
    updatedAt: Date
    eventAttendants: IEventAttendant[]
}

export type ListResponseType = IPaginatedResponse<IListResponseItem>