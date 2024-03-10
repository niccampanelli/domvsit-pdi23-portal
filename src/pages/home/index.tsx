import { Button, Typography } from "@mui/material"
import { useToastsContext } from "../../context/Toasts"

export default function Home() {

    const { addToast } = useToastsContext()

    return (
        <div>
            <Typography>
                Planify
            </Typography>
            <Typography>
                Entrar como
            </Typography>
            <div className="flex">
                <Button
                    variant="contained"
                    onClick={() => addToast({
                        title: "Cliente",
                        message: "Entrando como cliente",
                        type: "warning"
                    })}
                >
                    Cliente
                </Button>
                <Button
                    variant="contained"
                >
                    Admin
                </Button>
            </div>
        </div>
    )
}