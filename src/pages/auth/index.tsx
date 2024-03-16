import { Typography } from "@mui/material"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Outlet, useLocation } from "react-router-dom"
import AnimatedOutlet from "../../components/AnimatedOutlet"

const bannerVariants: Variants = {
    hidden: {
        x: "-1%"
    },
    visible: {
        x: "0%",
        transition: {
            duration: 0.8,
            ease: "easeInOut"
        }
    }
}

export default function Auth() {

    const location = useLocation()

    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div className="flex flex-col items-center gap-8 w-full md:w-1/2 p-8 overflow-y-auto">
                <Typography
                    variant="h1"
                    color="primary"
                    className="text-5xl font-bold"
                >
                    Planify
                </Typography>
                <AnimatePresence mode="wait" initial>
                    <AnimatedOutlet key={location.key} />
                </AnimatePresence>
            </div>
            <div className="w-1/2 hidden md:block h-full overflow-hidden">
                <AnimatePresence>
                    {(location.pathname === "/auth/login" || location.pathname === "/auth/signup") ?
                        <motion.img
                            key="login-banner"
                            alt="Banner"
                            src="/images/login-banner.jpg"
                            className="w-auto h-full object-cover object-center"
                            initial="hidden"
                            animate="visible"
                            variants={bannerVariants}
                            draggable={false}
                        />
                        :
                        <motion.img
                            key="logina-attendant-banner"
                            alt="Banner"
                            src="/images/login-attendant-banner.jpg"
                            className="w-auto h-full object-cover object-center"
                            initial="hidden"
                            animate="visible"
                            variants={bannerVariants}
                            draggable={false}
                        />
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}