import { IListClientResponseItem } from "../services/clientService"

export interface IClientSearchModalProps {
    open: boolean
    onClose: () => void
    selected?: IListClientResponseItem
    onSelect?: (client?: IListClientResponseItem) => void,
    consultorId?: number
}