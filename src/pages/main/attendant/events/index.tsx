import { ArrowDownwardOutlined, ArrowUpwardOutlined, SearchOutlined } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, MenuItem, Skeleton, TextField, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import EventCard from "../../../../components/EventCard";
import EventViewModal from "../../../../components/EventViewModal";
import { useAuthContext } from "../../../../context/Auth";
import { useToastsContext } from "../../../../context/Toasts";
import eventService from "../../../../services/eventService";
import { isAttendant } from "../../../../types/context/User";
import { IListResponseItem, ListRequestSortFieldsType } from "../../../../types/services/eventService";
import { getErrorMessageOrDefault } from "../../../../util/getErrorMessageOrDefault";
import AdminEventsLoading from "./Loading";

export default function AttendantEvents() {

    const { addToast } = useToastsContext()
    const { user } = useAuthContext()

    const sortOptions: { value: ListRequestSortFieldsType, label: string }[] = [
        { value: "title", label: "Título" },
        { value: "ocurrence", label: "Ocorrência" },
        { value: "createdAt", label: "Criado em" },
        { value: "updatedAt", label: "Atualizado em" }
    ]

    const [search, setSearch] = useState("")
    const [ocurrenceMin, setOcurrenceMin] = useState<Date>(moment().subtract(1, "month").toDate())
    const [ocurrenceMax, setOcurrenceMax] = useState<Date>(moment().add(1, "month").toDate())
    const [sortField, setSortField] = useState<ListRequestSortFieldsType>("createdAt")
    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC")
    const [events, setEvents] = useState<IListResponseItem[]>([])
    const [itemsCount, setItemsCount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true)
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<IListResponseItem | undefined>(undefined)

    async function fetchEvents() {
        setLoading(true)

        if (!isAttendant(user))
            return

        try {
            const data = await eventService.list({
                page: 1,
                limit: 16,
                sortField,
                sortOrder,
                search,
                ocurrenceMin,
                ocurrenceMax,
                clientId: user?.clientId
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

    function handleViewModalOpen(event: IListResponseItem) {
        setSelectedEvent(event)
        setViewModalOpen(true)
    }

    function handleViewModalClose() {
        setSelectedEvent(undefined)
        setViewModalOpen(false)
    }

    function handleSortOrder() {
        setSortOrder(previous => previous === "ASC" ? "DESC" : "ASC")
    }

    useEffect(() => {
        fetchEvents()
    }, [search, sortField, sortOrder, ocurrenceMin, ocurrenceMax])

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
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            xl={2}
                            key={event.id}
                        >
                            <EventCard
                                event={event}
                                onClick={() => handleViewModalOpen(event)}
                            />
                        </Grid>
                    ))
                }
            </Grid>
            <EventViewModal
                open={viewModalOpen}
                onClose={() => handleViewModalClose()}
                event={selectedEvent}
            />
        </div>
    )
}