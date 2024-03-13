import { ReactNode } from "react"
import { IListClientResponseItem } from "../services/clientService"

export interface IClientViewModalProps {
    open: boolean
    onClose: () => void
    client?: IListClientResponseItem
    actionButton?: ReactNode
}