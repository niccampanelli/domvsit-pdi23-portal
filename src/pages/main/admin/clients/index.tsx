import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ClientCardLoading from "../../../../components/ClientCard/loading";
import { useToastsContext } from "../../../../context/Toasts";
import { IListResponseItem } from "../../../../types/services/eventService";
import GridLoadingClients from "./loading";
import clientService from "../../../../services/clientService";
import { IListClientResponseItem } from "../../../../types/services/clientService";
import { getErrorMessageOrDefault } from "../../../../util/getErrorMessageOrDefault";

export default function AdminClients() {

    const { addToast } = useToastsContext()

    const [clients, setClients] = useState<IListClientResponseItem[]>([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)



    async function fetchEvents() {
        setLoading(true)

        try {
            const data = await clientService.listClient({
                page: 1,
                limit: 16,
            })

            setClients(data.data)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao buscar os eventos",
                message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchEvents()
    }, [])



    return (
        <div className="flex flex-1 flex-col gap-8 p-4">

            <div className="flex justify-between items-center">

                <Typography
                    variant="h2"
                    className="text-xl font-bold"
                >
                    Mostrando 3 clientes de 234
                </Typography>

            </div>

            <Grid container spacing={2}>
                {
                    loading ?
                            <GridLoadingClients />
                        :
                            clients.map(client => (
                                <Grid item xs={2} md={3}>
                                    {/* <ClientCard client={client} /> */}
                                </Grid>
                            ))
                }

            </Grid>

        </div>
    )
}