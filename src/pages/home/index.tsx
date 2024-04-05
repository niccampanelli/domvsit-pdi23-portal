import { Button, Typography, styled } from "@mui/material"
import { Link } from "react-router-dom"
import { Variants, motion } from "framer-motion"

const StyledDiv = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main
}))

const MotionTypography = motion(Typography)

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

const titleVariants: Variants = {
    hidden: {
        y: "20%",
        opacity: 0,
    },
    visible: {
        y: "0%",
        opacity: 1,
        transition: {
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut"
        }
    }
}

const optionsVariants: Variants = {
    hidden: {
        y: "20%",
        opacity: 0,
    },
    visible: {
        y: "0%",
        opacity: 1,
        transition: {
            delay: 0.4,
            duration: 0.8,
            ease: "easeInOut"
        }
    }
}

export default function Home() {

    return (
        <StyledDiv
            className="flex flex-col w-screen h-screen items-center justify-center gap-4 p-8"
        >
            <motion.img
                src="/planifylogo.svg"
                alt="Logo"
                className="h-32 mb-8"
                initial="hidden"
                animate="visible"
                variants={logoVariants}
            />
            <MotionTypography
                variant="h1"
                color="primary.contrastText"
                className="text-5xl font-bold text-center mb-8"
                initial="hidden"
                animate="visible"
                variants={titleVariants}
            >
                Transforme cada atendimento em uma oportunidade de ouro com Planify
            </MotionTypography>
            <MotionTypography
                variant="h2"
                color="primary.contrastText"
                className="text-xl"
                initial="hidden"
                animate="visible"
                variants={optionsVariants}
            >
                Entrar como
            </MotionTypography>
            <motion.div
                className="flex gap-4"
                initial="hidden"
                animate="visible"
                variants={optionsVariants}
            >
                <Button
                    component={Link}
                    variant="outlined"
                    color="inherit"
                    to="/auth/attendant/login"
                >
                    Participante
                </Button>
                <Button
                    component={Link}
                    variant="outlined"
                    color="inherit"
                    to="/auth/login"
                >
                    Consultor
                </Button>
            </motion.div>
        </StyledDiv>
    )
}