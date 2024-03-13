import { ReactNode } from "react"
import { IListClientResponseItem } from "../services/clientService"

export interface IClientEditModalProps {
    open: boolean
    onClose: () => void
    refreshData: () => void
    client?: IListClientResponseItem
    actionButton?: ReactNode
}

export interface IClientEditModalFormValues {
    name: string
    email: string
    phone: string
}