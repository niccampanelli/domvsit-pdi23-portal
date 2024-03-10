import { AnimatePresence, motion } from "framer-motion"
import { createContext, useContext, useState } from "react"
import Toast from "../components/Toast"
import { IToastProps } from "../types/components/Toast"
import { IToastsContext, IToastsProviderProps } from "../types/context/Toasts"

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
        onDismiss = () => { }
    }: Omit<IToastProps, "id">) {
        const id = crypto.randomUUID()

        const newToast: IToastProps = {
            id,
            title,
            message,
            type,
            autoDismiss,
            dismissTimeInSeconds,
            dismissable,
        }

        newToast.onDismiss = () => {
            removeToast(id)
            onDismiss(id)
        }

        setToasts(previous => [...previous, newToast])

        if (autoDismiss) {
            setTimeout(() => removeToast(newToast.id), dismissTimeInSeconds * 1000)
        }
    }

    function removeToast(id: string) {
        setToasts(previous => previous.filter(t => t.id !== id))
    }

    return (
        <ToastsContext.Provider value={{
            addToast
        }}>
            <motion.div className="toastsRoot" layoutRoot>
                <AnimatePresence>
                    {toasts.map(toast =>
                        <Toast
                            key={toast.id}
                            {...toast}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
            {children}
        </ToastsContext.Provider >
    )
}

export const useToastsContext = () => useContext(ToastsContext)