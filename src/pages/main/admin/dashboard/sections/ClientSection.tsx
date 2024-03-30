import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ClientCard from "../../../../../components/ClientCard"
import { useToastsContext } from "../../../../../context/Toasts"
import clientService from "../../../../../services/clientService"
import { IListClientResponseItem } from "../../../../../types/services/clientService"
import { getErrorMessageOrDefault } from "../../../../../util/getErrorMessageOrDefault"
import ClientCardLoading from "../../../../../components/ClientCard/loading"

export default function ClientSection() {

    const { addToast } = useToastsContext()

    const [clients, setClients] = useState<IListClientResponseItem[]>([])
    const [loading, setLoading] = useState(true)

    async function fetchClients() {
        setLoading(true)

        try {
            const data = await clientService.listClient({
                page: 1,
                limit: 4,
            })

            setClients(data.data)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao buscar os clientes",
                message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchClients()
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <Typography
                variant="h2"
                className="text-xl font-bold"
            >
                Clientes
            </Typography>
            <Grid
                container
                spacing={2}
            >
                {loading ?
                    <>
                        <Grid
                            item
                            xs={3}
                        >
                            <ClientCardLoading />
                        </Grid>
                        <Grid
                            item
                            xs={3}
                        >
                            <ClientCardLoading />
                        </Grid>
                        <Grid
                            item
                            xs={3}
                        >
                            <ClientCardLoading />
                        </Grid>
                        <Grid
                            item
                            xs={3}
                        >
                            <ClientCardLoading />
                        </Grid>
                    </>
                    :
                    clients.map(client => (
                        <Grid
                            key={client.id}
                            item
                            xs={3}
                        >
                            <ClientCard
                                client={client}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}