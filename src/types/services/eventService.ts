import { IPaginatedResponse, IPaginationRequest, ISortingRequest } from "./services"

interface INewEventAttendantRequest {
    attendantId: number
}

export interface INewRequest {
    title: string
    description: string
    tags?: string[]
    link?: string
    ocurrence: Date
    clientId: number
    eventAttendants: INewEventAttendantRequest[]
}

export interface INewResponse {
    createdId: number
}

export type ListRequestSortFieldsType = "title" | "ocurrence" | "createdAt" | "updatedAt"

export interface IListRequest extends IPaginationRequest, ISortingRequest<ListRequestSortFieldsType> {
    consultorId?: number
    clientId?: number
    ocurrenceMin?: Date
    ocurrenceMax?: Date
    showUnmarked?: boolean
    search?: string
}

interface IEventAttendant {
    id: number
    eventId: number
    attendantId: number
    accepted: boolean
    showedUp: boolean
}

export interface IListResponseItem {
    id: number
    title: string
    description: string
    tags?: string[]
    link?: string
    status: boolean
    consultorId: number
    clientId: number
    ocurrence: Date
    createdAt: Date
    updatedAt: Date
    eventAttendants: IEventAttendant[]
}

export type ListResponseType = IPaginatedResponse<IListResponseItem>

interface IUpdateEventAttendantRequest {
    attendantId?: number
}

export interface IUpdateRequest {
    id: number
    title?: string
    description?: string
    tags?: string[]
    link?: string
    ocurrence?: Date
    status?: boolean
    eventAttendants?: IUpdateEventAttendantRequest[]
}

export interface IUpdateResponse {
}

export interface IAcceptRequest {
    accepted?: boolean
    attendantId: number
}

export interface IShowUpRequest {
    showedUp?: boolean
    attendantId: number
}

export interface IGetShowedUpPercentagesRequest {
    months?: number
}

export interface IGetShowedUpPercentagesResponse {
    showedUpPercentage: number
}