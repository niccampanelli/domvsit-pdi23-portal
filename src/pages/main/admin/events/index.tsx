import { AddOutlined } from "@mui/icons-material";
import { Fab, Grid, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useToastsContext } from "../../../../context/Toasts";
import eventService from "../../../../services/eventService";
import { IListResponseItem } from "../../../../types/services/eventService";
import { getErrorMessageOrDefault } from "../../../../util/getErrorMessageOrDefault";
import EventCardLoading from "../../../../components/EventCard/loading";
import EventCard from "../../../../components/EventCard";
import EventModal from "../../../../components/EventModal";

export default function AdminEvents() {

    const { addToast } = useToastsContext()

    const [events, setEvents] = useState<IListResponseItem[]>([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)

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
                    onClick={() => setModalOpen(true)}
                >
                    <AddOutlined />
                </Fab>
            </Tooltip>
            <EventModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    )
}