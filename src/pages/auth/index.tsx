import { AnimatePresence, Variants, motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import AnimatedOutlet from "../../components/AnimatedOutlet"
import { IconButton } from "@mui/material"

const logoVariants: Variants = {
    hidden: {
        y: "20%",
        opacity: 0,
        rotateZ: -45,
    },
    visible: {
        y: "0%",
        opacity: 1,
        rotateZ: 0,
        transition: {
            type: "spring",
            damping: 10,
            stiffness: 100,
        }
    }
}

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
    const navigate = useNavigate()

    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div className="flex flex-col items-center gap-8 w-full md:w-1/2 p-8 overflow-y-auto">
                <IconButton
                    size="large"
                    onClick={() => navigate("/")}
                >
                    <motion.img
                        src="/planifylogo.svg"
                        alt="Logo"
                        className="h-20"
                        initial="hidden"
                        animate="visible"
                        variants={logoVariants}
                    />
                </IconButton>
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