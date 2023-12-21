import { ToastTypes } from "../context/Toasts"

export interface IToastProps {
    id: string
    title: string
    message: string
    type?: ToastTypes
    dismissTimeInSeconds?: number
    autoDismiss?: boolean
    dismissable?: boolean
    onDismiss?: (id?: string) => void
}