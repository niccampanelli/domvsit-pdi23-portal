import moment from "moment";
import Chain from "../../assets/icons/chain.svg?react"
import { IEventCardProps } from "../../types/components/EventCard";
import { classes } from "../../util/classes";
import getRandomColor from "../../util/getRandomColor";
import Card from "../Card";
import styles from "./eventCard.module.css";

export default function EventCard({
    event,
    className,
    onClick,
    ...props
}: IEventCardProps) {

    function getEventDate(date: Date) {
        var dateString = moment(date).format("ddd[,] DD [de] MMM");
        return dateString.charAt(0).toUpperCase() + dateString.slice(1);
    }

    return (
        <Card
            {...props}
            onClick={onClick}
            className={classes(styles.root, onClick && styles.clickable, className)}
        >
            <div className={styles.header}>
                <div className={styles.date}>
                    {getEventDate(event.ocurrence)}
                </div>
                <div className={styles.link}>
                    <Chain className={styles.linkIcon} />
                    Link
                </div>
            </div>
            <h3 className={styles.title}>
                {event.title}
            </h3>
            <p className={styles.description}>
                {event.description}
            </p>
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
        </Card>
    )
}