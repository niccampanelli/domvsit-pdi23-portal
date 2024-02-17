import { ReactNode } from "react"

export interface IModal {
    id: string
    component: ReactNode
    onClose: () => void
}

export interface IModalContext {
    openModal: (modal: IModal) => void
    closeModal: (modal: IModal) => void
}

export interface IModalProviderProps {
    children: ReactNode
}