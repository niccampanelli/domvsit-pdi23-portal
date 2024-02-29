import { useEffect, useState } from 'react'
import EventCard from '../../../../components/EventCard'
import EventModal from '../../../../components/EventModal'
import Spinner from '../../../../components/Spinner'
import { useToastsContext } from '../../../../context/Toasts'
import eventService from '../../../../services/eventService'
import { IListResponseItem, ListResponseType } from '../../../../types/services/eventService'
import { getErrorMessageOrDefault } from '../../../../util/getErrorMessageOrDefault'
import styles from './events.module.css'

export default function Events() {

    const { addToast } = useToastsContext()

    const [events, setEvents] = useState<IListResponseItem[]>([])
    const [pageData, setPageData] = useState<Omit<ListResponseType, "data"> | undefined>()
    const [page, setPage] = useState(1)
    const [limit, _] = useState(20)
    const [loading, setLoading] = useState(true)
    const [selectedEvent, setSelectedEvent] = useState<IListResponseItem | undefined>(undefined)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view")

    async function fetchEvents() {
        setLoading(true)

        try {
            const data = await eventService.list({
                page,
                limit
            })

            setEvents(previous => {
                return previous.filter(event => !data.data.some(newEvent => newEvent.id === event.id)).concat(data.data)
            })
            setPageData(data)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao buscar os eventos",
                message: message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }

    function detectBottom(e: any) {
        const element = e.target

        const scrollBottom = Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight

        if (scrollBottom && !loading) {
            setPage(prev => prev + 1)
        }
    }

    function handleCreateModal() {
        setModalMode("create")
        setModalOpen(true)
    }

    function handleSelectEvent(event: IListResponseItem) {
        setSelectedEvent(event)
        setModalMode("view")
        setModalOpen(true)
    }

    function handleModalClose() {
        setModalOpen(false)
        setModalMode("view")
        setSelectedEvent(undefined)
    }

    useEffect(() => {
        fetchEvents()
    }, [page, limit])

    return (
        <main className={styles.root}>
            <div className={styles.header}>
                <h3>
                    Mostrando {pageData?.itemsCount} {pageData?.itemsCount === 1 ? "evento" : "eventos"} de {pageData?.total}
                </h3>
                <button
                    onClick={handleCreateModal}
                >
                    Adicionar evento
                </button>
            </div>
            {loading ?
                <Spinner />
                :
                <ul
                    onScroll={detectBottom}
                    className={styles.list}
                >
                    {events.map(event => (
                        <EventCard
                            key={event.id}
                            className={styles.item}
                            event={event}
                            onClick={() => handleSelectEvent(event)}
                        />
                    ))}
                </ul>
            }
            <EventModal
                event={selectedEvent}
                open={modalOpen}
                onClose={handleModalClose}
                mode={modalMode}
            />
        </main>
    )
}