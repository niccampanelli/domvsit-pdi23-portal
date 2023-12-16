import { ToastTypes } from "../context/Toasts"

export interface IToastProps {
    title: string
    message: string
    type?: ToastTypes
    dismissTimeInSeconds?: number
    autoDismiss?: boolean
    dismissable?: boolean
}