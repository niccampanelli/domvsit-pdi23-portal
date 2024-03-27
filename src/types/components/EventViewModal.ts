import { ReactNode } from "react"
import { IListResponseItem } from "../services/eventService"

export interface IEventViewModalProps {
    open: boolean
    onClose: () => void
    event?: IListResponseItem
    actionButton?: ReactNode
    refreshData?: () => void
}

export interface IEventViewModalLinkChipProps {
    link: string
    isOcurring?: boolean,
    clickCallback?: () => void
}