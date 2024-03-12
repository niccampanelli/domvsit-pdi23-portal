import { AddOutlined } from "@mui/icons-material";
import { Fab, Grid, Skeleton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EventCard from "../../../../components/EventCard";
import EventEditModal from "../../../../components/EventEditModal";
import EventViewModal from "../../../../components/EventViewModal";
import { useToastsContext } from "../../../../context/Toasts";
import eventService from "../../../../services/eventService";
import { IListResponseItem } from "../../../../types/services/eventService";
import { getErrorMessageOrDefault } from "../../../../util/getErrorMessageOrDefault";
import AdminEventsLoading from "./loading";

export default function AdminEvents() {

    const { addToast } = useToastsContext()

    const [events, setEvents] = useState<IListResponseItem[]>([])
    const [itemsCount, setItemsCount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true)
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<IListResponseItem | undefined>(undefined)

    async function fetchEvents() {
        setLoading(true)

        try {
            const data = await eventService.list({
                page: 1,
                limit: 16,
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

    function handleEditModalOpen(event?: IListResponseItem) {
        setSelectedEvent(event)
        setEditModalOpen(true)
    }

    function handleEditModalClose() {
        setSelectedEvent(undefined)
        setEditModalOpen(false)
    }

    function handleViewModalClose() {
        setSelectedEvent(undefined)
        setViewModalOpen(false)
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
                        `Mostrando ${itemsCount} ${itemsCount === 1 ? "evento" : "eventos"} de ${totalItems}`
                    }
                </Typography>
            </div>
            <Grid
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
                                onClick={() => handleViewModalOpen(event)}
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
                    onClick={() => handleEditModalOpen(undefined)}
                >
                    <AddOutlined />
                </Fab>
            </Tooltip>
            <EventViewModal
                open={viewModalOpen}
                onClose={() => handleViewModalClose()}
                event={selectedEvent}
                openEditModal={event => handleEditModalOpen(event)}
            />
            <EventEditModal
                open={editModalOpen}
                onClose={() => handleEditModalClose()}
                event={selectedEvent}
                openViewModal={event => handleViewModalOpen(event)}
            />
        </div>
    )
}