import { createContext, useContext, useState } from "react"
import { IToast, IToastContext, IToastProviderProps } from "../types/context/Toasts"
import { AnimatePresence, motion } from "framer-motion"
import Toast from "../components/Toast"

const ToastsContext = createContext<IToastContext>({
    addToast: () => { }
})

export default function ToastsProvider({
    children,
    dismissTime
}: IToastProviderProps) {

    const [toasts, setToasts] = useState<IToast[]>([])

    function addToast(toast: Omit<IToast, "id">) {
        const id = crypto.randomUUID()

        const newToast: IToast = {
            id,
            title: toast.title,
            message: toast.message,
            type: toast.type || "info",
            autoDismiss: toast.autoDismiss === undefined ? true : toast.autoDismiss,
            dismissTime: toast.dismissTime || dismissTime || 5000,
            dismissable: toast.dismissable === undefined ? true : toast.dismissable,
            onDismiss: toast.onDismiss
        }

        newToast.onDismiss = () => {
            removeToast(id)
            toast.onDismiss?.(id)
        }

        setToasts(previous => [...previous, newToast])

        if (newToast.autoDismiss) {
            setTimeout(() => {
                newToast.onDismiss?.()
            }, newToast.dismissTime)
        }
    }

    function removeToast(id: string) {
        setToasts(previous => previous.filter(toast => toast.id !== id))
    }

    return (
        <ToastsContext.Provider
            value={{
                addToast
            }}
        >
            <motion.div
                className="fixed top-0 right-0 z-50 w-screen h-screen flex flex-col items-end gap-4 p-4 overflow-hidden pointer-events-none"
                layoutRoot
            >
                <AnimatePresence>
                    {toasts.map(toast => (
                        <Toast
                            key={toast.id}
                            toast={toast}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
            {children}
        </ToastsContext.Provider>
    )
}

export const useToastsContext = () => useContext(ToastsContext)