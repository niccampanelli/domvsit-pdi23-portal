import { IListAttendantResponseItem, IListClientResponseItem } from "../services/clientService";
import { IListResponseItem } from "../services/eventService";

export interface IEventModalProps {
    event?: IListResponseItem
    open: boolean
    onClose: () => void
    mode?: "edit" | "view" | "create"
}

export interface IEventDataClient {
    id: number
    name: string
    email: string
    phone: string
    consultorId: number
    createdAt: Date
}

export interface IEventDataAttendant {
    id: number
    name?: string
    email?: string
    role?: string
    clientId?: number
    createdAt?: Date
}

export interface IEventModalEventData {
    id: number
    title: string
    description: string
    tags?: string[]
    link?: string
    consultorId: number
    ocurrence: Date
    createdAt: Date
    updatedAt: Date
}

export interface IEventViewProps {
    event?: IEventModalEventData
    client?: IEventDataClient
    attendants?: IEventDataAttendant[]
    eventClientLoading?: boolean
    eventAttendantsLoading?: boolean
    onActionClick: () => void
}

export interface IEventEditProps {
    event?: IEventModalEventData
    client?: IEventDataClient
    attendants?: IEventDataAttendant[]
    eventClientLoading?: boolean
    eventAttendantsLoading?: boolean
    onActionClick: () => void
}

export interface IEventAttedantsModalProps {
    open: boolean
    onClose: () => void
    handleSelectAttendants: (attendants: IListAttendantResponseItem[]) => void
    clientId: number
    consultorId: number
}

export interface IEventClientsModalProps {
    open: boolean
    onClose: () => void
    handleSelectClient: (client: IListClientResponseItem) => void,
    consultorId: number
}