import { Button, Typography, styled } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

const StyledDiv = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main
}))

export default function Home() {

    return (
        <StyledDiv
            className="flex flex-col w-screen h-screen items-center justify-center gap-4 p-8"
        >
            <Typography
                variant="h1"
                color="primary.contrastText"
                className="text-5xl font-bold text-center mb-8"
            >
                Transforme cada atendimento em uma oportunidade de ouro com Planify
            </Typography>
            <Typography
                variant="h2"
                color="primary.contrastText"
                className="text-xl"
            >
                Entrar como
            </Typography>
            <div className="flex gap-4">
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
            </div>
        </StyledDiv>
    )
}