import { ReactNode } from "react"

export interface IToast {
    id: string
    title: string
    message: string
    type?: "success" | "error" | "info" | "warning",
    autoDismiss?: boolean
    dismissTime?: number
    dismissable?: boolean
    onDismiss?: (id?: string) => void
}

export interface IToastContext {
    addToast: (toast: Omit<IToast, "id">) => void
}

export interface IToastProviderProps {
    children: ReactNode,
    dismissTime?: number
}