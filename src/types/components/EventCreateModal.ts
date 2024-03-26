export interface IEventCreateModalProps {
    open: boolean
    onClose: () => void
    refreshData: () => void
}

export interface IEventCreateModalFormValuesClient {
    id: number
    name: string
}

export interface IEventCreateModalFormValuesAttendant {
    id: number
    name: string
}

export interface IEventCreateModalFormValues {
    title: string
    description: string
    ocurrence: Date
    link?: string
    tags?: string[]
    client: IEventCreateModalFormValuesClient
    attendants: IEventCreateModalFormValuesAttendant[]
}