import { createContext, useContext, useState } from "react"
import { IToastsContext, IToastsProviderProps } from "../types/context/Toasts"
import { IToastProps } from "../types/components/Toast"
import Toast from "../components/Toast"

const ToastsContext = createContext<IToastsContext>({
    addToast: () => { }
})

export default function ToastsProvider({
    children,
    dismissTimeInSeconds: dismissTime,
}: IToastsProviderProps) {

    const [toasts, setToasts] = useState<IToastProps[]>([])

    function addToast({
        title,
        message,
        type = "info",
        autoDismiss = true,
        dismissTimeInSeconds = dismissTime,
        dismissable = true,
    }: IToastProps) {
        const newToast: IToastProps = {
            title,
            message,
            type,
            autoDismiss,
            dismissTimeInSeconds,
            dismissable,
        }

        setToasts(previous => [...previous, newToast])

        if (autoDismiss) {
            setTimeout(() => removeToast(newToast), dismissTimeInSeconds * 1000)
        }
    }

    function removeToast(toast: IToastProps) {
        setToasts(previous => previous.filter(t => t !== toast))
    }

    return (
        <ToastsContext.Provider value={{
            addToast
        }}>
            <div>
                {toasts.map(toast => <Toast {...toast} />)}
            </div>
            {children}
        </ToastsContext.Provider>
    )
}

export const useToastsContext = () => useContext(ToastsContext)