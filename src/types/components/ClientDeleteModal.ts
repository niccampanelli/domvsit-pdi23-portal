import { IListClientResponseItem } from "../services/clientService"

export interface IClientDeleteModalProps {
    open: boolean
    onClose: () => void
    client?: IListClientResponseItem
    refreshData: () => void
}