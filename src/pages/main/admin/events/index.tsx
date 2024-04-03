import { AddOutlined, ArrowDownwardOutlined, ArrowUpwardOutlined, CloseOutlined, DeleteOutlined, EditOutlined, GroupsOutlined, SearchOutlined } from "@mui/icons-material";
import { Autocomplete, Fab, Grid, IconButton, InputAdornment, MenuItem, Skeleton, TextField, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import EventCard from "../../../../components/EventCard";
import EventCreateModal from "../../../../components/EventCreateModal";
import EventDeleteModal from "../../../../components/EventDeleteModal";
import EventEditModal from "../../../../components/EventEditModal";
import EventViewModal from "../../../../components/EventViewModal";
import { useToastsContext } from "../../../../context/Toasts";
import clientService from "../../../../services/clientService";
import eventService from "../../../../services/eventService";
import { IListClientResponseItem } from "../../../../types/services/clientService";
import { IListResponseItem, ListRequestSortFieldsType } from "../../../../types/services/eventService";
import { getErrorMessageOrDefault } from "../../../../util/getErrorMessageOrDefault";
import AdminEventsLoading from "./Loading";
import { useAuthContext } from "../../../../context/Auth";

export default function AdminEvents() {

    const { user } = useAuthContext()
    const { addToast } = useToastsContext()

    const sortOptions: { value: ListRequestSortFieldsType, label: string }[] = [
        { value: "title", label: "Título" },
        { value: "ocurrence", label: "Ocorrência" },
        { value: "createdAt", label: "Criado em" },
        { value: "updatedAt", label: "Atualizado em" }
    ]

    const [search, setSearch] = useState("")
    const [searchClient, setSearchClient] = useState("")
    const [clients, setClients] = useState<IListClientResponseItem[]>([])
    const [selectedClient, setSelectedClient] = useState<IListClientResponseItem | null>(null)
    const [ocurrenceMin, setOcurrenceMin] = useState<Date>(moment().subtract(6, "month").toDate())
    const [ocurrenceMax, setOcurrenceMax] = useState<Date>(moment().add(6, "month").toDate())
    const [sortField, setSortField] = useState<ListRequestSortFieldsType>("ocurrence")
    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC")
    const [events, setEvents] = useState<IListResponseItem[]>([])
    const [itemsCount, setItemsCount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true)
    const [clientsLoading, setClientsLoading] = useState(true)
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<IListResponseItem | undefined>(undefined)

    async function fetchClients() {
        setClientsLoading(true)

        try {
            const data = await clientService.listClient({
                search: searchClient,
                page: 1,
                limit: 6,
                consultorId: user?.id
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
            setClientsLoading(false)
        }
    }

    async function fetchEvents() {
        setLoading(true)

        try {
            const data = await eventService.list({
                page: 1,
                limit: 16,
                sortField,
                sortOrder,
                search,
                ocurrenceMin,
                ocurrenceMax,
                showUnmarked: true,
                clientId: selectedClient?.id,
                consultorId: user?.id
            })

            setEvents(data.data)
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

    function handleEditModalClose() {
        setSelectedEvent(undefined)
        setEditModalOpen(false)
    }

    function handleViewModalClose() {
        setSelectedEvent(undefined)
        setViewModalOpen(false)
    }

    function handleCreateModalClose() {
        setSelectedEvent(undefined)
        setCreateModalOpen(false)
    }

    function handleDeleteModalClose() {
        setSelectedEvent(undefined)
        setDeleteModalOpen(false)
    }

    function handleSortOrder() {
        setSortOrder(previous => previous === "ASC" ? "DESC" : "ASC")
    }

    function handleModalOpen(type: "view" | "edit" | "create" | "delete", event?: IListResponseItem) {
        setSelectedEvent(event)

        switch (type) {
            case "view":
                setViewModalOpen(true)
                setEditModalOpen(false)
                setCreateModalOpen(false)
                setDeleteModalOpen(false)
                break
            case "edit":
                setViewModalOpen(false)
                setEditModalOpen(true)
                setCreateModalOpen(false)
                setDeleteModalOpen(false)
                break
            case "create":
                setViewModalOpen(false)
                setEditModalOpen(false)
                setCreateModalOpen(true)
                setDeleteModalOpen(false)
                break
            case "delete":
                setViewModalOpen(false)
                setEditModalOpen(false)
                setCreateModalOpen(false)
                setDeleteModalOpen(true)
                break
        }
    }

    function handleStatusChange(id?: number, status?: boolean) {
        setEvents(previous => previous.map(event => {
            if (event.id === id)
                return {
                    ...event,
                    status: status ?? !event.status
                }

            return event
        }))
    }

    useEffect(() => {
        fetchClients()
    }, [searchClient])

    useEffect(() => {
        fetchEvents()
    }, [search, sortField, sortOrder, selectedClient?.id, ocurrenceMin, ocurrenceMax])

    return (
        <div className="flex flex-1 flex-col p-4">
            <div className="relative">
                <div className="sticky top-0 flex items-center gap-4">
                    <TextField
                        placeholder="Buscar eventos..."
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
                    <Autocomplete
                        autoComplete
                        value={selectedClient}
                        onChange={(_, value) => setSelectedClient(value)}
                        onInputChange={(_, value) => setSearchClient(value)}
                        options={clients}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name}
                        filterOptions={(x) => x}
                        noOptionsText="Nenhum cliente encontrado"
                        size="small"
                        loading={clientsLoading}
                        loadingText="Carregando..."
                        sx={{
                            minWidth: 180
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Cliente"
                                size="small"
                                InputProps={{
                                    ...params.InputProps,
                                    fullWidth: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <GroupsOutlined />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                        renderOption={(props, option) => (
                            <li {...props}>
                                {option.name}
                            </li>
                        )}
                    />
                    <TextField
                        label="Desde"
                        type="date"
                        inputProps={{
                            max: moment(ocurrenceMax).format("YYYY-MM-DD"),
                        }}
                        value={moment(ocurrenceMin).format("YYYY-MM-DD")}
                        onChange={e => setOcurrenceMin(moment(e.target.value).toDate())}
                        size="small"
                    />
                    <TextField
                        label="Até"
                        type="date"
                        inputProps={{
                            min: moment(ocurrenceMin).format("YYYY-MM-DD")
                        }}
                        value={moment(ocurrenceMax).format("YYYY-MM-DD")}
                        onChange={e => setOcurrenceMax(moment(e.target.value).toDate())}
                        size="small"
                    />
                    <TextField
                        select
                        label="Ordenar por"
                        value={sortField}
                        onChange={e => setSortField(e.target.value as ListRequestSortFieldsType)}
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
                    `Mostrando ${itemsCount} ${itemsCount === 1 ? "evento" : "eventos"} de ${totalItems}`
                }
            </Typography>
            <Grid
                className="mt-4"
                container
                spacing={2}
            >
                {loading ?
                    <AdminEventsLoading />
                    :
                    events.map(event => (
                        <Grid
                            item
                            xs={3}
                            key={event.id}
                        >
                            <EventCard
                                event={event}
                                onClick={() => handleModalOpen("view", event)}
                                openViewModal={() => handleModalOpen("view", event)}
                                openEditModal={() => handleModalOpen("edit", event)}
                                openDeleteModal={() => handleModalOpen("delete", event)}
                                onStatusChange={(status) => handleStatusChange(event.id, status)}
                                showMenu
                            />
                        </Grid>
                    ))
                }
            </Grid>
            <Tooltip
                title="Adicionar evento"
                placement="left"
                arrow
            >
                <Fab
                    className="fixed bottom-8 right-8"
                    onClick={() => handleModalOpen("create")}
                >
                    <AddOutlined />
                </Fab>
            </Tooltip>
            <EventViewModal
                open={viewModalOpen}
                onClose={() => handleViewModalClose()}
                event={selectedEvent}
                actionButton={
                    <>
                        <Tooltip
                            title="Deletar evento"
                            arrow
                        >
                            <Fab
                                onClick={() => handleModalOpen("delete", selectedEvent)}
                            >
                                <DeleteOutlined />
                            </Fab>
                        </Tooltip>
                        <Tooltip
                            title="Editar"
                            arrow
                        >
                            <Fab
                                onClick={() => handleModalOpen("edit", selectedEvent)}
                            >
                                <EditOutlined />
                            </Fab>
                        </Tooltip>
                    </>
                }
            />
            <EventEditModal
                open={editModalOpen}
                onClose={() => handleEditModalClose()}
                event={selectedEvent}
                refreshData={fetchEvents}
                actionButton={
                    <>
                        <Tooltip
                            title="Cancelar edição"
                            arrow
                        >
                            <Fab
                                onClick={() => handleModalOpen("view", selectedEvent)}
                            >
                                <CloseOutlined />
                            </Fab>
                        </Tooltip>
                    </>
                }
            />
            <EventCreateModal
                open={createModalOpen}
                onClose={() => handleCreateModalClose()}
                refreshData={fetchEvents}
            />
            <EventDeleteModal
                open={deleteModalOpen}
                onClose={() => handleDeleteModalClose()}
                event={selectedEvent}
                refreshData={fetchEvents}
            />
        </div>
    )
}