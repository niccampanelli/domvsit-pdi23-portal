import { IListResponseItem } from "../services/eventService"

export interface IEventViewModalProps {
    open: boolean
    onClose: () => void
    event?: IListResponseItem
}