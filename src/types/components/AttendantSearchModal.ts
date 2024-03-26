import { IListAttendantResponseItem } from "../services/clientService"

export interface IAttendantSearchModalProps {
    open: boolean
    onClose: () => void
    clientId?: number
    selected?: IListAttendantResponseItem[]
    onSelect?: (attendants?: IListAttendantResponseItem[]) => void
}