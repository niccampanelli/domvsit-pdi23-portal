import { memo } from "react"
import { IToastProps } from "../../types/components/Toast"
import { classes } from "../../util/classes"
import Card from "../Card"
import styles from "./toast.module.css"
import { Variants, motion } from "framer-motion"

const ToastAnimationVariants: Variants = {
    initial: {
        scale: 0.8,
        x: "120%",
    },
    enter: {
        scale: [0.9, 0.9, 1],
        x: ["120%", "0%", "0%"],
    },
    exit: {
        scale: [1, 0.9, 0.9],
        x: ["0%", "0%", "120%"],
    }
}

export default memo(function Toast({
    id,
    title,
    message,
    type = "info",
    dismissable = true,
    autoDismiss = true,
    dismissTimeInSeconds = 5,
    onDismiss = () => { }
}: IToastProps) {

    return (
        <motion.div
            key={id}
            variants={ToastAnimationVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            layout
            transition={{
                duration: 0.4
            }}
        >
            <Card
                className={styles.root}
            >
                <div className={classes(styles.bar, styles[`${type}Bar`])}>
                    <motion.div
                        className={classes(styles.progress, styles[`${type}Progress`])}
                        initial={{ width: "100%" }}
                        animate={autoDismiss ? { width: 0 } : {}}
                        transition={{
                            duration: dismissTimeInSeconds,
                            ease: "linear",
                        }}
                    />
                </div>
                <div
                    className={styles.content}
                >
                    <div className={styles.header}>
                        <p
                            className={styles.title}
                        >
                            {title}
                        </p>
                        {dismissable && (
                            <button
                                className={styles.close}
                                onClick={() => onDismiss(id)}
                            >
                                X
                            </button>
                        )}
                    </div>
                    <p>
                        {message}
                    </p>
                </div>
            </Card>
        </motion.div>
    )
})