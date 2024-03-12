import { AddOutlined } from "@mui/icons-material";
import { Fab, Grid, Skeleton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ClientCard from "../../../../components/ClientCard";
import { useToastsContext } from "../../../../context/Toasts";
import clientService from "../../../../services/clientService";
import { IListClientResponseItem } from "../../../../types/services/clientService";
import { getErrorMessageOrDefault } from "../../../../util/getErrorMessageOrDefault";
import AdminClientsLoading from "./loading";
import ClientViewModal from "../../../../components/ClientViewModal";
import ClientEditModal from "../../../../components/ClientEditModal";
import ClientCreateModal from "../../../../components/ClientCreateModal";

export default function AdminClients() {

    const { addToast } = useToastsContext()

    const [clients, setClients] = useState<IListClientResponseItem[]>([])
    const [itemsCount, setItemsCount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true)
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [selectedClient, setSelectedClient] = useState<IListClientResponseItem | undefined>()

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

    function handleModalOpen(type: "view" | "edit" | "create", client?: IListClientResponseItem) {
        setSelectedClient(client)

        if (type === "view") {
            setViewModalOpen(true)
            setEditModalOpen(false)
            setCreateModalOpen(false)
        }
        else if (type === "edit") {
            setViewModalOpen(false)
            setEditModalOpen(true)
            setCreateModalOpen(false)
        }
        else if (type === "create") {
            setViewModalOpen(false)
            setEditModalOpen(false)
            setCreateModalOpen(true)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <div className="flex flex-1 flex-col gap-8 p-4">
            <div className="flex justify-between items-center">
                <Typography
                    variant="caption"
                >
                    {loading ?
                        <Skeleton
                            variant="text"
                            width={180}
                        />
                        :
                        `Mostrando ${itemsCount} ${itemsCount === 1 ? "cliente" : "clientes"} de ${totalItems}`
                    }
                </Typography>
            </div>
            <Grid container spacing={2}>
                {loading ?
                    <AdminClientsLoading />
                    :
                    clients.map(client => (
                        <Grid
                            key={client.id}
                            md={3}
                            item
                            xs={2}
                        >
                            <ClientCard
                                client={client}
                                onClick={() => handleModalOpen("view", client)}
                            />
                        </Grid>
                    ))
                }
            </Grid>
            <Tooltip title="Adicionar cliente" placement="left" arrow>
                <Fab className="fixed bottom-8 right-8" onClick={() => handleModalOpen("create")}>
                    <AddOutlined />
                </Fab>
            </Tooltip>
            <ClientViewModal
                open={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                client={clients[0]}
            />
            <ClientEditModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                client={clients[0]}
            />
            <ClientCreateModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
            />
        </div>
    )
}