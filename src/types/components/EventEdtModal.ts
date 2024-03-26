import { ReactNode } from "react"
import { IListResponseItem } from "../services/eventService"

export interface IEventEditModalProps {
    open: boolean
    onClose: () => void
    event?: IListResponseItem
    refreshData: () => void
    actionButton?: ReactNode
}

export interface IEventEditModalFormValuesClient {
    id: number
    name: string
}

export interface IEventEditModalFormValuesAttendant {
    id: number
    name: string
}

export interface IEventEditModalFormValues {
    title: string
    description: string
    ocurrence: Date
    link?: string
    tags?: string[]
    client: IEventEditModalFormValuesClient
    attendants: IEventEditModalFormValuesAttendant[]
}