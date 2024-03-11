import { AddOutlined } from "@mui/icons-material";
import { Fab, Grid, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ClientCard from "../../../../components/ClientCard";
import { useToastsContext } from "../../../../context/Toasts";
import clientService from "../../../../services/clientService";
import { IListClientResponseItem } from "../../../../types/services/clientService";
import { getErrorMessageOrDefault } from "../../../../util/getErrorMessageOrDefault";
import GridLoadingClients from "./loading";

export default function AdminClients() {

    const { addToast } = useToastsContext()

    const [clients, setClients] = useState<IListClientResponseItem[]>([])
    const [itemsCount, setItemsCount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
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
            setItemsCount(data.itemsCount)
            setTotalItems(data.total)
            setPage(data.currentPage)
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
                    Mostrando
                    { 
                        itemsCount === 0 || itemsCount > 1 ? 
                            ` ${itemsCount} clientes `
                        :
                            ` ${itemsCount} cliente `
                    } 
                    de
                    {` ${totalItems} `}
                </Typography>

            </div>

            <Grid container spacing={2}>
                {
                    loading ?
                            <GridLoadingClients />
                        :
                            clients.map(client => (
                                <Grid item xs={2} md={3} key={client.id}>
                                    <ClientCard client={client} />
                                </Grid>
                            ))
                }

            </Grid>

            <Tooltip title="Adicionar cliente" placement="left" arrow>
                
                <Fab className="fixed bottom-8 right-8" onClick={() => setModalOpen(true)}>
                    <AddOutlined />
                </Fab>

            </Tooltip>

        </div>
    )
}