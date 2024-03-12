import { IListClientResponseItem } from "../services/clientService"

export interface IClientViewModalProps {
    open: boolean
    onClose: () => void
    client?: IListClientResponseItem
}