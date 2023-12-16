import { ReactNode } from "react"
import { IToastProps } from "../components/Toast"

export type ToastTypes = "success" | "error" | "warning" | "info"

export interface IToastsContext {
    addToast: (props: IToastProps) => void
}

export interface IToastsProviderProps {
    children: ReactNode
    dismissTimeInSeconds: number
}