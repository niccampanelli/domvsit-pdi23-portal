import { Card, IconButton, Typography, useTheme } from "@mui/material"
import { IToastProps } from "../../types/components/Toasts"
import { Variants, motion } from "framer-motion"
import { Close } from "@mui/icons-material"

const variants: Variants = {
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

export default function Toast({
    toast
}: IToastProps) {

    const theme = useTheme()

    function getBarBackgroundColor() {
        if (toast.type === "info") {
            return theme.palette.primary.dark
        } else if (toast.type === "success") {
            return theme.palette.success.dark
        } else if (toast.type === "error") {
            return theme.palette.error.dark
        } else {
            return theme.palette.warning.dark
        }
    }

    function getBarColor() {
        if (toast.type === "info") {
            return theme.palette.primary.light
        } else if (toast.type === "success") {
            return theme.palette.success.light
        } else if (toast.type === "error") {
            return theme.palette.error.light
        } else {
            return theme.palette.warning.light
        }
    }

    return (
        <Card
            component={motion.div}
            className="w-80 pointer-events-auto"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            layout
            transition={{
                duration: 0.4
            }}
        >
            <div
                className="h-2"
                style={{
                    backgroundColor: getBarBackgroundColor()
                }}
            >
                <motion.div
                    className="h-full"
                    style={{
                        backgroundColor: getBarColor()
                    }}
                    initial={{
                        width: "100%"
                    }}
                    animate={toast.autoDismiss ? {
                        width: "0%"
                    } : {
                        width: "100%"
                    }}
                    transition={{
                        duration: (toast.dismissTime || 5000) / 1000,
                        ease: "linear"
                    }}
                />
            </div>
            <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                    <Typography
                        className="font-semibold"
                    >
                        {toast.title}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={() => toast.onDismiss?.(toast.id)}
                    >
                        <Close
                            fontSize="small"
                        />
                    </IconButton>
                </div>
                <Typography
                    className="text-sm"
                >
                    {toast.message}
                </Typography>
            </div>
        </Card>
    )
}