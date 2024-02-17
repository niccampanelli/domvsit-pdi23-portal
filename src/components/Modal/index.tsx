import { useEffect, useState } from "react";
import { useModalContext } from "../../context/Modal";
import { IModalProps } from "../../types/components/Modal";
import Card from "../Card";
import styles from "./modal.module.css";
import { classes } from "../../util/classes";

export default function Modal({
    open,
    onClose,
    title,
    size = "medium",
    children,
    className,
    ...props
}: IModalProps) {

    const { openModal, closeModal } = useModalContext()
    const [generatedId, setGeneratedId] = useState("")

    const modal = (
        <Card
            {...props}
            className={classes(styles.root, styles[size], className)}
        >
            <div className={styles.header}>
                <h1 className={styles.title}>
                    {title}
                </h1>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </Card>
    )

    function generateUniqueId() {
        return Math.random().toString(36).substring(2, 9)
    }

    useEffect(() => {
        if (!generatedId) {
            setGeneratedId(generateUniqueId())
        }
    }, [
        open,
        onClose,
        title,
        children,
    ])

    useEffect(() => {
        if (open) {
            openModal({
                id: generatedId,
                component: modal,
                onClose
            })
        }
        else {
            closeModal({
                id: generatedId,
                component: modal,
                onClose
            })
        }
    }, [open])

    return null
}