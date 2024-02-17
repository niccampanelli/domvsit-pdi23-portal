import { useEffect, useState } from 'react'
import EventCard from '../../../../../../components/EventCard'
import Spinner from '../../../../../../components/Spinner'
import { useToastsContext } from '../../../../../../context/Toasts'
import eventService from '../../../../../../services/eventService'
import { IListResponseItem } from '../../../../../../types/services/eventService'
import { getErrorMessageOrDefault } from '../../../../../../util/getErrorMessageOrDefault'
import sectionsStyles from '../sections.module.css'
import styles from './eventSection.module.css'

export default function EventSection() {

    const { addToast } = useToastsContext()

    const [events, setEvents] = useState<IListResponseItem[]>([])
    const [loading, setLoading] = useState(false)

    async function fetchEvents() {
        setLoading(true)

        try {
            const data = await eventService.list({
                page: 1,
                limit: 5
            });
            setEvents(data.data)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao buscar eventos",
                message: message,
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
        <section className={sectionsStyles.section}>
            <h2 className={sectionsStyles.sectionTitle}>
                Eventos
            </h2>
            {loading ?
                <Spinner />
                :
                <ul className={styles.list}>
                    {events.map(event => (
                        <EventCard
                            key={event.id}
                            className={styles.item}
                            event={event}
                        />
                    ))}
                </ul>
            }
        </section>
    )
}