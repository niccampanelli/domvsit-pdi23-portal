import { CircularProgress } from "@mui/material"
import { Variants, motion } from "framer-motion"

const variants: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    exit: {
        opacity: 0,
        transition: {
            delay: 20
        }
    }
}

export default function LoadingRoutes() {

    return (
        <motion.div
            className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-white z-50 overflow-hidden"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <CircularProgress size={60} color="primary" />
        </motion.div>
    )
}