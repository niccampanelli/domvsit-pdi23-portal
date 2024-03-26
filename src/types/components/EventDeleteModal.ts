import { IListResponseItem } from "../services/eventService"

export interface IEventDeleteModalProps {
    open: boolean
    onClose: () => void
    event?: IListResponseItem
    refreshData: () => void
}