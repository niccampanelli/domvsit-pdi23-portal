import { AddOutlined } from "@mui/icons-material";
import { Fab, Grid, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EventCard from "../../../../components/EventCard";
import EventCardLoading from "../../../../components/EventCard/loading";
import { useToastsContext } from "../../../../context/Toasts";
import eventService from "../../../../services/eventService";
import { IListResponseItem } from "../../../../types/services/eventService";
import { getErrorMessageOrDefault } from "../../../../util/getErrorMessageOrDefault";
import EventViewModal from "../../../../components/EventViewModal";
import EventEditModal from "../../../../components/EventEditModal";

export default function AdminEvents() {

    const { addToast } = useToastsContext()

    const [events, setEvents] = useState<IListResponseItem[]>([])
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
                    Mostrando 3 eventos de 234
                </Typography>
            </div><Grid>
                <Grid
                    container
                    spacing={2}
                >
                    {loading ?
                        <>
                            <Grid
                                item
                                xs={2}
                                md={3}
                            >
                                <EventCardLoading />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                md={3}
                            >
                                <EventCardLoading />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                md={3}
                            >
                                <EventCardLoading />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                md={3}
                            >
                                <EventCardLoading />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                md={3}
                            >
                                <EventCardLoading />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                md={3}
                            >
                                <EventCardLoading />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                md={3}
                            >
                                <EventCardLoading />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                md={3}
                            >
                                <EventCardLoading />
                            </Grid>
                        </>
                        :
                        events.map(event => (
                            <Grid
                                item
                                xs={3}
                                key={event.id}
                            >
                                <EventCard
                                    event={event}
                                    onClick={() => {
                                        setSelectedEvent(event)
                                        setEditModalOpen(true)
                                    }}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Tooltip
                title="Adicionar evento"
                placement="left"
                arrow
            >
                <Fab
                    className="fixed bottom-8 right-8"
                    onClick={() => {
                        setSelectedEvent(undefined)
                        setEditModalOpen(true)
                    }}
                >
                    <AddOutlined />
                </Fab>
            </Tooltip>
            <EventViewModal
                open={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                event={selectedEvent}
            />
            <EventEditModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                event={selectedEvent}
            />
        </div>
    )
}