import { AddOutlined, ArrowDownwardOutlined, ArrowUpwardOutlined, CloseOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from "@mui/icons-material";
import { Fab, Grid, IconButton, InputAdornment, MenuItem, Skeleton, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ClientCard from "../../../../components/ClientCard";
import ClientCreateModal from "../../../../components/ClientCreateModal";
import ClientEditModal from "../../../../components/ClientEditModal";
import ClientViewModal from "../../../../components/ClientViewModal";
import { useToastsContext } from "../../../../context/Toasts";
import clientService from "../../../../services/clientService";
import { IListClientResponseItem, ListClientRequestSortFieldsType } from "../../../../types/services/clientService";
import { getErrorMessageOrDefault } from "../../../../util/getErrorMessageOrDefault";
import AdminClientsLoading from "./Loading";
import ClientDeleteModal from "../../../../components/ClientDeleteModal";
import { useAuthContext } from "../../../../context/Auth";

export default function AdminClients() {

    const { user } = useAuthContext()
    const { addToast } = useToastsContext()

    const sortOptions: { value: ListClientRequestSortFieldsType, label: string }[] = [
        { value: "name", label: "Nome" },
        { value: "email", label: "Email" },
        { value: "phone", label: "Telefone" },
        { value: "createdAt", label: "Criado em" },
    ]

    const [search, setSearch] = useState("")
    const [sortField, setSortField] = useState<ListClientRequestSortFieldsType>("createdAt")
    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC")
    const [clients, setClients] = useState<IListClientResponseItem[]>([])
    const [itemsCount, setItemsCount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true)
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedClient, setSelectedClient] = useState<IListClientResponseItem | undefined>()

    async function fetchClients() {
        setLoading(true)

        try {
            const data = await clientService.listClient({
                page: 1,
                limit: 20,
                sortField,
                sortOrder,
                search,
                consultorId: user?.id
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

    function handleModalOpen(type: "view" | "edit" | "create" | "delete", client?: IListClientResponseItem) {
        setSelectedClient(client)

        if (type === "view") {
            setViewModalOpen(true)
            setEditModalOpen(false)
            setCreateModalOpen(false)
            setDeleteModalOpen(false)
        }
        else if (type === "edit") {
            setViewModalOpen(false)
            setEditModalOpen(true)
            setCreateModalOpen(false)
            setDeleteModalOpen(false)
        }
        else if (type === "create") {
            setViewModalOpen(false)
            setEditModalOpen(false)
            setCreateModalOpen(true)
            setDeleteModalOpen(false)
        }
        else if (type === "delete") {
            setViewModalOpen(false)
            setEditModalOpen(false)
            setCreateModalOpen(false)
            setDeleteModalOpen(true)
        }
    }

    function handleSortOrder() {
        setSortOrder(previous => previous === "ASC" ? "DESC" : "ASC")
    }

    useEffect(() => {
        fetchClients()
    }, [search, sortField, sortOrder])

    return (
        <div className="flex flex-1 flex-col p-4">
            <div className="flex items-center gap-4">
                <TextField
                    placeholder="Buscar clientes..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="flex-1"
                    size="small"
                    InputProps={{
                        sx: {
                            paddingLeft: 1
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlined fontSize="small" />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    select
                    label="Ordenar por"
                    value={sortField}
                    onChange={e => setSortField(e.target.value as ListClientRequestSortFieldsType)}
                    sx={{
                        minWidth: 180
                    }}
                    size="small"
                    SelectProps={{
                        IconComponent: () => null
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Tooltip
                                    title={`Ordenar ${sortOrder === "ASC" ? "ascendente" : "descendente"}`}
                                    arrow
                                >
                                    <IconButton
                                        onClick={handleSortOrder}
                                        size="small"
                                    >
                                        {sortOrder === "ASC" ?
                                            <ArrowUpwardOutlined fontSize="small" />
                                            :
                                            <ArrowDownwardOutlined fontSize="small" />
                                        }
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        )
                    }}
                >
                    {sortOptions.map(option => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <Typography
                className="mt-2"
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
            <Grid
                className="mt-4 mb-16"
                container
                spacing={2}
            >
                {loading ?
                    <AdminClientsLoading />
                    :
                    clients.map(client => (
                        <Grid
                            key={client.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            xl={2}
                            item
                        >
                            <ClientCard
                                client={client}
                                showMenu
                                openViewModal={() => handleModalOpen("view", client)}
                                openEditModal={() => handleModalOpen("edit", client)}
                                openDeleteModal={() => handleModalOpen("delete", client)}
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
                client={selectedClient}
                actionButton={
                    <>
                        <Tooltip
                            title="Excluir"
                            arrow
                        >
                            <Fab
                                onClick={() => handleModalOpen("delete", selectedClient)}
                            >
                                <DeleteOutlined />
                            </Fab>
                        </Tooltip>
                        <Tooltip
                            title="Editar"
                            arrow
                        >
                            <Fab
                                onClick={() => handleModalOpen("edit", selectedClient)}
                            >
                                <EditOutlined />
                            </Fab>
                        </Tooltip>
                    </>
                }
            />
            <ClientEditModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                refreshData={fetchClients}
                client={selectedClient}
                actionButton={
                    <Tooltip
                        title="Cancelar edição"
                        arrow
                    >
                        <Fab
                            onClick={() => handleModalOpen("view", selectedClient)}
                        >
                            <CloseOutlined />
                        </Fab>
                    </Tooltip>
                }
            />
            <ClientCreateModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                refreshData={fetchClients}
            />
            <ClientDeleteModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                client={selectedClient}
                refreshData={fetchClients}
            />
        </div>
    )
}