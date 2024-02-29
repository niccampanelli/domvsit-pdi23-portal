import moment from "moment";
import Chain from "../../../assets/icons/chain.svg?react";
import Edit from "../../../assets/icons/edit.svg?react";
import { IEventViewProps } from "../../../types/components/EventModal";
import getInitials from "../../../util/getInitials";
import getRandomColor from "../../../util/getRandomColor";
import Spinner from "../../Spinner";
import styles from "./eventView.module.css";

export default function EventView({
    event,
    client,
    attendants,
    onActionClick,
    eventClientLoading,
    eventAttendantsLoading
}: IEventViewProps) {

    if (!event) return null

    function getEventDate(date: Date) {
        var dateString = moment(date).format("dddd[,] DD [de] MMMM [de] YYYY [às] HH:mm");
        return dateString.charAt(0).toUpperCase() + dateString.slice(1);
    }

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <h2>
                    {event.title}
                </h2>
                <button
                    type="button"
                    title="Editar evento"
                    className={styles.action}
                    onClick={onActionClick}
                >
                    <Edit />
                </button>
            </div>
            <div className={styles.section}>
                <p className={styles.observation}>
                    Criado em: {moment(event.createdAt).format("DD/MM/YYYY [às] HH:mm")} | Última atualização: {moment(event.updatedAt).format("DD/MM/YYYY [às] HH:mm")}
                </p>
            </div>
            <div className={styles.section}>
                <h3 className={styles.subtitle}>
                    Descrição
                </h3>
                <p className={styles.text}>
                    {event.description}
                </p>
            </div>
            <div className={styles.section}>
                <p className={styles.text}>
                    {getEventDate(event.ocurrence)}
                </p>
            </div>
            {event.link &&
                <div className={styles.section}>
                    <h3 className={styles.subtitle}>
                        Link
                    </h3>
                    <div className={styles.linkSection}>
                        <Chain className={styles.linkIcon} />
                        <a
                            href={event.link}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.link}
                        >
                            {event.link}
                        </a>
                    </div>
                </div>
            }
            {eventClientLoading ?
                <Spinner />
                :
                client &&
                <div className={styles.section}>
                    <h3 className={styles.subtitle}>
                        Cliente
                    </h3>
                    <div className={styles.clientSection}>
                        <span
                            className={styles.clientAvatar}
                            style={{
                                backgroundColor: getRandomColor()
                            }}
                        >
                            {getInitials(client.name)}
                        </span>
                        <p className={styles.text}>
                            {client.name}
                        </p>
                    </div>
                </div>
            }
            <div className="separator" />
            {event.tags &&
                <div className={styles.tagSection}>
                    {event.tags.map(tag => (
                        <span
                            key={tag}
                            className={styles.tag}
                            style={{
                                backgroundColor: getRandomColor()
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            }
            {eventAttendantsLoading ?
                <Spinner />
                :
                attendants && attendants.length > 0 &&
                <div className={styles.section}>
                    <h3 className={styles.subtitle}>
                        Participantes
                    </h3>
                    <div className={styles.attendantList}>
                        {attendants.map(attendant => (
                            <span
                                key={attendant.id}
                                className={styles.attendant}
                                style={{
                                    backgroundColor: getRandomColor()
                                }}
                                title={attendant.name}
                            >
                                {getInitials(attendant.name || "")}
                            </span>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}