export interface IClientCreateModalProps {
    open: boolean
    onClose: () => void
}

export interface IClientCreateModalFormValues {
    name: string
    email: string
    phone: string
}