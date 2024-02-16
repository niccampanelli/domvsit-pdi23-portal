import { useEffect, useState } from 'react'
import Card from '../../../../../components/Card'
import Spinner from '../../../../../components/Spinner'
import { useToastsContext } from '../../../../../context/Toasts'
import eventService from '../../../../../services/eventService'
import { IListResponseItem } from '../../../../../types/services/eventService'
import { getErrorMessageOrDefault } from '../../../../../util/getErrorMessageOrDefault'
import sectionsStyles from '../sections.module.css'
import styles from './eventSection.module.css'
import Link from '../../../../../components/Link'
import moment from 'moment'

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

    function getEventDate(date: Date) {
        var dateString = moment(date).format("ddd[,] DD [de] MMM");
        return dateString.charAt(0).toUpperCase() + dateString.slice(1);
    }

    function getRandomColor() {
        const colors = [
            "#FF6633",
            "#FFB399",
            "#FF33FF",
            "#FFFF99",
            "#00B3E6",
            "#E6B333",
            "#3366E6",
            "#999966",
            "#99FF99",
            "#B34D4D",
        ]
        return colors[Math.floor(Math.random() * colors.length)]
    }

    const Item = ({ event }: { event: IListResponseItem }) => {

        return (
            <Card
                className={styles.item}
                key={event.id}
            >
                <div className={styles.itemDate}>
                    {getEventDate(event.ocurrence)}
                </div>
                <h3 className={styles.itemTitle}>
                    {event.title}
                </h3>
                <p className={styles.itemDescription}>
                    {event.description}
                </p>
                {event.link &&
                    <div className={styles.itemLinkSection}>
                        <p>
                            Ocorrerá em:
                        </p>
                        <Link
                            to={event.link}
                            target="_blank"
                        >
                            {event.link}
                        </Link>
                    </div>
                }
                {event.tags &&
                    <div className={styles.itemTagSection}>
                        {event.tags.map(tag => (
                            <span
                                key={tag}
                                className={styles.itemTag}
                                style={{
                                    backgroundColor: getRandomColor()
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                }
            </Card>
        )
    }

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
                        <Item
                            key={event.id}
                            event={event}
                        />
                    ))}
                </ul>
            }
        </section>
    )
}