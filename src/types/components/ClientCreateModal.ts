import { ICreateClientAttendantTokenResponse } from "../services/clientService"

export interface IClientCreateModalProps {
    open: boolean
    onClose: () => void
    refreshData: () => void
}

export interface IClientCreateModalFormValues {
    name: string
    email: string
    phone: string
}

export interface IClientCreateModalCreatedProps {
    open: boolean
    onClose: () => void
    name: string
    attendantToken?: ICreateClientAttendantTokenResponse
}