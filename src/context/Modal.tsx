import { AnimatePresence, Variants, motion } from "framer-motion";
import { createContext, useContext, useState } from "react";
import { IModal, IModalContext, IModalProviderProps } from "../types/context/Modal";

const ModalContext = createContext<IModalContext>({
    openModal: () => { },
    closeModal: () => { }
})

const modalRootVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.1
        }
    },
    exit: {
        opacity: 0,
        transition: {
            delay: 0.1
        }
    }
}

const modalVariants: Variants = {
    initial: {
        y: "100%",
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.1
        }
    },
    exit: {
        y: "100%",
        opacity: 0,
        transition: {
            duration: 0.1
        }
    }
}

export default function ModalProvider({
    children,
}: IModalProviderProps) {

    const [modals, setModals] = useState<IModal[]>([])

    function openModal(modal: IModal) {
        if (modals.some(m => m.id === modal.id))
            return

        setModals(previous => [...previous, modal])
    }

    function closeModal(modal: IModal) {
        console.log(modal)
        setModals(previous => previous.filter(m => m.id !== modal.id))
    }

    return (
        <ModalContext.Provider
            value={{
                openModal,
                closeModal
            }}
        >
            <AnimatePresence>
                {modals.map((modal, index) => (
                    <motion.div
                        key={index}
                        className="modalRoot"
                        variants={modalRootVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        onClick={e => {
                            if (e.target === e.currentTarget)
                                modal.onClose()
                        }}
                    >
                        <motion.div
                            className="modalContainer"
                            variants={modalVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {modal.component}
                        </motion.div>
                    </motion.div>
                ))}
            </AnimatePresence>
            {children}
        </ModalContext.Provider >
    )
}

export const useModalContext = () => useContext(ModalContext)