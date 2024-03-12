import { IListClientResponseItem } from "../services/clientService"

export interface IClientEditModalProps {
    open: boolean
    onClose: () => void
    client?: IListClientResponseItem
}

export interface IClientEditModalFormValues {
    name: string
    email: string
    phone: string
}