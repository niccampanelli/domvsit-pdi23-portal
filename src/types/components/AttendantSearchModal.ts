import { IListAttendantResponseItem } from "../services/clientService"

export interface IAttendantSearchModalProps {
    open: boolean
    onClose: () => void
    selected?: IListAttendantResponseItem[]
    onSelect?: (attendants?: IListAttendantResponseItem[]) => void
}