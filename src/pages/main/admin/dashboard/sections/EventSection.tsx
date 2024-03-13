import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import EventCard from "../../../../../components/EventCard"
import EventCardLoading from "../../../../../components/EventCard/Loading"
import { useToastsContext } from "../../../../../context/Toasts"
import eventService from "../../../../../services/eventService"
import { IListResponseItem } from "../../../../../types/services/eventService"
import { getErrorMessageOrDefault } from "../../../../../util/getErrorMessageOrDefault"

export default function EventSection() {

    const { addToast } = useToastsContext()

    const [events, setEvents] = useState<IListResponseItem[]>([])
    const [loading, setLoading] = useState(true)

    async function fetchEvents() {
        setLoading(true)

        try {
            const data = await eventService.list({
                page: 1,
                limit: 4,
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
        <div className="flex flex-col gap-2">
            <Typography
                variant="h2"
                className="text-xl font-bold"
            >
                Eventos
            </Typography>
            <Grid>
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
                                <EventCardLoading />
                            </Grid>
                            <Grid
                                item
                                xs={3}
                            >
                                <EventCardLoading />
                            </Grid>
                            <Grid
                                item
                                xs={3}
                            >
                                <EventCardLoading />
                            </Grid>
                            <Grid
                                item
                                xs={3}
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
        </div>
    )
}