import { IPaginatedResponse, IPaginationRequest, ISortingRequest } from "./services"

export interface INewRequest {
    title: string
    description: string
    tags?: string[]
    link?: string
    ocurrence: Date
    eventAttendants: number[]
}

export interface INewResponse {
    createdId: number
}

export interface IListRequest extends IPaginationRequest, ISortingRequest {
    consultorId?: number
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
    ocurrence: Date
    createdAt: Date
    updatedAt: Date
    eventAttendants: IEventAttendant[]
}

export type ListResponseType = IPaginatedResponse<IListResponseItem>